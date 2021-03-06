import React, { useState } from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { Container, Form } from './styles';
import api from '../../services/api';
import { useHistory } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    let history = useHistory();

    const sendMessage = async (e) => {
        e.preventDefault(); // não recarregar a página

        api.post('/users', {
            name: name,
            email: email,
            password: password,
            password_confirmation: confirmPassword,
        }, {
            headers: {
                Authorization : localStorage.getItem('token')
            },
        })
        .then(() => {
            alert('Cadastro efetuado com sucesso');
            history.push('/users')
        })
        .catch(error => {
            console.error(error);
            alert('Ocorreu um erro! Tente novamente.');
        });
    }

    return (
        <Container>
            <Form>
                <Input value={ name } onChange={ setName } type='text'>Nome</Input>
                <Input value={ email } onChange={ setEmail } type='text'>Email</Input>
                <Input value={ password } onChange={ setPassword } type='password'>Senha</Input>
                <Input value={ confirmPassword} onChange={ setConfirmPassword } type='password'>Confirme a senha</Input>
                <Button onClick={ sendMessage }>Cadastrar</Button>
            </Form>
        </Container>
    );
}

export default Register;