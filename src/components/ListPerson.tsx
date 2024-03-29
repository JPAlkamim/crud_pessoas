import { usePersonData } from "../hooks/usePersonData";
import { Header } from "./Header"
import { Table,
        Thead,
        Tbody,
        Tr,
        Th,
        Td,
        TableCaption
} from "@chakra-ui/react"
import moment from "moment";

export const ListPerson = () => {
    const { data } = usePersonData();

    return (
        <>
            <Header />
            <div className="flex items-center justify-center h-screen mx-10">
                <Table variant="simple">
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
                        {data?.map((person: any) => (
                            <Tr key={person.id}>
                                <Td>{person.name}</Td>
                                <Td>{person.cpf}</Td>
                                <Td>{moment(person.birthDate).format('DD/MM/YYYY')}</Td>
                                <Td>
                                    <button>Editar</button>
                                    <button>Excluir</button>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </div>
        </>
    )
}