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
import Cupomforpay from '@/components/Cupomforpay'

const Index = () => {
  const router = useRouter()
  const [applyCupom, SetApplyCupom] = useState("")
  const { slug } = router.query
  const { cupom } = router.query
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


  const formatCurrency = (valueInCents) => {
    const valueInReal = valueInCents / 100;

    const numberFormat = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });

    return numberFormat.format(valueInReal);
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(process.env.NEXT_PUBLIC_BACKEND + "/products/withtoken", {
          slug: slug[0]
        });
        const itenCar = response.data.purchase.produtos;
        if (response.data.purchase.cupom && response.data.purchase.cupom !== "" && (!cupom || cupom === "")) {
          router.push({
            pathname: '/listadeprodutos/'+slug[0],
            query: { cupom: response.data.purchase.cupom }
        })
        }
        console.log(itenCar)
        setdataar2(itenCar);

        if (itenCar.length > 0) {
          const response = await axios.post(process.env.NEXT_PUBLIC_BACKEND + "/products/car", {
            slugs: itenCar
          });
          setdataar(response.data.itens);
        }
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, [slug]);

  useEffect(() => {

    const arrayResultado = [];
    for (const item of dataArrays2) {
      const { slug, quantity, tipo } = item;

      const produtoEncontrado = dataArrays.find(produto => produto.slug === slug && produto.tipo == tipo);

      if (produtoEncontrado) {
        const { slug, nome, desc, imgurl, value, tipo = null, tipos = null, ident } = produtoEncontrado;
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
                <h2 className=' text-black font-medium pl-2 py-2 mt-auto mb-auto'>Produtos</h2>


              </div>

              <Divider borderBottomColor={"blackAlpha.400"}></Divider>
              {dataArrays3.length > 0 ? (

                dataArrays3.map((item) => {
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
                <Cupomforpay dataArrays3={dataArrays3} disabled={applyCupom != ""} SetApplyCupom={SetApplyCupom} setDescontoValue={setDescontoValue}></Cupomforpay>
              </div>

            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default Index