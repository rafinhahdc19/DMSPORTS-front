import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

const INDEX = () => {
    return (
        <>
            <Navbar />
            <main className="mt-[10rem] lg:max-w-3xl lg:w-full w-[93%] mr-auto ml-auto">
            <div >
                <div class=" text-center text-3xl font-bold my-6">
                    <h1>Legal notice</h1>
                </div>

                <div class=" text-[#6b6b6b] pb-[2rem]">
                    <div>

                        <p className="my-2 leading-7">Bem-vindo ao site da<span>&nbsp;</span><strong>DMSPORTS!</strong></p>
                        <p className="my-2 leading-7"><br />Ele é oferecido como um serviço aos nossos clientes. O conteúdo publicado é de propriedade da<span> <strong>DMSPORTS</strong></span><span>&nbsp;</span>e está protegido pelas leis brasileiras e internacionais de direitos autorais. Agradecemos o seu interesse em nossa empresa e pela visita em nosso site. Para garantir a qualidade desse serviço, confira as seguintes condições e as regras básicas que regem o uso do mesmo.</p>
                        <p className="my-2 leading-7">1- O uso do site<span> <strong>DMSPORTS</strong></span><span>&nbsp;</span>constitui o seu conhecimento e aceitação desses termos. O acesso e a utilização são para a sua compra pessoal de produtos da loja<span> <strong>DMSPORTS</strong></span>, informações, entretenimento e novidades exclusivas da marca.</p>
                        <p className="my-2 leading-7">2- Você pode fazer download, copiar ou imprimir os elementos e as informações aqui contidas, sem modificações e somente para fins meramente informativos, não sendo permitida a utilização para fins comerciais.</p>
                        <p className="my-2 leading-7">3- As cores dos produtos podem sofrer variações e não serem exatas, uma vez que dependem do monitor e tecnologia usada por cada usuário. Por isso, a&nbsp; não pode ser responsabilizada no caso de diferenças sutis de cores.</p>
                        <p className="my-2 leading-7">4- Este site (compartilhado com meios digitais e mídias sociais) tem licença para utilizar submissões, ou seja, oferecer aos clientes<span> <strong>DMSPORTS</strong></span>, a oportunidade de enviar, publicar ou exibir conteúdos próprios, como fotos, imagens, textos, dados, opiniões ou notas</p>
                        <p className="my-2 leading-7">5- Você será obrigado a se registrar para usar alguns recursos do site como realizar compras e receber novidades da marca. Podemos alterar os requisitos de registro sem aviso prévio.</p>
                    </div>
                </div>
            </div>
            </main>
            <Footer></Footer>
        </>
    )
}
export default INDEX