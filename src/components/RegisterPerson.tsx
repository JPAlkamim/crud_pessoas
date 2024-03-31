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
import { ListContact } from "../interface/ListContact"
import { validateCPF } from "../helpers/CPFHelper"

export const RegisterPerson = () => {
    const [personRegister, setPersonRegister] = useState<PersonData>({
        name: '',
        cpf: '',
        birthDate: ''
    } as PersonData);

    const [contactRegister, setContactRegister] = useState<ListContact>({
        name: '',
        telephone: '',
        email: ''
    } as ListContact);

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

    const { mutate } = useRegisterPersonData();
    const toast = useToast();

    const handleName = (newName: string) => {
        setPersonRegister({ ...personRegister, name: newName });
    };

    const handleCpf = (newCpf: string) => {
        setPersonRegister({ ...personRegister, cpf: cpfMask(newCpf) });
    };

    const handleBirthdate = (newBirthdate: string) => {
        setPersonRegister({ ...personRegister, birthDate: newBirthdate });
    };

    const validateEmail = (email: string) => {
        const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
        return emailRegex.test(email);
    }

    const validate = () => {
        if (!personRegister.name || !personRegister.cpf || !personRegister.birthDate || !contactRegister.name || !contactRegister.telephone || !contactRegister.email) {
            toast({
                title: "Preencha todos os campos",
                status: "error",
                duration: 2000,
                isClosable: true,
            });
            return false;
        }
        if (!validateCPF(cpfUnmask(personRegister.cpf))) {
            toast({
                title: "CPF inválido",
                status: "error",
                duration: 2000,
                isClosable: true,
            });
            return false;
        }
        if (!validateEmail(contactRegister.email)) {
            toast({
                title: "Email inválido",
                status: "error",
                duration: 2000,
                isClosable: true,
            });
            return false;
        }
        return true;
    }

    const handleSubmit = () => {
        if (!validate()) {
            return;
        }
        const cpfUnmasked = cpfUnmask(personRegister.cpf);
        if (personRegister.birthDate > new Date().toISOString().split('T')[0]) {
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
            name: personRegister.name,
            cpf: cpfUnmasked,
            birthDate: personRegister.birthDate,
            listContact: [
                {
                    name: contactRegister.name,
                    telephone: unmaskTelephone(contactRegister.telephone),
                    email: contactRegister.email
                }
            ]
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
        setPersonRegister({
            name: '',
            cpf: '',
            birthDate: ''
        } as PersonData);
        setContactRegister({
            name: '',
            telephone: '',
            email: ''
        } as ListContact);
    }

    return (
        <>
            <Header />
            <div className="flex items-center justify-center h-screen">
                <form>
                    <div className="grid grid-cols-2 gap-10">
                        <div>
                            <h2 className="flex justify-center mb-5">Cadastro Pessoa</h2>
                            <FormControl id="name" isRequired>
                                <FormLabel>Nome</FormLabel>
                                <Input type="text" value={personRegister.name} onChange={(e) => handleName(e.target.value)} />
                            </FormControl>
                            <FormControl id="cpf" isRequired>
                                <FormLabel>CPF</FormLabel>
                                <Input type="text" value={personRegister.cpf} onChange={(e) => handleCpf(e.target.value)} />
                            </FormControl>
                            <FormControl id="bithdate" isRequired>
                                <FormLabel>Data de Nascimento</FormLabel>
                                <Input type="date" value={personRegister.birthDate} onChange={(e) => handleBirthdate(e.target.value)} />
                            </FormControl>
                        </div>
                        <div>
                            <h2 className="flex justify-center mb-5">Cadastro Contato</h2>
                            <FormControl id="name" isRequired>
                                <FormLabel>Nome</FormLabel>
                                <Input type="text" value={contactRegister.name} onChange={(e) => setContactRegister({ ...contactRegister, name: e.target.value })} />
                            </FormControl>
                            <FormControl id="cpf" isRequired>
                                <FormLabel>Telefone</FormLabel>
                                <Input type="text" value={contactRegister.telephone} onChange={(e) => setContactRegister({ ...contactRegister, telephone: maskTelephone(e.target.value) })} />
                            </FormControl>
                            <FormControl id="bithdate" isRequired>
                                <FormLabel>Email</FormLabel>
                                <Input type="email" value={contactRegister.email} onChange={(e) => setContactRegister({ ...contactRegister, email: e.target.value })} />
                            </FormControl>
                        </div>
                    </div>
                    <div className="flex justify-center mt-5">
                        <Button onClick={handleSubmit}>Cadastrar</Button>
                    </div>
                </form>
            </div>
        </>
    );
}