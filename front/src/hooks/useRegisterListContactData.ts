import axios, { AxiosPromise } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ListContact } from "../interface/ListContact";

const API_URL= "http://localhost:8080/api/lista-de-contato";

const postListContact = async (listContact: ListContact): AxiosPromise<ListContact> => {
    const response = await axios.post(API_URL + "/create", listContact);
    return response;
}

export function useRegisterListContactData(): any {
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn: postListContact,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['list-contact-data'] });
        }
    })

    return mutate;
}