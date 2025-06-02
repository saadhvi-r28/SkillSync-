import { Loading } from "@/components/auth/loading"
import { Button } from "@/components/ui/button"
import { api } from "@/convex/_generated/api"
import { Doc, Id } from "@/convex/_generated/dataModel"
import { useAction, useQuery } from "convex/react"
import { Clock, RefreshCcw, MessageCircle, Edit } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface OffersProps {
    offer: Doc<"offers">
    sellerId: Id<"users">
    editUrl: string
}

export const Content = ({
    offer,
    sellerId,
    editUrl
}: OffersProps) => {
    const orderNow = useAction(api.stripe.pay);
    const router = useRouter();
    const currentUser = useQuery(api.users.getCurrentUser);
    const seller = useQuery(api.users.get, { id: sellerId });

    if (currentUser === undefined || seller === undefined) return <Loading />;

    if (seller === null) return <div>Not found</div>;

    const handleOrderNow = async () => {
        try {
            const url = await orderNow({ priceId: offer.stripePriceId, title: offer.title, sellerId });
            if (!url) throw new Error("Error: Stripe session error.");
            router.push(url);
        } catch (error: any) {
            toast.error(error.message);
        }
    }

    const handleSendMessage = () => {
        router.push(`/inbox/${seller.username}`);
    }

    const revisionText = offer.revisions === 1 ? "Revision" : "Revisions";
    
    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6 bg-white"
        >
            <div className="flex pb-4 font-bold items-center border-b border-gray-100">
                <h1 className="text-xl">{offer.title}</h1>
                <p className="ml-auto text-3xl text-primary">${offer.price}</p>
            </div>
            
            <p className="text-gray-600 leading-relaxed">{offer.description}</p>
            
            <div className="flex flex-col font-medium text-zinc-700 space-y-3 bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-primary" />
                    <p>{offer.delivery_days} Days Delivery</p>
                </div>
                <div className="flex items-center space-x-3">
                    <RefreshCcw className="w-5 h-5 text-primary" />
                    <p>{offer.revisions} {revisionText}</p>
                </div>
            </div>

            <div className="space-y-3 pt-2">
                {(currentUser?._id !== sellerId) && (
                    <>
                        <Button 
                            className={cn(
                                "w-full h-12 text-lg font-semibold",
                                "bg-primary hover:bg-primary/90",
                                "transition-all duration-300",
                                "transform hover:scale-[1.02] active:scale-[0.98]"
                            )} 
                            onClick={handleOrderNow}
                        >
                            Order Now
                        </Button>
                        <Button 
                            className={cn(
                                "w-full h-12 text-lg",
                                "border-2 border-primary text-primary",
                                "hover:bg-primary/10",
                                "transition-all duration-300",
                                "transform hover:scale-[1.02] active:scale-[0.98]"
                            )}
                            onClick={handleSendMessage} 
                            variant="outline"
                        >
                            <MessageCircle className="w-5 h-5 mr-2" />
                            Send Message
                        </Button>
                    </>
                )}
                {(currentUser?._id === sellerId) && (
                    <Button 
                        className={cn(
                            "w-full h-12 text-lg",
                            "bg-gray-100 hover:bg-gray-200 text-gray-700",
                            "transition-all duration-300",
                            "transform hover:scale-[1.02] active:scale-[0.98]"
                        )}
                    >
                        <Link href={editUrl} className="flex items-center justify-center w-full">
                            <Edit className="w-5 h-5 mr-2" />
                            Edit Offer
                        </Link>
                    </Button>
                )}
            </div>
        </motion.div>
    )
}
