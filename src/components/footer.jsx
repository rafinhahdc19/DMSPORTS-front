import Link from "next/link";

export default function Footer() {
    const currentYear = new Date().getFullYear(); // Obter o ano atual dinamicamente

    return (
        <div className="bg-white b-0 mt-[4rem]">
            <div className="flex justify-between">
                <div className='px-16 py-10'>
                    <h5 className='font-medium text-xl'>Telefone</h5>
                    <p className='font-medium text-lg'>+55 77 99196-4479</p>
                </div>
                <div className='px-16 py-10 -translate-x-52'>
                    <h5 className='font-medium text-xl'>Desenvolvido por: </h5>
                    <p className='font-medium text-lg'><Link className=" text-blue-600 " href={"https://www.instagram.com/_rafadev_/"}>@_rafadev_</Link></p>
                </div>
                <div></div>
            </div>
            <div className='pb-4 text-center font-normal text-xl'>
                <h5>{currentYear} © DMSPORTS</h5>
            </div>
        </div>
    );
}