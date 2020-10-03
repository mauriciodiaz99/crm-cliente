import React from 'react';
import Swal from 'sweetalert2';
import { gql, useMutation } from '@apollo/client';
import Router from 'next/router';

const ELIMINAR_CLIENTE = gql`
mutation eliminarCliente($id: ID!) {
    eliminarCliente(id:$id) 
  }
`;

const OBTENER_CLIENTES_USUARIO = gql`
query obtenerClientesVendedor {
  obtenerClientesVendedor {
    id
    nombre
    apellido
    empresa
    email
  }
}
`;

const Cliente = ({cliente}) => {

    const [ eliminarCliente ] = useMutation(ELIMINAR_CLIENTE, {
        update(cache) {
            //obtener una copia del objeto en cache
            const { obtenerClientesVendedor } = cache.readQuery({ query: OBTENER_CLIENTES_USUARIO });

            //reescribir el cache
            cache.writeQuery({
                query: OBTENER_CLIENTES_USUARIO,
                data: {
                    obtenerClientesVendedor: obtenerClientesVendedor.filter(clienteActual => clienteActual.id !== id )
                }
            })
        }
    });

    const { nombre, apellido, empresa, email, id } = cliente;

    //Elimina un cliente
    const confirmarEliminarCliente = () => {
        Swal.fire({
            title: '¿Deseas eliminar este cliente?',
            text: "Esta acción no se puede revertir!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar!',
            cancelButtonText: 'No, Cancelar!'
          }).then( async (result) => {
            if (result.value) {

                try {
                    //Elminar por id
                    const { data } = await eliminarCliente({
                        variables: {
                            id
                        }
                    });

                    //Mostrar una alerta

                    Swal.fire(
                        'Eliminado!',
                        'El cliente ha sido eliminado exitosamente.',
                        'success'
                      )
                } catch (error) {
                    console.log(error)
                }

              
            }
          })
    }

    const editarCliente = () => {
        Router.push({
            pathname: "/editarcliente/[id]",
            query: { id }
        })
    }

    return ( 
            <tr>
                <td className="border px-4 py-2">{nombre} {apellido}</td>
                <td className="border px-4 py-2">{empresa}</td>
                <td className="border px-4 py-2">{email}</td>
                <td className="border px-4 py-2">
                    <div className="flex">
                    <button
                        type="button"
                        className="hover:bg-red-900 flex justify-center items-center bg-red-700 py-2 px-4 w-full text-white text-xs font-bold rounded"
                        onClick={() => confirmarEliminarCliente()}
                    >Eliminar
                        <svg fill="currentColor" viewBox="0 0 20 20" className="w-5 h-5 ml-3"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path></svg>
                    </button>
                    <button
                        type="button"
                        className="hover:bg-yellow-900 flex ml-3 justify-center items-center bg-yellow-700 py-2 px-4 w-full text-white text-xs font-bold rounded"
                        onClick={() => editarCliente()}
                    >Editar
                        <svg fill="currentColor" viewBox="0 0 20 20" className="w-5 h-5 ml-3"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd"></path></svg>
                    </button>  
                    </div>                  
                </td>
              </tr>
     );
}
 
export default Cliente;










