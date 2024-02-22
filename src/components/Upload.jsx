import React, { useEffect, useState } from 'react';
import { FormControl, FormLabel, Button, Box } from '@chakra-ui/react';

const UploadInput = ({ onFileSelect }) => { // Receba a função de retorno de chamada como uma propriedade
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        const maxSizeInBytes = 20 * 1024 * 1024;
        const allowedTypes = ['image/jpeg', 'image/png'];

        if (selectedFile && allowedTypes.includes(selectedFile.type) && selectedFile.size <= maxSizeInBytes) {
            setFile(selectedFile);
            onFileSelect(selectedFile);
        } else {
            setFile(null);
            alert('Por favor, selecione um arquivo JPG ou PNG com tamanho máximo de 5MB.');
        }
    };

    return (
        <FormControl>
            <Box>
                <input
                    type="file"
                    id="fileInput"
                    accept=".jpg, .jpeg, .png"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                />
                <label htmlFor="fileInput">
                    <Button as="span" colorScheme="green" cursor="pointer">
                        Escolher Arquivo
                    </Button>
                </label>
                {file && <span className='md:ml-2'>Arquivo selecionado: {file.name}</span>}
            </Box>
        </FormControl>
    );
};

export default UploadInput;
