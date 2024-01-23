import React from 'react';
import './AnimatedLinks.scss'; // Asegúrate de importar el archivo CSS

const AnimatedLink = ({ href, imgSrc, altText, text, className, classNameText, classNameImg }) => {
    return (
        <a href={href} className={className} >
            <a href={href}>
                <img className={classNameImg} src={imgSrc} alt={altText} />
                <span className={classNameText}>{text}</span>
            </a>
        </a>
    );
};

export default AnimatedLink;