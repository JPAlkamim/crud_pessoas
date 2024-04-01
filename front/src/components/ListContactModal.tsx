import { Button, FormControl, FormErrorMessage, FormLabel, Input, Table, Tbody, Td, Th, Thead, Tr, useToast, Tooltip } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { ListContact } from "../interface/ListContact";
import { listContactService } from "../services/listContactService";


export const ListContactModal = ({ personId }: { personId?: number }) => {
    const [listContactData, setListContactData] = useState<ListContact[]>();
    const [name, setName] = useState('');
    const [telephone, setTelephone] = useState('');
    const [email, setEmail] = useState('');
    const [invalidFields, setInvalidFields] = useState({
        name: false,
        telephone: false,
        email: false
    });
    const toast = useToast();

    useEffect(() => {
        handleSearch();
    }, [])

    const handleSearch = () => {
        listContactService.fetchListContactData(personId).then((response) => {
            setListContactData(response.data);
        }).catch(() => {
            toast({
                title: "Erro ao buscar",
                status: "error",
                duration: 2000,
                isClosable: true,
            })
        })
    }

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

    const validateFields = () => {
        const invalidFields = {
            name: false,
            telephone: false,
            email: false
        }
        if (!name) {
            invalidFields.name = true;
        }
        if (!telephone) {
            invalidFields.telephone = true;
        }
        if (!email) {
            invalidFields.email = true;
        }
        setInvalidFields(invalidFields);
        return invalidFields.name || invalidFields.telephone || invalidFields.email;
    }

    const handleSubmit = () => {
        if (validateFields()) {
            return;
        }
        const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
        if (!emailRegex.test(email)) {
            setInvalidFields({ ...invalidFields, email: true });
            return;
        }

        listContactService.createListContact({
            name,
            telephone: unmaskTelephone(telephone),
            email,
            personId
        }).then(() => {
            clearFields();
            handleSearch();
            toast({
                title: "Cadastrado com sucesso",
                status: "success",
                duration: 2000,
                isClosable: true,
            })
        }).catch(() => {
            toast({
                title: "Erro ao cadastrar",
                status: "error",
                duration: 2000,
                isClosable: true,
            })
        })
    }

    const clearFields = () => {
        setName('');
        setTelephone('');
        setEmail('');
    }

    const handleDelete = (id: any) => {
        if(listContactData && listContactData.length === 1) {
            toast({
                title: "Erro ao deletar",
                description: "A pessoa precisa ter ao menos um contato",
                status: "error",
                duration: 2000,
                isClosable: true,
            })
        } else {
            listContactService.deleteListContact(id).then(() => {
                handleSearch();
                toast({
                    title: "Deletado com sucesso",
                    status: "success",
                    duration: 2000,
                    isClosable: true,
                })
            }).catch(() => {
                toast({
                    title: "Erro ao deletar",
                    status: "error",
                    duration: 2000,
                    isClosable: true,
                })
            })
        }
    }

    return (
        <div className="p-5 overflow-auto max-h-lvh">
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
                    {listContactData?.map((contact: ListContact) => (
                        <Tr key={contact.id}>
                            <Td>{contact.name}</Td>
                            <Td>{maskTelephone(contact.telephone)}</Td>
                            <Td>{contact.email}</Td>
                            <Td>
                                <Tooltip label="Deletar" aria-label="Deletar">
                                    <button onClick={() => handleDelete(contact.id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                        </svg>
                                    </button>
                                </Tooltip>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
            <div className="mt-10 border-4 p-5">
                <h2 className="text-xl flex justify-center">Cadastrar um novo contato</h2>
                <div>
                    <FormControl id="name" isRequired isInvalid={invalidFields.name}>
                        <FormLabel>Nome</FormLabel>
                        <Input type="text" value={name} onChange={(e) => {
                            handleName(e.target.value);
                            setInvalidFields({ ...invalidFields, name: false });
                        }} size="sm" />
                        <FormErrorMessage>Nome inválido</FormErrorMessage>
                    </FormControl>
                    <div className="grid grid-cols-2 gap-3">
                        <FormControl id="tel" isRequired isInvalid={invalidFields.telephone}>
                            <FormLabel>Telefone</FormLabel>
                            <Input type="tel" value={telephone} onChange={(e) => {
                                handleTelephone(e.target.value);
                                setInvalidFields({ ...invalidFields, telephone: false });
                            }} size="sm" />
                            <FormErrorMessage>Telefone inválido</FormErrorMessage>
                        </FormControl>
                        <FormControl id="email" isRequired isInvalid={invalidFields.email}>
                            <FormLabel>Email</FormLabel>
                            <Input type="email" value={email} onChange={(e) => {
                                handleEmail(e.target.value);
                                setInvalidFields({ ...invalidFields, email: false });
                            }} size="sm" />
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