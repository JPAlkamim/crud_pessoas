import axios, { AxiosPromise } from "axios";
import { useQuery } from "@tanstack/react-query";
import { ListContact } from "../interface/ListContact";

const API_URL= "http://localhost:8080/api/lista-de-contato";


const fetchListContactData = async (personId: any): AxiosPromise<ListContact[]> => {
    const response = await axios.get(API_URL + `/all-by-person-id/${personId}`); 
    return response;
}

export function useListContactData(personId: any): any {
    const query = useQuery({
        queryFn: () => fetchListContactData(personId),
        queryKey: ['list-contact-data', personId],
        retry: 2
    })

    return {
        ...query,
        data: query.data?.data
    }
}