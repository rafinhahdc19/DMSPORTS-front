import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { useEffect } from 'react'
import { Input } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import  Router  from 'next/router'
import { useRouter } from 'next/router'

const Navbar = ({search, att, gatilho, setgatilho}) => {
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
      if(gatilho){
        setgatilho(gatilho+1)
      }
      router.push('/?search='+encodeURIComponent(Search)) 
    }
    return (
      <div>
        <nav className="w-full bg-[#FFF] drop-shadow-lg fixed top-0 left-0 right-0 z-50">
          <div className="justify-between py-3 md:py-1 px-1  mx-auto w-full lg:max-w-7xl items-center flex md:px-1">
            <div className='w-full'>
                
              <div className="flex items-center justify-between pb-1 md:py-3 md:block">
                
                <div className=' flex  w-full '>
                    <div>
                        <Link  href="/">
                            <Image src={"/logo.png"} className={'md:w-[80px] md:pl-0 pl-2 object-contain md:h-[80px] w-[75px] h-[75px]'} alt='logo' width={'70'} height={'70'} />
                        </Link>
                    </div>
                <div className='w-[100%] mt-auto md:px-4 px-1 mb-auto ml-2 md:ml-3'>
                <form  onSubmit={(e) => {routerFunc(e)} }>
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
                    className='inline-flex items-center justify-center p-2 rounded-md text-black hover:bg-gray-100  ease-in-out duration-300 focus:outline-none  '
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
            
            <div>
                <ul className="h-auto items-center justify-center md:flex ">
                  <li className="pb-3 text-base text-black mr-1 md:mr-0 py-3 md:px-6 px-1 text-center  md:border-b-0  rounded-sm   border-black   md:hover:bg-transparent">
                    <Link className='flex' href="/carrinho" onClick={() => setNavbar(!navbar)}>
                    
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                    </svg><div className={usedCar+' bg-red-500 h-2 rounded-full  w-2'}></div>

                    </Link>
                  </li>
                </ul>
              </div>
          </div>
        </nav>
      </div>
      )
}

export default Navbar