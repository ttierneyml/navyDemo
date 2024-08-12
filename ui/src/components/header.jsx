import Logo from './logo.svg';
import './header.css';
import { Container, Navbar } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';

export default function Header() {
    return (
      <Navbar fixed="top" className="shadow-sm" bg="primary" data-bs-theme="dark" expand="lg">
        <Container fluid className="justify-content-lg-start ml-dark">
          <Navbar.Brand className="navheader-logo" href="/"><img width="230" src={Logo} alt="logo" /></Navbar.Brand>
          <Nav className="me-auto d-inline-block align-bottom">
            <Nav.Link href="/search">Search</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    )
}