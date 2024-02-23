import { useState } from "react"
import { useEffect } from "react"
import Image from 'next/image'

export default function Banner({dataarray3}){
    const [baner, setbaner] = useState("/DM SPORTS BANNER.png")
    useEffect(() => {
        function handleResize() {
          if (window.innerWidth < 718) {
            setbaner("/dm mobile.png")
          } else {
            setbaner("/dm pc.png")
          }
        }
        handleResize()
        window.addEventListener('resize', handleResize);
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, [dataarray3]);


    return(
        
        <div className="z-10 pb-3 ease-in-out duration-300 items-center p-2 justify-center flex  bg-gray-100">
          
            <Image className="z-10 w-full ease-in-out duration-300 rounded-lg sm:my-3 my-2" src={baner} height={415} width={1600} alt="baner" />
            
        </div>
    )
}