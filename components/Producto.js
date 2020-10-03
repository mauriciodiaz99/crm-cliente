import React from 'react';
import Swal from 'sweetalert2';
import { gql, useMutation } from '@apollo/client';
import Router from 'next/router';


const ELIMINAR_PRODUCTO = gql`
mutation eliminarProducto($id: ID!) {
    eliminarProducto(id: $id)
  }
`;

const OBTENER_PRODUCTOS = gql`
query obtenerProductos {
  obtenerProductos{
    id
    nombre
    precio
    existencia
    creado
  }
}
`;

const Producto = ({producto}) => {
    const { nombre, precio, existencia, id } = producto;

    const [ eliminarProducto ] = useMutation(ELIMINAR_PRODUCTO, {
        update(cache) {
            //obtener una copia del objeto en cache
            const { obtenerProductos } = cache.readQuery({ query: OBTENER_PRODUCTOS });

            //reescribir el cache
            cache.writeQuery({
                query: OBTENER_PRODUCTOS,
                data: {
                    obtenerProductos: obtenerProductos.filter(productoActual => productoActual.id !== id )
                }
            })
        }
    });

    const confirmarEliminarProducto = () => {
        Swal.fire({
            title: '¿Deseas eliminar este producto?',
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
                    const { data } = await eliminarProducto({
                        variables: {
                            id
                        }
                    });

                    //Mostrar una alerta

                    Swal.fire(
                        'Eliminado!',
                        'El producto ha sido eliminado exitosamente.',
                        'success'
                      )
                } catch (error) {
                    console.log(error)
                }

              
            }
          })
    }

    const editarProducto = () => {
        Router.push({
            pathname: "/editarproducto/[id]",
            query: { id }
        })
    }

    return ( 
        <tr>
            <td className="border px-4 py-2">{nombre}</td>
            <td className="border px-4 py-2">{existencia}</td>
            <td className="border px-4 py-2">{precio}</td>
            <td className="border px-4 py-2">
                <div className="flex">
                    <button
                        type="button"
                        className="hover:bg-red-900 flex justify-center items-center bg-red-700 py-2 px-4 w-full text-white text-xs font-bold rounded"
                        onClick={() => confirmarEliminarProducto()}
                    >Eliminar
                        <svg fill="currentColor" viewBox="0 0 20 20" className="w-5 h-5 ml-3"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path></svg>
                    </button>
                    <button
                        type="button"
                        className="hover:bg-yellow-900 flex ml-3 justify-center items-center bg-yellow-700 py-2 px-4 w-full text-white text-xs font-bold rounded"
                        onClick={() => editarProducto()}
                    >Editar
                        <svg fill="currentColor" viewBox="0 0 20 20" className="w-5 h-5 ml-3"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd"></path></svg>
                    </button>  
                </div> 
            </td>
        </tr>
     );
}
 
export default Producto;