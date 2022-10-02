import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { getCurrentUser } from '../../store/session/session.selectors'
import { useSelector } from 'react-redux'

function NavBarComponent() {
    const currentUser = useSelector(getCurrentUser)
    return (
        <Navbar bg="light" variant="light">
            <Container>
                <Navbar.Brand>
                    {`Usuario: ${currentUser?.name ?? ''} ${
                        currentUser?.surname ?? ''
                    }`}
                </Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#features">Features</Nav.Link>
                    <Nav.Link href="#pricing">Pricing</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default NavBarComponent
