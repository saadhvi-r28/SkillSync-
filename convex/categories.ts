import { v } from "convex/values";
import { query } from "./_generated/server";
import { Id } from "./_generated/dataModel";
// not changing only retrieving data from db //

export const get = query({
    handler: async (ctx) => {
        const categories = await ctx.db.query("categories").collect();

        const categoriesWithSubcategoriesRelations = categories.map((category) => {      
            return ctx.db
                .query("subcategories")
                .withIndex("by_category", (q) =>
                    q
                        .eq("categoryId", category._id)
                )
                .collect() //collecting the categories and subcategories from the database //
                .then((subcategories) => {
                    return {
                        ...category,
                        subcategories: subcategories,      
                    };
                });
        });

        const categoriesWithSubcategories = await Promise.all(categoriesWithSubcategoriesRelations);

        return categoriesWithSubcategories;
    }
});