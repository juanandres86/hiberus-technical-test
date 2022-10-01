import React, { useState, useEffect } from 'react'
import { getUsersService } from '../../services/users'
import { useSelector } from 'react-redux'
import { getToken } from '../../store/application/application.selectors'
import { User } from '../../types/user.types'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import ListGroup from 'react-bootstrap/ListGroup'

const UsersPage = () => {
    const token = useSelector(getToken)
    const [userList, setUserList] = useState<User[]>([])
    useEffect(() => {
        const getUsersList = async () => {
            const resp = await getUsersService(token)
            setUserList(resp.data as User[])
            console.log(resp.data)
        }
        getUsersList()
    }, [token])

    return (
        <div className="container">
            {/* <Card style={{ width: 'fit-content' }}>
                <ListGroup variant="flush">
                    {userList.map((user) => {
                        return (
                            <ListGroup.Item>
                                {' '}
                                {`Nombre: ${user.name} ${user.surname} Email: ${user.email}`}{' '}
                            </ListGroup.Item>
                        )
                    })}
                </ListGroup>
            </Card> */}

            <Row xs={1} md={2} className="g-4">
                {userList.map((user) => {
                    return (
                        <Col>
                            <Card>
                                <Card.Body>
                                    <Card.Title>{`${user.name} ${user.surname}`}</Card.Title>
                                    <Card.Text>Email: {user.email}</Card.Text>
                                    <Button variant="primary">Editar</Button>
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
