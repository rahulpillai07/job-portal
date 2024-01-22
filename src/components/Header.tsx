import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png"
import { Button } from "./ui/button";

export default function Header(){
    return(
        <header className="shadow-md">
            <nav className="flex items-center justify-between m-auto py-3 px-5">
                <Link href='/' className="flex justify-center items-center gap-3">
                    <Image src={logo} alt="company logo" width={60} height={60}/>
                    <span className="font-bold tracking-tighter">Flow Jobs</span>
                </Link>
                <Button asChild >
                    <Link href='/jobs/new'>Post</Link>
                </Button>
            </nav>
        </header>
    )
}