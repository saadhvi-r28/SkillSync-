"use client";
import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Images } from "@/components/images"
import Link from "next/link"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface MyGigsListProps {
    sellerUsername: string
}

export const MyGigsList = ({
    sellerUsername
}: MyGigsListProps) => {
    const gigs = useQuery(api.gigs.getGigsWithImages, { sellerUsername: sellerUsername });
    if (gigs === undefined) {
        return <div>Loading...</div>
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full p-4"
        >
            <Carousel 
                opts={{
                    align: "start",
                    loop: true,
                    dragFree: true,
                }} 
                className="w-full"
            >
                <CarouselContent className="-ml-4">
                    {gigs.map((gig, index) => (
                        <CarouselItem 
                            key={gig._id} 
                            className={cn(
                                "pl-4 basis-1/3",
                                "transition-all duration-300",
                                "hover:scale-[1.02]"
                            )}
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Link href={`/${sellerUsername}/${gig._id}`}>
                                    <Card className="overflow-hidden border-2 hover:border-primary transition-colors duration-300">
                                        <CardContent className="p-0">
                                            <Images
                                                images={gig.images}
                                                title={gig.title}
                                                allowDelete={false}
                                            />
                                            <div className="p-4">
                                                <h3 className="font-semibold text-lg truncate">{gig.title}</h3>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            </motion.div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="left-2" />
                <CarouselNext className="right-2" />
            </Carousel>
        </motion.div>
    )
}