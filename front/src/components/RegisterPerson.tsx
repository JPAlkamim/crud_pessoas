import { useState } from "react"
import { Header } from "./Header"
import { FormControl, 
        FormLabel,
        Input,
        Button,
        useToast,
        FormErrorMessage
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

    const [invalidFields, setInvalidFields] = useState({
        name: false,
        cpf: false,
        birthDate: false,
        contactName: false,
        telephone: false,
        email: false
    });

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
        setInvalidFields({ ...invalidFields, name: false });
    };

    const handleCpf = (newCpf: string) => {
        setPersonRegister({ ...personRegister, cpf: cpfMask(newCpf) });
        setInvalidFields({ ...invalidFields, cpf: false });
    };

    const handleBirthdate = (newBirthdate: string) => {
        setPersonRegister({ ...personRegister, birthDate: newBirthdate });
        setInvalidFields({ ...invalidFields, birthDate: false });
    };

    const validateEmail = (email: string) => {
        const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
        return emailRegex.test(email);
    }

    const validateFieldsEmpty = () => {
        const invalidFields = {
            name: false,
            cpf: false,
            birthDate: false,
            contactName: false,
            telephone: false,
            email: false
        }
        if (!personRegister.name) {
            invalidFields.name = true;
        }
        if (!personRegister.cpf) {
            invalidFields.cpf = true;
        }
        if (!personRegister.birthDate) {
            invalidFields.birthDate = true;
        }
        if (!contactRegister.name) {
            invalidFields.contactName = true;
        }
        if (!contactRegister.telephone) {
            invalidFields.telephone = true;
        }
        if (!contactRegister.email) {
            invalidFields.email = true;
        }
        setInvalidFields(invalidFields);
        return invalidFields.name || invalidFields.cpf || invalidFields.birthDate || invalidFields.contactName || invalidFields.telephone || invalidFields.email;
    }

    const handleSubmit = () => {
        if(validateFieldsEmpty()){
            return;
        }
        if (!validateCPF(cpfUnmask(personRegister.cpf)) === true) {
            setInvalidFields({ ...invalidFields, cpf: true });
            return;
        }

        if (!validateEmail(contactRegister.email)) {
            setInvalidFields({ ...invalidFields, email: true });
            return;
        }

        if (personRegister.birthDate > new Date().toISOString().split('T')[0]) {
            toast({
                title: "Data de maior que o dia atual",
                status: "error",
                duration: 2000,
                isClosable: true,
            });
            setInvalidFields({ ...invalidFields, birthDate: true });
            return;
        }
        
        const cpfUnmasked = cpfUnmask(personRegister.cpf);
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
        try {
            mutate(personData);
            toast({
                title: "Pessoa cadastrada com sucesso!",
                status: "success",
                duration: 2000,
                isClosable: true,
            });
            setTimeout(() => {
                clearFields();
            }, 2000);
        } catch (error) {
            toast({
                title: "Erro ao cadastrar",
                description: "Erro ao cadastrar pessoa",
                status: "error",
                duration: 2000,
                isClosable: true,
            });
            return;
        }
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
                            <FormControl id="name" isRequired isInvalid={invalidFields.name}>
                                <FormLabel>Nome</FormLabel>
                                <Input type="text" value={personRegister.name} onChange={(e) => handleName(e.target.value)} />
                                <FormErrorMessage>Nome sem preencher</FormErrorMessage>
                            </FormControl>
                            <FormControl id="cpf" isRequired isInvalid={invalidFields.cpf}>
                                <FormLabel>CPF</FormLabel>
                                <Input type="text" value={personRegister.cpf} onChange={(e) => handleCpf(e.target.value)} />
                                <FormErrorMessage>CPF inválido</FormErrorMessage>
                            </FormControl>
                            <FormControl id="bithdate" isRequired isInvalid={invalidFields.birthDate}>
                                <FormLabel>Data de Nascimento</FormLabel>
                                <Input type="date" value={personRegister.birthDate} onChange={(e) => handleBirthdate(e.target.value)} />
                                <FormErrorMessage>Data de nascimento inválida</FormErrorMessage>
                            </FormControl>
                        </div>
                        <div>
                            <h2 className="flex justify-center mb-5">Cadastro Contato</h2>
                            <FormControl id="name" isRequired isInvalid={invalidFields.contactName}>
                                <FormLabel>Nome</FormLabel>
                                <Input type="text" value={contactRegister.name} onChange={(e) => {
                                    setContactRegister({ ...contactRegister, name: e.target.value })
                                    setInvalidFields({ ...invalidFields, contactName: false });
                                    }} />
                                <FormErrorMessage>Nome sem preencher</FormErrorMessage>
                            </FormControl>
                            <FormControl id="tel" isRequired isInvalid={invalidFields.telephone}>
                                <FormLabel>Telefone</FormLabel>
                                <Input type="tel" value={contactRegister.telephone} onChange={(e) => {
                                    setContactRegister({ ...contactRegister, telephone: maskTelephone(e.target.value) })
                                    setInvalidFields({ ...invalidFields, telephone: false });
                                    }} />
                                <FormErrorMessage>Telefone inválido</FormErrorMessage>
                            </FormControl>
                            <FormControl id="email" isRequired isInvalid={invalidFields.email}>
                                <FormLabel>Email</FormLabel>
                                <Input type="email" value={contactRegister.email} onChange={(e) => {
                                    setContactRegister({ ...contactRegister, email: e.target.value })
                                    setInvalidFields({ ...invalidFields, email: false });
                                }}/>
                                <FormErrorMessage>Email inválido</FormErrorMessage>
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