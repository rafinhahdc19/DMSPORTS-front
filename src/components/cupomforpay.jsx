import { Button, Input } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useToast } from '@chakra-ui/react'
import { useRouter } from 'next/router'

const Cupomforpay = ({ SetApplyCupom, setDescontoValue, disabled, dataArrays3 }) => {
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
        </>
    )
}

export default Cupomforpay;
