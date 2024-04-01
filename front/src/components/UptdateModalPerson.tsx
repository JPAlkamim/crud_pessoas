import { useEffect, useState } from "react";
import { PersonData } from "../interface/PersonData"
import { FormControl,
            FormLabel,
            Input,
            Button,
            useToast
    } from "@chakra-ui/react"
import { useUpdatePersonData } from "../hooks/useUpdatePersonData";
import { cpfMask, cpfUnmask } from "../helpers/CPFMask";
import { validateCPF } from "../helpers/CPFHelper";

export const UpdateModalPerson = ({personData}: any) => {
    useEffect(() => {
        const date = new Date(personData.birthDate);
        const formattedDate = date.toISOString().split('T')[0];
        setBirthdate(formattedDate);
        setCpf(cpfMask(personData.cpf));
    }, []);

    const [name, setName] = useState(personData.name);
    const [cpf, setCpf] = useState(personData.cpf);
    const [birthDate, setBirthdate] = useState(personData.birthDate);
    const { mutate } = useUpdatePersonData();
    const toast = useToast();

    const handleSubmit = () => {
        const cpfUnmasked = cpfUnmask(cpf);
        if (validateCPF(cpfUnmasked) === false) {
            toast({
                title: "CPF inválido!",
                status: "error",
                duration: 9000,
                isClosable: true,
            });
            return;
        }
        const personDataUpdate: PersonData =
        {   
            id: personData.id,
            name,
            cpf: cpfUnmasked,
            birthDate
        };
        try {
            mutate(personDataUpdate);
            toast({
                title: "Pessoa atualizada com sucesso!",
                status: "success",
                duration: 9000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: "Erro ao atualizar pessoa!",
                status: "error",
                duration: 9000,
                isClosable: true,
            });
        }
    }
    
    return (
        <div className="p-5">
            <form>
                    <FormControl id="name" isRequired>
                        <FormLabel>Nome</FormLabel>
                        <Input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    </FormControl>
                    <FormControl id="cpf" isRequired>
                        <FormLabel>CPF</FormLabel>
                        <Input type="text" value={cpf} onChange={(e) => setCpf(cpfMask(e.target.value))} />
                    </FormControl>
                    <FormControl id="bithdate" isRequired>
                        <FormLabel>Data de Nascimento</FormLabel>
                        <Input type="date" value={birthDate} onChange={(e) => setBirthdate(e.target.value)} />
                    </FormControl>
                    <div className="flex justify-center mt-5">
                        <Button onClick={handleSubmit}>Atualizar</Button>
                    </div>
                </form>
        </div>
    )
}