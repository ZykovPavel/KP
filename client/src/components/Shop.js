import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState, useEffect} from 'react';
import {Alert, Container, Row, Col, Card, Button, Modal, Form} from "react-bootstrap"
import NotFound from './NotFound';

function Shop() {
  const [data, setData] = useState(undefined);
  const [modal, setModal] = useState(false);
  const [alert, setAlert] = useState(false);
  const [variant, setVariant] = useState('danger')
  const [message, setMessage] = useState('')

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [carId, setCarId] = useState('');
  const [carModel, setCarModel] = useState('');
  const [carPrice, setCarPrice] = useState('');

  const fetchData = async () => {
    let url = 'http://localhost:5000/shop'    
    const data = await fetch(url).then(res => res.json()).then(data => data)                  
    setData(data);
  };

  useEffect(() => {
    fetchData();
  }, [])

  useEffect(() => {
    setName(name.replace(/[^А-Яа-я -]/g, ''))
    phone.length < 12 ? setPhone(phone.replace(/[^0-9]/g, '')) : setPhone(phone.replace(/[^0-9]/g, '').substring(0,11))
  }, [name, phone])

  const createOrder = async () => {
    let res = await fetch('http://localhost:5000/createorder', {
                     method: 'POST',
                     body: JSON.stringify({
                      name: name,
                      phone: phone,
                      carId: carId,
                      carModel: carModel,
                      price: carPrice
                      })
                    })
                    .then(res=>res.json())
                    .then(res=>res)
      console.log(res)
    if (res === 'OK') {
      setVariant('success')  
    } else
      setVariant('danger')

    setAlert(true);
    setMessage(res);
    fetchData();
  }

  return (
    data === undefined ? 
      <>
        <NotFound text="Нет данных" />
      </>
    :
      <> 
        <Container>
          <Row>
            {data.map((item, i) =>
              <Col key={i} md={3} style={i<4 ? {marginTop: '25px', marginBottom: '25px'}:{marginBottom: '25px'}}> 
                <Card className="h-100">
                  <Card.Img variant="top" src={require(`../${item.image_url}`)}/>
                      <Card.Header><b>{item.marka} {item.model} {item.year}</b></Card.Header>
                  <Card.Body style={{paddingBottom: '60px'}}>
                      <b>Объем: </b>{item.obyem} л.<hr style={{margin: '5px'}}/>
                      <b>Топливо: </b>{item.toplivo}<hr style={{margin: '5px'}}/>
                      <b>Мощность: </b>{item.moshnost}<hr style={{margin: '5px'}}/>
                      <b>КПП: </b>{item.kpp}<hr style={{margin: '5px'}}/>
                      <b>Привод: </b>{item.privod}<hr style={{margin: '5px'}}/>
                      <b>Руль: </b>{item.rul}<hr style={{margin: '5px'}}/>
                      <b>Цена:</b> {item.price} руб.
                      {item.o_id === null ? 
                        <Button style={{position: 'absolute', bottom: '10px', right: '10px', background: '#2c5364', borderColor: '#2c5364'}} variant="primary" onClick={async ()=>{
                          setCarId(item.id); 
                          setCarModel(item.marka + ' ' + item.model + ' ' + item.year); 
                          setCarPrice(item.price); 
                          setModal(true);
                        }}
                        >Забронировать авто</Button>
                      :
                        <Button style={{position: 'absolute', bottom: '10px', right: '10px'}} variant="danger" disabled>
                          Автомобиль забронирован
                        </Button>
                      }
                  </Card.Body>
                </Card>
              </Col>
            )}
          </Row>
        </Container>
        {carId !== '' ?
          <Modal show={modal} onHide={()=>{setModal(false);setAlert(false);setMessage('');}}> 
            <Modal.Header closeButton>
              <Modal.Title>Забронировать авто</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {alert ? <Alert variant={variant}>
                  {message === 'OK' ? 
                    <>
                      Уважаемый <b>{name}</b>! <hr style={{margin: '5px'}}/> Автомобиль <b>{carModel}</b> успешно забронирован!<hr style={{margin: '5px'}}/>Ожидайте звонка на номер <b>{phone}</b>
                    </>:<>{message}</>}
                </Alert> : <></>}
                    <img alt={carId} src={require(`../${data.find(x=>x.id===carId).image_url}`)} style={{width: '100%', height: 'auto', marginBottom: '20px'}}/>
                  Автомобиль: <b>{data.find(x=>x.id===carId).marka} {data.find(x=>x.id===carId).model} {data.find(x=>x.id===carId).year}</b> | Цена: <b>{data.find(x=>x.id===carId).price} руб.<hr/>
                  </b>
                  <Form style={{marginTop: '15px'}}>
                    <Form.Group className="mb-3">
                      <Form.Control type="text" placeholder="Имя" value={name} onChange={(e)=>setName(e.target.value)} disabled={alert && variant === 'success'}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Control type="text" placeholder="Номер телефона"  className="phone validate" value={phone} maxLength={11} onChange={(e)=>setPhone(e.target.value)} disabled={alert && variant === 'success'}/>
                    </Form.Group>
                  </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button disabled={alert && variant === 'success'} style={{background: '#2c5364', borderColor: '#2c5364'}} variant="primary" onClick={async ()=>{
                await createOrder();
              }}> 
                Забронировать авто
              </Button>
            </Modal.Footer>
          </Modal>
        :
          <></>
        }
      </>
  );
}

export default Shop;
