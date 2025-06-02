"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

import { GigCard } from "./gig-card";
import { Loading } from "@/components/auth/loading";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { FullGigType } from "@/types";
import { useEffect, useState } from "react";
import { EmptySearch } from "./empty-search";
import { EmptyFavorites } from "./empty-favorites";
import { AnimatedContainer } from "@/components/ui/animated-container";
import { motion } from "framer-motion";

interface GigListProps {
    query: {
        search?: string;
        favorites?: string;
        filter?: string;
    };
};

export const GigList = ({
    query,
}: GigListProps) => {
    const gigs: FullGigType[] | undefined = useQuery(api.gigs.get, { search: query.search, favorites: query.favorites, filter: query.filter });
    const [gigsWithFavorite, setGigsWithFavorite] = useState<FullGigType[] | undefined>(undefined);
    // filter for favorites if query.favorites is true
    useEffect(() => {
        if (query.favorites) {
            const favoriteGigs = gigs?.filter((gig) => gig.favorited);
            setGigsWithFavorite(favoriteGigs);
        } else {
            setGigsWithFavorite(gigs);
        }
    }, [query.favorites, gigs]);

    if (gigs === undefined) {
        return (
            <AnimatedContainer animation="fade">
                <div className="flex items-center justify-center h-40">
                    <Loading />
                </div>
            </AnimatedContainer>
        );
    }

    if (!gigs?.length && query.search) {
        return (
            <AnimatedContainer animation="fade">
                <EmptySearch />
            </AnimatedContainer>
        );
    }

    if (!gigsWithFavorite?.length && query.favorites) {
        return (
            <AnimatedContainer animation="fade">
                <EmptyFavorites />
            </AnimatedContainer>
        );
    }

    return (
        <AnimatedContainer animation="fade">
            <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-8 pb-10 mx-10"
                variants={{
                    hidden: { opacity: 0 },
                    show: {
                        opacity: 1,
                        transition: {
                            staggerChildren: 0.1
                        }
                    }
                }}
                initial="hidden"
                animate="show"
            >
                {gigsWithFavorite?.map((gig, index) => (
                    <motion.div
                        key={gig._id}
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            show: { opacity: 1, y: 0 }
                        }}
                    >
                        <GigCard
                            id={gig._id}
                            sellerId={gig.sellerId}
                            title={gig.title}
                            description={gig.description}
                            createdAt={gig._creationTime}
                            isFavorite={gig.favorited}
                            storageId={gig.storageId}
                            offer={gig.offer}
                            reviews={gig.reviews}
                        />
                    </motion.div>
                ))}
            </motion.div>
        </AnimatedContainer>
    );
}
