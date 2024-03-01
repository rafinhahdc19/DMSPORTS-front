import React from "react"
import Link from "next/link"
import SocialLink from "./SocialLink";
import { Divider } from "@chakra-ui/react";

const Footer = () => {
    const anoAtual = new Date().getFullYear();
    return (
        <>
            <div className="bg-white p-6 pb-[5rem] mt-[5rem] mb-0">
                <div className="lg:max-w-7xl  mr-auto ml-auto">
                    <div className="sm:flex">
                        <div className="md:mx-5 sm:text-left text-center sm:w-[50%] mr-2 w-full mb-4 sm:mb-0">
                            <h1 className=" md:text-2xl mb-1 text-lg font-medium ">Contato</h1>
                            <h2 className=" md:text-xl text-[1rem] font-light">(31) 9792-1877</h2>
                            <h2 className="  md:text-xl text-[1rem] font-light">dmsports.store@gmail.com</h2>
                        </div>
                        {/*
                        <div className="md:mx-5 ml-2 w-[50%] md:w-auto">
                            <h1 className=" md:text-2xl mb-1 text-lg font-medium ">Desenvolvido por:</h1>
                            <p className='md:font-medium md:text-lg'><Link className=" text-blue-600 " href={"https://www.instagram.com/_rafadev_/"}>@_rafadev_</Link></p>
                        </div>*/
                        }
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
                    <div className="bottom-0 absolute mb-3 md:mx-5 md:flex">
                        {/*<p className="md:hidden mb-3">dmsports.store@gmail.com</p>*/}
                        <div className="flex">
                            <div><p >{anoAtual} © DMSPORTS  <span className="mx-2">•</span> Powered by: <Link className=" text-blue-600 " href={"https://www.instagram.com/_rafadev_/"}>@_rafadev_</Link></p></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer