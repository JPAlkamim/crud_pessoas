import axios, { AxiosPromise } from "axios";
import { PersonData } from "../interface/PersonData";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const API_URL= "http://localhost:8080/api/lista-de-contato";

const deleteListContact = async (id: number): AxiosPromise<PersonData> => {
    const response = await axios.delete(API_URL + `/delete/${id}`);
    return response;
}

export function useDeleteListContact(): any {
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn: deleteListContact,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['list-contact-data'] });
        }
    })

    return mutate;
}