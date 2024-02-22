import { Button, Input } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useToast } from '@chakra-ui/react'
import { useRouter } from 'next/router'

const Cupom = ({ SetApplyCupom, setDescontoValue, disabled, dataArrays3 }) => {
    const toast = useToast();
    const [cupomValue, setCupomValue] = useState("");
    const router = useRouter()
    const { cupom } = router.query

    
    useEffect(() => {
        if (cupom && cupom != "" && acceptCupom(dataArrays3)) {
            setCupomValue(cupom)
            cupomVerify(null, cupom)
        }
        if(!acceptCupom(dataArrays3)){
            SetApplyCupom("")
            setDescontoValue(0)
        }
    }, [cupom, dataArrays3])
    
    const acceptCupom = (dataArrays3) => {
        if (!Array.isArray(dataArrays3) || !dataArrays3.every(item => typeof item === 'object' && item.quantity !== undefined)) {
            return false
        }
        
        const totalQuantities = dataArrays3.reduce((total, item) => total + (item.quantity || 0), 0);
        
        return totalQuantities >= 3;
    }
    
    const cupomVerify = async (e, cupomvalue) => {
        if (e) {
            e.preventDefault();
        }
        
        if (cupomvalue && cupomvalue !== "" && acceptCupom(dataArrays3)) {
            try {
                const cupomResponse = await axios.post(process.env.NEXT_PUBLIC_BACKEND + "/cupom/verify", {
                    codigo: cupomvalue
                });
                
                if (cupomResponse.status === 200) {
                    if (cupomResponse?.data?.desconto) {
                        SetApplyCupom(cupomvalue)
                        setDescontoValue(cupomResponse.data.desconto)
                        toast({
                            title: 'Cupom aplicado com sucesso',
                            status: 'success',
                            duration: 9000,
                            isClosable: true,
                        });
                        return cupomResponse.data.desconto
                    } else {
                        SetApplyCupom("")
                        setDescontoValue(0)
                        toast({
                            title: 'Cupom inválido',
                            status: 'error',
                            duration: 9000,
                            isClosable: true,
                        });
                        return 0;
                    }
                } else {
                    SetApplyCupom("")
                    setDescontoValue(0)
                    toast({
                        title: 'Cupom inválido',
                        status: 'error',
                        duration: 9000,
                        isClosable: true,
                    });
                    return 0;
                }
            } catch (error) {
                SetApplyCupom("")
                setDescontoValue(0)
                toast({
                    title: 'Cupom inválido',
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                });
                return 0;
            }
        } else {
            SetApplyCupom("")
            setDescontoValue(0)
            toast({
                title: 'Cupom inválido',
                status: 'error',
                duration: 9000,
                isClosable: true,
            });
            return 0;
        }
    }
    
    return (
        <>
            <h2 className=' font-medium pb-2 '>Adicionar Cupom</h2>
            <form onSubmit={(e) => {
                e.preventDefault();
                router.push({
                    pathname: '/carrinho',
                    query: { cupom: cupomValue }
                })
            }}>
                <h3 className=' font-light text-sm pb-2 '>{!acceptCupom(dataArrays3) ? ("O Cupom requer no mínimo 3 produtos."):('Insira o cupom')}</h3>
                <div className='border rounded-lg flex border-black/75 p-1 pl-2'>
                    <Input disabled={disabled || !acceptCupom(dataArrays3)  } onChange={(e) => setCupomValue(e.target.value)} value={cupomValue} className='w-full' variant='unstyled' placeholder={'Insira o cupom'} color={'black'} />
                    <Button type='submit' className='mr-auto' padding={4} colorScheme='whatsapp' isDisabled={cupomValue === "" || disabled || !acceptCupom(dataArrays3)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 0 1 9 9v.375M10.125 2.25A3.375 3.375 0 0 1 13.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 0 1 3.375 3.375M9 15l2.25 2.25L15 12" />
                        </svg>
                    </Button>
                </div>
            </form>
        </>
    )
}

export default Cupom;
