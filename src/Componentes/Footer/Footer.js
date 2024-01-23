import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons'
import './Footer.css'
library.add(fab, faCheckSquare, faCoffee)


export const Footer = () => {

    return(
        
            <footer className="footerContainer">
                <div className="footerLinks">
                    Encontranos en: <a href='https://www.facebook.com/'><button><FontAwesomeIcon icon="fa-brands fa-facebook" /></button></a>
                    <a href='https://www.instagram.com/'><button><FontAwesomeIcon icon="fa-brands fa-instagram" /></button></a>
                    <a href='https://twitter.com/i/flow/login?input_flow_data=%7B%22requested_variant%22%3A%22eyJsYW5nIjoiZXMifQ%3D%3D%22%7D'><button><FontAwesomeIcon icon="fa-brands fa-twitter" /></button></a>
                </div>
                <div className="footerRights">
                    <p>Todos los derechos reservados</p>
                </div>
            </footer>
            
        
    )
}