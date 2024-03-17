import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

const INDEX = () => {
    return (
        <>
            <Navbar />
            <main className="mt-[10rem] lg:max-w-3xl lg:w-full w-[93%] mr-auto ml-auto ">
                <div class="container container--narrow">
                    <h1 class=" text-center text-3xl font-bold my-6">Política de Troca e Devolução</h1>

                    <div class=" text-[#6b6b6b] pb-[2rem]">

                        <strong>1. Troca</strong>

                        <p className="my-2 leading-7"><span>Se o produto chegar com defeito, nós pagaremos pelo frete de devolução e todas as despesas de envio do produto certo para o consumidor. Nesse caso, entre em contato explicando o ocorrido e nos enviando fotos detalhadas do produto, etiquetas de envio e etiquetas da camisa (quanto mais detalhes, melhor), para fazermos uma análise do ocorrido.</span></p>
                        <p className="my-2 leading-7"><span>Se a solicitação de troca for feita porque a mercadoria não coube ou a cor não agradou, faremos a troca, porém, o consumidor deve arcar com o custo do Frete. Portanto,&nbsp;atente-se aos tamanhos mencionados na descrição do produto.</span></p>
                        <p className="my-2 leading-7"><span><em>Obs.:</em></span></p>
                        <ol>
                            <li><span><em>A) Não aceitamos trocas de camisas personalizadas.</em></span></li>
                            <li><span><em>B) Em hipótese alguma retire a etiqueta da camisa, pois&nbsp;não efetuamos a troca após a etiqueta ter sido rompida. Ela é a sua garantia.</em></span></li>
                            <li><span><em>C) As trocas só serão permitidas dentro do prazo de 7 dias a contar do&nbsp;recebimento do produto, conforme o artigo 49 do Código de Defesa do Consumidor.</em></span></li>
                        </ol>
                        <p className="my-2 leading-7"><span>&nbsp;</span></p>

                        <strong> 2. Devolução / Reembolso</strong>

                        <p className="my-2 leading-7"><span>Caso tenha recebido o produto e queira fazer a devolução: Pode devolver em até 7 dias a contar do recebimento, onde todos os custos, inclusive o do frete, é por nossa conta. O reembolso será feito através da plataforma de pagamento, ou por transferência, conforme for mais adequado para cada situação.</span></p>
                        <p className="my-2 leading-7"><span>Obs.:</span></p>
                        <ol>
                            <li><span><em>A) Camisas personalizadas poderão ser devolvidas apenas se apresentaram defeito de fábrica.</em></span></li>
                            <li><span><em>B)&nbsp;Em hipótese alguma retire a etiqueta da camisa, pois&nbsp;</em><em>não efetuamos o&nbsp;</em><em>reembolso após a etiqueta ter sido rompida</em></span></li>
                            <li><span><em>C) As devoluções só serão permitidas dentro do prazo&nbsp;de 7 dias a contar do&nbsp;recebimento do produto, conforme o artigo 49 do Código de Defesa do Consumidor.</em></span></li>
                        </ol>
                    </div>
                </div>
            </main>
            <Footer></Footer>
        </>
    )
}
export default INDEX