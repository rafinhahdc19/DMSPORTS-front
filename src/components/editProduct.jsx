import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    FormControl,
    FormLabel,
    Input,
    Switch
} from '@chakra-ui/react'
import React, { useState } from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'
import { useToast } from '@chakra-ui/react'
import { useEffect } from 'react'
import FormatCurrency from '@/src/moneyconvert'

const EditProduct = ({ slug, oldTitle, oldDesc, oldValue, att, setAtt, oldFixado }) => {
    const formatCurrency = (value) => {
        // Remove todos os caracteres não numéricos
        const cleanValue = value.replace(/[^\d]/g, '');

        // Adiciona zeros à esquerda se o número tiver menos de três dígitos
        let formattedValue = cleanValue.padStart(3, '0');

        // Adiciona uma vírgula antes dos dois últimos dígitos
        formattedValue = formattedValue.replace(/(\d)(\d{2})$/, '$1,$2');

        // Remove os zeros à esquerda da vírgula, deixando apenas um zero
        formattedValue = formattedValue.replace(/^0+(?=\d)/, '');

        // Adiciona zero à esquerda da vírgula se necessário
        if (formattedValue.startsWith(',')) {
            formattedValue = '0' + formattedValue;
        }

        return formattedValue;
    };

    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [titulo, setTitulo] = useState(oldTitle || "")
    const [desc, setDesc] = useState(oldDesc || "")
    const [value, setValue] = useState(oldValue || "")
    const [sending, setSending] = useState(false)
    const [fixado, setFixado] = useState(oldFixado || false);

    const updateProduct = async (e) => {
        setSending(true)
        e.preventDefault()
        try {
            const token = Cookies.get('token');

            if (!token) {
                throw new Error('Cookie "token" não encontrado');
            }


            const response = await axios.patch(process.env.NEXT_PUBLIC_BACKEND + "/product/update", {
                value: parseInt(value.replace(/[,.]/g, '')),
                slug: slug,
                titulo: titulo,
                desc: desc,
                fixado: fixado
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setSending(false)
            setAtt(att + 1)
            onClose();
            toast({
                title: 'Produto editado com sucesso',
                status: 'success',
                duration: 9000,
                isClosable: true,
            });
        } catch (error) {
            setSending(false)
            onClose();
            setTitulo(oldTitle || "")
            setDesc(oldDesc || "")
            setValue(oldValue || "")
            setFixado(oldFixado || false)
            if(error?.response?.data?.error == "Limite de produtos fixados atingido"){
                toast({
                    title: 'Limite de produtos fixados atingido',
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                });
            }else{
                toast({
                    title: 'Erro ao editar produto',
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                });
            }
            
            console.error('Erro ao atualizar produto:', error);
        }
    }

    useEffect(() => {
        const handleClose = () => {
            setTitulo(oldTitle || '');
            setDesc(oldDesc || "");
            setValue(oldValue || "");
            setFixado(oldFixado || false)
        };

        // Adicionar event listener para o evento de fechar o componente
        if (isOpen) {
            window.addEventListener('beforeunload', handleClose);
        } else {
            handleClose();
        }

        // Remover event listener ao desmontar o componente
        return () => {
            window.removeEventListener('beforeunload', handleClose);
        };
    }, [isOpen, oldTitle]);

    const finalRef = React.useRef(null)
    return (
        <>
            <Modal
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edite o produto</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Titulo</FormLabel>
                            <Input value={titulo} onChange={(e) => setTitulo(e.target.value)} placeholder='Titulo' />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Valor</FormLabel>
                            <Input value={formatCurrency(value)} onChange={(e) => setValue(e.target.value)} placeholder='Valor' />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Descricão</FormLabel>
                            <Input value={desc} onChange={(e) => setDesc(e.target.value)} placeholder='Descrição' />
                        </FormControl>

                        <FormControl mt={4} display="flex" alignItems="center">
                            <FormLabel htmlFor="fixado" mb="0">
                                Fixado
                            </FormLabel>
                            <Switch id="fixado" isChecked={fixado} onChange={() => setFixado(!fixado)} />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button isDisabled={sending} colorScheme='blue' mr={3} onClick={updateProduct}>
                            Save
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <button onClick={onOpen}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                </svg>
            </button>
        </>
    )
}
export default EditProduct
