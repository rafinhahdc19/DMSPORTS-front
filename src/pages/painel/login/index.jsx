import React from 'react'
import Image from 'next/image'
import { Input } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import Link from 'next/link'
import { useState } from 'react'
import Cookies from 'js-cookie';
import axios from 'axios'
import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
  } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import Navbar from '@/components/navbar'
import { useEffect } from 'react'

const index = () => {
    const router = useRouter()
    const [erro, seterro] = useState("")
    const [success, setsuccess] = useState("")
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        password: ''
      });

      useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            router.push('/painel/admin');
        }
    }, []);
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      }
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            setLoading(true)
            const response = await axios.post(process.env.NEXT_PUBLIC_BACKEND+'/auth/login', formData);
            Cookies.set('token', response.data.token, { expires: 7, path: '/' })
            setLoading(false)
            console.log(response.data.message)
            seterro("")
            setsuccess(response.data.message)
            router.push("/painel/admin")
        } catch (error) {
          console.log(error)
            setLoading(false)
            setsuccess("")
            try{
              if(error.status == 429){
                seterro("Muitas requisições, seja mais devagar.")
              }
              seterro(error.response.data.message)
            }catch(erro){
              seterro("Erro interno, volte mais tarde")
            }
            
        }
      }
    return (
        <>
        <Navbar></Navbar>
          <main className='justify-center mt-20 flex'>
            <div className='w-full h-full mt-20'>
              {erro != "" ? (
                    <div className='lg:w-[37%] md:w-[63%] w-full ml-auto mr-auto'>
                        <Alert className='rounded-lg mb-2' status='error'>
                        <AlertIcon />
                        <AlertTitle>{erro}</AlertTitle>
                        </Alert>
                    </div>
                ) : null}
                {success != "" ? (
                    <div className='lg:w-[37%] md:w-[63%] w-full ml-auto mr-auto'>
                        <Alert className='rounded-lg mb-2' status='success'>
                        <AlertIcon />
                        <AlertTitle>{success}</AlertTitle>
                        </Alert>
                    </div>
                ) : null}
              
              <div className='bg-white rounded-lg p-6 mb-6 lg:w-[37%] md:w-[63%] w-full ml-auto mr-auto drop-shadow-md'>
                <h1 className='font-bold text-2xl my-2 '>Faça login</h1>
                <h2 className='text-black text-lg mb-5 opacity-70 '>Insira suas credenciais abaixo:</h2>
                <form onSubmit={handleSubmit}>
                  <label className='font-medium' htmlFor="email">Email</label>
                  <Input
                    size="lg"
                    focusBorderColor='lime'
                    className="my-2"
                    placeholder='Email'
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                  />
                  <label className='font-medium' htmlFor="password">Senha</label>
                  <Input
                    size="lg"
                    focusBorderColor='lime'
                    className="mb-4 mt-2"
                    placeholder='Senha'
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="current-password"
                  />
                  <Button
                    isLoading={loading}
                    bgColor="#58D938"
                    colorScheme='green'
                    className="my-4 w-full"
                    color="white"
                    type="submit"
                  >
                    Entrar
                  </Button>
                </form>
              </div>
            </div>
          </main>
        </>
      )
    }

export default index