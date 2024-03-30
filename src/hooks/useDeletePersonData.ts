import axios, { AxiosPromise } from "axios";
import { PersonData } from "../interface/PersonData";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const API_URL= "http://localhost:8080/api";


const deletePersonData = async (id: number): AxiosPromise<PersonData> => {
    try {
        const response = await axios.delete(API_URL + `/pessoa/delete/${id}`);
        return response;
    } catch (error: any) {
        throw new Error(error);
    }
}

export function useDeletePersonData(): any {
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn: deletePersonData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['person-data'] });
        }
    })

    return mutate;
}