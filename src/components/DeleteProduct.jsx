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
    Input
} from '@chakra-ui/react'
import React, { useState } from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'
import { useToast } from '@chakra-ui/react'
import FormatCurrency from '@/functions/moneyconvert'

const DeleteProduct = ({ slug, setAtt, att, routerF }) => {
    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [sending, setSending] = useState(false)

    const updateProduct = async (e) => {
        setSending(true)
        e.preventDefault()
        try {
            const token = Cookies.get('token');

            if (!token) {
                throw new Error('Cookie "token" não encontrado');
            }


            const response = await axios.delete(process.env.NEXT_PUBLIC_BACKEND + "/product/delete", {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                data: {
                    slug: slug
                }
            });
            setSending(false)
            setAtt(att+1)
            onClose();
            toast({
                title: 'Produto deletado com sucesso',
                status: 'success',
                duration: 9000,
                isClosable: true,
            });
            routerF()
        } catch (error) {
            setSending(false)
            onClose();
            toast({
                title: 'Erro ao deletar o produto',
                status: 'error',
                duration: 9000,
                isClosable: true,
            });
            console.error('Erro ao atualizar produto:', error);
        }
    }

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
                    <ModalHeader>Deletar o produto?</ModalHeader>
                    <ModalCloseButton />
                    <ModalFooter>
                        <Button isDisabled={sending} colorScheme='red' mr={3} onClick={updateProduct}>
                            Deletar
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Button colorScheme='red' variant='outline' onClick={onOpen}>
                Deletar produto
            </Button>
        </>
    )
}
export default DeleteProduct
