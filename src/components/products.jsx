import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Spinner } from '@chakra-ui/react';
import { Card, CardHeader, CardBody, CardFooter, Stack, Heading, Divider, ButtonGroup, Button, Box, Text } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import FormatCurrency from '@/functions/moneyconvert';

const Product = ({ title, desc, image, value, link, slug, handleImageError }) => {
  const toast = useToast()
  const originalValue = parseInt(value, 10); // Valor original
  const discountValue = (originalValue * 1.5).toString();
  return (
    <>
      <Card className='mr-auto ml-auto overflow-hidden' maxW='sm'>
        <div className='sm:p-4 p-2'>
          <Link href={link} >
            <img
              loading="lazy"
              style={{ userSelect: 'none', borderRadius: '8px' }} // Estilo da imagem
              width={480} // Largura da imagem
              height={480} // Altura da imagem
              src={(process.env.NEXT_PUBLIC_BACKEND + "/image?imageUrl=" + image).replace("medium", "small")} // URL da imagem
              alt='Foto do Produto' // Texto alternativo da imagem
              className='rounded-[4px]' // Classes adicionais (se necessário)
              onError={() => handleImageError(slug)}
            />
            <div style={{ userSelect: 'none' }} className='relative md:py-1 py-3 h-full'>
              <div className='mb-auto'>
                <Box style={{ wordBreak: 'break-word' }}>
                  <Text className='mt-1 md:text-xl text-sm' textDecor="none" noOfLines={1}>
                    {title}
                  </Text>
                </Box>
                <Box style={{ wordBreak: 'break-word' }}>
                  <Text className='md:text-xl text-xs' my="2" noOfLines={1} >
                    {desc}
                  </Text>
                </Box>
                <div className='md:flex gap-1'>
                  <Text className=' text-[#0076ff] mt-auto font-medium ' textDecoration="none" fontSize='xl'>
                    {FormatCurrency(value)}
                  </Text>

                  <Text className=' text-[#0052af] opacity-80 mt-auto mb-[2px] ' style={{ textDecoration: 'line-through' }} textDecoration="none" fontSize='sm'>
                    {FormatCurrency(discountValue)}
                  </Text>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </Card>

    </>
  )
}

export default Product