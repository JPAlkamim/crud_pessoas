import { useState } from "react"
import { Header } from "./Header"
import { FormControl, 
        FormLabel,
        Input,
        Button,
        useToast
} from "@chakra-ui/react"
import { useRegisterPersonData } from "../hooks/useRegisterPersonData"
import { PersonData } from "../interface/PersonData"
import { cpfMask, cpfUnmask } from "../helpers/CPFMask"

export const RegisterPerson = () => {
    const [name, setName] = useState('');
    const [cpf, setCpf] = useState('');
    const [birthDate, setBirthdate] = useState('');
    const { mutate } = useRegisterPersonData();
    const toast = useToast();

    const handleName = (newName: string) => {
        setName(newName);
    };

    const handleCpf = (newCpf: string) => {
        setCpf(cpfMask(newCpf));
    };

    const handleBirthdate = (newBirthdate: string) => {
        setBirthdate(newBirthdate);
    };

    const handleSubmit = () => {
        if (!name || !cpf || !birthDate) {
            toast({
                title: "Preencha todos os campos",
                status: "error",
                duration: 9000,
                isClosable: true,
            });
            return;
        }
        
        const cpfUnmasked = cpfUnmask(cpf);
        if (birthDate > new Date().toISOString().split('T')[0]) {
            toast({
                title: "Data de maior que o dia atual",
                status: "error",
                duration: 2000,
                isClosable: true,
            });
            return;
        }
        const personData: PersonData =
        {
            name,
            cpf: cpfUnmasked,
            birthDate
        };
        mutate(personData);

        toast({
            title: "Pessoa cadastrada com sucesso!",
            status: "success",
            duration: 9000,
            isClosable: true,
        });
        setTimeout(() => {
            clearFields();
        }, 2000);
    }

    const clearFields = () => {
        setName('');
        setCpf('');
        setBirthdate('');
    }

    return (
        <>
            <Header />
            <div className="flex items-center justify-center h-screen">
                <form>
                    <FormControl id="name" isRequired>
                        <FormLabel>Nome</FormLabel>
                        <Input type="text" value={name} onChange={(e) => handleName(e.target.value)} />
                    </FormControl>
                    <FormControl id="cpf" isRequired>
                        <FormLabel>CPF</FormLabel>
                        <Input type="text" value={cpf} onChange={(e) => handleCpf(e.target.value)} />
                    </FormControl>
                    <FormControl id="bithdate" isRequired>
                        <FormLabel>Data de Nascimento</FormLabel>
                        <Input type="date" value={birthDate} onChange={(e) => handleBirthdate(e.target.value)} />
                    </FormControl>
                    <div className="flex justify-center mt-5">
                        <Button onClick={handleSubmit}>Cadastrar</Button>
                    </div>
                </form>
            </div>
        </>
    );
}