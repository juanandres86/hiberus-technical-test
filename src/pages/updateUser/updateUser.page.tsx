import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import { useNavigate, useLocation } from 'react-router-dom'
import UserFormComponent from '../../components/userForm/userForm.component'
import { updateUserService } from '../../services/users'
import { User } from '../../types/user.types'
import { useSelector } from 'react-redux'
import { getToken } from '../../store/session/session.selectors'

const UpdateUserPage = () => {
    const [errorMessage, setErrorMessage] = useState('')
    const [updateUserSuccessMessage, setUpdateUserSuccessMessage] = useState('')
    const navigate = useNavigate()
    const location = useLocation()
    const token = useSelector(getToken)

    const handleSubmit = async (
        name: string,
        surname: string,
        email: string,
        password: string
    ) => {
        const newUser: User = {
            name,
            surname,
            email,
            password,
            id: location.state.user.id,
        }
        setErrorMessage('')
        setUpdateUserSuccessMessage('')
        const resp = await updateUserService(newUser, token)
        if (!resp.success) {
            // success === false
            setErrorMessage(resp.message)
        } else {
            // success === true
            setUpdateUserSuccessMessage(resp.message)
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
                successMessage={updateUserSuccessMessage}
                selectedUser={location.state.user}
                buttonLabel={'Actualizar'}
            />
            <br />
            <Button onClick={handleCancel}>Cancelar</Button>
        </div>
    )
}

export default UpdateUserPage
