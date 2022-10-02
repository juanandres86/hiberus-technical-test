import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { loginService } from '../../services/auth'
import Alert from 'react-bootstrap/Alert'
import { useDispatch, useSelector } from 'react-redux'
import { login, logout } from '../../store/session/session.slice'
import { getIsLogged } from '../../store/session/session.selectors'
import { useNavigate } from 'react-router-dom'
import { getCurrentUserInfoService } from '../../services/users'
import { LoginResponse } from '../../types/service.types'
import { User } from '../../types/user.types'

const LoginPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const isLogged = useSelector(getIsLogged)
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        if (isLogged) {
            navigate('/users')
        }
    }, [isLogged, navigate])

    const handleGoSignUp = () => {
        navigate('/signup')
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setErrorMessage('')
        dispatch(logout())
        const jwtToken = await loginService(email, password)
        if (jwtToken.success) {
            const loginData = jwtToken.data as LoginResponse
            const userData = await getCurrentUserInfoService(
                loginData.tokenType,
                loginData.accessToken
            )
            const user = userData.data as User
            dispatch(login({ user, ...loginData }))
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
                        placeholder="Introduce tu email"
                        value={email}
                        onChange={handleChangeEmail}
                    />
                    <Form.Text className="text-muted"></Form.Text>
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
                    Login
                </Button>
                <Button variant="primary" onClick={handleGoSignUp}>
                    Registro
                </Button>
            </Form>
        </div>
    )
}

export default LoginPage
