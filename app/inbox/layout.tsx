"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Sidebar } from "./components/sidebar";
import ConversationList from "./components/sidebar/conversation-list";
import Navbar from "../(dashboard)/components/navbar";
import { motion } from "framer-motion";

export default function ConversationsLayout({
    children
}: {
    children: React.ReactNode,
}) {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="fixed z-10 w-full bg-white/80 backdrop-blur-sm border-b">
                <Navbar />
            </div>
            
            <div className="pt-[88px] flex h-[calc(100vh-88px)]">
                {/* Sidebar */}
                <motion.div
                    initial={{ x: -300, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="hidden lg:block w-[350px] border-r bg-white"
                >
                    <Sidebar>
                        <div className="h-full overflow-y-auto">
                            <ConversationList />
                        </div>
                    </Sidebar>
                </motion.div>

                {/* Main Content */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex-1 overflow-y-auto"
                >
                    {children}
                </motion.div>
            </div>
        </div>
    );
}