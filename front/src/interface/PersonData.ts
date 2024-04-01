import { ListContact } from "./ListContact";

export interface PersonData {
    content?: any;
    id?: number,
    name: string,
    cpf: string,
    birthDate: string,
    listContact?: ListContact[]
}