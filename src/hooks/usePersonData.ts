import axios, { AxiosPromise } from "axios";
import { PersonData } from "../interface/PersonData";
import { useQuery } from "@tanstack/react-query";

const API_URL= "http://localhost:8080/api";


const fetchPersonData = async (): AxiosPromise<PersonData[]> => {
    const response = await axios.get(API_URL + "/pessoa/all");
    return response;
}

export function usePersonData(): any {
    const query = useQuery({
        queryFn: fetchPersonData,
        queryKey: ['person-data'],
        retry: 2
    })

    return {
        ...query,
        data: query.data?.data
    }
}