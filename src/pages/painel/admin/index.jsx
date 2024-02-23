import React, { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import CupomCard from "@/components/CupomCard";
import axios from "axios";
import Cookies from 'js-cookie';
import CreateCupom from "@/components/CreateCupom";
import CreateProduct from "@/components/CreateProduct";
import AuthVerify from "@/components/Verifyer";

const Index = () => {
    //consertar que se eu adicionar tipo e preencher e depois apagar o tipo ele continua com o valor em create products
    const [attCupom, setAttCupom] = useState(0)
    const [cupons, setCupons] = useState([]);
    const token = Cookies.get('token');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(process.env.NEXT_PUBLIC_BACKEND + "/cupom/get", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setCupons(response.data); // Armazena a resposta na variável cupons
            } catch (error) {
                console.error('Erro ao obter os cupons:', error);
                // Trate o erro conforme necessário
            }
        };

        fetchData(); // Chama a função fetchData ao montar o componente
    }, [token, attCupom]); // Adiciona token como dependência para reexecutar o efeito quando o token mudar

    return (
        <>
            <AuthVerify>
            <Navbar />
            <main className="mt-[8rem]">
                <h1 className="lg:max-w-7xl px-2 pb-4 font-semibold text-2xl mr-auto ml-auto">
                    Adicionar produto
                </h1>
                <div className="w-full lg:max-w-7xl pb-4 px-4 mr-auto ml-auto flex">
                    <CreateProduct></CreateProduct>
                </div>
                <h1 className="lg:max-w-7xl px-2 pb-4 font-semibold text-2xl mr-auto ml-auto">
                    Cupons
                </h1>
                <div className='grid lg:max-w-7xl mr-auto ml-auto lg:grid-cols-3 gap-4 md:grid-cols-2 grid-cols-1 mb-[9rem] px-4'>
                    {cupons.map((cupom) => (
                        <CupomCard
                            attCupom={attCupom}
                            setAttCupom={setAttCupom}
                            key={cupom.id}
                            codigo={cupom.codigo}
                            desconto={cupom.desconto + "%"}
                        />
                    ))}
                    <CreateCupom attCupom={attCupom} setAttCupom={setAttCupom}></CreateCupom>
                </div>
            </main>
            </AuthVerify>
        </>
    );
};

export default Index;
