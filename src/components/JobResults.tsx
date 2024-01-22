import { jobFilterSchema } from "@/lib/validation";
import JobListItem from "./JobListItem";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

interface JobResultProps {
  filterValues: jobFilterSchema;
}

export default async function JobResults({
  filterValues: { search, jobtype, location, remote },
}: JobResultProps) {
  const searchString = search
    ?.split(" ")
    .filter((word) => word.length > 0)
    .join(" & ");
  const searchFilter: Prisma.JobWhereInput = searchString
    ? {
        OR: [
          { title: { search: searchString } },
          { companyName: { search: searchString } },
          { location: { search: searchString } },
          { locationType: { search: searchString } },
          { type: { search: searchString } },
        ],
      }
    : {};

    console.log(searchFilter)

  const where: Prisma.JobWhereInput = {
    AND: [
      searchFilter,
      jobtype ? { type: jobtype } : {}, // Corrected this line
      location ? { location: location } : {},
      remote ? { locationType: "Remote" } : {},
      { approved: true },
    ],
  };

  const jobs = await prisma.job.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="grow space-y-4">
      {jobs.map((job) => (
        <JobListItem job={job} key={job.id} />
      ))}
      {jobs.length===0 && (
        <p className="m-auto text-center">No matching results found.Try adjusting your search filters</p>
      )}
    </div>
  );
}
