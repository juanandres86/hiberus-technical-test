import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { loginService } from '../../services/auth'
import Alert from 'react-bootstrap/Alert'
import { useDispatch, useSelector } from 'react-redux'
import {
    removeToken,
    setToken,
} from '../../store/application/application.slice'
import { getIsLogged } from '../../store/application/application.selectors'

const LoginPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const isLogged = useSelector(getIsLogged)
    const [errorMessage, setErrorMessage] = useState('')

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setErrorMessage('')
        dispatch(removeToken())
        const jwtToken = await loginService(email, password)
        if (jwtToken.success) {
            dispatch(setToken(jwtToken))
        } else {
            // success === false
            setErrorMessage(jwtToken.message)
        }
    }

    const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    return (
        <div className="container">
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={handleChangeEmail}
                    />
                    <Form.Text className="text-muted"></Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={handleChangePassword}
                    />
                </Form.Group>
                {isLogged && (
                    <Alert key={'success'} variant={'success'}>
                        Login correcto
                    </Alert>
                )}
                {errorMessage !== '' && (
                    <Alert key={'danger'} variant={'danger'}>
                        {errorMessage}
                    </Alert>
                )}
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default LoginPage
