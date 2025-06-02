"use client";

import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { formatDistanceToNow } from "date-fns";
import { MoreHorizontal } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Footer } from "./footer";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { useQuery } from "convex/react";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { Overlay } from "./overlay";
import { ConvexImage } from "@/components/convex-images";
import { Actions } from "@/components/actions";
import { motion } from "framer-motion";
import { cardHover } from "@/lib/theme";

interface GigCardProps {
  id: string;
  sellerId: string;
  title: string;
  description: string;
  createdAt: number;
  isFavorite: boolean;
  storageId?: Id<"_storage">;
  offer: Doc<"offers">;
  reviews: Doc<"reviews">[];
}

export const GigCard = ({
  id,
  sellerId,
  title,
  description,
  createdAt,
  isFavorite,
  storageId,
  offer,
  reviews,
}: GigCardProps) => {
  const { userId } = useAuth();
  const seller = useQuery(api.gig.getSeller, { id: sellerId as Id<"users"> });
  const createdAtLabel = formatDistanceToNow(createdAt, { addSuffix: true });

  const { mutate: favorite, pending: favoritePending } = useApiMutation(api.gig.favorite);
  const { mutate: unfavorite, pending: unfavoritePending } = useApiMutation(api.gig.unfavorite);

  const toggleFavorite = () => {
    if (isFavorite) {
      unfavorite({ id });
    } else {
      favorite({ id });
    }
  };

  if (seller === undefined) {
    return <GigCard.Skeleton />;
  }

  if (seller === null) {
    return <div>Seller not found</div>;
  }

  return (
    <Link href={`/${seller?.username}/${id}`}>
      <motion.div
        whileHover={cardHover}
        className="group w-full border rounded-lg flex flex-col justify-between overflow-hidden bg-white shadow-sm hover:shadow-md transition-all duration-200"
      >
        <div className="relative flex-0.33 bg-blue-50">
          <ConvexImage storageId={storageId} title={title} />
          <Overlay />
          <Actions id={id} title={title} side="right">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="absolute top-1 right-1 opacity-25 group-hover:opacity-100 transition-opacity px-3 py-2 outline-none"
            >
              <MoreHorizontal className="text-black opacity-75 hover:opacity-100 transition-opacity" />
            </motion.button>
          </Actions>
        </div>
        <Footer
          isFavorite={isFavorite}
          title={title}
          ownerLabel={seller.fullName}
          createdAtLabel={createdAtLabel}
          onClick={toggleFavorite}
          disabled={favoritePending || unfavoritePending}
          offer={offer}
          reviews={reviews}
          seller={seller}
        />
      </motion.div>
    </Link>
  );
};

GigCard.Skeleton = function GigCardSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full rounded-lg overflow-hidden"
    >
      <Skeleton className="h-full w-full" />
    </motion.div>
  );
};

// Wrapper to render multiple gig cards in a responsive grid layout
export const GigCardGrid = ({ gigCards }: { gigCards: GigCardProps[] }) => {
  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1
          }
        }
      }}
      initial="hidden"
      animate="show"
    >
      {gigCards.map((gigCard) => (
        <motion.div
          key={gigCard.id}
          variants={{
            hidden: { opacity: 0, y: 20 },
            show: { opacity: 1, y: 0 }
          }}
        >
          <GigCard {...gigCard} />
        </motion.div>
      ))}
    </motion.div>
  );
};
