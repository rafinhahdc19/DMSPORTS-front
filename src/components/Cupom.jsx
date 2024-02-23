import { Button, Input, Link, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { isMobile } from 'react-device-detect';

const Cupom = ({ SetApplyCupom, setDescontoValue, disabled, dataArrays3 }) => {
    const [cupomValue, setCupomValue] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false)
    const router = useRouter();
    const { cupom } = router.query;

    useEffect(() => {
        if (cupom && cupom !== "" && acceptCupom(dataArrays3)) {
            setCupomValue(cupom);
            cupomVerify(null, cupom);
        }
        if (!acceptCupom(dataArrays3)) {
            SetApplyCupom("");
            setDescontoValue(0);
        }
    }, [cupom, dataArrays3]);

    const acceptCupom = (dataArrays3) => {
        if (!Array.isArray(dataArrays3) || !dataArrays3.every(item => typeof item === 'object' && item.quantity !== undefined)) {
            return false;
        }

        const totalQuantities = dataArrays3.reduce((total, item) => total + (item.quantity || 0), 0);

        return totalQuantities >= 3;
    };

    const cupomVerify = async (e, cupomvalue) => {
        if (e) {
            e.preventDefault();
        }

        if (cupomvalue && cupomvalue !== "" && acceptCupom(dataArrays3)) {
            try {
                setLoading(true)
                const cupomResponse = await axios.post(process.env.NEXT_PUBLIC_BACKEND + "/cupom/verify", {
                    codigo: cupomvalue
                });

                if (cupomResponse.status === 200) {
                    setLoading(false)
                    if (cupomResponse?.data?.desconto) {
                        SetApplyCupom(cupomvalue);
                        setDescontoValue(cupomResponse.data.desconto);
                        setIsModalOpen(false);
                    } else {
                        SetApplyCupom("");
                        setDescontoValue(0);
                    }
                } else {
                    setLoading(false)
                    SetApplyCupom("");
                    setDescontoValue(0);
                }
            } catch (error) {
                setLoading(false)
                SetApplyCupom("");
                setDescontoValue(0);
            }
        } else {
            setLoading(false)
            SetApplyCupom("");
            setDescontoValue(0);
        }
    };

    return (
        <>
            <h2 className='font-medium text-sm py-1'>
                {!acceptCupom(dataArrays3) ? ("O Cupom requer no mínimo 3 produtos.") :
                    <Link onClick={() => setIsModalOpen(true)} color="blue.500">Adicionar Cupom</Link>}
            </h2>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Adicionar Cupom</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Input
                            placeholder="Insira o cupom"
                            value={cupomValue}
                            onChange={(e) => setCupomValue(e.target.value)}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button className='mr-2' onClick={() => setIsModalOpen(false)}>Cancel</Button>
                        <Button isDisabled={loading} colorScheme="whatsapp" onClick={() => cupomVerify(null, cupomValue)}>
                            Aplicar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default Cupom;
