import { useRef, useEffect } from 'react';
import { useSabersIcons } from '../../context/SabersIconsContext';
import { Link } from 'react-router-dom';
import './Item.css';

export const Item = ({ id, name, image, price, stock }) => {
    const { selectedIcon } = useSabersIcons();
    const audioRef = useRef(null);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = 0; // Iniciar con volumen en 0
            const audio = audioRef.current;

            const updateVolume = () => {
                const targetVolume = Math.min(1, audio.currentTime / 1); // Ajusta este valor según necesites
                audio.volume = targetVolume;
            };

            audio.addEventListener('timeupdate', updateVolume);

            return () => {
                audio.removeEventListener('timeupdate', updateVolume);
            };
        }
    }, []);

    const playHoverSound = () => {
        if (audioRef.current) {
            audioRef.current.play().catch(error => console.log('Error playing sound:', error));
        }
    };

    const stopHoverSound = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            audioRef.current.volume = 0;
        }
    };

    return (
        <div
            className={`col-2 item hover${selectedIcon.color}`}
            onMouseEnter={playHoverSound}
            onMouseLeave={stopHoverSound}
        >
            <h2 className="itemName">{name}</h2>
            <img className="itemImage" src={image} alt={name} />
            <p className="itemPrice">Precio: <b>$ {price}</b></p>
            {stock <= 5 && stock > 0 ? (
                <p className="itemAlert">¡Quedan pocas unidades!</p>
            ) : stock === 0 ? (
                <p className="itemAlert">¡Ya no quedan unidades!</p>
            ) : null}
            {stock === 0 ? (
                <button disabled className="btn btn-dark">Ver más</button>
            ) : (
                <Link className="btn btn-dark itemLink" to={`/detail/${id}`}>Ver más</Link>
            )}
            <audio ref={audioRef} src="/assets/sounds/lightsaber-sound-effect.mp3" />
        </div>
    );
};