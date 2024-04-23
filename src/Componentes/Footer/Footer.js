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
                    <a href='https://www.facebook.com/'><button className='footerButton'><FontAwesomeIcon icon="fa-brands fa-facebook" /></button></a>
                    <a href='https://www.instagram.com/'><button className='footerButton'><FontAwesomeIcon icon="fa-brands fa-instagram" /></button></a>
                    <a href='https://www.linkedin.com/in/franco-joaquin-beccari-a7519a262/'><button className='footerButton'><FontAwesomeIcon icon="fa-brands fa-linkedin" /></button></a>
                </div>
                <div className="footerRights">
                    <p className='footerRightsText'>Todos los derechos reservados</p>
                </div>
            </footer>
            
        
    )
}