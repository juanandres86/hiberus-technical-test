import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { getCurrentUser } from '../../store/session/session.selectors'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../store/session/session.slice'
import { useNavigate } from 'react-router-dom'

function NavBarComponent() {
    const currentUser = useSelector(getCurrentUser)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = () => {
        dispatch(logout())
        navigate('/')
    }

    return (
        <Navbar bg="light" variant="light">
            <Container>
                <Navbar.Brand>
                    {`Usuario: ${currentUser?.name ?? ''} ${
                        currentUser?.surname ?? ''
                    }`}
                </Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link>Crear usuario</Nav.Link>
                    <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default NavBarComponent
