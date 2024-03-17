import React from "react"
import Link from "next/link"
import SocialLink from "./SocialLink";
import { Divider } from "@chakra-ui/react";

const Footer = () => {
    const anoAtual = new Date().getFullYear();
    return (
        <>
            <div className="bg-white p-6 pb-[5rem] mt-[5rem] mb-0">
                <div className="lg:max-w-7xl mr-auto ml-auto">
                    <div className="sm:flex">
                        <div className="md:mx-5 sm:text-left text-center sm:w-[50%] mr-2 w-full mb-4 sm:mb-0">
                            <h1 className=" md:text-2xl mb-1 text-lg font-medium ">Contato</h1>
                            <h2 className=" md:text-xl text-[1rem] font-light">(31) 99792-1877</h2>
                            <h2 className="  md:text-xl text-[1rem] font-light">dmsports.store@gmail.com</h2>
                        </div>
                        <div className="md:mx-5 sm:text-left text-center sm:w-[50%] mr-2 w-full mb-4 sm:mb-0">
                            <h1 className=" md:text-2xl mb-1 text-lg font-medium ">Políticas</h1>
                            <Link  href={"/politicas/aviso"} className=" md:my-2 my-2 md:text-xl block text-[1rem] font-light hover:text-green-600 text-black duration-300 ease-in-out">Aviso Legal</Link>
                            <Link  href={"/politicas/privacidade"} className=" md:my-2 my-2 md:text-xl block text-[1rem] font-light hover:text-green-600 text-black duration-300 ease-in-out">Política de Privacidade</Link>
                            <Link  href={"/politicas/troca"} className=" md:my-2 my-2 md:text-xl block text-[1rem] font-light hover:text-green-600 text-black duration-300 ease-in-out">Política Troca e Devolução</Link>
                            <Link  href={"/politicas/reembolso"} className=" md:my-2 my-2 md:text-xl block text-[1rem] font-light hover:text-green-600 text-black duration-300 ease-in-out">Políticas de Reembolso</Link>
                            <Link  href={"/politicas/envio"} className=" md:my-2 my-2 md:text-xl block text-[1rem] font-light hover:text-green-600 text-black duration-300 ease-in-out">Políticas de Envio</Link>
                        </div>
                        <div className="md:mx-5 sm:text-left text-center sm:w-[50%] mr-2 w-full mb-4 sm:mb-0">
                            <h1 className=" md:text-2xl mb-1 text-lg font-medium ">Acesso Rápido</h1>
                            <Link  href={"https://rastreamento.correios.com.br/app"} className=" md:text-xl text-[1rem] font-light hover:text-green-600 text-black duration-300 ease-in-out">Rastrear Pedido</Link>
                        </div>
                        <div className="sm:mx-5 sm:w-[50%] mr-2 text-center sm:text-left justify-center">
                            <h1 className=" sm:text-2xl mb-1 text-lg font-medium ">Social</h1>
                            <div className="sm:gap-5">
                                <div className="sm:block sm:justify-start flex justify-center">
                                    <SocialLink className={"mr-auto ml-auto"} rede="instagram" />
                                </div>
                                <div className="sm:block sm:justify-start flex justify-center">
                                    <SocialLink rede="twitter" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="sm:flex justify-between my-4 mr-auto ml-auto">
                        <div className="mr-auto ml-auto flex">
                            <img className="drop-shadow-md mr-auto ml-auto object-contain " src="/bandeiras.png" width={320} height={80}></img>
                        </div>
                        <div className="mr-auto ml-auto flex">
                            <img className="drop-shadow-md mr-auto ml-auto object-contain " src="/secured.png" width={320} height={80}></img>
                        </div>
                    </div>
                    <div className="bottom-0 absolute mb-3 md:mx-5 md:flex">
                        <div className="flex">
                            <div><p >{anoAtual} © DMSPORTS  <span className="mx-2">•</span> Powered by: <Link className=" hover:text-blue-600 text-blue-700 duration-300 ease-in-out " href={"https://www.instagram.com/_rafadev_/"}>@_rafadev_</Link></p></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer