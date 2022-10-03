import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import { singUpService } from '../../services/auth'
import { useNavigate } from 'react-router-dom'
import UserFormComponent from '../../components/userForm/userForm.component'

const SignUpPage = () => {
    const [errorMessage, setErrorMessage] = useState('')
    const [signUpSuccessMessage, setSignUpSuccessMessage] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (
        name: string,
        surname: string,
        email: string,
        password: string
    ) => {
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

    const handleGoToLogin = () => {
        navigate('/')
    }

    return (
        <div className="w-50 p-3 mx-auto">
            <UserFormComponent
                onSubmit={handleSubmit}
                errorMessage={errorMessage}
                successMessage={signUpSuccessMessage}
                buttonLabel="Regístrame"
            />
            <br />
            <Button onClick={handleGoToLogin}>Ir a Login</Button>
        </div>
    )
}

export default SignUpPage
