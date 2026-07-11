
import axios from "axios";
import { API } from "./API";
import type { AnalyticsData } from "../components/analytics/types/analytics";
export default async function AnalyticsAPI(): Promise<AnalyticsData> {
    try{
        const result = await API.get("/api/analytics")
        return result.data;
    }catch(error){
        if(axios.isAxiosError(error)){
            throw new Error(error.response?.data?.message ?? error.message)
        }
        throw new Error("something went wrong")
    }
}