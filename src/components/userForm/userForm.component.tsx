import React, { useState } from 'react'
import { Alert, Button, Form } from 'react-bootstrap'
import { User } from '../../types/user.types'

type UserFormProps = {
    onSubmit: (
        name: string,
        surname: string,
        email: string,
        password: string
    ) => void
    errorMessage?: string
    successMessage?: string
    selectedUser?: User
    buttonLabel: string
}

const UserForm = ({
    onSubmit,
    errorMessage,
    successMessage,
    selectedUser,
    buttonLabel,
}: UserFormProps) => {
    const [name, setName] = useState(selectedUser?.name ?? '')
    const [surname, setSurname] = useState(selectedUser?.surname ?? '')
    const [email, setEmail] = useState(selectedUser?.email ?? '')
    const [password, setPassword] = useState(selectedUser?.password ?? '')

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

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        onSubmit(name, surname, email, password)
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                    placeholder="Introduce tu nombre"
                    value={name}
                    onChange={handleChangeName}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicSurname">
                <Form.Label>Apellido</Form.Label>
                <Form.Control
                    placeholder="Introduce tu apellido"
                    value={surname}
                    onChange={handleChangeSurname}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Introduce tu email"
                    value={email}
                    onChange={handleChangeEmail}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Introduce tu Password"
                    value={password}
                    onChange={handleChangePassword}
                    required
                />
            </Form.Group>
            {errorMessage !== '' && (
                <Alert key={'danger'} variant={'danger'}>
                    {errorMessage}
                </Alert>
            )}
            {successMessage !== '' && (
                <Alert key={'success'} variant={'success'}>
                    {successMessage}
                </Alert>
            )}
            <Button variant="primary" type="submit">
                {buttonLabel}
            </Button>
        </Form>
    )
}

export default UserForm
