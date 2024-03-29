import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { useEffect } from 'react'
import { Input } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import Router from 'next/router'
import { useRouter } from 'next/router'
import AuthVerify from './Verifyer'
import AuthVerifyNotPush from './VerifyerNotPush'

const Navbar = ({ search, att, gatilho, setgatilho }) => {
  const router = useRouter();
  const [navbar, setNavbar] = useState(false);
  const [usedCar, setUsedCar] = useState("block");
  const [Search, setsearch] = useState(search ? search : "");

  useEffect(() => {
    if (search && search.trim().length > 0) {
      setsearch(search);
    } else {
      setsearch("");
    }
  }, [search]);


  const routerFunc = (e) => {
    e.preventDefault();
    if (gatilho) {
      setgatilho(gatilho + 1)
    }
    router.push('/?search=' + encodeURIComponent(Search))
  }
  return (
    <div>
      <nav className="w-full bg-[#FFF] drop-shadow-lg fixed top-0 left-0 right-0 z-50">
        <div className="justify-between md:py-0 px-1  mx-auto w-full lg:max-w-7xl md:items-center md:flex md:px-1">
          <div className='w-full'>

            <div className="flex items-center justify-between py-3 md:pb-1 md:pt-3 md:block">

              <div className=' flex  w-full '>
                <div>
                  <Link href="/?search=">
                    <Image src={"/logo.png"} className={'md:w-[80px] md:pl-0 pl-2 object-contain md:h-[80px] w-[75px] h-[75px]'} alt='logo' width={'70'} height={'70'} />
                  </Link>
                </div>
                <div className='w-[100%] mt-auto md:px-4 px-1 mb-auto ml-2 md:ml-3'>
                  <form onSubmit={(e) => { routerFunc(e) }}>
                    <div className='flex border justify-between rounded-md border-gray-300 p-1 pl-3'>

                      <Input value={Search} type={"text"} onChange={(e) => setsearch(e.target.value)} className='w-full' variant='unstyled' placeholder='Buscar' color={'black'} />

                      <Button type='submit' className='mr-auto' padding={4} colorScheme='whatsapp' isDisabled={Search === ""}>

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="md:w-6 md:h-6 w-8 h-8">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>

                      </Button>



                    </div></form>
                </div>
              </div>
              <div className="md:hidden">
                <button
                  onClick={() => setNavbar(!navbar)}
                  type='button'
                  className='inline-flex ml-1 items-center justify-center p-2 rounded-md text-black hover:bg-gray-100  ease-in-out duration-300 focus:outline-none  '
                  aria-label='Menu'
                  aria-expanded='false'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-7 h-7'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className='items-center mt-1 justify-center hidden md:flex'>
            <div className="text-base mt-auto mb-auto mr-auto ml-auto text-black py-3 px-6 text-center  border-b-2 md:border-b-0  focus:bg-gray-200 rounded-sm   border-black   md:hover:bg-transparent">
              <Link className='flex' href="/carrinho" onClick={() => setNavbar(!navbar)}>

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg><div className={usedCar + ' bg-red-500 h-2 rounded-full  w-2'}></div><span className='mt-auto mb-auto ml-3 block md:hidden'>Carrinho</span>

              </Link>
            </div>
          </div>
          <div
            className={`flex-1 justify-self-center pb-3 mt-2 md:hidden md:pb-0 md:mt-0 ${navbar ? 'p-9 md:p-0 block' : 'hidden'
              }`}
          >
            <ul className="h-screen md:h-auto items-center justify-center md:flex ">

              <li className="pb-3 md:hidden text-md text-black py-3 px-6 text-center  border-b-2 md:border-b-0  focus:bg-gray-200 rounded-sm   border-black   md:hover:bg-transparent">
                <Link className='flex' href="/carrinho" onClick={() => setNavbar(!navbar)}>

                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                  </svg><div className={usedCar + ' bg-red-500 h-2 rounded-full  w-2'}></div><span className='mt-auto mb-auto ml-3 block md:hidden'>Carrinho</span>

                </Link>
              </li>
              <li className="pb-3 md:hidden text-base text-black py-3 px-6 text-center  border-b md:border-b-0  focus:bg-gray-200 rounded-sm   border-black   md:hover:bg-transparent">
                <Link className='flex' href={"/?search=" + encodeURIComponent("jacket")} onClick={() => setNavbar(!navbar)}>

                  <span className='mt-auto mb-auto text-sm block md:hidden'>Jaquetas</span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 ml-2 mt-auto mb-auto">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                  </svg>


                </Link>
              </li>
              <li className="pb-3 md:hidden text-base text-black py-3 px-6 text-center  border-b md:border-b-0  focus:bg-gray-200 rounded-sm   border-black   md:hover:bg-transparent">
                <Link className='flex' href={"/?search=" + encodeURIComponent("Sweatshirt")} onClick={() => setNavbar(!navbar)}>

                  <span className='mt-auto mb-auto text-sm block md:hidden'>Moletom</span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 ml-2 mt-auto mb-auto">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                  </svg>


                </Link>
              </li>
              <li className="pb-3 md:hidden text-base text-black py-3 px-6 text-center  border-b md:border-b-0  focus:bg-gray-200 rounded-sm   border-black   md:hover:bg-transparent">
                <Link className='flex' href={"/?search=" + encodeURIComponent("Polo")} onClick={() => setNavbar(!navbar)}>

                  <span className='mt-auto mb-auto text-sm block md:hidden'>Polo</span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 ml-2 mt-auto mb-auto">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                  </svg>


                </Link>
              </li>
              <li className="pb-3 md:hidden text-base text-black py-3 px-6 text-center  border-b md:border-b-0  focus:bg-gray-200 rounded-sm   border-black   md:hover:bg-transparent">
                <Link className='flex' href={"/?search=" + encodeURIComponent("23-24")} onClick={() => setNavbar(!navbar)}>

                  <span className='mt-auto mb-auto text-sm block md:hidden'>23/24</span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 ml-2 mt-auto mb-auto">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                  </svg>


                </Link>
              </li>
              <li className="pb-3 md:hidden text-base text-black py-3 px-6 text-center  border-b md:border-b-0  focus:bg-gray-200 rounded-sm   border-black   md:hover:bg-transparent">
                <Link className='flex' href={"/?search=" + encodeURIComponent("Retro")} onClick={() => setNavbar(!navbar)}>

                  <span className='mt-auto mb-auto text-sm block md:hidden'>Retro</span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 ml-2 mt-auto mb-auto">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                  </svg>


                </Link>
              </li>
              <li className="pb-3 md:hidden text-base text-black py-3 px-6 text-center  border-b md:border-b-0  focus:bg-gray-200 rounded-sm   border-black   md:hover:bg-transparent">
                <Link className='flex' href={"/?search=" + encodeURIComponent("Short")} onClick={() => setNavbar(!navbar)}>

                  <span className='mt-auto mb-auto text-sm block md:hidden'>Shorts</span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 ml-2 mt-auto mb-auto">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                  </svg>


                </Link>
              </li>
              <li className="pb-3 md:hidden text-base text-black py-3 px-6 text-center  border-b md:border-b-0  focus:bg-gray-200 rounded-sm   border-black   md:hover:bg-transparent">
                <Link className='flex' href={"/?search=" + encodeURIComponent("2024/25")} onClick={() => setNavbar(!navbar)}>

                  <span className='mt-auto mb-auto text-sm block md:hidden'>2024/25</span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 ml-2 mt-auto mb-auto">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                  </svg>


                </Link>
              </li>
              <AuthVerifyNotPush>
                <li className="pb-3 md:hidden text-base text-black py-3 px-6 text-center  border-b md:border-b-0  focus:bg-gray-200 rounded-sm   border-black   md:hover:bg-transparent">
                  <Link className='flex' href={"/painel/admin"} onClick={() => setNavbar(!navbar)}>

                    <span className='mt-auto mb-auto block md:hidden'>Painel Admin</span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 ml-2 mt-auto mb-auto">
                      <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>


                  </Link>
                </li>
              </AuthVerifyNotPush>
            </ul>
          </div>
        </div>
        <div className=''>
          <div >
            <ul className='flex font-medium my-1 text-md text-center ml-auto mr-auto lg:max-w-7xl  text-black overflow-auto gap-8 px-10 md:pb-2 ' >
              <li className=" duration-200 ease-in-out cursor-pointer md:block hidden text-base text-black  px-2 text-center  border-b md:border-b-0  focus:bg-gray-200 rounded-sm   border-black   md:hover:bg-transparent">
                <Link className='flex' href={"/"} onClick={() => setNavbar(!navbar)}>

                  <span className='mt-auto mb-auto md:block hidden'>
                    início</span>


                </Link>
              </li>
              <li className=" duration-200 ease-in-out cursor-pointer md:block hidden text-base text-black  px-2 text-center  border-b md:border-b-0  focus:bg-gray-200 rounded-sm   border-black   md:hover:bg-transparent">
                <Link className='flex' href={"/?search=" + encodeURIComponent("jacket")} onClick={() => setNavbar(!navbar)}>

                  <span className='mt-auto mb-auto md:block hidden'>Jaquetas</span>


                </Link>
              </li>
              <li className=" duration-200 ease-in-out cursor-pointer md:block hidden text-base text-black  px-2 text-center  border-b md:border-b-0  focus:bg-gray-200 rounded-sm   border-black   md:hover:bg-transparent">
                <Link className='flex' href={"/?search=" + encodeURIComponent("Sweatshirt")} onClick={() => setNavbar(!navbar)}>

                  <span className='mt-auto mb-auto md:block hidden'>Moletom</span>


                </Link>
              </li>
              <li className=" duration-200 ease-in-out cursor-pointer md:block hidden text-base text-black  px-2 text-center  border-b md:border-b-0  focus:bg-gray-200 rounded-sm   border-black   md:hover:bg-transparent">
                <Link className='flex' href={"/?search=" + encodeURIComponent("Polo")} onClick={() => setNavbar(!navbar)}>

                  <span className='mt-auto mb-auto md:block hidden'>Polo</span>


                </Link>
              </li>
              <li className="duration-200 ease-in-out cursor-pointer md:block hidden text-base text-black px-2 text-center  border-b md:border-b-0  focus:bg-gray-200 rounded-sm   border-black   md:hover:bg-transparent">
                <Link className='flex' href={"/?search=" + encodeURIComponent("23-24")} onClick={() => setNavbar(!navbar)}>

                  <span className='mt-auto mb-auto md:block hidden'>23/24</span>


                </Link>
              </li>
              <li className="duration-200 ease-in-out cursor-pointer md:block hidden text-base text-black px-2 text-center  border-b md:border-b-0  focus:bg-gray-200 rounded-sm   border-black   md:hover:bg-transparent">
                <Link className='flex' href={"/?search=" + encodeURIComponent("Retro")} onClick={() => setNavbar(!navbar)}>

                  <span className='mt-auto mb-auto md:block hidden'>Retro</span>


                </Link>
              </li>
              <li className="duration-200 ease-in-out cursor-pointer md:block hidden text-base text-black px-2 text-center  border-b md:border-b-0  focus:bg-gray-200 rounded-sm   border-black   md:hover:bg-transparent">
                <Link className='flex' href={"/?search=" + encodeURIComponent("Short")} onClick={() => setNavbar(!navbar)}>

                  <span className='mt-auto mb-auto md:block hidden'>Shorts</span>


                </Link>
              </li>
              <li className="duration-200 ease-in-out cursor-pointer md:block hidden text-base text-black px-2 text-center  border-b md:border-b-0  focus:bg-gray-200 rounded-sm   border-black   md:hover:bg-transparent">
                <Link className='flex' href={"/?search=" + encodeURIComponent("2024/25")} onClick={() => setNavbar(!navbar)}>

                  <span className='mt-auto mb-auto md:block hidden'>2024/25</span>


                </Link>
              </li>

              <AuthVerifyNotPush>
                <li className="duration-200 ease-in-out cursor-pointer md:block hidden text-base text-black  px-2 text-center  border-b md:border-b-0  focus:bg-gray-200 rounded-sm   border-black   md:hover:bg-transparent">
                  <Link className='flex' href={"/painel/admin"} onClick={() => setNavbar(!navbar)}>

                    <span className='mt-auto mb-auto md:block hidden'>Admin</span>


                  </Link>
                </li>
              </AuthVerifyNotPush>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar