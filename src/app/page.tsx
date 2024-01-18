import Image from 'next/image'
import prisma from '@/lib/prisma'
import JobListItem from '@/components/JobListItem'
import SideBar from '@/components/SideBar'

export default async function Home(){
  const jobs=await prisma?.job.findMany({
    where:{approved:true},
    orderBy:{createdAt:"desc"}
  })

return(
  <main className='max-w-5xl m-auto my-10 px-3 space-y-10 '>
    <div className='items-center space-y-3 text-center '>
      <h1 className='text-4xl font font-extrabold tracking-tighter lg:text-5xl'>Developer Jobs</h1>
      <p  className='text-center text-muted-foreground'>find your dream job </p>
    </div>
    
    <section className='flex flex-col sm:flex-row gap-3'>
      <SideBar />
    <div className='space-y-4 grow'>
    {jobs.map(job=>(
      <JobListItem job={job} key={job.id}/>
    ))}
    </div>
    </section>
    
    
    </main>
)
}
