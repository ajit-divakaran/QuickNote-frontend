import { commonApi } from "./commonApi"
import { serverUrl } from "./serverUrl"


export const RegisterApi = async(reqBody) =>{
    return await commonApi('POST',`${serverUrl}/register`,reqBody)
}
export const LoginApi = async(reqBody) =>{
    return await commonApi('POST',`${serverUrl}/login`,reqBody)
}