import { Footer } from "../../Componentes/Footer/Footer"
import AnimatedLink from '../../Componentes/AnimatedLinks/AnimatedLinks.js';
import './Plataformas.scss';

export const Plataformas = () => {

    return(
        <>
            <div className="link-container">
                <AnimatedLink
                    className={'link-wrapper steamLink'}
                    classNameText={'link-text-steam'}
                    classNameImg={'link-img-steam'}
                    href="https://store.steampowered.com/?l=spanish"
                    imgSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReSTibIexh5vG3l2PGKS5W6t6XQyOKhMRbMsvR9_O0-mtRA4j2iumdi_kQ3WvGwj2rGi4&usqp=CAU"
                    altText="Steam"
                    text="Steam"
                />
                <AnimatedLink
                    className={'link-wrapper originLink'}
                    classNameText={'link-text-origin'}
                    classNameImg={'link-img-origin'}
                    href="https://www.ea.com/es-es/games/library/pc-download"
                    imgSrc="https://d15shllkswkct0.cloudfront.net/wp-content/blogs.dir/1/files/2014/12/Origin-logo.png"
                    altText="Origin"
                    text="Origin"
                />
                <AnimatedLink
                    className={'link-wrapper playStationLink'}
                    classNameText={'link-text-play-station'}
                    classNameImg={'link-img-play-station'}
                    href="https://store.playstation.com/es-ar/pages/latest?gclid=CjwKCAiA3KefBhByEiwAi2LDHJV8qyY5U6RfUMl8aETNg1zJ5nfRufwGcWDt0PJLDKr3CH_OSaEe5BoCbzoQAvD_BwE&gclsrc=aw.ds"
                    imgSrc="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Playstation_logo_colour.svg/631px-Playstation_logo_colour.svg.png"
                    altText="PlayStation"
                    text="PlayStation"
                />
                <AnimatedLink
                    className={'link-wrapper xBoxLink'}
                    classNameText={'link-text-xbox'}
                    classNameImg={'link-img-xbox'}
                    href="https://www.xbox.com/es-AR"
                    imgSrc="https://www.pngplay.com/wp-content/uploads/8/Xbox-Green-Logo-PNG-HD-Quality.png"
                    altText="Xbox"
                    text="Xbox"
                />
                <AnimatedLink
                    className={'link-wrapper epicGamesLink'}
                    classNameText={'link-text-epic-games'}
                    classNameImg={'link-img-epic-games'}
                    href="https://www.epicgames.com/site/es-ES/home"
                    imgSrc="https://upload.wikimedia.org/wikipedia/commons/a/a7/Epic_Games_logo.png"
                    altText="EpicGames"
                    text="Epic Games"
                />
                <AnimatedLink
                    className={'link-wrapper gogLink'}
                    classNameText={'link-text-GOG'}
                    classNameImg={'link-img-GOG'}
                    href="https://www.gog.com/"
                    imgSrc="https://upload.wikimedia.org/wikipedia/commons/d/de/GOG.com_Logo.png"
                    altText="GOG"
                    text="GOG"
                />
            </div>
            <Footer />
        </>
    )
}