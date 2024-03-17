import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Link from "next/link";

const INDEX = () => {
    return (
        <>
            <Navbar />
            <main className="mt-[10rem] lg:max-w-3xl lg:w-full w-[93%] mr-auto ml-auto">
                <div class="shopify-policy__container">
                    <div class=" text-center text-3xl font-bold my-6">
                        <h1>Política de frete</h1>
                    </div>

                    <div class="text-[#6b6b6b] pb-[2rem]">
                        <div class="rte">

                            <p className="my-2 leading-7"><strong>1. Envio</strong></p>
                            <p className="my-2 leading-7"><span>Todos os produtos disponíveis na nossa loja são produtos importados de&nbsp;primeira linha de qualidade&nbsp;</span>(possuem todos os selos e autenticações internas e externas das marcas)<span>&nbsp;e são enviados diretamente de nossos fornecedores no exterior (em sua maior parte&nbsp;na Suécia, Hong Kong, Tailândia ou China) para o endereço informado no momento da compra.</span></p>
                            <p className="my-2 leading-7">&nbsp;</p>
                            <p className="my-2 leading-7"><strong>2. Prazos</strong></p>
                            <p className="my-2 leading-7"><span>A entrega leva a&nbsp;</span><span>em média</span><span>&nbsp;</span><em>10 a 25 dias úteis,</em><span>&nbsp;após confirmação do pagamento, a depender da localidade e época do ano. O envio do produto é efetuado&nbsp;</span><span>em média</span><span>&nbsp;</span><em>entre 2 a 5&nbsp;dias úteis</em><span>&nbsp;após a confirmação do pagamento em nosso sistema.&nbsp;</span>Pedidos efetuados através de boleto bancário geralmente levam de 1 a 2&nbsp;dias úteis para confirmação do pagamento em nosso sistema</p>
                            <p className="my-2 leading-7"><em>Atenção: Em determinados casos esse prazo de entrega pode se estender por mais alguns dias úteis, devido a atrasos, greves, recessos, períodos de grande demanda nos Correios, enfim, situações que fogem do nosso controle.</em></p>
                            <p className="my-2 leading-7">&nbsp;</p>
                            <p className="my-2 leading-7"><strong>3. Garantia Total</strong></p>
                            <p className="my-2 leading-7"><span>Nossa loja garante a entrega do pedido, nos responsabilizamos a restituir o valor integral pago pelos produtos que forem extraviados ou se perderem durante o processo de entrega. Todos os produtos são postados com seguro contra extravio e com rastreamento pela internet gratuito.</span></p>
                            <p className="my-2 leading-7">Caso a encomenda atrase e não seja entregue em até 70 dias úteis após a&nbsp;postagem,&nbsp;o valor pago será 100% devolvido. De maneira alguma o cliente sairá no prejuízo.</p>
                            <p className="my-2 leading-7"><em>Atenção: Em compras com maiores quantidades, você poderá receber mais de um pacote, pois seus produtos podem vir de fornecedores diferentes. Então caso receba primeiro um produto e depois outro, fique tranquilo,&nbsp;isso é totalmente normal.</em></p>
                            <p className="my-2 leading-7">&nbsp;</p>
                            <p className="my-2 leading-7"><strong>4. Rastreamento e Entrega</strong><br /><br />Garantimos um código de rastreio para o cliente poder acompanhar o progresso da entrega de seu pedido pelo link abaixo: </p>
                            <p className="my-2 leading-7"><Link className=" text-blue-700 " href="https://rastreamento.correios.com.br/app/">Rastrear Pedido</Link><br /></p>
                            <p className="my-2 leading-7"><span>Os produtos serão entregues pelos Correios, e sempre haverá um Código de Rastreio que possibilitará ao cliente acompanhar o progresso da entrega. O código para acesso ao rastreamento será enviado para o seu e-mail&nbsp;assim que estiver disponível (em média</span>&nbsp;entre&nbsp;2 a 5 dias úteis após o pagamento confirmado).</p>
                            <p className="my-2 leading-7">&nbsp;</p>
                            <p className="my-2 leading-7"><strong>5. Informações Importantes e Cuidados Necessários</strong></p>
                            <p className="my-2 leading-7"><strong>5.1.&nbsp;</strong><span>Endereço Incorreto ou Incompleto</span></p>
                            <p className="my-2 leading-7">Nossa loja providenciará o envio dos produtos para o endereço que o cliente solicitar. Portanto, para que não haja empecilhos na entrega da sua encomenda, pedimos atenção no momento de preencher o endereço no qual deseja receber o seu pedido.</p>
                            <p className="my-2 leading-7">Não nos responsabilizamos&nbsp;pelo preenchimento incorreto ou incompleto do endereço de destino dos pedidos realizados na loja. Caso ocorra o endereçamento incorreto ou incompleto, por norma dos Correios, o pacote retornará ao remetente, e não serão mais realizadas outras tentativas de entrega naquele endereço.</p>
                            <p className="my-2 leading-7">Em caso da entrega não ser realizada devido a divergência no endereço informado pelo cliente, o cliente não tem direito ao reembolso, e será necessário o pagamento de um novo frete, no valor de R$ 60,00 (sessenta reais), para reenvio da encomenda. É necessário aguardar que a encomenda chegue até o remetente para o reenvio acontecer. Esse tempo depende dos Correios e da&nbsp;Alfândega.</p>
                            <p className="my-2 leading-7"><strong>5.2. Destinatário Ausente</strong></p>
                            <p className="my-2 leading-7">Certifique-se de que haverá alguém no endereço para receber seus produtos. Os Correios realizam três tentativas de entrega dos produtos. Caso não haja ninguém no endereço para receber a encomenda em nenhuma das tentativas, o pacote será levado para a agência dos Correios mais próxima ao endereço, e, neste caso, será necessário que o destinatário do pacote realize a retirada do mesmo na agência dos Correios. Caso o destinatário da encomenda não realize a retirada dentro do prazo estabelecido, por norma dos Correios, o pacote retornará ao remetente, sendo necessário o pagamento de um novo frete, no valor de setenta reais,&nbsp;para o reenvio do produto.&nbsp;<span>É necessário aguardar que a encomenda chegue até o remetente para o reenvio acontecer, e esse tempo depende dos Correios e da</span><span>&nbsp;Alfândega</span><span>.</span></p>
                            <p className="my-2 leading-7"><strong>5.3. Produtos Tributados e Taxados</strong></p>
                            <p className="my-2 leading-7">Nossos produtos são isentos de tributação alfandegária. Mas, caso isso aconteça, o valor será inteiramente pago por nós.</p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer></Footer>
        </>
    )
}
export default INDEX