import { useRef, useEffect, useState } from 'react';
import { useSabersIcons } from '../../context/SabersIconsContext';
import { Link } from 'react-router-dom';
import './Item.css';

export const Item = ({ id, name, image, price, stock }) => {
    const { selectedIcon } = useSabersIcons();
    const audioRef = useRef(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false)

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
    };

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
        setIsHovering(true)
    };

    const stopHoverSound = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            audioRef.current.volume = 0;
        }
        setIsHovering(false)
    };

    return (
        <div
            className={`col-2 item hover${selectedIcon.color}`}
            onMouseEnter={playHoverSound}
            onMouseLeave={stopHoverSound}
            onMouseMove={handleMouseMove}
            style={{
                background: isHovering
                    ? `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, ${selectedIcon.color}, transparent 30%), black`
                    : 'black'
            }}
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
                <button disabled className="itemLink">Ver más</button>
            ) : (
                <Link className="itemLink" to={`/detail/${id}`}>Ver más</Link>
            )}
            <audio ref={audioRef} src="assets/sounds/lightsaber-sound-effect.mp3" />
        </div>
    );
};