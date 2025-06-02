"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MessageSquare, Plus } from "lucide-react";

// import useStoreUserEffect from "@/hooks/use-store-user-effect";

const InboxPage = () => {
    // const userId = useStoreUserEffect();
    // if (userId === null) {
    //     return <div>Storing user...</div>;
    // }
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="h-full flex flex-col items-center justify-center p-8"
        >
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="relative w-[400px] h-[400px]"
            >
                <Image
                    src="/empty-inbox.svg"
                    alt="Empty Inbox"
                    fill
                    className="object-contain"
                />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-center space-y-4"
            >
                <h2 className="text-3xl font-bold text-black">
                    Welcome to your inbox!
                </h2>
                <p className="text-black/70 max-w-md">
                    Start connecting with other users by sending them a message. Your conversations will appear here.
                </p>
                <Button 
                    size="lg"
                    className="mt-4 bg-black hover:bg-black/90 text-white"
                >
                    <Plus className="w-5 h-5 mr-2" />
                    Start a New Conversation
                </Button>
            </motion.div>
        </motion.div>
    );
};

export default InboxPage;