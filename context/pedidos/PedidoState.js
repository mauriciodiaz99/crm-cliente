import React, { useReducer } from 'react';
import PedidoContext from './PedidoContext';
import PedidoReducer from './PedidoReducer';

import {
    SELECCIONAR_CLIENTE,
    SELECCIONA_PRODUCTO,
    CANTIDAD_PRODUCTOS
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

    return (
        <PedidoContext.Provider
            value={{
                agregarCliente
            }}
        >
                {children}
        </PedidoContext.Provider>
    )
}


export default PedidoState;