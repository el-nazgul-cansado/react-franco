import * as Yup from 'yup';

export const CheckoutValidation = Yup.object({
    nombre: Yup.string().min(5).required('Este campo es requerido'),
    email: Yup.string().email('Por favor escriba un mail válido').required('Este campo es requerido'),
    celular: Yup.string().matches(/^[0-9]{16}$/, 'Debe contener solo números').typeError('Ingrese números solamente').required('Este campo es requerido'),
    metodoDePago: Yup.string().required('Este campo es requerido'),
    creditCard: Yup.string().matches(/^[0-9]{16}$/, 'Debe contener solo números').typeError('Ingrese números solamente').required('Este campo es requerido'),
    MM: Yup.string()
        .matches(/^[0-9]{2}$/, 'Debe contener solo números')
        .test('is-valid-month', 'Mes inválido', value => {
        const num = parseInt(value, 10);
        return num >= 1 && num <= 12;
        })
    .required('Este campo es requerido'),
    YY: Yup.string()
        .matches(/^[0-9]{2}$/, 'Debe contener solo dos dígitos')
        .typeError('Ingrese números solamente')
        .required('Este campo es requerido')
        .test(
        'es-año-valido',
        'El año no puede ser menor al año actual',
        function(value) {
            const currentYear = new Date().getFullYear(); // Año actual (2024 por ejemplo)
            const twoDigitCurrentYear = currentYear % 100; // Obtener los últimos dos dígitos del año actual
            const inputYear = parseInt(value, 10); // Convertir el valor ingresado en un número
    
            return inputYear >= twoDigitCurrentYear; // Verificar que el año ingresado no sea menor al actual
        }
    ),
    cvc: Yup.string().matches(/^[0-9]{3}$/, 'Debe contener solo números').typeError('Ingrese números solamente').required('Este campo es requerido')
});