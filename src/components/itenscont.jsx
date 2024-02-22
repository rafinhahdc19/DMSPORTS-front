import React from 'react'
import { useEffect, useState } from 'react'

const ItenCont = ({IFunction, DFunction, DValue, Slug, Tipo}) => {
    const [value, setvalue] = useState(DValue)
    const increment = (value) => {
        if(value < 20){
            IFunction(Slug, value+1, Tipo)
            setvalue(value + 1)
            
        }else{
            
            return
            
        }
        
    }
    const decrement = (value) => {
        if(value > 1){
            DFunction(Slug, value-1, Tipo)
            setvalue(value - 1)
            
        }else{
            return
        }
        
    }
  return (
    <>
        <div className='text-black justify-between p-1 rounded px-2  flex border border-gray-200'>
            <button onClick={(e) => { e.stopPropagation(), increment(value)}} className='hover:bg-gray-100 bg-gray-50 duration-300 ease-in-out rounded md:p-2 p-1'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                </svg>                
            </button>
            <div className='mt-auto mb-auto text-sky-600 px-4'><span>{value}</span></div>
            <button onClick={(e) => { e.stopPropagation(), decrement(value)}} className='hover:bg-gray-100 bg-gray-50 duration-300 ease-in-out rounded md:p-2 p-1'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                </svg>
            </button>
        </div>                                                                 
    </>
  )
}

export default ItenCont