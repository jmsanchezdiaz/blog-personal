import * as Yup from 'yup';

export const searchSchema = Yup.object({
  postQuery: Yup.string().required('Llene el formulario'),
});

export const createSchema = Yup.object({
  title: Yup.string()
    .required('El titulo es requerido')
    .max(100, 'El titulo es demasiado largo'),
  tags: Yup.string().max(15, 'El tema es demasiado largo'),
  content: Yup.string().required('El contenido es requerido'),
});

export const loginSchema = Yup.object({
  email: Yup.string().email('Email Invalido ').required('Email requerido'),
  password: Yup.string()
    .required('Contraseña requerida')
    .min(7, 'La contraseña es muy corta'),
});

export const registerSchema = Yup.object({
  email: Yup.string().email('Email Invalido ').required('Email requerido'),
  password: Yup.string()
    .required('Contraseña requerida')
    .min(7, 'La contraseña es muy corta'),
  confirmPassword: Yup.string()
    .required('La confirmacion de la contraseña es requerida')
    .oneOf([Yup.ref('password')], 'Las contraseñas deben coincidir'),
});
