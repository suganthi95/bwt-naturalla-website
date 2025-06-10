import { api } from "./axiosInstance"

export const landingPageDetails = async()=>{
const response = await api.get('v1/product/deals-sellings')
return response.data
}