import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom'
import UserFormComponent from '../../components/userForm/userForm.component'
import { createUserService } from '../../services/users'
import { useSelector } from 'react-redux'
import { getToken } from '../../store/session/session.selectors'

const CreateUserPage = () => {
    const [errorMessage, setErrorMessage] = useState('')
    const [createUserSuccessMessage, setCreateUserSuccessMessage] = useState('')
    const navigate = useNavigate()
    const token = useSelector(getToken)

    const handleSubmit = async (
        name: string,
        surname: string,
        email: string,
        password: string
    ) => {
        setErrorMessage('')
        setCreateUserSuccessMessage('')
        const resp = await createUserService(
            name,
            surname,
            email,
            password,
            token
        )
        if (!resp.success) {
            // success === false
            setErrorMessage(resp.message)
        } else {
            // success === true
            setCreateUserSuccessMessage(resp.message)
            navigate('/users')
        }
    }

    const handleCancel = () => {
        navigate('/users')
    }

    return (
        <div className="w-50 p-3 mx-auto">
            <UserFormComponent
                onSubmit={handleSubmit}
                errorMessage={errorMessage}
                successMessage={createUserSuccessMessage}
                buttonLabel={'Crear Usuario'}
            />
            <br />
            <Button onClick={handleCancel}>Cancelar</Button>
        </div>
    )
}

export default CreateUserPage
