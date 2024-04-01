import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const API_URL= "http://localhost:8080/api";


const fetchPersonData = async (page: number, size: number): Promise<any> => {
    const response = await axios.get(API_URL + `/pessoa/find-all/${page}/${size}`);
    return response;
}

export function usePersonData(page: number = 0, size: number = 10): any {
    const query = useQuery({
        queryFn: () => fetchPersonData(page, size),
        queryKey: ['person-data'],
        retry: 2
    })

    return {
        ...query,
        data: query.data?.data
    }
}