import { Button, Label, Spinner, TextInput } from 'flowbite-react';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import routes from '../common/routes';
import { selectUserIsLogged, signIn } from '../store/userSlice';

const validationSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const initialValues = {
  email: '',
  password: '',
};

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLogged = useSelector(selectUserIsLogged);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values, resetForm) => {
    setLoading(true);

    const res = await dispatch(signIn(values));

    setLoading(false);
    resetForm();

    if (!res.payload) return;

    navigate(routes.home);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, { resetForm }) => handleSubmit(values, resetForm),
  });

  if (isLogged) return <Navigate to={routes.home} />;

  return (
    <form
      className="m-auto flex w-full max-w-screen-sm flex-col gap-4 rounded-lg bg-white p-6 shadow-lg"
      onSubmit={formik.handleSubmit}
    >
      <h1 className="m-auto text-center text-2xl font-semibold text-blue-500">
        Zaloguj się
      </h1>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="email" value="Adres e-mail" />
        </div>
        <TextInput
          id="email"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          required
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password" value="Hasło" />
        </div>
        <TextInput
          id="password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          required
        />
      </div>
      <Button className="mt-3" type="submit" disabled={!formik.isValid}>
        {loading && <Spinner className="mr-2" size="sm" />}
        Zaloguj się
      </Button>
    </form>
  );
};

export default Login;
