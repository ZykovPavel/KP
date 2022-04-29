import React, {useEffect, useState} from "react";
import {Container, Row, Col, Form, Button, Card, Alert} from 'react-bootstrap';

function Orders() {
  const [marka, setMarka] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const setData = async() => {
    let res;
    if (phone && name && marka && model && year) {
       res = await fetch(`http://localhost:5000/createsale`, {
                        method: 'POST',
                        body: JSON.stringify({
                          name: name,
                          phone: phone,
                          marka: marka,
                          model: model,
                          year: year,
                        })
                      })
                      .then(res=>res.json())
                      .then(res=>res) 
      setMessage(res)
    } else {
      setMessage('Не все поля заполнены!')
    }
  }

  useEffect(() => {
    setName(name.replace(/[^А-Яа-я -]/g, ''))
    phone.length < 12 ? setPhone(phone.replace(/[^0-9]/g, '')) : setPhone(phone.replace(/[^0-9]/g, '').substring(0,11))
    setMarka(marka.replace(/[^А-Яа-яA-Za-z]/g, ''))
    setModel(model.replace(/[^А-Яа-яA-Za-z]/g, ''))
    year.length < 5 ? setYear(year.replace(/[^0-9]/g, '')) : setYear(year.replace(/[^0-9]/g, '').substring(0,4))
  }, [name, phone, marka, model, year])

  return (
    <>
      <Container>
          <Row>
            <Col md={{span: 4, offset: 4}}>
              <Card bg='dark' style={{marginTop: '30px', color: '#fff'}}>
                <Card.Header>Оставьте заявку на выкуп Вашего авто</Card.Header>
                <Card.Body>
                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Control placeholder="Имя" value={name} onChange={(e)=>setName(e.target.value)} disabled={message==='OK'}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Control placeholder="Номер телефона" value={phone} onChange={(e)=>setPhone(e.target.value)} disabled={message==='OK'}/>                    
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Control placeholder="Марка автомобиля" value={marka} onChange={(e)=>setMarka(e.target.value)} disabled={message==='OK'}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Control placeholder="Модель" value={model} onChange={(e)=>setModel(e.target.value)} disabled={message==='OK'}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Control placeholder="Год выпуска" value={year} onChange={(e)=>setYear(e.target.value)} disabled={message==='OK'}/>
                    </Form.Group>
                    {message==='OK'? <Alert variant="success"><b>{name}</b>, заявка на выкуп Вашего <b>{marka} {model} {year} г.в.</b> успешно создана! <hr/>Ожидайте звонка по номеру <b>{phone}</b></Alert>:<></>}
                    {message==='Не все поля заполнены!'? <Alert variant="danger">{message}</Alert>:<></>}
                    <Button style={{width: '100%'}} variant='success' onClick={()=>setData()} disabled={message==='OK'}>Отправить заявку</Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
      </Container>
    </>
  );
}

export default Orders;
