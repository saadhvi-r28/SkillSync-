import React from 'react';
import { ReviewFullType } from '@/types';
import { Separator } from '@/components/ui/separator';
import { ReviewBox } from './review-box';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ReviewsProps {
    reviews: ReviewFullType[];
}

export const Reviews = ({ reviews }: ReviewsProps) => {
    // Calculate average scores for all reviews
    const starDistribution = Array(5).fill(0); // Initialize array for star distribution, 5 levels (1-5)
    const averageScore = reviews.reduce((total, review) => {
        const average = (review.communication_level + review.recommend_to_a_friend + review.service_as_described) / 3;
        const roundedAverage = Math.round(average);
        starDistribution[5 - roundedAverage]++; // Count the number of reviews for each star level
        return total + average;
    }, 0) / reviews.length;

    // Calculate the maximum number of reviews for any star level to set relative progress bar maximum
    const maxReviews = Math.max(...starDistribution);

    // Calculate rating breakdown values dynamically
    const ratingBreakdown = {
        'Seller communication level': calculateAverage(reviews.map(review => review.communication_level)),
        'Recommend to a friend': calculateAverage(reviews.map(review => review.recommend_to_a_friend)),
        'Service as described': calculateAverage(reviews.map(review => review.service_as_described))
    };

    function calculateAverage(values: number[]): number {
        if (values.length === 0) return 0;
        const sum = values.reduce((total, value) => total + value, 0);
        return sum / values.length;
    }

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
        >
            <AnimatePresence mode="wait">
                {reviews.map((review, index) => (
                    <motion.div
                        key={review._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ 
                            duration: 0.3,
                            delay: index * 0.1 
                        }}
                        className={cn(
                            "transform transition-all duration-300",
                            "hover:scale-[1.01] hover:shadow-lg",
                            "rounded-lg p-4"
                        )}
                    >
                        <ReviewBox review={review} />
                        {index < reviews.length - 1 && (
                            <motion.div
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ delay: 0.2 }}
                            >
                                <Separator className="my-4" />
                            </motion.div>
                        )}
                    </motion.div>
                ))}
            </AnimatePresence>
        </motion.div>
    );
};