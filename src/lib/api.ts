import { api } from "./axiosInstance"

export const landingPageDetails = async()=>{
const response = await api.get('v1/product/deals-sellings')
return response.data
}

export const productDetailById = async(id:string)=>{
    const response = await api.get(`v1/product/detail/${id}`)
    return response.data
}

export const pincodeEnquiry = async(pincode:string)=>{
    const response = await api.get(`v1/order/check/delivery/${pincode}`)
    return response.data
}

export const addToCart = async(product_id:number,quantity:number)=>{
    const response =  await api.post('v1/cart',{product_id,quantity})
    return response.data

}