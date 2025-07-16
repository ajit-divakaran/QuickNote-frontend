import { commonApi } from "./commonApi"
import { serverUrl } from "./serverUrl"


export const RegisterApi = async(reqBody) =>{
    return await commonApi('POST',`${serverUrl}/register`,reqBody)
}
export const LoginApi = async(reqBody) =>{
    return await commonApi('POST',`${serverUrl}/login`,reqBody)
}
export const GetUserNotesApi = async(reqHeader) =>{
    return await commonApi('GET',`${serverUrl}/get-notes`,'',reqHeader)
}

export const EditUserNoteApi = async(reqBody,reqHeader) =>{
    return await commonApi('POST',`${serverUrl}/edit-note`,reqBody,reqHeader)
}
export const CreateUserNoteApi = async(reqBody,reqHeader) =>{
    return await commonApi('POST',`${serverUrl}/add-note`,reqBody,reqHeader)
}

export const DeleteUserNoteApi = async(noteId,reqHeader) =>{
    return await commonApi('DELETE',`${serverUrl}/delete-note/${noteId}`,{},reqHeader)
}