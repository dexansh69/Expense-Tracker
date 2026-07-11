import axios from "axios"
import { API } from "./API";

interface signupData{
    email : string,
    username : string,
    password : string
}


export async function signupApi(data : signupData){

    try{
        
        const result =await API.post(`/api/auth/signup`,data)
        return result.data;

        
    }catch(error){
            if(axios.isAxiosError(error)){
                 throw new Error(error.response?.data?.message ?? error.message);
            }
            throw new Error("something went wrong")
    }
}
interface LoginData {
  username: string;
  password: string;
}

export const loginApi = async (data: LoginData) => {
 try {
    const response = await API.post("/api/auth/login", data);
      
      
  return response.data;

}catch(error){
    if(axios.isAxiosError(error)){
        throw new Error(error.response?.data?.message ?? error.message);
    }
    throw new Error("something went wrong")

  }
};