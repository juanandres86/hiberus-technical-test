import React, { useState } from 'react'
import { Alert } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { singUpService } from '../../services/auth'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [signUpSuccessMessage, setSignUpSuccessMessage] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setErrorMessage('')
        setSignUpSuccessMessage('')
        const resp = await singUpService(name, surname, email, password)
        if (!resp.success) {
            // success === false
            setErrorMessage(resp.message)
        } else {
            // success === true
            setSignUpSuccessMessage(resp.message)
        }
    }

    const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    const handleChangeSurname = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSurname(e.target.value)
    }

    const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const handleGoToLogin = () => {
        navigate('/')
    }

    const renderActionButton = () => {
        if (signUpSuccessMessage !== '') {
            return (
                <Button variant="primary" onClick={handleGoToLogin}>
                    Ir al Login
                </Button>
            )
        } else {
            return (
                <Button variant="primary" type="submit">
                    Registrame
                </Button>
            )
        }
    }

    return (
        <div className="container">
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                        placeholder="Introduce tu nombre"
                        value={name}
                        onChange={handleChangeName}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicSurname">
                    <Form.Label>Apellido</Form.Label>
                    <Form.Control
                        placeholder="Introduce tu apellido"
                        value={surname}
                        onChange={handleChangeSurname}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Introduce tu email"
                        value={email}
                        onChange={handleChangeEmail}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Introduce tu Password"
                        value={password}
                        onChange={handleChangePassword}
                    />
                </Form.Group>
                {errorMessage !== '' && (
                    <Alert key={'danger'} variant={'danger'}>
                        {errorMessage}
                    </Alert>
                )}
                {signUpSuccessMessage !== '' && (
                    <Alert key={'success'} variant={'success'}>
                        {signUpSuccessMessage}
                    </Alert>
                )}
                {renderActionButton()}
            </Form>
        </div>
    )
}

export default SignUp
