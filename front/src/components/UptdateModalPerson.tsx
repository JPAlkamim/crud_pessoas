import { useEffect, useState } from "react";
import { PersonData } from "../interface/PersonData"
import { FormControl,
            FormLabel,
            Input,
            Button,
            useToast,
            FormErrorMessage
    } from "@chakra-ui/react"
import { cpfMask, cpfUnmask } from "../helpers/CPFMask";
import { validateCPF } from "../helpers/CPFHelper";
import { personService } from "../services/personService";

export const UpdateModalPerson = ({ personData, searchPerson }: { personData: any, searchPerson: () => void }) => {
    useEffect(() => {
        const date = new Date(personData.birthDate);
        const formattedDate = date.toISOString().split('T')[0];
        setBirthdate(formattedDate);
        setCpf(cpfMask(personData.cpf));
    }, []);

    const [name, setName] = useState(personData.name);
    const [cpf, setCpf] = useState(personData.cpf);
    const [birthDate, setBirthdate] = useState(personData.birthDate);
    const [invalidFields, setInvalidFields] = useState({
        name: false,
        cpf: false,
        birthDate: false
    });
    const toast = useToast();

    const validateFields = () => {
        if (name === "") {
            setInvalidFields({ ...invalidFields, name: true });
            return false;
        }
        if (cpf === "") {
            setInvalidFields({ ...invalidFields, cpf: true });
            return false;
        }
        if (birthDate === "") {
            setInvalidFields({ ...invalidFields, birthDate: true });
            return false;
        }
        return true;
    }

    const handleSubmit = () => {
        if (validateFields() === false) {
            return;
        }
        const cpfUnmasked = cpfUnmask(cpf);
        if (validateCPF(cpfUnmasked) === false) {
            setInvalidFields({ ...invalidFields, cpf: true });
            return;
        }
        const personDataUpdate: PersonData =
        {   
            id: personData.id,
            name,
            cpf: cpfUnmasked,
            birthDate
        };
        personService.updatePerson(personData.id, personDataUpdate).then(() => {
            toast({
                title: "Pessoa atualizada com sucesso!",
                status: "success",
                duration: 2000,
                isClosable: true,
            });
            searchPerson();
        }).catch(() => {
            toast({
                title: "Erro ao atualizar pessoa",
                status: "error",
                duration: 2000,
                isClosable: true,
            });
        })
    }
    
    return (
        <div className="p-5">
            <form>
                    <FormControl id="name" isRequired isInvalid={invalidFields.name}>
                        <FormLabel>Nome</FormLabel>
                        <Input type="text" value={name} onChange={(e) => {
                            setName(e.target.value);
                            setInvalidFields({ ...invalidFields, name: false });
                        }}/>
                        <FormErrorMessage>Nome inválido</FormErrorMessage>
                    </FormControl>
                    <FormControl id="cpf" isRequired isInvalid={invalidFields.cpf}>
                        <FormLabel>CPF</FormLabel>
                        <Input type="text" value={cpf} onChange={(e) => {
                            setCpf(cpfMask(e.target.value))
                            setInvalidFields({ ...invalidFields, cpf: false })
                        }}/>
                        <FormErrorMessage>CPF inválido</FormErrorMessage>
                    </FormControl>
                    <FormControl id="bithdate" isRequired isInvalid={invalidFields.birthDate}>
                        <FormLabel>Data de Nascimento</FormLabel>
                        <Input type="date" value={birthDate} onChange={(e) => {
                            setBirthdate(e.target.value);
                            setInvalidFields({ ...invalidFields, birthDate: false });
                        }}/>
                        <FormErrorMessage>Data de Nascimento inválida</FormErrorMessage>
                    </FormControl>
                    <div className="flex justify-center mt-5">
                        <Button onClick={handleSubmit}>Atualizar</Button>
                    </div>
                </form>
        </div>
    )
}