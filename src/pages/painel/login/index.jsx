import React, { useState, useEffect } from 'react';
import { Input, Button, Alert, AlertIcon, AlertTitle } from '@chakra-ui/react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useRouter } from 'next/router';
import Navbar from '@/components/navbar';

const Index = () => {
  const router = useRouter();
  const [erro, setErro] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
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
      setLoading(true);
      const response = await axios.post(process.env.NEXT_PUBLIC_BACKEND + '/auth/login', formData);
      Cookies.set('token', response.data.token, { expires: 7, path: '/' });
      setLoading(false);
      setErro('');
      setSuccess(response.data.message);
      router.push("/painel/admin");
    } catch (error) {
      setLoading(false);
      setSuccess('');
      try {
        if (error.response && error.response.status === 429) {
          setErro("Muitas requisições, seja mais devagar.");
        } else if (error.response && error.response.data && error.response.data.message) {
          setErro(error.response.data.message);
        } else {
          setErro("Erro interno, volte mais tarde");
        }
      } catch (err) {
        setErro("Erro interno, volte mais tarde");
      }
    }
  }

  return (
    <>
      <Navbar />
      <main className='justify-center mt-20 flex'>
        <div className='w-full h-full mt-20'>
          {erro !== "" && (
            <div className='lg:w-[37%] md:w-[63%] w-full ml-auto mr-auto'>
              <Alert className='rounded-lg mb-2' status='error'>
                <AlertIcon />
                <AlertTitle>{erro}</AlertTitle>
              </Alert>
            </div>
          )}
          {success !== "" && (
            <div className='lg:w-[37%] md:w-[63%] w-full ml-auto mr-auto'>
              <Alert className='rounded-lg mb-2' status='success'>
                <AlertIcon />
                <AlertTitle>{success}</AlertTitle>
              </Alert>
            </div>
          )}

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
  );
}

export default Index;
