import axios from "axios";
import { API} from "./API";

export default async function Budgetapi(Amount:number){
    
    try{
        const result = await API.patch("/api/budget",{
            budget : Amount
        })
        
        return result.data;
    }
    catch(error){
        if(axios.isAxiosError){
            throw new Error(error.response?.data?.message ?? error.message)
        }
         throw new Error("something went wrong");
    }
}
export async function StatsApi(){
    try{
        const result = await API.get("api/stats");
        return result.data;
    }catch(error){
        if(axios.isAxiosError){
            throw new Error(error.response?.data?.message ?? error.message)
        }
        throw new Error("something went wrong");
    }
}