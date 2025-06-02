'use client';

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { MdOutlineGroupAdd } from 'react-icons/md';
import clsx from "clsx";
import ConversationBox from "./conversation-box";
import { Doc } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { GenericId } from "convex/values";
// import { find, uniq } from 'lodash';

const ConversationList = () => {
    const conversations = useQuery(api.conversations.getByUser);
    const currentUser = useQuery(api.users.getCurrentUser);

    if (conversations === undefined) {
        return <div>Loading...</div>
    }

    if (currentUser === undefined) {
        return <div>Loading...</div>
    }

    if (currentUser === null) {
        return <div>Error: Not Found</div>
    }

    const userConversations = conversations.filter((conversation: { participantOneId: GenericId<"users">; participantTwoId: GenericId<"users">; }) => {
        return conversation.participantOneId === currentUser._id || conversation.participantTwoId === currentUser._id;
    });

    return (
        <>
            <p className="text-black font-medium pl-4 py-4">All conversations</p>
            <div className="space-y-3">
                {userConversations.map((conversation: { _id: GenericId<"conversations">; _creationTime: number; participantOneId: GenericId<"users">; participantTwoId: GenericId<"users">; }) => (
                    <ConversationBox
                        key={conversation._id}
                        conversation={conversation}
                        currentUser={currentUser}
                    />
                ))}
            </div>
        </>
    );
}

export default ConversationList;