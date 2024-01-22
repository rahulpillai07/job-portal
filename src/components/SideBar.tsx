import { jobTypes } from "@/lib/job-types";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import Select from "./ui/select";
import prisma from "@/lib/prisma";
import { Button } from "./ui/button";
import { jobFilterSchema, jobFilterZodSchema } from "@/lib/validation";
import { redirect } from "next/navigation";
import FormSubmitButton from "./FormSubmitButton";

async function filterJobs(formData: FormData) {
  "use server";
  const values=Object.fromEntries(formData.entries());
  console.log(values);
  const parseResult=jobFilterZodSchema.parse(values)
  const{search,jobtype,location,remote}=parseResult;

  const searchParams=new URLSearchParams({
    ...(search && {search:search.trim()}),
    ...(jobtype && {jobtype}),
    ...(location && {location}),
    ...(remote &&{remote:"true"})
  })

  redirect(`/?${searchParams}`);
}

interface jobFilterSideProps{
  defaultValues:jobFilterSchema
}

export default async function SideBar({defaultValues}:jobFilterSideProps) {
  const distinctLocations = await prisma.job
    .findMany({
      where: { approved: true },
      select: { location: true },
      distinct: ["location"],
    })
    .then((locations) =>
      locations.map(({ location }) => location).filter(Boolean)
    ) as string[];

  return (
    <aside className="sm:sticky top-0 h-fit rounded-lg border md:w-[260px]  ">
      <form action={filterJobs} key={JSON.stringify(defaultValues)}>
        <div className="space-y-4">
          <div className=" flex flex-col gap-2">
            <Label htmlFor="search">Search</Label>
            <Input id="search" name="search" placeholder="Title, Company, etc." defaultValue={defaultValues.search} />
          </div>
        <div className=" flex flex-col gap-2">
            <Label htmlFor="jobtype">Type</Label>
            <Select id="jobtype" name="jobtype" defaultValue={defaultValues.jobtype}>
            <option value="">All locations</option>
            {jobTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </Select>
        </div>
        <div className="flex flex-col gap-2 ">
          <Label htmlFor="location">Location</Label>
          <Select id="location" name="location"defaultValue={defaultValues.location} >
            <option value="">All locations</option>
            {distinctLocations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </Select>
        </div>
        <div className="flex items-center gap-2">
            <input
              id="remote"
              name="remote"
              type="checkbox"
              className="scale-125 accent-black" 
              defaultChecked={defaultValues.remote}
            />
            <Label htmlFor="remote">Remote jobs</Label>
          </div>
          <div>
          <FormSubmitButton className="w-full">Filter Jobs</FormSubmitButton  >
            </div>
          </div>
      </form>
    </aside>
  );
}
