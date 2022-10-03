import React, { useState, useEffect } from 'react'
import { getUsersService, removeUserService } from '../../services/users'
import { useSelector } from 'react-redux'
import { getCurrentUser, getToken } from '../../store/session/session.selectors'
import { User } from '../../types/user.types'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { useNavigate } from 'react-router-dom'

const UsersPage = () => {
    const navigate = useNavigate()
    const token = useSelector(getToken)
    const [userList, setUserList] = useState<User[]>([])
    const [searchList, setSearchList] = useState<User[]>([])
    const currentUser = useSelector(getCurrentUser)

    useEffect(() => {
        const getUsersList = async () => {
            const resp = await getUsersService(token)
            setUserList(resp.data as User[])
            setSearchList(resp.data as User[])
        }
        getUsersList()
    }, [token])

    const handleUpdateUser = (user: User) => {
        navigate('/update', { state: { user } })
    }

    const handleRemoveUser = async (userId: string) => {
        const response = await removeUserService(userId, token)
        if (response.success) {
            const newList = userList.filter((user) => user.id !== userId)
            setUserList(newList)
            setSearchList(newList)
        } else {
            alert(response.message)
        }
    }

    const getCurrentUserClassname = (userId: string) => {
        if (userId === currentUser?.id) {
            return 'bg-secondary text-white'
        }
        return ''
    }

    const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const search = e.target.value
        if (search && search.length > 0) {
            const newList = userList.filter(
                (user) =>
                    user.name.toLowerCase().includes(search.toLowerCase()) ||
                    user.email.toLowerCase().includes(search.toLowerCase())
            )
            setSearchList(newList)
        } else {
            setSearchList(userList)
        }
    }

    return (
        <div className="container">
            <div className="input-group mb-3 p-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Buscar usuario"
                    aria-label="Buscar usuario"
                    aria-describedby="basic-addon2"
                    onChange={onSearch}
                />
            </div>
            <Row xs={1} sm={2} md={3} xl={4} className="g-4 p-3">
                {searchList.map((user) => {
                    return (
                        <Col key={user.id}>
                            <Card className={getCurrentUserClassname(user.id)}>
                                <Card.Body>
                                    <Card.Title>{`${user.name} ${user.surname}`}</Card.Title>
                                    <Card.Text>{user.email}</Card.Text>
                                    <Button
                                        variant="primary"
                                        onClick={() => handleUpdateUser(user)}
                                    >
                                        Editar
                                    </Button>
                                    <Button
                                        className="m-2"
                                        variant="primary"
                                        disabled={user.id === currentUser?.id}
                                        onClick={() =>
                                            handleRemoveUser(user.id)
                                        }
                                    >
                                        Eliminar
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    )
                })}
            </Row>
        </div>
    )
}

export default UsersPage
