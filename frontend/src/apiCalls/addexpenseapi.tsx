import axios from "axios";
import { API } from "./API";

interface expense {
    title: string,
    category: string,
    amount: number,
    description?: string,
    date: string


}
export default async function AddExpenseApi(data: expense) {
    try {
        const result = await API.post("/api/expense/add", data);
        return result.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message ?? error.message);
        }
        throw new Error("something went wrong")
    }

}
export async function ListExpenseApi() {
    try {
        const List = await API.get("/api/expense/list");
        return List.data;
    } catch (error) {
        if (axios.isAxiosError) {
            throw new Error(error.response?.data?.message ?? error.message);
        }
        throw new Error("something went wrong");
    }
}
export async function DeleteExpenseApi(id: number) {
    try {
        const result = await API.delete(`/api/expense/delete/${id}`)
        return result.data;
    } catch (error) {
        if (axios.isAxiosError) {
            throw new Error(error.reponse?.data?.message ?? error.message);
        }
        throw new Error("something went wrong")
    }
}

// edit expense api
export async function EditExpenseApi(
    id: number,
    expense: {
        title: string;
        amount: number;
        category: string;
        description:string;
        date: string;
    }
) {
    try {
        const result = await API.patch(`/api/expense/edit/${id}`, expense);

        return result.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(
                error.response?.data?.message ?? error.message
            );
        }

        throw new Error("Something went wrong");
    }
}
// getting a single expense for api call 
export async function SingleExpense(id: number) {
     console.log(id);
    try {
        const expense = await API.get(`/api/expense/edit/${id}`);
        return expense.data;
    }
    catch (error) {
        if (axios.isAxiosError) {
            throw new Error(error.response?.data?.message ?? error.message);
        }
        throw new Error("something went wrong")
    }
}