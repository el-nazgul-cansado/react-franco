import * as Yup from 'yup';

export const DeliveryCheckoutValidation = Yup.object({
    option: Yup.string().required('Este campo es requerido'),
    address: Yup.string().required('Este campo es requerido'),
    addressNumber: Yup.string().required('Este campo es requerido'),
    zipCode: Yup.string().required('Este campo es requerido'),
    province: Yup.string().required('Este campo es requerido'),
    city: Yup.string().required('Este campo es requerido'),
    crossStreet1: Yup.string().required('Este campo es requerido'),
    crossStreet2: Yup.string().required('Este campo es requerido'),
});