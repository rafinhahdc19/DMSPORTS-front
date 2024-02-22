import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import { useState } from 'react'
import ItenCont from '@/components/itenscont'
import Link from 'next/link'
import Router, { useRouter } from 'next/router'
import Head from 'next/head'
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useNumberInput,
  Input,
  HStack,
  Box,
} from '@chakra-ui/react'
import { Spinner } from '@chakra-ui/react'

import { Card, Stack, Heading, Text, Button, CardHeader, CardBody, CardFooter, Divider, ButtonGroup } from '@chakra-ui/react'
import Navbar from '@/components/navbar'
import axios from 'axios'
import Cupom from '@/components/Cupom'

const Index = () => {
  const router = useRouter()
  const [loading, setloading] = useState(false)
  const [applyCupom, SetApplyCupom] = useState("")
  const [desconto, setDescontoValue] = useState(0)
  const [resultadoFinal, setresultadoFinal] = useState("000")
  const [resultadoFinalSemDesconto, setresultadoFinalSemDesconto] = useState("000")
  const calcularResultado = (desconto) => {
    let total = 0;

    dataArrays3.forEach((item) => {
      const { quantity, value } = item;
      const resultadoItem = quantity * value;
      total += resultadoItem;
    });
    setresultadoFinalSemDesconto(total)
    // Aplicar desconto se houver
    if (desconto > 0 && desconto <= 100) {
      const descontoDecimal = desconto / 100; // Converter para porcentagem decimal
      total *= (1 - descontoDecimal); // Aplicar o desconto como uma porcentagem
    }

    return total;
  };
  const [Loading, setLoading] = useState(<div className='w-full justify-center flex p-4'><Stack className='mr-auto ml-auto' direction='row' spacing={4}> <Spinner size='xl' color='red.500' /> </Stack></div>)
  const [dataArrays, setdataar] = useState([])
  const [dataArrays2, setdataar2] = useState([])
  const [dataArrays3, setdataar3] = useState([])

  const updateLocalStorage = (slug, valor, tipo) => {

    const existingCars = JSON.parse(localStorage.getItem('user_car')) || [];

    let existingCar
    if (tipo) {
      existingCar = existingCars.find((car) => car.slug === slug && car.tipo === tipo);
    } else {
      existingCar = existingCars.find((car) => car.slug === slug);
    }


    console.log("aq", existingCar, tipo)

    if (existingCar) {
      existingCar.quantity = valor;
    } else {
    }
    localStorage.setItem('user_car', JSON.stringify(existingCars));
    setdataar2(existingCars);
  };
  const DeleteProdLocalStorage = (slug, tipo) => {
    const existingCars = JSON.parse(localStorage.getItem('user_car')) || [];

    const existingCarIndex = existingCars.findIndex((car) => car.slug === slug && car.tipo == tipo);

    if (existingCarIndex !== -1) {
      existingCars.splice(existingCarIndex, 1);


      localStorage.setItem('user_car', JSON.stringify(existingCars));

      const remainingItems = dataArrays3.filter((item) => item.slug !== slug);
      setdataar3(remainingItems);
      setdataar2(existingCars)
    }
    if (dataArrays3.length < 0) {

    } else {
      setLoading(<div className='p-6'>
        <h1 className='text-xl font-medium text-center text-black'>
          Não existe nenhum item no carrinho!
        </h1>
      </div>);
    }



  };
  const CleanCar = () => {
    localStorage.removeItem('user_car');
    setdataar3([]);
    setdataar2([]);
    setLoading(<div className='p-6'>
      <h1 className='text-xl font-medium text-center text-black'>
        Não existe nenhum item no carrinho!
      </h1>
    </div>);
  }
  const updateLocalStorages = (slug, valor, tipo) => {
    const existingCars = JSON.parse(localStorage.getItem('user_car')) || [];
    const existingCar = existingCars.find((car) => car.slug === slug && car.tipo === tipo);
    if (existingCar) {
      existingCar.quantity = valor;
    } else {

    }

    localStorage.setItem('user_car', JSON.stringify(existingCars));
    setdataar2(existingCars);
  };



  const formatCurrency = (valueInCents) => {
    const valueInReal = valueInCents / 100;

    const numberFormat = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });

    return numberFormat.format(valueInReal);
  };


  useEffect(() => {
    const itenCa = localStorage.getItem('user_car');
    const itenCar = itenCa ? JSON.parse(itenCa) : [];
    setdataar2(itenCar)

    const getItemcarsda = async () => {
      if (itenCar != []) {
        const itensfromdb = await axios.post(process.env.NEXT_PUBLIC_BACKEND + "/products/car", {
          slugs: itenCar
        }).then(function (response) {
          console.log("cavalo", response.data.itens)
          setdataar(response.data.itens)

        }).catch(function (error) {
          console.log(error)
        })
      }
    }
    getItemcarsda()



  }, [])
  useEffect(() => {

    const arrayResultado = [];
    for (const item of dataArrays2) {
      const { slug, quantity, tipo } = item;

      const produtoEncontrado = dataArrays.find(produto => produto.slug === slug && produto.tipo == tipo);

      if (produtoEncontrado) {
        console.log("oni", produtoEncontrado)
        const { slug, nome, desc, imgurl, value, tipo = null, tipos = null, ident } = produtoEncontrado;
        console.log("aq3d:", slug, nome, desc, imgurl, value, tipo, tipos, ident)
        console.log(tipos, tipo, tipos.some(item => item.id === tipo))
        if (tipos && tipos.some(item => item.id === tipo)) {
          arrayResultado.push({ slug, nome, desc, imgurl, value, quantity, tipo, tipos, ident });
          setdataar3(arrayResultado);
        } else if ((tipo === null && tipos === null) || (tipo === "" && tipos.length === 0)) {
          arrayResultado.push({ slug, nome, desc, imgurl, value, quantity, tipo, tipos, ident });
          setdataar3(arrayResultado);
        }
      }
    }


  }, [dataArrays, dataArrays2]);


  useEffect(() => {
    const loadingContent = dataArrays2.length > 0 ? null : (
      <div className='p-6'>
        <h1 className='text-xl font-medium text-center text-black'>
          Não existe nenhum item no carrinho!
        </h1>
      </div>
    );
    setLoading(loadingContent);
  }, [dataArrays2]);

  useEffect(() => {
    setresultadoFinal(calcularResultado(desconto))
  }, [desconto, dataArrays3])

  const getTokenForPay = async () => {
    setloading(true)
    try {
      const response = await axios.post(process.env.NEXT_PUBLIC_BACKEND + "/products/tokenforpay", {
        purchase: {
          cupom: (applyCupom !== "" ? applyCupom : ""),
          produtos: dataArrays2
        }
      })
      const mensagem = "Olá! Gostaria de finalizar a compra desses produtos: "+process.env.NEXT_PUBLIC_FRONTEND+"/listadeprodutos/"+response.data.slug;
      const numero = process.env.NEXT_PUBLIC_TELNUMBER;
      const link = `https://wa.me/${numero}/?text=${encodeURIComponent(mensagem)}`;
      router.push(link);

      setloading(false)
    } catch (err) {
      setloading(false)
    }
  }

  const OriginalValue = (value) => {
    return (parseInt(value, 10) * 1.5).toString()
  }
  const findTipoById = (id, array) => {
    for (let i = 0; i < array.length; i++) {
      const tipos = array[i].tipos;
      if (tipos) {
        const typeFilter = tipos.filter((item) => item.id === id);
        if (typeFilter.length > 0) {
          return typeFilter[0].nome; // Retorna o nome do tipo se encontrado
        }
      }
    }
    return null; // Retorna null se o tipo não for encontrado
  };

  useEffect(() => {

  }, [dataArrays3])


  return (
    <>
      <header className='fixed w-full z-10 top-0'><Navbar></Navbar></header>
      <main className='md:mt-[8rem] w-full justify-center mt-[7rem]'>
        <div className=' flex gap-2 rounded-md justify-between mr-auto ml-auto md:max-w-7xl'>
          <div className='md:w-[67%] lg:w-[70%] w-full'>
            <div className='w-[100%] md:mb-0 mb-[14rem] bg-white drop-shadow-md rounded-md'>
              <div className='flex p-2 justify-between'>
                <h2 className=' text-black font-medium pl-2 mt-auto mb-auto'>Produtos</h2>
                <Button onClick={() => CleanCar()} colorScheme='red' className='text-red-500 mr-2 flex'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg><span>Apagar tudo</span>
                </Button>


              </div>

              <Divider borderBottomColor={"blackAlpha.400"}></Divider>
              {console.log("aq2", dataArrays3)}
              {dataArrays3.length > 0 ? (

                dataArrays3.map((item) => {
                  { console.log(item) }
                  return (
                    <div key={item.ident} className='flex w-full p-1'>
                      <button onClick={() => { Router.push("/product/" + item.slug) }} className='flex w-full p-1'>
                        <div className='flex p-4 w-full border rounded m-2 border-gray-200'>

                          <div className='rounded '>
                            <Image
                              className='rounded'
                              width={"200"}
                              height={"200"}
                              src={process.env.NEXT_PUBLIC_BACKEND + "/image?imageUrl=" + item.imgurl}
                              alt='Foto do Produto'
                              borderRadius='lg' />
                            <div className='md:hidden block'>
                              <ButtonGroup paddingTop={2} spacing='2'>
                                <Button className=' flex text-right ' onClick={(e) => { e.stopPropagation(), DeleteProdLocalStorage(item.slug, item.tipo) }} colorScheme='red' variant='ghost' >
                                  <p>Apagar</p>
                                </Button>
                              </ButtonGroup>
                            </div>
                          </div>
                          <div className='w-full' >
                            <div className='md:flex'>
                              <div>
                                <Box style={{ wordBreak: 'break-word' }}>
                                  <Text className='text-black md:text-2xl text-left text-base font-medium mx-3' fontSize='xl' textDecor="none" noOfLines={2}>
                                    {item.nome}
                                  </Text>
                                </Box>
                                {findTipoById(item.tipo, dataArrays) !== null && (
                                  <Box style={{ wordBreak: 'break-word' }}>
                                    <Text className='text-black md:text-xl text-left text-xs mx-3 py-1' fontSize='xl' textDecor="none" noOfLines={2}>
                                      {"Tipo/Tamanho: " + findTipoById(item.tipo, dataArrays)}
                                    </Text>
                                  </Box>
                                )}

                              </div>
                              <div className='mx-4 ml-auto px-4 py-1 md:pt-2 pt-2'>
                                <ItenCont className="w-full" IFunction={updateLocalStorage} DFunction={updateLocalStorages} DValue={item.quantity} Slug={item.slug} Tipo={item.tipo}></ItenCont>

                              </div>
                            </div>
                            <div className='md:mt-4 mt-1 px-4'>
                              <div className='bg-gray-50 w-full gap-1 flex md:p-2 p-1 md:mr-0 rounded'>
                                <Text className='text-left' textDecoration="none" color='blue.600' fontSize='xl'>
                                  {formatCurrency(item.value)}
                                </Text>
                                <Text className='text-left mt-auto mb-[2px]' style={{ textDecoration: 'line-through' }} textDecoration="none" color='blue.600' fontSize='sm'>
                                  {formatCurrency(OriginalValue(item.value))}
                                </Text>
                              </div>
                              <div className='hidden justify-start md:flex'>
                                <ButtonGroup paddingTop={2} spacing='2'>
                                  <Button className=' flex ' onClick={(e) => { e.stopPropagation(), DeleteProdLocalStorage(item.slug, item.tipo) }} colorScheme='red' variant='ghost' >
                                    <p>Apagar</p>
                                  </Button>
                                </ButtonGroup>
                              </div>
                            </div>
                          </div>
                        </div>
                      </button>
                    </div>)
                })
              ) : (


                Loading



              )}


            </div>

          </div>
          <div className='md:w-[35%] lg:w-[38%] w-full md:relative fixed bottom-0'>
            <div className='md:relative fixed w-full bottom-0 bg-white drop-shadow-md rounded-md right-0'>
              <div className='md:block hidden'>
                <h2 className='p-4 text-black font-medium'>Resumo da compra</h2>
                <Divider borderBottomColor={"blackAlpha.400"}></Divider></div>
              <div className=' justify-between flex text-black md:px-4 md:mt-4 mt-2 pb-2 p-1 px-4 '>
                <p className=' font-light '>
                  Produto(s)
                </p>
                <Text className='font-light' textDecoration="none" color='blue.600' fontSize='lg'>
                  {formatCurrency(resultadoFinalSemDesconto)}
                </Text>
              </div>
              {resultadoFinalSemDesconto !== resultadoFinal && applyCupom !== "" && (
                <div className=' justify-between flex text-black md:px-4 md:mt-1 md:pb-3 p-1 px-4 '>
                  <p className=' font-light '>
                    Desconto(s)
                  </p>
                  <Text style={{ textDecoration: 'line-through' }} className='font-light' textDecoration="none" color='blue.600' fontSize='lg'>
                    {formatCurrency(resultadoFinalSemDesconto - resultadoFinal)}
                  </Text>
                </div>
              )}

              <div className=' justify-between flex text-black md:px-4 px-4 '>
                <p className=' font-medium md:text-xl text-lg'>
                  Total
                </p>
                <Text textDecoration="none" color='blue.600' fontSize='xl'>
                  {formatCurrency(resultadoFinal)}
                </Text>
              </div>


              <div className='px-4 pt-4 pb-2 gap-2 md:block hidden text-black  mr-auto ml-auto'>
                <p className='flex gap-2 mb-6 mt-3'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                  <span className=''> Compra segura</span>
                </p>
                <p className='flex gap-2 mt-6'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                  </svg><span> Entrega para todo brasil</span>
                </p>
              </div>
              <div className='px-4 md:p-4 pb-2 pt-1'>
                <Cupom dataArrays3={dataArrays3} disabled={applyCupom != ""} SetApplyCupom={SetApplyCupom} setDescontoValue={setDescontoValue}></Cupom>
              </div>
              <div className='mx-4 mb-3 md:my-0 pb-4 my-2'>
                <Button onClick={() => getTokenForPay()} className="md:p-0 p-4 w-full" variant="solid" colorScheme="whatsapp" isDisabled={dataArrays3.length === 0 || loading}>
                  <span className={`flex break-words lg:text-base md:text-sm text-base`}>
                    Finalizar compra pelo Whatsapp
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default Index