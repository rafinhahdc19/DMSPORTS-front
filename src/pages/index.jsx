import Image from 'next/image'
import FormatCurrency from '@/functions/moneyconvert'
import Navbar from '@/components/navbar'
import axios from 'axios'
import Product from '@/components/products'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Skeleton, SkeletonCircle, SkeletonText, Box, Spinner, Button, Divider } from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Banner from '../components/banner'
import Footer from '@/components/footer'

export default function Index() {
  const [vendas, setVendas] = useState([])
  const [loading, setloading] = useState(false)
  const [slidesPerView, setSlidesPerView] = useState(4);
  const router = useRouter();
  const { search } = router.query;
  const [items, setItems] = useState([]);
  const [itemsS, setItemsS] = useState([]);
  const [itemsV, setItemsV] = useState([]);
  const [pag, setPag] = useState(1);
  const [changePag, setChangePag] = useState(1);
  const [fim, setfim] = useState(false)
  const [notfound, setnotfound] = useState(false)
  const [gatilho, setgatilho] = useState(0)

  const itemsPerPage = 24

  useEffect(() => {
    setPag(1)
    setfim(false)
    setItems([])
  }, [search]);

  const fetchData = async (page, search) => {
    try {
      if (search) {

        const response = await axios.post(process.env.NEXT_PUBLIC_BACKEND + "/products/get", {
          page: pag,
          Search: search
        });
        setloading(false)
        return response.data;
      } else {
        const response = await axios.post(process.env.NEXT_PUBLIC_BACKEND + "/products/get", {
          page: pag,
        });
        setloading(false)
        return response.data;
      }

    } catch (error) {
      console.error("Erro ao buscar dados: ", error);
      return [];
    }
  };
  const fetchData2 = async (page, search) => {
    try {
      if (search) {
        const response = await axios.post(process.env.NEXT_PUBLIC_BACKEND + "/products/get", {
          page: page,
          Search: search
        });
        setloading(false)
        return response.data;
      } else {
        const response = await axios.post(process.env.NEXT_PUBLIC_BACKEND + "/products/get", {
          page: page,
        });
        setloading(false)
        return response.data;
      }

    } catch (error) {
      console.error("Erro ao buscar dados: ", error);
      return [];
    }
  };

  const loadMoreItems = () => {
    setloading(true)
    setPag(pag + 1);
    setChangePag(changePag + 1)
  };

  useEffect(() => {

    if (!router.isReady) {

    } else {
      if (!fim) {
        if (!search || search === "") {
          const offset = pag * itemsPerPage;
          const limit = itemsPerPage;

          fetchData(pag, search)
            .then((data) => {
              if (data.products && data.products.length > 0) {
                setnotfound(false)
                const lastItems = items.slice(-data.length);
                const newItems = data.products.slice();

                const newItemsV = data?.vendido?.slice();

                if (
                  JSON.stringify(lastItems) === JSON.stringify(newItems)
                ) {
                } else {
                  if (!search || search === "") {


                    setItems([...items, ...newItems]);
                    if (search) {
                      setItemsV([])
                    } else {
                      setItemsV([])
                      if (!data?.vendido) {

                      } else {
                        setItemsV([...newItemsV])
                      }
                    }




                  }
                }
              } else if (items.length <= 0) {
                setnotfound(true)
                setfim(true);
              } else {
                setnotfound(true)
                setfim(true);
              }

              if (data && data?.products?.length < itemsPerPage) {
                setfim(true);
              }
            });
        }
      }
    }
  }, [changePag, router, search]);
  useEffect(() => {
    setPag(1)
    setfim(false)
    setItems([])
    if (search && search !== "") {
      fetchData2(1, search)
        .then((data) => {
          if (data.products && data.products.length > 0) {
            setnotfound(false)
            const lastItems = items.slice(-data.length);
            const newItems = data.products.slice();

            const newItemsV = data?.vendido?.slice();

            if (
              JSON.stringify(lastItems) === JSON.stringify(newItems)
            ) {
            } else {
              if (search) {
                setItemsV([])
              } else {
                setItemsV([])
                if (!data?.vendido) {

                } else {
                  setItemsV([...newItemsV])
                }
              }
              setItemsS([...newItems]);
            }
          } else if (itemsS.length <= 0) {
            setnotfound(true)
            setfim(true);
          } else {
            setnotfound(true)
            setfim(true);
          }

          if (data && data?.products?.length < itemsPerPage) {
            setfim(true);
          }
        });
    }
  }, [gatilho])

  useEffect(() => {
    // Função para calcular o número de slides por visualização com base na largura da janela
    const calculateSlidesPerView = () => {
      const windowWidth = window.innerWidth;
      let calculatedSlidesPerView = 4.5; // Defina um valor padrão

      // Adicione condições para ajustar o número de slides conforme necessário
      if (windowWidth < 650) {
        calculatedSlidesPerView = 1.35;
      }
      else if (windowWidth < 750) {
        calculatedSlidesPerView = 2.35;
      } else if (windowWidth < 1000) {
        calculatedSlidesPerView = 3.25;
      } else if (windowWidth < 1280) {
        calculatedSlidesPerView = 4.25;
      } else {
        calculatedSlidesPerView = 4.25;
      }

      setSlidesPerView(calculatedSlidesPerView);
    };

    // Chame a função inicialmente e adicione um listener de redimensionamento do window
    calculateSlidesPerView();
    window.addEventListener('resize', calculateSlidesPerView);

    // Remova o listener de redimensionamento ao desmontar o componente
    return () => {
      window.removeEventListener('resize', calculateSlidesPerView);
    };
  }, []);

  useEffect(() => {
    if (search) {
      setgatilho(gatilho + 1);
    }
  }, [search]);

  const handleImageError = (slug) => {
    setProducts(prevProducts => prevProducts.filter(product => product.slug !== slug));
  };

  return (
    <>
      <header>
        <Navbar search={search} att={() => fetchData(pag, search)} />
      </header>
      <main className='md:mt-[8rem] mt-[7rem] ml-auto mr-auto '>

        {notfound ? (
          <>
            <div className='w-full mb-[15rem] mr-auto ml-auto relative justify-center'>
              <p className="text-center text-black font-medium text-2xl p-4">Nenhum produto encontrado</p>
              <div className='mr-auto ml-auto justify-center flex'>
                <Button onClick={() => { router.push("/?search=") }} className='focus:bg-green-500 mr-auto ml-auto' _focus={"bg-green-500"} variant="solid" colorScheme="blue" >
                  <ArrowBackIcon className='mr-1'></ArrowBackIcon> Voltar para o início
                </Button>
              </div>
            </div>
          </>
        ) : items.length <= 0 && itemsS.length <= 0 ? (
          <div className='flex mb-[15rem] justify-center pt-[2rem]'>
            <Spinner className='ml-auto mr-auto' color='blue.600' size='xl' />
          </div>
        ) : (<>
          {!search && (
            <Banner dataarray3={items}>
            </Banner>
          )}
          <div>
            {itemsV.length > 0 && (
              <div className=' bg-[#eeeeee] pt-5 pb-1 mb-4'>
                <h1 className='lg:max-w-7xl px-2 pb-2 font-semibold text-2xl mr-auto ml-auto'>Mais vendidos 🔥</h1>
                <div className='lg:max-w-7xl mr-auto ml-auto pb-4 px-4'>
                  <Swiper
                    // install Swiper modules
                    modules={[Navigation, A11y]}
                    spaceBetween={20}
                    slidesPerView={slidesPerView}
                    navigation={slidesPerView > 2 ? true : false}
                    pagination={{ clickable: true }}
                    onSwiper={(swiper) => console.log(swiper)}
                    onSlideChange={() => console.log('slide change')}
                  >
                    {itemsV.map((item) => (
                      <SwiperSlide key={item.id}>
                        <Product
                          key={item.id}
                          className="ml-auto mr-auto"
                          slug={item.slug}
                          title={item.nome}
                          link={"/product/" + item.slug}
                          desc={item.desc}
                          value={item.value}
                          image={item.imgurl}
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
            )}
            {!search ? (
              <>

                <div className='pt-5' >
                  <h1 className='lg:max-w-7xl px-2 pb-2 font-semibold md:text-2xl text-xl mr-auto ml-auto'>Melhores produtos 🔥</h1>
                </div>
                <ul className='px-4 grid md:grid-cols-3 lg:grid-cols-4 grid-cols-2 sm:grid-cols-2 justify-center md:gap-5 gap-2 lg:max-w-7xl mr-auto ml-auto'>

                  {items.map((item) => (
                    <Product
                      key={item.id}
                      className="ml-auto mr-auto"
                      slug={item.slug}
                      title={item.nome}
                      link={"/product/" + item.slug}
                      desc={item.desc}
                      value={item.value}
                      image={item.imgurl}
                      handleImageError={handleImageError}
                    />
                  ))}
                </ul>
              </>
            ) : (
              <>
                <div className='pt-5' >
                  <h1 className='lg:max-w-7xl px-2 pb-2 font-semibold md:text-2xl text-xl mr-auto ml-auto'>{`Produtos com "${search}"`} 🔥</h1>
                </div>
                <ul className='px-4 grid md:grid-cols-3 lg:grid-cols-4 grid-cols-2 sm:grid-cols-2 justify-center md:gap-5 gap-2 lg:max-w-7xl mr-auto ml-auto'>

                  {itemsS?.map((item) => (
                    <Product
                      key={item.id}
                      className="ml-auto mr-auto"
                      slug={item.slug}
                      title={item.nome}
                      link={"/product/" + item.slug}
                      desc={item.desc}
                      value={item.value}
                      image={item.imgurl}
                      handleImageError={handleImageError}
                    />
                  ))}
                </ul>
              </>
            )}


            <div className="text-center my-4">
              {!fim ? (
                <Button colorScheme='whatsapp' variant='outline' onClick={() => !loading && loadMoreItems()}>
                  {!loading ? (
                    "Carregar Mais"
                  ) : (
                    <div className='px-4 flex items-center justify-center'>
                      <Spinner className='ml-auto mr-auto mt-auto mb-auto' color='blue.600' size='sm' />
                    </div>
                  )}</Button>
              ) : (
                <Button onClick={() => { router.push("/?search=") }} className='focus:bg-green-500 mr-auto ml-auto' _focus={"bg-green-500"} variant="solid" colorScheme="blue" >
                  <ArrowBackIcon className='mr-1'></ArrowBackIcon> Voltar para a tela inicial
                </Button>
              )}

            </div>
          </div>
        </>
        )}

      </main >
      <Footer></Footer>
    </>
  )
}
