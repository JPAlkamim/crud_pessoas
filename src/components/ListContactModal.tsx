import { Button, FormControl, FormErrorMessage, FormLabel, Input, Table, Tbody, Td, Th, Thead, Tr, useToast } from "@chakra-ui/react"
import { useState } from "react"
import { useListContactData } from "../hooks/useListContactData";
import { ListContact } from "../interface/ListContact";
import { useRegisterListContactData } from "../hooks/useRegisterListContactData";
import { useDeleteListContact } from "../hooks/useDeleteListContact";


export const ListContactModal = ({ personId }: { personId?: number }) => {
    const { data } = useListContactData(personId);
    const { mutate } = useRegisterListContactData();
    const { mutate: deleteContact } = useDeleteListContact();
    const [name, setName] = useState('');
    const [telephone, setTelephone] = useState('');
    const [email, setEmail] = useState('');
    const [wrongEmail, setWrongEmail] = useState(false);
    const toast = useToast();

    const maskTelephone = (value: string) => {
        return value
            .replace(/\D/g, '')
            .replace(/(\d{2})(\d)/, '($1) $2')
            .replace(/(\d{5})(\d)/, '$1-$2')
            .replace(/(-\d{4})\d+?$/, '$1')
    }

    const unmaskTelephone = (value: string) => {
        return value.replace(/\D/g, '');
    }

    const handleName = (newName: string) => {
        setName(newName);
    };

    const handleTelephone = (newTelephone: string) => {
        setTelephone(maskTelephone(newTelephone));
    };

    const handleEmail = (newEmail: string) => {
        setEmail(newEmail);
    };

    const handleSubmit = () => {
        if (!name || !telephone || !email) {
            return;
        }

        const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
        if (!emailRegex.test(email)) {
            setWrongEmail(true);
            return;
        }

        mutate({
            personId, 
            name, 
            telephone: unmaskTelephone(telephone), 
            email 
        });
        clearFields();
    }

    const clearFields = () => {
        setName('');
        setTelephone('');
        setEmail('');
        setWrongEmail(false);
    }

    const handleDelete = (id?: number) => {
        if(data.length === 1) {
            toast({
                title: "Erro ao deletar",
                description: "A pessoa precisa ter ao menos um contato",
                status: "error",
                duration: 2000,
                isClosable: true,
            })
        } else {
            deleteContact(id);
        }
    }

    return (
        <div className="p-5 overflow-scroll max-h-96">
            <Table variant="striped" size="sm">
                <Thead>
                    <Tr>
                        <Th>Nome</Th>
                        <Th>Telefone</Th>
                        <Th>Email</Th>
                        <Th>Ações</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {data?.map((contact: ListContact) => (
                        <Tr key={contact.id}>
                            <Td>{contact.name}</Td>
                            <Td>{maskTelephone(contact.telephone)}</Td>
                            <Td>{contact.email}</Td>
                            <Td>
                                <button onClick={() => handleDelete(contact.id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                    </svg>
                                </button>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
            <div className="mt-10 border-4 p-5">
                <h2 className="text-xl flex justify-center">Cadastrar um novo contato</h2>
                <div>
                    <FormControl id="name" isRequired>
                        <FormLabel>Nome</FormLabel>
                        <Input type="text" value={name} onChange={(e) => handleName(e.target.value)} size="sm"/>
                    </FormControl>
                    <div className="grid grid-cols-2 gap-3">
                        <FormControl id="tel" isRequired>
                            <FormLabel>Telefone</FormLabel>
                            <Input type="tel" value={telephone} onChange={(e) => handleTelephone(e.target.value)} size="sm" />
                        </FormControl>
                        <FormControl id="email" isRequired isInvalid={wrongEmail}>
                            <FormLabel>Email</FormLabel>
                            <Input type="email" value={email} onChange={(e) => handleEmail(e.target.value)} size="sm" />
                            <FormErrorMessage>Email inválido</FormErrorMessage>
                        </FormControl>
                    </div>
                    <div className="flex justify-center mt-5">
                        <Button onClick={handleSubmit}>Cadastrar</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}