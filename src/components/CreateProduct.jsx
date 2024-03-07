import React, { useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    Input,
    Button
} from '@chakra-ui/react';
import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react';
import axios from 'axios';
import Cookies from 'js-cookie';
import {
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Select,
    RadioGroup,
    Stack,
    Radio
} from '@chakra-ui/react'
import UploadInput from './Upload';

const CreateProduct = () => {
    const [tipoImagem, setTipoImagem] = useState("link");
    const [linkImagem, setLinkImagem] = useState("");
    const [temTipos, setTemTipos] = useState(false);
    const [quantidadeTipos, setQuantidadeTipos] = useState(1);
    const [loading, setLoading] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const token = Cookies.get('token');
    const [erro, seterro] = useState("")
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
    const [titulo, setTitulo] = useState("")
    const [desc, setDesc] = useState("")
    const [value, setValue] = useState("")
    const [nomesTipos, setNomesTipos] = useState(Array.from({ length: quantidadeTipos }, () => ''));
    const [selectedFile, setSelectedFile] = useState(null);

    const formatCurrency = (value) => {

        const cleanValue = value.replace(/[^\d]/g, '');

        // Adiciona zeros à esquerda se o número tiver menos de três dígitos
        let formattedValue = cleanValue.padStart(3, '0');

        // Adiciona uma vírgula antes dos dois últimos dígitos
        formattedValue = formattedValue.replace(/(\d)(\d{2})$/, '$1,$2');

        // Remove os zeros à esquerda da vírgula, deixando apenas um zero
        formattedValue = formattedValue.replace(/^0+(?=\d)/, '');

        // Adiciona zero à esquerda da vírgula se necessário
        if (formattedValue.startsWith(',')) {
            formattedValue = '0' + formattedValue;
        }

        return formattedValue;
    };
    const handleNomeTipoChange = (index, value) => {
        const novosNomesTipos = [...nomesTipos];
        novosNomesTipos[index] = value;
        setNomesTipos(novosNomesTipos);
    };

    const sendDataToServer = async () => {
        try {
            const formData = new FormData();

            formData.append('nome', titulo);
            formData.append('desc', desc);
            formData.append('value', value.replace(/[,.]/g, ''));
            const filteredNomesTipos = nomesTipos.filter(nomeTipo => nomeTipo.trim() !== '');
            if (filteredNomesTipos.length > 0) {
                formData.append('tipo', JSON.stringify(filteredNomesTipos));
            }else{
                formData.append('tipo', JSON.stringify([]));
            }

            // Se o tipo de imagem for "link", adiciona a URL da imagem aos dados
            if (tipoImagem === "link") {
                formData.append('imgUrl', linkImagem);
            }
            // Se o tipo de imagem for "upload", adiciona a imagem carregada aos dados
            else if (tipoImagem === "upload" && selectedFile) {
                formData.append('img', selectedFile);
            }

            setLoading(true);

            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND}/product/create${tipoImagem === "link" ? ("/url") : ("")}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            });
            setLoading(false);
            onClose(); // Fechar modal após o envio bem-sucedido
        } catch (error) {
            seterro('Erro ao enviar dados para o servidor');
            setLoading(false);
        }
    };

    const handleQuantityChange = (value) => {
        const newQuantity = Math.min(parseInt(value), 30);
        
        // Remover tipos excedentes se a quantidade for reduzida
        setNomesTipos((prevNomesTipos) => prevNomesTipos.slice(0, newQuantity));
    
        setQuantidadeTipos(newQuantity);
      };

    return (
        <>
            <button className="w-full" onClick={onOpen}>
                <div className=' w-full border-[#2DAC9B67] border-2 rounded-xl p-[3.2rem] flex'>

                    <div className='ml-auto mr-auto mt-auto mb-auto'>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke-width='1.5'
                            stroke='currentColor'
                            className='w-10 h-10'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M12 6v12m6-6H6'
                            />
                        </svg>
                    </div>

                </div>
            </button>
            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
                size="xl"
            >
                <ModalOverlay />
                <ModalContent maxW="90vw">
                    <ModalHeader>Crie um novo Produto</ModalHeader>
                    {erro != "" ? (
                        <div className='lg:w-[87%] md:w-[83%] px-2 w-full ml-auto mr-auto'>
                            <Alert className='rounded-lg mb-2' status='error'>
                                <AlertIcon />
                                <AlertTitle>{erro}</AlertTitle>
                            </Alert>
                        </div>
                    ) : null}
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <form onSubmit={(e) => { e.preventDefault(); sendDataToServer() }}>
                            <FormControl>
                                <FormLabel>Imagem</FormLabel>
                                <RadioGroup onChange={setTipoImagem} value={tipoImagem}>
                                    <Stack direction="row">
                                        <Radio value="link">Link</Radio>
                                        <Radio value="upload">Upload</Radio>
                                    </Stack>
                                </RadioGroup>
                            </FormControl>

                            {tipoImagem === "link" && (
                                <FormControl mt={4}>
                                    <FormLabel>Link da Imagem</FormLabel>
                                    <Input value={linkImagem} onChange={(e) => setLinkImagem(e.target.value)} placeholder='Link da Imagem' required />
                                </FormControl>
                            )}

                            {tipoImagem === "upload" && (
                                <FormControl mt={4}>
                                    <FormLabel>Upload da Imagem</FormLabel>
                                    <UploadInput onFileSelect={setSelectedFile} />
                                </FormControl>
                            )}
                            <FormControl>
                                <FormLabel>Titulo</FormLabel>
                                <Input value={titulo} onChange={(e) => setTitulo(e.target.value)} placeholder='Titulo' required />
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel>Valor</FormLabel>
                                <Input value={formatCurrency(value)} onChange={(e) => setValue(e.target.value)} placeholder='Valor' />
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel>Descricão</FormLabel>
                                <Input value={desc} onChange={(e) => setDesc(e.target.value)} placeholder='Descrição' required />
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel>Tipo</FormLabel>
                                <Select value={temTipos ? 'sim' : 'nao'} onChange={(e) => setTemTipos(e.target.value === 'sim')} required>
                                    <option value="nao">Não</option>
                                    <option value="sim">Sim</option>
                                </Select>
                            </FormControl>

                            {temTipos && (
                                <>
                                    <FormControl mt={4}>
                                        <FormLabel>Quantidade de Tipos (limite de 30)</FormLabel>
                                        <NumberInput value={quantidadeTipos} onChange={(value) => handleQuantityChange(value)} min={1} max={30}>
                                            <NumberInputField />
                                            <NumberInputStepper>
                                                <NumberIncrementStepper />
                                                <NumberDecrementStepper />
                                            </NumberInputStepper>
                                        </NumberInput>
                                    </FormControl>

                                    {Array.from({ length: quantidadeTipos }).map((_, index) => (
                                        <FormControl key={index} mt={4}>
                                            <FormLabel>{`Nome do Tipo ${index + 1}`}</FormLabel>
                                            <Input value={nomesTipos[index]} onChange={(e) => handleNomeTipoChange(index, e.target.value)} placeholder={`Nome do Tipo ${index + 1}`} required />
                                        </FormControl>
                                    ))}
                                </>
                            )}
                            <ModalFooter>
                                <Button type="submit" isDisabled={loading} colorScheme='blue' mr={3}>
                                    Save
                                </Button>
                                <Button onClick={onClose}>Cancel</Button>
                            </ModalFooter>
                        </form>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default CreateProduct;
