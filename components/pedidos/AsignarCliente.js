import React, { useState, useEffect, useContext } from 'react';
import Select from 'react-select';
import { gql, useQuery } from '@apollo/client';
import PedidoContext from '../../context/pedidos/PedidoContext';

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

const AsignarCliente = () => {
    
  const [ cliente, setClientes ] = useState([]);

  const pedidoContext = useContext(PedidoContext);

  const { agregarCliente } = pedidoContext;

  const { data, loading, error } = useQuery(OBTENER_CLIENTES_USUARIO);

  useEffect(() => {
      agregarCliente(cliente);
  }, [cliente])

  const seleccionarCliente = clientes => {
      setClientes(clientes);
  }

  if(loading) return null;

  const { obtenerClientesVendedor } = data;
  
    return ( 
        <>
            <p className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold">1. Asigna un Cliente al Pedido</p>
            <Select 
                className="mt-3"
                options={ obtenerClientesVendedor }
                onChange={ (opcion) => seleccionarCliente(opcion) }
                getOptionLabel={ opciones => `${opciones.nombre} ${opciones.apellido}` }
                getOptionValue={ opciones => opciones.id }
                placeholder="Seleccione el Cliente"
                noOptionsMessage={() => "----- Seleccionar -----"}
            />
        </>
     );
}
 
export default AsignarCliente;







