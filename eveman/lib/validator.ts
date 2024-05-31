import { z } from "zod"
import Category from "./database/models/category.model"

export const eventFormSchema = z.object({
    title: z.string().min(3, {
      message: "Username must be at least 3 characters.",
    }),
    description: z.string().min(2, {
        message: "Username must be at least 2 characters.",
      }).max(400,"description must be less than 400 char"),
    location: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }).max(400,"description must be less than 400 char"),
    imageUrl : z.string(),
    startDateTime: z.date(),
    endDateTime: z.date(),
    categoryId : z.string(),
    price: z.string(),
    isFree: z.boolean(),
    url: z.string().url()
  })