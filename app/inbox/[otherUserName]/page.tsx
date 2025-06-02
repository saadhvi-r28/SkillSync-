
"use client";

import { Input } from "@/components/ui/input";

import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

;
import { useCallback, useEffect, useState } from "react";
import { Doc } from "@/convex/_generated/dataModel";
import Form from "./components/form";
import Body from "./components/body";

interface FormProps {
    params: { otherUserName: string };
}

const ConversationPage = ({
    params,
}: FormProps) => {
    const [conversation, setConversation] = useState<Doc<"conversations"> | null>(null);

    const get = useMutation(api.conversations.getOrCreateConversation);
    const conv = useQuery(api.conversations.getConversation, { username: params.otherUserName });
    useEffect(() => {
        const callMutation = async () => {
            try {
                const result = await get({ otherUsername: params.otherUserName });
                setConversation(result.conversation);
            } catch (error) {
                console.error('Mutation failed:', error);
            }
        };

        callMutation();
    }, [get, params.otherUserName]);

    if (conversation === null || conv === undefined || conv === undefined) {

        return <div className="text-center text-muted-foreground text-3xl font-semibold p-4 animation-pulse">Loading...This is the problem</div>
    }
    console.log(conversation);
    return (
          <div className="h-full">
            <div className="h-full flex flex-col">
                <Body messages={conv.messagesWithUsers} />
                <Form
                    userId={conversation.participantOneId}
                    conversationId={conversation._id} />
            </div>*/
        </div>
    );
};
export default ConversationPage;
