import React, {useState, useEffect} from "react";
import {Container, Row, Col, Card, ListGroup, ListGroupItem} from 'react-bootstrap';

function Orders() {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);

  const getData = async() => {
    let res = await fetch(`http://localhost:5000/getorderslist`, {method: 'GET'})
                    .then(res=>res.json())
                    .then(res=>res) 
    setData(res);

    let res2 = await fetch(`http://localhost:5000/getsaleslist`, {method: 'GET'})
                    .then(res=>res.json())
                    .then(res=>res) 
    setData2(res2);
  }

  useEffect(() => {
    getData();
  }, [])

  return (
    <>
      <Container style={{paddingBottom: '25px'}}>
        <h1 style={{marginTop: '40px', color: '#fff'}}>Забронированные автомобили</h1>
        <Row>
          {data.map((item, i) => {
            return (
              <Col md={{span: 4}} key={i} style={{marginTop: '40px'}}>
                  <h5 style={{color: 'red'}}>Забронирован</h5>
                  <Card>
                    <Card.Img variant="top" src={require(`../${item.image_url}`)}/>
                    <Card.Header><b>{item.carModel} | {item.price} руб.</b></Card.Header>
                    <ListGroup variant="flush">
                      <ListGroupItem><b>Имя клиента:</b> {item.name}</ListGroupItem>
                      <ListGroupItem><b>Номер телефона:</b> {item.phone}</ListGroupItem>
                    </ListGroup>
                    </Card>
              </Col>
            ) 
          })}
        </Row>
        <h1 style={{marginTop: '40px', color: '#fff'}}>Заявки на выкуп</h1>
        <Row>
          {data2.map((item, i) => {
            return (
              <Col md={{span: 4}} key={i} style={{marginTop: '40px'}}>
                <Card>
                  <ListGroup variant="flush">
                    <ListGroupItem><b>Имя клиента:</b> {item.name}</ListGroupItem>
                    <ListGroupItem><b>Номер телефона:</b> {item.phone}</ListGroupItem>
                    <ListGroupItem><b>Автомобиль:</b> {item.marka} {item.model} {item.year} г.в.</ListGroupItem>
                  </ListGroup>
                </Card>
              </Col>
            ) 
          })}
        </Row>
      </Container>
    </>
  );
}

export default Orders;
