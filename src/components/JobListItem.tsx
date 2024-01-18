import { Job } from "@prisma/client";
import Image from "next/image";
import { Banknote, Briefcase, Clock, Globe2, MapPin } from "lucide-react";
import companyLogoPlaceHolder from "@/assets/company-logo-placeholder.png";
import { currencyConvertor, relativeData } from "@/lib/utils";
interface jobItemProps {
  job: Job;
}

export default function JobListItem({
  job: {
    title,
    companyName,
    type,
    locationType,
    location,
    salary,
    companyLogoUrl,
    createdAt,
  },
}: jobItemProps) {
  return (
    <article className="flex gap-3 rounded-lg border p-5 hover:cursor-pointer hover:bg-muted/60">
      <Image
        src={companyLogoUrl || companyLogoPlaceHolder}
        alt={`${companyName} logo`}
        width={100}
        height={100}
        className="self-center rounded-lg"
      />
      <div className="flex-grow space-y-3">
        <div>
          <h2 className="text-xl font-medium">{title}</h2>
          <p className="text-muted-foreground">{companyName}</p>
        </div>
        <div className="text-muted-foreground">
          <p className="flex items-center gap-1.5 sm:hidden">
            <Briefcase size={16} className="shrink-0" />
            {type}
          </p>
          <p className="flex items-center gap-1.5">
            <MapPin size={16} className="shrink-0" />
            {locationType}
          </p>
          <p className="flex items-center gap-1.5">
            <Globe2 size={16} className="shrink-0" />
            {location || "WORLDWIDE"}
          </p>
          <p className="flex items-center gap-1.5">
            <Banknote size={16} className="shrink-0" />
            {currencyConvertor(salary)}
          </p>
          <p className="flex items-center gap-1.5 sm:hidden ">
            <Clock size={16} className="shrink-0" />
            {relativeData(createdAt)}
          </p>
        </div>
      </div>
      <div className="hidden sm:flex flex-col shrink-0 items-end justify-between ">
        <p className="text-muted-foreground flex gap-1 items-center border rounded-md bg-muted/50 py-2 px-1 ">
            {type}
        </p>
        <p className="text-muted-foreground flex gap-1 items-center ">
        <Clock size={16} className="shrink-0" />
            {relativeData(createdAt)}
        </p>
      </div>
    </article>
    
  );
}
