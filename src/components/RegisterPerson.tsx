import { useState } from "react"
import { Header } from "./Header"
import { FormControl, 
        FormLabel,
        Input,
        Button,
        FormErrorMessage,
        FormHelperText
} from "@chakra-ui/react"

export const RegisterPerson = () => {
    const [name, setName] = useState('');
    const [cpf, setCpf] = useState('');
    const [birthdate, setBirthdate] = useState('');

    const handleName = (newName: string) => {
        setName(newName);
    };

    const handleCpf = (newCpf: string) => {
        setCpf(newCpf);
    };

    const handleBirthdate = (newBirthdate: string) => {
        setBirthdate(newBirthdate);
    };

    const handleSubmit = () => {
        console.log(name, cpf, birthdate);
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
                        <Input type="date" value={birthdate} onChange={(e) => handleBirthdate(e.target.value)} />
                    </FormControl>
                    <Button onClick={handleSubmit}>Cadastrar</Button>
                </form>
            </div>
        </>
    );
}