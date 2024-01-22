import Image from "next/image";
import prisma from "@/lib/prisma";
import JobListItem from "@/components/JobListItem";
import SideBar from "@/components/SideBar";
import JobResults from "@/components/JobResults";
import { jobFilterSchema } from "@/lib/validation";
import { Prisma } from "@prisma/client";
import { X } from "lucide-react";
import { Metadata } from "next";

interface SearchParamProps {
  searchParams: {
    search?: string;
    jobtype?: string;
    location?: string;
    remote?: string;
  };
}
function getTitle({ search, jobtype, location, remote }: jobFilterSchema) {
  const titlePrefix = search
    ? `${search} jobs`
    : jobtype
      ? `${jobtype} developer job`
      : remote
        ? "Remote developer jobs"
        : "All developer jobs";

  const titleSuffix = location ? `in ${location}` : "";
  return `${titlePrefix} ${titleSuffix}`;
}


export function generateMetadata({
  searchParams: { search, jobtype, location, remote },
}: SearchParamProps): Metadata {
  return {
    title: `${getTitle({
      search,
      jobtype,
      location,
      remote:remote==='true'?true:false,
    })} | Flow Jobs`,
  };
}

// in nextjs our page component can recieve a component called searchParam which can access the url
export default async function Home({
  searchParams: { search, jobtype, location, remote },
}: SearchParamProps) {
  const filterValues: jobFilterSchema = {
    search,
    jobtype,
    location,
    remote: remote === "true",
  };
  // for example in the search i write fullstack apple so there are chances that particular role is not there so i will display the result of both

  const jobs = await prisma?.job.findMany({
    where: { approved: true },
    orderBy: { createdAt: "desc" },
  });



  return (
    <main className="m-auto my-10 max-w-5xl space-y-10 px-3 ">
      <div className="items-center space-y-3 text-center ">
        <h1 className="font text-4xl font-extrabold tracking-tighter lg:text-5xl">
          {getTitle(filterValues)}
        </h1>
        <p className="text-center text-muted-foreground">
          find your dream job{" "}
        </p>
      </div>

      <section className="flex flex-col gap-3 sm:flex-row">
        <SideBar defaultValues={filterValues} />
        <JobResults filterValues={filterValues} />
      </section>
    </main>
  );
}
