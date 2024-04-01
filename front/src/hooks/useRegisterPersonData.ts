import axios, { AxiosPromise } from "axios";
import { PersonData } from "../interface/PersonData";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const API_URL= "http://localhost:8080/api";


const postPersonData = async (personData: PersonData): AxiosPromise<PersonData> => {
    const response = await axios.post(API_URL + "/pessoa/create", personData);
    return response;
}

export function useRegisterPersonData(): any {
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn: postPersonData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['person-data'] });
        }
    })

    return mutate;
}