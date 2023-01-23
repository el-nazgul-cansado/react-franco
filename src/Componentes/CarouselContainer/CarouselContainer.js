import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom';
import { ItemListContainer } from '../ItemListContainer/ItemListContainer';
import "./CarouselContainer.scss"

function CarouselContainer() {
  return (
    <div>
    <div className='carouselContainer'>
      <h2 className='titulo'>Proyecto MultiConsola</h2>
      <Carousel>
        <Carousel.Item>
        <Link to = "/productos/consola">
          <img
            className="d-block w-100 carouselImg"
            src="https://images.unsplash.com/photo-1603481588273-2f908a9a7a1b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGMlMjBnYW1lcnxlbnwwfHwwfHw%3D&w=1000&q=80"
            alt="Second slide"
          />
          </Link>
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Link to = "/productos/consola">
          <img
            className="d-block w-100 carouselImg"
            src="https://images.unsplash.com/photo-1603481588273-2f908a9a7a1b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGMlMjBnYW1lcnxlbnwwfHwwfHw%3D&w=1000&q=80"
            alt="Second slide"
          />
          </Link>

          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
        <Link to = "/productos/pc">
          <img
            className="d-block w-100 carouselImg"
            src="https://images.unsplash.com/photo-1603481588273-2f908a9a7a1b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGMlMjBnYW1lcnxlbnwwfHwwfHw%3D&w=1000&q=80"
            alt="Second slide"
          />
          </Link>

          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>

    <div>
      <ItemListContainer />
    </div>
    </div>
  );
}

export default CarouselContainer;