import { v } from "convex/values";
import { query } from "./_generated/server";

export const getByUser = query({
    args: {
        username: v.string(),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Unauthorized");
        }
       console.log("Fetching skills for user:", args.username);
        const user = await ctx.db
            .query("users")
            .withIndex("by_username", (q) => q.eq("username", args.username))
            .first();
        console.log("Searching for username:", args.username);    

       if (!user) {
            

            throw new Error("User not found");
        }

        const skills = await ctx.db
            .query("skills")
            .withIndex("by_userId", (q) => q.eq("userId", user._id))
            .collect();
      
        return skills;
    },
});