import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { MapPin, MessageCircle, Star } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProfileCardProps {
    seller: Doc<"users">;
    reviews: Doc<"reviews">[];
}

export const ProfileCard = ({
    seller,
    reviews
}: ProfileCardProps) => {
    const languages = useQuery(api.users.getLanguagesByUsername, { username: seller.username });
    const country = useQuery(api.users.getCountryByUsername, { username: seller.username });

    if (languages === undefined || country === undefined) {
        return <div>Loading...</div>
    }

    const languagesString = languages.map((language) => language.language).join(", ");

    const averageReview = reviews.reduce((acc, review) => {
        return acc + review.communication_level + review.recommend_to_a_friend + review.service_as_described;
    }, 0) / reviews.length;

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex space-x-4 p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
            <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
            >
                <Avatar className="w-36 h-36 border-4 border-primary/10">
                    <AvatarImage src={seller.profileImageUrl || "https://github.com/shadcn.png"} />
                    <AvatarFallback className="text-2xl">{seller.username.charAt(0)}</AvatarFallback>
                </Avatar>
            </motion.div>
            
            <div className="w-[300px] flex flex-col justify-between gap-y-2">
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center space-x-3"
                >
                    <p className="font-bold text-2xl bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                        {seller.fullName}
                    </p>
                    <p className="text-md text-gray-500">@{seller.username}</p>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex items-center gap-x-2"
                >
                    <Star className="w-5 h-5 text-yellow-400" />
                    <p className="font-semibold">{reviews.length}</p>
                    (<p className="underline text-primary">{averageReview.toFixed(1) || 0}</p>)
                    <motion.div 
                        whileHover={{ scale: 1.05 }}
                        className="bg-yellow-100 text-red-900 font-semibold px-3 py-1 rounded-full ml-3"
                    >
                        {seller.customTag}
                    </motion.div>
                </motion.div>

                <motion.p 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-gray-600"
                >
                    {seller.title}
                </motion.p>

                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex text-md font-semibold items-center gap-x-4"
                >
                    <motion.div 
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center gap-x-2 bg-gray-50 px-3 py-1 rounded-full"
                    >
                        <MessageCircle className="w-5 h-5 text-primary" />
                        <p>{languagesString}</p>
                    </motion.div>
                    <motion.div 
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center gap-x-2 bg-gray-50 px-3 py-1 rounded-full"
                    >
                        <MapPin className="w-5 h-5 text-primary" />
                        <p>{country.countryName}</p>
                    </motion.div>
                </motion.div>
            </div>
        </motion.div>
    )
}
