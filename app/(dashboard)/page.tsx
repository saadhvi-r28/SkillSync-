"use client";

import { useConvexAuth, useMutation } from "convex/react";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import { GigList } from "./components/gig-list";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { env } from "process";
import { AnimatedContainer } from "@/components/ui/animated-container";
import { AnimatedCard, FeatureCard, StatCard } from "@/components/ui/animated-card";
import { AnimatedButton, IconButton } from "@/components/ui/animated-button";
import ChatBot from "./components/ChatBot";

interface DashboardProps {
    searchParams: {
        search?: string;
        favorites?: string;
        filter?: string;
    };
}

const Dashboard = ({
    searchParams
}: DashboardProps) => {
    return (
        <AnimatedContainer animation="fade" className="min-h-screen">
            <div className="container mx-auto px-4 py-8">
                <GigList query={searchParams} />
            </div>
            <ChatBot />
        </AnimatedContainer>
    );
};

export default Dashboard;