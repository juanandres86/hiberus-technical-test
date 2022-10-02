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
    const currentUser = useSelector(getCurrentUser)

    useEffect(() => {
        const getUsersList = async () => {
            const resp = await getUsersService(token)
            setUserList(resp.data as User[])
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
        } else {
            alert('Error removing user')
        }
    }

    const getCurrentUserClassname = (userId: string) => {
        if (userId === currentUser?.id) {
            return 'bg-secondary text-white'
        }
        return ''
    }

    return (
        <div className="container">
            <Row xs={1} sm={1} md={3} xl={4} className="g-4 p-3">
                {userList.map((user) => {
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
                                        variant="primary"
                                        disabled={user.id === currentUser?.id}
                                        onClick={() =>
                                            handleRemoveUser(user.id)
                                        }
                                        className="m-2"
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
