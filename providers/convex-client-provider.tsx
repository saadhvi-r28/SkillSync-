"use client";

import { Loading } from "@/components/auth/loading";
import { useAuth, RedirectToSignIn } from "@clerk/nextjs";
import { Authenticated, ConvexReactClient, Unauthenticated } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { useEffect, useState } from "react";

interface ConvexClientProviderProps {
    children: React.ReactNode;
}

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL!;

const convex = new ConvexReactClient(convexUrl);

export const ConvexClientProvider: React.FC<ConvexClientProviderProps> = ({ children }) => {
    const { isLoaded, isSignedIn, getToken } = useAuth(); // Added getToken
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isLoaded) {
            setLoading(false);

            if (isSignedIn) {
                // Get the token and log it
                getToken().then(token => {
                    console.log("User token:", token); // Console log the token
                }).catch(err => {
                    console.error("Error fetching token:", err);
                });
            }
        }
    }, [isLoaded, isSignedIn, getToken]);

    if (loading) {
        return <Loading />;
    }

    if (!isSignedIn) {
        return <RedirectToSignIn />;
    }

    return (
        <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
            <Unauthenticated>
                <div>You are not logged in</div>
            </Unauthenticated>
            <Authenticated>
                {children}
            </Authenticated>
        </ConvexProviderWithClerk>
    );
};
