import { useEffect, useRef } from 'react';
import './StarredBackground.css'

export const StarredBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Genera las estrellas con posiciones y tamaños fijos, pero con opacidad inicial aleatoria
        const stars = Array.from({ length: 1500 }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * (1.3 - 0.5) + 0.8,
            opacity: Math.random(),
            deltaOpacity: Math.random() * 0.01 + 0.007, // Controla la velocidad del cambio de opacidad
        }));

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpia el canvas

            stars.forEach(star => {
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
                ctx.fill();

                // Ajusta la opacidad de las estrellas para simular el titilar
                star.opacity += star.deltaOpacity;
                // Invierte el cambio de opacidad si alcanza los límites para crear un efecto de "titileo"
                if (star.opacity <= 0.3 || star.opacity >= 1) {
                    star.deltaOpacity = -star.deltaOpacity;
                }
            });

            requestAnimationFrame(animate); // Solicita el siguiente frame de animación para continuar el titileo
        };

        animate(); // Inicia la animación de titileo
    }, []);

    return <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, zIndex: -1, width: '100%', height: '100%' }} />;
};