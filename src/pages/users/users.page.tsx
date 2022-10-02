import React, { useState, useEffect } from 'react'
import { getUsersService } from '../../services/users'
import { useSelector } from 'react-redux'
import { getToken } from '../../store/session/session.selectors'
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

    return (
        <div className="container">
            <Row xs={1} md={2} className="g-4">
                {userList.map((user) => {
                    return (
                        <Col key={user.id}>
                            <Card>
                                <Card.Body>
                                    <Card.Title>{`${user.name} ${user.surname}`}</Card.Title>
                                    <Card.Text>Email: {user.email}</Card.Text>
                                    <Button
                                        variant="primary"
                                        onClick={() => handleUpdateUser(user)}
                                    >
                                        Editar
                                    </Button>
                                    <Button variant="primary">Eliminar</Button>
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
