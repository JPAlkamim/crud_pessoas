import axios, { AxiosPromise } from 'axios';
import { ListContact } from '../interface/ListContact';

const API_URL= "http://localhost:8080/api/lista-de-contato";

export const listContactService = {
    fetchListContactData: async (personId: any): AxiosPromise<ListContact[]> => {
        const response = await axios.get(API_URL + `/all-by-person-id/${personId}`); 
        return response;
    },

    createListContact: async (listContact: any): AxiosPromise<ListContact> => {
        const response = await axios.post(API_URL + `/create`, listContact);
        return response;
    },

    updateListContact: async (listContact: any): AxiosPromise<ListContact> => {
        const response = await axios.put(API_URL + `/update`, listContact);
        return response;
    },

    deleteListContact: async (id: number): AxiosPromise<ListContact> => {
        const response = await axios.delete(API_URL + `/delete/${id}`);
        return response;
    }
}