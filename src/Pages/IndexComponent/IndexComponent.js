import Carousel from 'react-bootstrap/Carousel';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSabersIcons } from '../../context/SabersIconsContext';
import { ItemListContainer } from '../../Componentes/ItemListContainer/ItemListContainer';
import "./IndexComponent.css"
import { Sabers_and_Icons_carousel } from '../../Componentes/Sabers_and_Icons_carousel/Sabers_and_Icons_carousel';


function IndexComponent() {

  const { toIndex, sabersAndIcons } = useSabersIcons()

  useEffect(() => {
    sessionStorage.setItem('toIndex', toIndex);
  }, [toIndex]);

  if (toIndex === 1) {
    return(
      <div className="parent-container">
        <div className="sai_carousel_and_next_container">
          <Sabers_and_Icons_carousel />
        </div>
      </div>
    )
  }

  return (
    <div>
      <div>
        <div className='carouselContainer'>
                <h1 className="title">Proyecto MultiConsola</h1>
                  <Carousel>
                    <Carousel.Item>
                    <Link to = "/productos/consola">
                      <img
                        className="d-block w-100 carouselImg"
                        src="https://www.muycomputer.com/wp-content/uploads/2021/04/C%C3%B3mo-exportar-capturas-y-v%C3%ADdeos-de-la-consola-a-un-ordenador-1000x600.jpg"
                        alt="Second slide"
                      />
                      </Link>
                      <Carousel.Caption>
                        <h3>Todo lo que necesitas para tu consola</h3>
                        <p>Lo ultimo, lo anterior y lo mas retro en consolas</p>
                      </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                      <Link to = "/productos/consola">
                      <img
                        className="d-block w-100 carouselImg"
                        src="https://www.muycomputer.com/wp-content/uploads/2019/08/PC-barato-1080p-portada-1000x600.jpg"
                        alt="Second slide"
                      />
                      </Link>
          
                      <Carousel.Caption>
                        <h3>Armá tu PC Gamer</h3>
                        <p>Todos los perifericos que necesites para terminar de armar tu PC</p>
                      </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                    <Link to = "/productos/pc">
                      <img
                        className="d-block w-100 carouselImg"
                        src="https://www.muycomputer.com/wp-content/uploads/2022/09/Robo_cuentas_Steam-1000x600.jpg"
                        alt="Second slide"
                      />
                      </Link>
          
                      <Carousel.Caption>
                        <h3>Todas las plataformas</h3>
                        <p>
                          Accede a la plataforma que quieras dsde nuestra pagina
                        </p>
                      </Carousel.Caption>
                    </Carousel.Item>
                  </Carousel>
                </div>
          
                <div>
                  <ItemListContainer />
                </div>
              </div>
    </div>
  );
}

export default IndexComponent;