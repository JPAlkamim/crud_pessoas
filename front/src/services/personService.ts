import axios from 'axios';

const API_URL= "http://localhost:8080/api/pessoa";


export const personService = {

    fetchPersonData: async (page: number, size: number) => {
        const response = await axios.get(API_URL + `/find-all/${page}/${size}`);
        return response;
    },

    createPerson: async (person: any) => {
        const response = await axios.post(API_URL + `/create`, person);
        return response;
    },

    updatePerson: async (id: number, person: any) => {
        const response = await axios.put(API_URL + `/update/${id}`, person);
        return response;
    },

    deletePerson: async (id: number) => {
        const response = await axios.delete(API_URL + `/delete/${id}`);
        return response;
    }
}