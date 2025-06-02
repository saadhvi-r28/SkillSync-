import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Doc, Id } from "@/convex/_generated/dataModel"
import { Content } from "./content";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface OffersProps {
    offers: Doc<"offers">[];
    sellerId: Id<"users">;
    editUrl: string;
}

export const Offers = ({
    offers,
    sellerId,
    editUrl
}: OffersProps) => {
    return (
        <div className="sticky h-fit top-4 z-[1]">
            {offers.length > 0 && (
                <Tabs defaultValue={offers[0]._id} className="w-full sm:w-[400px]">
                    <TabsList className="w-full grid grid-cols-3 gap-2 p-1 bg-gray-100 rounded-lg">
                        {offers.map((offer) => {
                            return (
                                <TabsTrigger 
                                    className={cn(
                                        "w-full transition-all duration-300 ease-in-out",
                                        "data-[state=active]:bg-white data-[state=active]:shadow-md",
                                        "data-[state=active]:text-primary data-[state=active]:font-semibold",
                                        "hover:bg-gray-50 rounded-md"
                                    )}
                                    key={offer._id} 
                                    value={offer._id}
                                >
                                    {offer.tier}
                                </TabsTrigger>
                            )
                        })}
                    </TabsList>
                    <AnimatePresence mode="wait">
                        {offers.map((offer) => {
                            return (
                                <TabsContent 
                                    key={offer._id} 
                                    value={offer._id} 
                                    className="bg-white rounded-lg shadow-lg mt-4 p-4"
                                >
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <Content
                                            offer={offer}
                                            sellerId={sellerId}
                                            editUrl={editUrl}
                                        />
                                    </motion.div>
                                </TabsContent>
                            )
                        })}
                    </AnimatePresence>
                </Tabs>
            )}
        </div>
    )
}