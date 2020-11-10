import React, { useReducer } from 'react';
import PedidoContext from './PedidoContext';
import PedidoReducer from './PedidoReducer';

import {
    SELECCIONAR_CLIENTE,
    SELECCIONA_PRODUCTO,
    CANTIDAD_PRODUCTOS,
    ACTUALIZAR_TOTAL
} from '../../types'

const PedidoState = ({children}) => {

    const initialState = {
        cliente: {},
        productos: [],
        total: 0
    }

    const [ state, dispatch ] = useReducer(PedidoReducer, initialState);

    const agregarCliente = cliente => {
        // console.log(cliente);

        dispatch({
            type: SELECCIONAR_CLIENTE,
            payload: cliente
        })
    }

    // modifica los productos
    const agregarProducto = productosSeleccionados => {

        let nuevoState;
        if(state.productos.length > 0) {
            //Tomar del segundo arreglo una copia para asignarla al primero
            nuevoState = productosSeleccionados.map( producto => {
                const nuevoObjeto = state.productos.find( productoState => productoState.id === producto.id );
                return {...producto, ...nuevoObjeto }
            })
        } else {
            nuevoState = productosSeleccionados;
        }

        dispatch({
            type: SELECCIONA_PRODUCTO,
            payload: nuevoState
        })
    }

    //modifica las cantidades de los productos
    const cantidadProductos = nuevoProducto => {
        dispatch({
            type: CANTIDAD_PRODUCTOS,
            payload: nuevoProducto
        })
    }

    const actualizarTotal = () => {
        dispatch({
            type: ACTUALIZAR_TOTAL
        })
    }

    return (
        <PedidoContext.Provider
            value={{
                cliente: state.cliente,
                productos: state.productos,
                total: state.total,
                agregarCliente,
                agregarProducto,
                cantidadProductos,
                actualizarTotal
            }}
        >
                {children}
        </PedidoContext.Provider>
    )
}


export default PedidoState;