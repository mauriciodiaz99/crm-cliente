import {
    SELECCIONAR_CLIENTE,
    SELECCIONA_PRODUCTO,
    CANTIDAD_PRODUCTOS
} from '../../types'

export default (state, action) => {
    switch(action.type) {
        case SELECCIONAR_CLIENTE:
            return {
                ...state,
                cliente: action.payload
            }

        case SELECCIONA_PRODUCTO:
            return {
                ...state,
                productos: action.payload
            }
        
        default:
            return state
    }
}