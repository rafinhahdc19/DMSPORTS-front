import React, { useState } from 'react';
import { useRef, useEffect } from 'react';
import Router from 'next/router';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    Input,
    Button
} from '@chakra-ui/react';
import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
} from '@chakra-ui/react'
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
    PopoverAnchor,
    Portal
} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react';
import axios from 'axios';
import Cookies from 'js-cookie';

const CupomCard = ({ codigo, desconto, attCupom, setAttCupom }) => {
    const [ loading, setLoading ] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [erro, seterro] = useState("")
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
    const token = Cookies.get('token');
    const deleteTask = async () => {
        try {
            setLoading(true)
            const response = await axios.delete(
                `${process.env.NEXT_PUBLIC_BACKEND}/cupom/delete`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    data: {
                        codigo:codigo
                    },
                }
            );

            if (response.status === 200) {
                setLoading(false)
                setAttCupom(attCupom+1)
                onClose();
            } else {
                setLoading(false)
                seterro("Não foi possivel deletar a coleção. Tente mais tarde")
            }
        } catch (error) {
            setLoading(false)
            seterro("Não foi possivel deletar a coleção. Tente mais tarde"+error)
            console.error(error);
        }
    }
    return (
        <>
                <div className='bg-[#2DAC9B37] rounded-xl pb-5 pt-2 pl-5 pr-1'>
                    <div className='mb-5 flex justify-between'>
                        <h1 className='text-xl font-medium mt-auto mb-auto overflow-hidden whitespace-nowrap overflow-ellipsis'>{codigo}</h1>
                        <div className='mt-auto mb-auto flex'>
                            <button className='z-20 p-4' onClick={(e) => { e.stopPropagation(); onOpen(); }}>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    stroke-width='1.5'
                                    stroke='currentColor'
                                    className='w-6 h-6'
                                >
                                    <path
                                        stroke-linecap='round'
                                        stroke-linejoin='round'
                                        d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10'
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className={` font-medium text-lg flex `}>
                        Desconto: {desconto}
                    </div>

                </div>

            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Deletar Cupom</ModalHeader>
                    {erro != "" ? (
                        <div className='lg:w-[87%] md:w-[83%] px-2 w-full ml-auto mr-auto'>
                            <Alert className='rounded-lg mb-2' status='error'>
                                <AlertIcon />
                                <AlertTitle>{erro}</AlertTitle>
                            </Alert>
                        </div>
                    ) : null}
                    <ModalCloseButton />

                    <ModalFooter className=' flex justify-between '>
                        <div className='mr-auto'>
                            <Button isDisabled={loading} onClick={() => deleteTask()} colorScheme='red'>
                                Deletar
                            </Button>
                        </div>
                        <div>
                            <Button onClick={onClose}>Cancel</Button>
                        </div>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default CupomCard;


