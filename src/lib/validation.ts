import z from'zod'

 export const jobFilterZodSchema=z.object({
    search:z.string().optional(),
    jobtype:z.string().optional(),
    location:z.string().optional(),
    remote:z.coerce.boolean().optional()
})

export type jobFilterSchema=z.infer<typeof jobFilterZodSchema>