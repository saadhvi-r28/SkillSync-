import { v } from "convex/values";
import { query } from "./_generated/server";
import { Id } from "./_generated/dataModel";

export const get = query({
    args: {
        search: v.optional(v.string()),
        favorites: v.optional(v.string()),
        filter: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        const title = args.search as string;

        let gigs = [];

        if (title) {
            gigs = await ctx.db
                .query("gigs")
                .withSearchIndex("search_title", (q) =>
                    q
                        .search("title", title)
                )
                .collect();
        } else {
            gigs = await ctx.db
                .query("gigs")
                .withIndex("by_published", (q) => q.eq("published", true))
                .order("desc")
                .collect();
        }

        // check if there is filter
        if (args.filter !== undefined) {
            const filter = args.filter as string;
            // get subcategory by name
            const subcategory = await ctx.db
                .query("subcategories")
                .withIndex("by_name", (q) => q.eq("name", filter))
                .unique();

            const filteredGigs = gigs.filter((gig) => gig.subcategoryId === subcategory?._id);
            gigs = filteredGigs;
        }

        let gigsWithFavoriteRelation = gigs;

        if (identity !== null) {
            gigsWithFavoriteRelation = await Promise.all(gigs.map((gig) => {
                return ctx.db
                    .query("userFavorites")
                    .withIndex("by_user_gig", (q) =>
                        q
                            .eq("userId", gig.sellerId)
                            .eq("gigId", gig._id)
                    )
                    .unique()
                    .then((favorite) => {
                        console.log("favorite: ", favorite);
                        return {
                            ...gig,
                            favorited: !!favorite,
                        };
                    });
            }));
        }

        //const gigsWithFavorite = await Promise.all(gigsWithFavoriteRelation);


        const gigsWithImages = await Promise.all(gigsWithFavoriteRelation.map(async (gig) => {
            const image = await ctx.db
                .query("gigMedia")
                .withIndex("by_gigId", (q) => q.eq("gigId", gig._id))
                .first();

            const seller = await ctx.db.query("users")
                .filter((q) => q.eq(q.field("_id"), gig.sellerId))
                .unique();

            if (!seller) {
                throw new Error("Seller not found");
            }

            const reviews = await ctx.db.query("reviews")
                .withIndex("by_gigId", (q) => q.eq("gigId", gig._id))
                .collect();

            const offer = await ctx.db.query("offers")
                .withIndex("by_gigId", (q) => q.eq("gigId", gig._id))
                .first();

            return {
                ...gig,
                storageId: image?.storageId,
                seller,
                reviews,
                offer
            };
        }));

        return gigsWithImages;
    },
});


export const getBySellerName = query({
    args: {
        sellerName: v.string(),
    },
    handler: async (ctx, args) => {
        const user = await ctx.db
            .query("users")
            .withIndex("by_username", (q) => q.eq("username", args.sellerName))
            .unique();

        if (!user) {
            return null;
        }

        const gigs = await ctx.db
            .query("gigs")
            .withIndex("by_sellerId", (q) => q.eq("sellerId", user._id))
            .collect();

        return gigs;
    },
});


export const getGigsWithImages = query({
    args: { sellerUsername: v.string() },
    handler: async (ctx, args) => {

        const seller = await ctx.db.query("users")
            .withIndex("by_username", (q) => q.eq("username", args.sellerUsername))
            .unique();

        if (seller === null) {
            throw new Error("Seller not found");
        }

        const gigs = await ctx.db.query("gigs")
            .withIndex("by_sellerId", (q) => q.eq("sellerId", seller._id))
            .collect();

        if (gigs === null) {
            throw new Error("Gigs not found");
        }

        const gigsWithImages = await Promise.all(gigs.map(async (gig) => {

            // get images
            const images = await ctx.db.query("gigMedia")
                .withIndex("by_gigId", (q) => q.eq("gigId", gig._id))
                .collect();

            const imagesWithUrls = await Promise.all(images.map(async (image) => {
                const imageUrl = await ctx.storage.getUrl(image.storageId);
                if (!imageUrl) {
                    throw new Error("Image not found");
                }
                return { ...image, url: imageUrl };
            }));

            const gigWithImages = {
                ...gig,
                images: imagesWithUrls,
            };

            return gigWithImages;
        }));

        return gigsWithImages;
    },
});



export const getGigsWithOrderAmountAndRevenue = query({
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Unauthorized");
        }

        const user = await ctx.db
            .query("users")
            .withIndex("by_token", (q) =>
                q.eq("tokenIdentifier", identity.tokenIdentifier)
            )
            .unique();

        if (!user) {
            throw new Error("Couldn't authenticate user");
        }

        const gigs = await ctx.db
            .query("gigs")
            .withIndex("by_sellerId", (q) => q.eq("sellerId", user._id))
            .order("desc")
            .collect();

        const gigsWithOrderAmount = await Promise.all(
            gigs.map(async (gig) => {
                const orders = await ctx.db
                    .query("orders")
                    .withIndex("by_gigId", (q) => q.eq("gigId", gig._id))
                    .collect();

                const orderAmount = orders.length;

                return {
                    ...gig,
                    orderAmount,
                };
            })
        );

        const gigsWithOrderAmountAndRevenue = await Promise.all(
            gigsWithOrderAmount.map(async (gig) => {
                const offers = await ctx.db
                    .query("offers")
                    .withIndex("by_gigId", (q) => q.eq("gigId", gig._id))
                    .collect();

                const totalRevenue = offers.reduce((acc, offer) => acc + offer.price, 0);

                return {
                    ...gig,
                    totalRevenue,
                };
            })
        );

        // get images
        const gigsFull = await Promise.all(gigsWithOrderAmountAndRevenue.map(async (gig) => {
            const image = await ctx.db
                .query("gigMedia")
                .withIndex("by_gigId", (q) => q.eq("gigId", gig._id))
                .first();

            if (image) {
                const url = await ctx.storage.getUrl(image.storageId);
                return {
                    ...gig,
                    ImageUrl: url
                };
            }
            return {
                ...gig,
                ImageUrl: null
            };
        }));




        return gigsFull
    },
});

export const getAllGigsForAgent = query({
    handler: async (ctx) => {
        // Get all published gigs
        const gigs = await ctx.db
            .query("gigs")
            .withIndex("by_published", (q) => q.eq("published", true))
            .collect();

        // Preload all subcategories
        const subcategories = await ctx.db.query("subcategories").collect();
        const subcategoryMap = Object.fromEntries(
            subcategories.map((s) => [s._id, s.name])
        );

        // Preload all users
        const users = await ctx.db.query("users").collect();
        const userMap = Object.fromEntries(
            users.map((u) => [u._id, u.username])
        );

        // For each gig, fetch reviews and offers
        const result = await Promise.all(
            gigs.map(async (gig) => {
                // Username
                const username = userMap[gig.sellerId] || "";
                // Subcategory name
                const subcategory = subcategoryMap[gig.subcategoryId] || "";

                // Reviews: get all for this gig
                const reviews = await ctx.db
                    .query("reviews")
                    .withIndex("by_gigId", (q) => q.eq("gigId", gig._id))
                    .collect();
                let avg_service = 0, avg_comm = 0, avg_recommend = 0;
                if (reviews.length > 0) {
                    avg_service = reviews.reduce((a, r) => a + r.service_as_described, 0) / reviews.length;
                    avg_comm = reviews.reduce((a, r) => a + r.communication_level, 0) / reviews.length;
                    avg_recommend = reviews.reduce((a, r) => a + r.recommend_to_a_friend, 0) / reviews.length;
                }

                // Offers: get all for this gig
                const offersArr = await ctx.db
                    .query("offers")
                    .withIndex("by_gigId", (q) => q.eq("gigId", gig._id))
                    .collect();
                const offers: Record<string, { price: number; delivery_days: number }> = {};
                for (const offer of offersArr) {
                    offers[offer.tier] = {
                        price: offer.price,
                        delivery_days: offer.delivery_days,
                    };
                }

                return {
                    username,
                    gigId: gig._id,
                    gigTitle: gig.title,
                    gigDescription: gig.description,
                    subcategory,
                    reviews: {
                        service_as_described: avg_service,
                        communication_level: avg_comm,
                        recommend_to_a_friend: avg_recommend,
                    },
                    offers,
                };
            })
        );
        return result;
    },
});