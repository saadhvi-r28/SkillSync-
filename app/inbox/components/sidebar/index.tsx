"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MessageSquare, Plus } from "lucide-react";
import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

const font = Poppins({
    subsets: ["latin"],
    weight: ["600"],
})

interface SidebarProps {
    children: React.ReactNode;
}

export const Sidebar = ({
    children
}: SidebarProps) => {
    return (
        <div className="h-full flex flex-col">
            {/* Header */}
            <div className="p-4 border-b">
                <Link href="/">
                    <motion.div 
                        whileHover={{ scale: 1.02 }}
                        className="flex items-center gap-x-3"
                    >
                        <Image
                            src="/logo.svg"
                            alt="Logo"
                            height={40}
                            width={40}
                            className="rounded-lg"
                        />
                        <span className={cn(
                            "font-semibold text-xl text-black",
                            font.className,
                        )}>
                            SkillSync
                        </span>
                    </motion.div>
                </Link>
            </div>

            {/* New Message Button */}
            <div className="p-4">
                <Button 
                    className="w-full bg-black hover:bg-black/90 text-white"
                    size="lg"
                >
                    <Plus className="w-5 h-5 mr-2" />
                    New Message
                </Button>
            </div>

            {/* Conversations */}
            <div className="flex-1 overflow-y-auto">
                {children}
            </div>
        </div>
    );
};
