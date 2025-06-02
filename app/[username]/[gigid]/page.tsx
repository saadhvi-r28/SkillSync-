"use client";

import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { Images } from "../../../components/images";
import { Description } from "@/components/description";
import { Info } from "lucide-react";
import { Header } from "./components/header";
import { Seller } from "./components/seller";
import { SellerDetails } from "./components/seller-detail";
import { Offers } from "./components/offers";
import { Reviews } from "../components/reviews/reviews";
import { AddReview } from "../components/reviews/add-review";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface PageProps {
    params: {
        username: string
        gigid: string
    }
}

const LoadingSkeleton = () => (
    <div className="space-y-8">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-64 w-full" />
        <div className="space-y-4">
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
        </div>
    </div>
);

const GigPage = ({
    params
}: PageProps) => {
    const gig = useQuery(api.gig.get, { id: params.gigid as Id<"gigs"> });
    const categoryAndSubcategory = useQuery(api.gig.getCategoryAndSubcategory, { gigId: params.gigid as Id<"gigs"> });
    const offers = useQuery(api.offers.get, { gigId: params.gigid as Id<"gigs"> });
    const reviews = useQuery(api.reviews.getByGig, { gigId: params.gigid as Id<"gigs"> });
    const reviewsFull = useQuery(api.reviews.getFullByGig, { gigId: params.gigid as Id<"gigs"> });

    if (gig === undefined || reviews === undefined || reviewsFull === undefined || categoryAndSubcategory === undefined || offers === undefined) {
        return <LoadingSkeleton />;
    }

    if (gig === null || categoryAndSubcategory === null || offers === null) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center justify-center min-h-[50vh]"
            >
                <p className="text-xl text-gray-500">Gig not found</p>
            </motion.div>
        );
    }

    if (gig.published === false) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center justify-center min-h-[50vh]"
            >
                <p className="text-xl text-gray-500">This gig is not published</p>
            </motion.div>
        );
    }

    const editUrl = `/seller/${gig.seller.username}/manage-gigs/edit/${gig._id}`;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-gray-50"
        >
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Main Content */}
                    <motion.div 
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="flex-1 space-y-8"
                    >
                        <Header
                            {...categoryAndSubcategory}
                            editUrl={editUrl}
                            ownerId={gig.seller._id}
                        />
                        
                        <motion.h1 
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-4xl font-bold break-words text-gray-800"
                        >
                            {gig.title}
                        </motion.h1>

                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            <Seller
                                seller={gig.seller}
                                reviews={reviews}
                            />
                        </motion.div>

                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="rounded-xl overflow-hidden shadow-lg"
                        >
                            <Images
                                images={gig.images}
                                title={gig.title}
                                allowDelete={false}
                            />
                        </motion.div>

                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="space-y-4"
                        >
                            <h2 className="text-2xl font-semibold text-gray-800">About this gig</h2>
                            <Description
                                editable={false}
                                initialContent={gig.description}
                                gigId={gig._id}
                            />
                        </motion.div>

                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.7 }}
                            className="bg-blue-50 border border-blue-200 p-6 rounded-xl"
                        >
                            <div className="flex items-center space-x-3 mb-3">
                                <Info className="w-5 h-5 text-blue-600" />
                                <h4 className="font-semibold text-blue-800">Delivery preferences</h4>
                            </div>
                            <p className="text-blue-700">
                                Please communicate any preferences or concerns regarding the utilization of AI tools in the fulfillment and/or delivery of your request.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.8 }}
                        >
                            <SellerDetails
                                seller={gig.seller}
                                reviews={reviews}
                                lastFulFilmentTime={gig.lastFulfilment?.fulfilmentTime}
                                languages={gig.seller.languages}
                            />
                        </motion.div>

                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.9 }}
                            className="space-y-8"
                        >
                            <Reviews reviews={reviewsFull} />
                            <AddReview
                                gigId={gig._id}
                                sellerId={gig.seller._id}
                            />
                        </motion.div>
                    </motion.div>

                    {/* Sidebar */}
                    <motion.div
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="lg:w-[400px]"
                    >
                        <div className="sticky top-4">
                            <Offers
                                offers={offers}
                                sellerId={gig.seller._id}
                                editUrl={editUrl}
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

export default GigPage;