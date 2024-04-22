
import { useEffect, useRef } from 'react';
import { useStarContext } from '../../context/StarContext';
import './StarredBackground.css'

export const StarredBackground = () => {
    const canvasRef = useRef(null);

    const { quantity, size, starConfirm } = useStarContext()

    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.classList.add('canvasFade');
    
        // Hacer que el canvas sea transparente para "desaparecer" las estrellas
        canvas.style.opacity = '0';
    
        // Inicia un timeout de 5 segundos antes de mostrar el canvas y dibujar las estrellas actualizadas
        const timer = setTimeout(() => {
            // Hacer que el canvas sea opaco para "reaparecer" las estrellas
            canvas.style.opacity = '1';
    
            const ctx = canvas.getContext('2d');
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
    
            const stars = Array.from({ length: quantity }, () => ({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * (size - 0.5) + 0.8,
                opacity: Math.random(),
                deltaOpacity: Math.random() * 0.01 + 0.007,
            }));
    
            const animate = () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
    
                stars.forEach(star => {
                    ctx.beginPath();
                    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
                    ctx.fill();
    
                    star.opacity += star.deltaOpacity;
                    if (star.opacity <= 0.3 || star.opacity >= 1) {
                        star.deltaOpacity = -star.deltaOpacity;
                    }
                });
    
                requestAnimationFrame(animate);
            };
    
            animate();
        }, 500); // Retraso de 5 segundos
    
        // Limpieza: Asegurarse de que la opacidad vuelva a ser 1 si el componente se desmonta o si starConfirm cambia nuevamente antes de los 5 segundos
        return () => {
            clearTimeout(timer);
            canvas.style.opacity = '1';
        };
    }, [quantity, size]);
        
    return <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, zIndex: -1, width: '100%', height: '100%' }} />;
};
/* import { useEffect, useRef } from 'react';
import { useStarContext } from '../../context/StarContext';
import './StarredBackground.css'

export const StarredBackground = () => {
    const canvasRef = useRef(null);

    const { quantity, size, starConfirm } = useStarContext()

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Genera las estrellas con posiciones y tamaños fijos, pero con opacidad inicial aleatoria
        const stars = Array.from({ length: quantity }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * (size - 0.5) + 0.8,
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
    }, [starConfirm]);

    return <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, zIndex: -1, width: '100%', height: '100%' }} />;
}; */