import React, {useCallback, useRef } from 'react';
import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import getValidationErrors from '../../utils/getValidaitonErrors';
import { Container, Content, Background } from './styles';
import logoImg from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';


const SignUp: React.FC = () => {
    const formRef = useRef<FormHandles>(null);

    console.log(formRef);

    const handleSubmit = useCallback( async (data: object) => {
        try{
            const schema = Yup.object().shape({
                name: Yup.string().required('Nome obrigatório'),
                email: Yup.string()
                .email('Digite um e-mail válido')
                .required('E-mail obrigatório'),
                password: Yup.string().min(6, 'No mínimo 6 dígitos'),
                    });

            await schema.validate(data, {
                abortEarly: false,
            });


        } catch (err) {
            const errors = getValidationErrors(err);
            formRef.current?.setErrors(errors);
            console.log(err);
        }
    }, []);

    return (
    <Container>
        <Background />

        <Content>
            <img src={logoImg} alt="Gobarber" />
            <Form ref={formRef} onSubmit={handleSubmit}>
                <h1>Faça seu cadastro</h1>
                <Input name="name" icon={FiUser} placeholder="Nome" />
                <Input name="email" icon={FiMail} placeholder="E-mail" />

                <Input name="password"
                    icon={FiLock}
                    type="password"
                    placeholder="Senha"
                />

                <Button type="submit">Cadastrar</Button>

            </Form>
            <a href="">
                <FiArrowLeft />
                Voltar para logon
            </a>
        </Content>

    </Container>
);
}

export default SignUp;
