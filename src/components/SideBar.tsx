import { jobTypes } from "@/lib/job-types";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import Select from "./ui/select";
import prisma from "@/lib/prisma";

async function filterJobs(formData: FormData) {
  "use server";
  return;
}

export default async function SideBar() {
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
    <aside className="sticky top-0 h-fit rounded-lg border md:w-[260px]">
      <form action={filterJobs}>
        <div className="space-y-4">
          <div className="my-2 flex flex-col items-center gap-1 space-y-2">
            <Label htmlFor="search">Search</Label>
            <Input id="search" name="search" placeholder="Title, Company, etc." />
          </div>
        </div>
        <div className="my-2 flex flex-col items-center gap-1 space-y-2">
            <Label htmlFor="job-type">Type</Label>
            <Select id="location" name="location" defaultValue="">
            <option value="">All locations</option>
            {jobTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </Select>
        </div>
        <div className="flex flex-col gap-2 items-center">
          <Label htmlFor="location">Location</Label>
          <Select id="location" name="location" defaultValue="">
            <option value="">All locations</option>
            {distinctLocations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </Select>
        </div>
      </form>
    </aside>
  );
}
