import React from 'react'
import Navbar from '@/components/navbar'
import Image from 'next/image'
import { Card, Stack, Heading, Text, Button, CardHeader, CardBody, CardFooter, Divider, ButtonGroup } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import {
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    useNumberInput,
    Input,
    HStack,
    Skeleton
} from '@chakra-ui/react'
import Link from 'next/link'
import axios from 'axios'
import { useToast } from '@chakra-ui/react'
import EditProduct from '@/components/editProduct'
import AuthVerify from '@/components/VerifyerNotPush'
import AuthVerifyNotPush from '@/components/VerifyerNotPush'
import DeleteProduct from '@/components/DeleteProduct'


const Index = () => {
    const toast = useToast()
    const [tipo, setTipo] = useState("")
    const [loading, setloading] = useState(false)
    const router = useRouter();
    const { id } = router.query;

    const [att, setAtt] = useState(1)

    const updateLocalStorage = (slug, tipos) => {
        if (tipo === "" && tipos.length > 0) {
            toast({
                title: `Erro ao adicionar`,
                description: "Primeiramente selecione um tipo",
                status: "warning",
                duration: 9000,
                isClosable: true,
            })
            return
        }
        const existingCars = JSON.parse(localStorage.getItem('user_car')) || [];

        const existingCarsWithSameSlug = existingCars.filter((car) => car.slug === slug);

        // Verificar se pelo menos um dos carros com o mesmo slug tem o mesmo tipo
        const existsCarWithSameType = existingCarsWithSameSlug.some((car) => car.tipo === tipo);

        if (existsCarWithSameType) {
            existingCarsWithSameSlug.forEach((existingCar) => {
                existingCar.quantity = 1;
            });

            toast({
                title: 'Esse produto já foi adicionado no carrinho',
                status: 'warning',
                duration: 9000,
                isClosable: true,
            });
        } else {
            existingCars.push({ slug, quantity: 1, tipo: tipo });

            toast({
                title: 'Produto adicionado no carrinho',
                status: 'success',
                duration: 9000,
                isClosable: true,
            });
        }

        localStorage.setItem('user_car', JSON.stringify(existingCars));




    };

    const formatCurrency = (valueInCents) => {
        const valueInReal = valueInCents / 100;

        const numberFormat = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        });

        return numberFormat.format(valueInReal);
    };
    const [dataArrays, setdataar] = useState([])
    const slugs = id

    useEffect(() => {
        const item = axios.post(process.env.NEXT_PUBLIC_BACKEND + "/product/get", {
            slug: slugs
        }).then(function (response) {
            setdataar([response.data])
        }).catch(function (response) {
            setdataar([])
        })
    }, [id, att])
    const itemToShow = dataArrays.find(item => item?.slug === id);
    const itemToBuy = [{
        slug: id,
        quantity: 1,
    }];
    const listTo64 = btoa(encodeURIComponent(JSON.stringify(itemToBuy)))
    const getTokenForPay = async () => {
        setloading(true)
        try {
            const response = await axios.post(process.env.NEXT_PUBLIC_BACKEND + "/products/tokenforpay", {
                purchase: {
                    cupom: "",
                    produtos: [{ slug: id, quantity: 1 }]
                }
            })
            const mensagem = "Olá! Gostaria de finalizar a compra desses produtos: " + process.env.NEXT_PUBLIC_FRONTEND + "/listadeprodutos/" + response.data.slug;
            const numero = process.env.NEXT_PUBLIC_TELNUMBER;
            const link = `https://wa.me/${numero}/?text=${encodeURIComponent(mensagem)}`;
            router.push(link);
            setloading(false)
        } catch (err) {
            setloading(false)
            console.log(err)
            toast({
                title: 'Erro na comunicação com o servidor.',
                status: 'error',
                duration: 9000,
                isClosable: true,
            });
        }
    }
    const OriginalValue = (value) => {
        return (parseInt(value, 10) * 1.5).toString()
    }
    return (
        <>


            <header className='fixed w-full z-10 top-0'><Navbar></Navbar></header>
            {itemToShow && (
                <main className='md:mt-[9rem] lg:max-w-6xl drop-shadow-sm rounded mt-[7rem] ml-auto mr-auto'>
                    <div className='bg-white rounded w-full p-4 md:pt-5 md:px-14 px-2 text-black'>

                        <div className='md:flex'>
                            <div className='md:w-[40%] md:mx-0 mx-2 rounded '>
                                <Image
                                    width={"600"}
                                    height={"600"}
                                    src={process.env.NEXT_PUBLIC_BACKEND + "/image?imageUrl=" + itemToShow.imgurl}
                                    alt='Foto do Produto'
                                    borderRadius='lg'
                                    className='rounded mr-auto ml-auto'
                                />
                            </div>
                            <div className='md:w-[60%] justify-center md:pl-10  px-2 mr-auto '>
                                <div className='md:w-[90%]'>
                                    <div className='flex justify-between'>
                                        <h1 className='font-medium text-2xl'>{itemToShow.nome}</h1>
                                        <AuthVerifyNotPush>
                                            <EditProduct oldFixado={itemToShow.fixado} setAtt={setAtt} att={att} slug={itemToShow.slug} oldDesc={itemToShow.desc} oldValue={itemToShow.value} oldTitle={itemToShow.nome}></EditProduct>
                                        </AuthVerifyNotPush>
                                    </div>
                                    <div className='bg-gray-50 my-4 md:p-4 flex gap-1 md:mr-0 rounded'>
                                        <Text className='text-[#0076ff]' textDecoration="none" color='blue.600' fontSize='4xl'>
                                            {formatCurrency(itemToShow.value)}
                                        </Text>
                                        <Text className='mt-auto mb-2 text-[#0052af] opacity-80' style={{ textDecoration: 'line-through' }} textDecoration="none" color='blue.600' fontSize='xl'>
                                            {formatCurrency(OriginalValue(itemToShow.value))}
                                        </Text>
                                    </div>
                                    <div className='flex justify-center'>
                                        <ul className='flex mr-auto ml-auto gap-4 w-full flex-wrap'>
                                            {itemToShow.tipos.map((Tipo) => (
                                                <li key={Tipo.id}>
                                                    <button onClick={() => { setTipo(Tipo.id) }}>

                                                        <div key={Tipo.id} className={`border px-4 py-2 duration-200 ease-in-out flex rounded-lg ${tipo == Tipo.id ? "border-green-500" : "border-black/50"}`} style={{ aspectRatio: '2/1', alignItems: 'center', justifyContent: 'center' }}>
                                                            <div>{Tipo.nome}</div>
                                                        </div>
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className='md:py-4 py-2'>
                                        <p className='flex gap-2 my-2'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                                            </svg><span> Entrega para todo o Brasil</span>
                                        </p>
                                        <p className='flex my-2 gap-2'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span> Pagamento com Seguro</span>
                                        </p>
                                    </div>
                                    <div className='md:py-4 py-2 justify-center md:justify-normal my-4 w-full'>

                                        <ul className='grid mr-auto ml-auto w-full gap-4 grid-cols-1'>
                                            <li>

                                                <button disabled={loading} onClick={() => updateLocalStorage(itemToShow.slug, itemToShow.tipos)} className='w-full focus:bg-blue-500 bg-green-500 hover:bg-green-600 duration-200 ease-in-out font-medium mr-auto ml-auto text-white rounded-md p-2'>
                                                    Adicionar ao carrinho
                                                </button>
                                            </li>
                                            <li>

                                                <button disabled={loading} onClick={() => getTokenForPay()} className='w-full bg-green-100 hover:bg-green-50 text-green-700 duration-200 font-medium mr-auto ml-auto ease-in-out rounded-md p-2'>
                                                    Comprar agora
                                                </button>

                                            </li>
                                        </ul>

                                    </div>
                                </div>

                            </div>
                        </div>
                        <Divider></Divider>
                        <div className='m-2'>
                            <div>
                                <h1 className='text-3xl my-4 font-medium'>Descrição do produto:</h1>
                                <h1 className='text-xl text-black/75 my-4 font-light'>{itemToShow.desc}</h1>
                            </div>
                            <AuthVerifyNotPush>
                                <DeleteProduct routerF={() => router.push("/")} setAtt={setAtt} att={att} slug={itemToShow.slug}></DeleteProduct>
                            </AuthVerifyNotPush>
                        </div>
                    </div>

                </main>
            )}
        </>
    )
}

export default Index