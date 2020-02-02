import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      first_name: Yup.string().required('O nome é obrigatório'),
      last_name: Yup.string().required('O sobrenome é obrigatório'),
      email: Yup.string()
        .email('Insira um e-mail válido')
        .required('O e-mail é obrigatório'),
      unencrypted_password: Yup.string()
        .min(6, 'A senha tem que ter no mínimo 6 dígitos')
        .required('A senha é obrigatória')
    });

    await schema.validate(req.body, { abortEarly: true });

    return next();
  } catch (err) {
    return res.status(400).json({
      message: err.message
    });
  }
};
