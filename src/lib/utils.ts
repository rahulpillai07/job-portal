import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import {formatDistanceToNowStrict} from "date-fns"
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function currencyConvertor(salary:number){
  const INR=new Intl.NumberFormat('en-IN',{
    style:'currency',
    currency:'INR',
  })
  return INR.format(salary)
}

export function relativeData(from:Date){
  return formatDistanceToNowStrict(from,{addSuffix:true})
}