import { useEffect, useState } from "react";
import { Header } from "./Header"
import { Table,
        Thead,
        Tbody,
        Tr,
        Th,
        Td,
        TableCaption,
        Modal,
        ModalContent,
        ModalOverlay,
        useToast,
        ModalCloseButton,
        ModalHeader,
        Input,
        Button,
        Tooltip
} from "@chakra-ui/react"
import moment from "moment";
import { UpdateModalPerson } from "./UptdateModalPerson";
import { PersonData } from "../interface/PersonData";
import { ListContactModal } from "./ListContactModal";
import { personService } from "../services/personService";
import { listContactService } from "../services/listContactService";

export const ListPerson = () => {
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openListContactModal, setOpenListContactModal] = useState(false);
    const [person, setPerson] = useState<PersonData>();
    const toast = useToast();
    const [personData, setPersonData] = useState<PersonData>({
        name: '',
        cpf: '',
        birthDate: ''
    } as PersonData);

    const [pageable, setPageable] = useState({
        page: 0,
        size: 5
    });

    useEffect(() => {
        handleSearch();
    }, [])

    const handleSearch = () => {
        personService.fetchPersonData(pageable.page, pageable.size).then((response) => {
            setPersonData(response.data);
        }).catch(() => {
            toast({
                title: "Erro ao buscar",
                status: "error",
                duration: 2000,
                isClosable: true,
            })
        })
    }

    const cpfMask = (value: string) => {
        return value
            .replace(/\D/g, '')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})/, '$1-$2')
            .replace(/(-\d{2})\d+?$/, '$1')
    }

    const handleDelete = async (id: number) => {
        listContactService.fetchListContactData(id).then((response) => {
            if(response.data.length > 0) {
                toast({
                    title: "Erro ao deletar",
                    description: "A pessoa possui contatos cadastrados",
                    status: "error",
                    duration: 2000,
                    isClosable: true,
                })
            } else {
                personService.deletePerson(id).then(() => {
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
        })
    }

    const handleEditModal = (clickedPerson: PersonData) => {
        setOpenEditModal(true);
        setPerson(clickedPerson);
    }

    const handleListContactModal = (clickedPerson: PersonData) => {
        setOpenListContactModal(true);
        setPerson(clickedPerson);
    }

  

    return (
        <>
            <Header />
            <div className="items-center justify-center h-screen mx-10 mt-20">
                <div className="flex mb-10">
                    <h2 className="mr-2">Página: </h2>
                    <Input style={{width: "50px"}} size="sm" className="mr-5" value={pageable.page} onChange={(e) => setPageable({...pageable, page: Number(e.target.value)})}/>
                    <h2 className="mr-2">Total de itens: </h2>
                    <Input style={{width: "50px"}} size="sm" className="mr-5" value={pageable.size} onChange={(e) => setPageable({...pageable, size: Number(e.target.value)})}/>
                    <Button colorScheme="blue" size="sm" onClick={handleSearch}>Buscar</Button>
                </div>
                <Table variant="striped" size="sm">
                    <TableCaption>Lista de Pessoas</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>Nome</Th>
                            <Th>CPF</Th>
                            <Th>Data de Nascimento</Th>
                            <Th>Ações</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {personData?.content?.map((person: any) => (
                            <Tr key={person.id}>
                                <Td>{person.name}</Td>
                                <Td>{cpfMask(person.cpf)}</Td>
                                <Td>{moment(person.birthDate).format('DD/MM/YYYY')}</Td>
                                <Td className="grid grid-cols-3 gap-2">
                                    <Tooltip label="Listar Contatos" aria-label="Listar Contatos">
                                        <button onClick={() => handleListContactModal(person)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                            </svg>
                                        </button>
                                    </Tooltip>
                                    <Tooltip label="Editar Pessoa" aria-label="Editar">
                                        <button onClick={() => handleEditModal(person)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                            </svg>
                                        </button>
                                    </Tooltip>
                                    <Tooltip label="Deletar Pessoa" aria-label="Deletar">
                                        <button onClick={() => handleDelete(person.id)}>
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
                <Modal isOpen={openEditModal} onClose={() => setOpenEditModal(false)}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalCloseButton />
                        <ModalHeader>Atualizar Dados da Pessoa</ModalHeader>
                        <UpdateModalPerson personData={person} searchPerson={handleSearch} />
                    </ModalContent>
                </Modal>
                <Modal isOpen={openListContactModal} onClose={() => setOpenListContactModal(false)} size="xl">
                    <ModalOverlay />
                    <ModalContent>
                        <ModalCloseButton />
                        <ModalHeader>Lista de Contatos: {person?.name}</ModalHeader>
                        <ListContactModal personId={person?.id} />
                    </ModalContent>
                </Modal>
            </div>
        </>
    )
}