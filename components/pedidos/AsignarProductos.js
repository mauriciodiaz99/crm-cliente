import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { gql, useQuery } from '@apollo/client';

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

const AsignarProductos = () => {

    const [ productos, setProductos ] = useState([]);

    const { data, loading, error } = useQuery(OBTENER_PRODUCTOS);
    
    useEffect(() => {
        console.log(productos)
    }, [productos])

    const seleccionarProducto = producto => {
        setProductos(producto)
    }

    if(loading) return null;

    const { obtenerProductos } = data;

    return ( 
        <>
            <p className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold">2. Selecciona los Productos</p>
            <Select 
                className="mt-3"
                options={ obtenerProductos }
                isMulti={true}
                onChange={ (opcion) => seleccionarProducto(opcion) }
                getOptionLabel={ opciones => ` ${opciones.nombre} - ${opciones.existencia} en Stock`}
                getOptionValue={ opciones => opciones.id }
                placeholder="----- Seleccionar -----"
                noOptionsMessage={() => "No se encuentran resultados"}
            />
        </>
     );
}
 
export default AsignarProductos;