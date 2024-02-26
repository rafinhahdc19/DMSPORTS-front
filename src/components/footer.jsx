import React from "react"
import Link from "next/link"

const Footer = () => {
    const anoAtual = new Date().getFullYear();
    return (
        <>
            <div className="bg-white p-6 pb-[5rem] mt-[5rem] mb-0">
                <div className="lg:max-w-7xl  mr-auto ml-auto">
                    <div className="flex">
                        <div className="md:mx-5 mr-2 w-[50%] md:w-auto">
                            <h1 className=" md:text-2xl text-lg font-medium ">Telefone</h1>
                            <h2 className=" md:text-xl text-[1rem] font-light">(77) 123456789</h2>
                        </div>
                        <div className="md:mx-5 ml-2 w-[50%] md:w-auto">
                            <h1 className=" md:text-2xl text-lg font-medium ">Desenvolvido por:</h1>
                            <p className='md:font-medium md:text-lg'><Link className=" text-blue-600 " href={"https://www.instagram.com/_rafadev_/"}>@_rafadev_</Link></p>
                        </div>
                    </div>
                    <p className="bottom-0 absolute mb-3 md:mx-5">{anoAtual} © DMSPORTS</p>
                </div>
            </div>
        </>
    )
}

export default Footer