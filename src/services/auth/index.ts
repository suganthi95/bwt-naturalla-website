import { login, signup, verifyAccount } from "@/lib/api"
import { useMutation } from "@tanstack/react-query"

export const useSignup = ()=>{
    return useMutation({
        mutationKey:['signup'],
        mutationFn:(args:{first_name:string,last_name:string,phone_no:number,email:string,password:string})=>signup(args.first_name,args.last_name,args.phone_no,args.email,args.password)

    })
}

export const useLogin = ()=>{
    return useMutation({
        mutationKey:['login'],
        mutationFn:(args:{phone_no:number, login_through:string , email?:string,password ?:string})=>login(args.phone_no ,args.login_through,args.email, args.password)
    })
}

export const useVerifyAccount = ()=>{
    return useMutation({
        mutationKey:['verifyaccount'],
        mutationFn:(args:{otp:number,phone_no:number,signup:boolean})=>verifyAccount(args.otp,args.phone_no,args.signup)
    })
}