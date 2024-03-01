import React from "react"
import Link from "next/link"
import SocialLink from "./SocialLink";

const Footer = () => {
    const anoAtual = new Date().getFullYear();
    return (
        <>
            <div className="bg-white p-6 pb-[5rem] mt-[5rem] mb-0">
                <div className="lg:max-w-7xl  mr-auto ml-auto">
                    <div className="flex">
                        <div className="md:mx-5 mr-2 w-[50%] md:w-auto">
                            <h1 className=" md:text-2xl mb-1 text-lg font-medium ">Contato</h1>
                            <h2 className=" md:text-xl text-[1rem] font-light">(31) 9792-1877</h2>
                            <h2 className=" md:text-xl text-[1rem] font-light">dmsports.store@gmail.com</h2>
                        </div>
                        {/*
                        <div className="md:mx-5 ml-2 w-[50%] md:w-auto">
                            <h1 className=" md:text-2xl mb-1 text-lg font-medium ">Desenvolvido por:</h1>
                            <p className='md:font-medium md:text-lg'><Link className=" text-blue-600 " href={"https://www.instagram.com/_rafadev_/"}>@_rafadev_</Link></p>
                        </div>*/
                        }
                        <div className="md:mx-5 mr-2 w-[50%] md:w-auto">
                            <h1 className=" md:text-2xl mb-1 text-lg font-medium ">Social</h1>
                            <div className="md:flex md:gap-5">
                                <SocialLink rede="instagram" />
                                <SocialLink rede="twitter" />
                            </div>
                        </div>
                    </div>
                    <p className="bottom-0 absolute mb-3 md:mx-5 flex">{anoAtual} © DMSPORTS <span className="mx-2">•</span> <h1 className="">Powered by: </h1><p className='md:font-medium ml-1 md:text-lg'><Link className=" text-blue-600 " href={"https://www.instagram.com/_rafadev_/"}>@_rafadev_</Link></p></p>
                </div>
            </div>
        </>
    )
}

export default Footer