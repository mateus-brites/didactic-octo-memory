import React, { useRef, useCallback, useContext } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import * as Yup from 'yup';

import { Container, Content, Background } from './styles';
import logoImg from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationErrors from '../../utils/getValidaitonErrors';
import { AuthContext } from '../../context/AuthContext';

interface SignInFormData {
    email: string;
    password: string;
}

const SignIn: React.FC = () => {
    const formRef = useRef<FormHandles>(null);

    const { user, signIn } = useContext(AuthContext);

    console.log(user);

    const handleSubmit = useCallback( async (data: SignInFormData) => {
        try{
            formRef.current?.setErrors({});


            const schema = Yup.object().shape({
                email: Yup.string()
                    .email('Digite um e-mail válido')
                    .required('E-mail obrigatório'),
                password: Yup.string().required('Senha obrigatória'),
                    });

            await schema.validate(data, {
                abortEarly: false,
            });

            await signIn({
                email: data.email,
                password: data.password,
            });
        } catch (err) {
            if (err instanceof Yup.ValidationError) {
                const errors = getValidationErrors(err);
                formRef.current?.setErrors(errors);
            }
        }
    }, [signIn],
    );

    return (
    <Container>
        <Content>
            <img src={logoImg} alt="Gobarber" />
            <Form ref={formRef} onSubmit={handleSubmit}>
                <h1>Faça seu logon</h1>
                <Input name="email" icon={FiMail} placeholder="E-mail" />

                <Input name="password"
                    icon={FiLock}
                    type="password"
                    placeholder="Senha"
                />

                <Button type="submit">Entrar</Button>
                <a href="">Esqueci minha senha</a>
            </Form>
            <a href="">
                <FiLogIn />
                Criar conta
            </a>
        </Content>

        <Background />
    </Container>
);
}

export default SignIn;
