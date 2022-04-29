import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Nav, Container} from "react-bootstrap";

function menuIndex() {
  if (window.location.href.indexOf('home') > 0) {
    return 1
  }

  if (window.location.href.indexOf('shop') > 0) {
    return 2
  }

  if (window.location.href.indexOf('orders') > 0) {
    return 3
  }

  if (window.location.href.indexOf('admin') > 0) {
    return 4
  }

  return
}

function Menu() {
  return (
    <Navbar bg="custom" variant="dark" style={{padding: '10px 40px'}}>
      <Container style={{justifyContent: 'flex-start'}}>
        <Navbar.Brand href="/home">
        <img
          src={require('../images/logo.png')}
          width="90"
          height="auto"
          className="d-inline-block align-top"
          alt="Logo"
        />{' '}
        Автомагазин</Navbar.Brand>
        <Nav activeKey={menuIndex()}>
          <Nav.Item>
            <Nav.Link eventKey="1" href="/home">
              Главная
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="2" href="/shop">
              Ассортимент
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="3" href="/orders">
              Заявка на выкуп
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="4" href="/admin">
              Статусы
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Menu;
