import React, { useContext } from 'react';
import Layout from '../components/Layout';
import AsignarCliente from '../components/pedidos/AsignarCliente';
import PedidoContext from '../context/pedidos/PedidoContext';
import AsignarProductos from '../components/pedidos/AsignarProductos';

const NuevoPedido = () => {

    const pedidoContext = useContext(PedidoContext);

    return ( 
        <Layout>
            <h1 className="text-2xl text-gray-800 font-light">Crear nuevo pedido</h1>

            <AsignarCliente />
            <AsignarProductos />
        </Layout>

     );
}
 
export default NuevoPedido;