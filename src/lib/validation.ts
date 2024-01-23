import z from'zod'
import { jobTypes, locationTypes } from './job-types';
const requiredString=z.string().min(1,"Required");

const companyLogoSchema=z.custom<File|undefined>().refine(
    file=>!file || (file instanceof File && file.type.startsWith("image/"),
    "Must be an image file"
    )
).refine(file=>{
    return !file || file.size<1024 *1024 *2,
    "File must be less than 2MBso "
})

const applicationSchema=z.object({
    // since application email is optional but email wll not let us pass us empty string 
    applicationEmail:z.string().max(100).email().optional().or(z.literal("")),
    applicationUrl:z.string().max(100).url().optional().or(z.literal("")),
})
.refine(data=>{
    data.applicationEmail||data.applicationUrl,{
        message:"Email or URl is required ",
        path:["applicationEmail"]
    }
})

const locationSchema=z.object({
    locationType:requiredString.refine(
        val=>locationTypes.includes(val),
        "invalid location type"
    ),
    location:z.string().max(100).optional()
})
.refine(
    data=>!data.locationType || data.locationType==='Remote' || data.location,{
        message:"Location is rewuired for on-site jobs",
        path:["location"]
    }
)


 export const jobFilterZodSchema=z.object({
    search:z.string().optional(),
    jobtype:z.string().optional(),
    location:z.string().optional(),
    remote:z.coerce.boolean().optional()
})

export type jobFilterSchema=z.infer<typeof jobFilterZodSchema>

export const addJobPostZodSchema=z.object({
    title:requiredString.max(100),
    type:requiredString.refine(
        val=>jobTypes.includes(val),
        "Invalid Job Type"
    ),
    companyName:requiredString.max(100),
    companyLogo:companyLogoSchema,
    salary:z.number(),
})
.and(applicationSchema)
.and(locationSchema)










// id               Int      @id @default(autoincrement())
// slug             String   @unique
// title            String
// type             String
// locationType     String
// location         String?
// description      String?
// salary           Int
// companyName      String
// applicationEmail String?
// applicationUrl   String?
// companyLogoUrl   String?
// approved  