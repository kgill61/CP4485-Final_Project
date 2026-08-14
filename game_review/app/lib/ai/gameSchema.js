import { z } from "zod";
// Define how many games to suggest
export const gameCount = 5;
// Define the schema for the AI response
export const gameSchema = 
    z.object({
        recs: z.array(
            z.object({ name: z.string().min(1),
                       releaseYear: z.number().int().min(1958).max(2050),
                       why : z.string().min(10).max(255),
                       basedOn: z.array(z.string().min(1)).min(1).max(3),
                       genre: z.string().min(1)
            })
        ).length(gameCount)
    })