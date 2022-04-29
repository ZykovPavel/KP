import 'bootstrap/dist/css/bootstrap.min.css';
import {Carousel} from "react-bootstrap"

function Home() {
  return (
    <>
      <Carousel variant="light" fade={true} controls={false} indicators={false} style={{position: 'fixed', top: 0, left: 0, zIndex: '-1', width: '100%', height: '100%', display: 'flex'}} interval={1000}>
        <Carousel.Item style={{minHeight: '100%', maxHeight: '100%' }}>
          <img
            className="d-block"
            style={{width: '100%', height: 'auto'}}
            src={require("../images/bg1.jpg")}
            alt="First slide"
          />
          <Carousel.Caption>
            <h2><b>Проверенные авто с гарантией</b></h2>
            <p><b><a href="/shop" style={{color: '#66a7c4'}}>Выберите автомобиль</a> любого класса и стоимости.</b></p>
          </Carousel.Caption>
        </Carousel.Item>
        {/* <Carousel.Item style={{minHeight: '100%', maxHeight: '100%'}}>
          <img
            className="d-block"
            style={{width: '100%', height: 'auto'}}
            src={require("../images/bg2.jpg")}
            alt="Second slide"
          />
          <Carousel.Caption>
          <h2><b>Выкупим Ваше авто в течение часа!</b></h2>
            <p><b><a href="/sale" style={{color: '#66a7c4'}}>Оставьте заявку</a> и мы с Вами свяжемся в кратчайшие сроки.</b></p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item style={{minHeight: '100%', maxHeight: '100%'}}>
          <img
            className="d-block"
            style={{width: '100%', height: 'auto'}}
            src={require("../images/bg3.jpg")}
            alt="Third slide"
          />
          <Carousel.Caption>
            <h2><b>Проверенные авто с гарантией</b></h2>
            <p><b><a href="/shop" style={{color: '#66a7c4'}}>Выберите автомобиль</a> любого класса и стоимости.</b></p>
          </Carousel.Caption>
        </Carousel.Item> */}
      </Carousel>
    </>
  );
}

export default Home;
