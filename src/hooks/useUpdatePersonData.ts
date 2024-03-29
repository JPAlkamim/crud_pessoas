import axios, { AxiosPromise } from "axios";
import { PersonData } from "../interface/PersonData";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const API_URL= "http://localhost:8080/api";


const updatePersonData = async (personData: PersonData): AxiosPromise<PersonData> => {
    const response = await axios.put(API_URL + `/pessoa/update/${personData.id}`, personData);
    return response;
}

export function useUpdatePersonData(): any {
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn: updatePersonData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['person-data'] });
        }
    })

    return mutate;
}