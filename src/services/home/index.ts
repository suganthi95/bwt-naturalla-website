import { landingPageDetails } from "@/lib/api"
import { useQuery } from "@tanstack/react-query"

export const useGetLandingPageDetails = ()=>{
    return useQuery({
        queryKey:['landingpageDetails'],
        queryFn:landingPageDetails,
        staleTime:1000*60*10,
        retry:1
    })
}