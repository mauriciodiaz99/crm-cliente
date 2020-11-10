import React, {useState} from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation, gql } from '@apollo/client';

const AUTENTICAR_USUARIO = gql`
mutation autenticarUsuario($input: AutenticarInput) {
    autenticarUsuario(input: $input) {
      token
    }
  }
`;

const Login = () => {

    //Routing
    const router = useRouter();

    //State para el mensaje
    const [mensaje, guardarMensaje] = useState(null);

    //Mutation para crear nuevos usuarios en apollo
    const [ autenticarUsuario ] = useMutation(AUTENTICAR_USUARIO);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email('El email no es valido!').required('El email es requerido!'),
            password: Yup.string().required('El password es obligatorio!')
        }),
        onSubmit: async valores => {
            const { email, password } = valores;

            try {
                const { data } = await autenticarUsuario({
                    variables: {
                        input: {
                            email,
                            password
                        }
                    }
                })
                
                guardarMensaje(`Autenticando...`);
                setTimeout(() => {
                    guardarMensaje(null);

                    //Redireccionar hacia clientes
                    router.push('/');
                }, 2000);

                setTimeout(() => {
                    //Guardar el Token en Local Storage
                    const {token} = data.autenticarUsuario;
                    localStorage.setItem('token', token);
                }, 1000);                

            } catch (error) {
                guardarMensaje(error.message);
                
                setTimeout(() => {
                    guardarMensaje(null);
                }, 3000);
            }
        }
    })

    const mostrarMensaje = () => {
        return(
            <div className="bg-red-300 rounded-lg py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
                <p>{mensaje}</p>
            </div>
        )
    }

    const mostrarMensaje2 = () => {
        return(
            <div className="bg-green-300 rounded-lg py-2 px-3 w-full my-3 max-w-lg text-center mx-auto">
                <p>{mensaje}</p>
            </div>
        )
    }

    return ( 
        <>
        <Layout>
        {mensaje === 'El Password es Incorrecto!' || mensaje === 'El usuario no Existe!' ? mensaje && mostrarMensaje() : mensaje && mostrarMensaje2()}

            <h1 className="text-center text-2xl text-white font-light">Login</h1>

            <div className="flex justify-center mt-5">
                <div className="w-full max-w-sm">
                    <form 
                        className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                        onSubmit={formik.handleSubmit}    
                    >
                        <div className="md:flex bg-white rounded-lg justify-center">
                            <img className="h-16 w-16 md:h-24 md:w-24 rounded-full mx-auto" src="/img/crm.PNG" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                Email
                            </label>

                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-light focus:outline-none focus:shadow-outline"
                                id="email"
                                type="email"
                                placeholder="Email Usuario"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                            />
                        </div>

                        { formik.touched.email && formik.errors.email ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                    <p className="font-bold">Error!</p>
                                    <p>{formik.errors.email}</p>
                                </div>
                            ) : null }

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>

                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-light focus:outline-none focus:shadow-outline"
                                id="password"
                                type="password"
                                placeholder="Password Usuario"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password}
                            />
                        </div>

                        { formik.touched.password && formik.errors.password ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                    <p className="font-bold">Error!</p>
                                    <p>{formik.errors.password}</p>
                                </div>
                            ) : null }

                        <input 
                            type="submit"
                            className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900"
                            value="Iniciar Sesion"
                        />
                    </form>
                </div>
            </div>
        </Layout>
        </>
     );
}
 
export default Login;