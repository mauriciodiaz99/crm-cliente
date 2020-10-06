import React, { useContext } from 'react';
import Layout from '../components/Layout';
import AsignarCliente from '../components/pedidos/AsignarCliente';
import PedidoContext from '../context/pedidos/PedidoContext';
import AsignarProductos from '../components/pedidos/AsignarProductos';
import ResumenPedido from '../components/pedidos/ResumenPedido';
import Total from '../components/pedidos/Total';

const NuevoPedido = () => {

    const pedidoContext = useContext(PedidoContext);

    return ( 
        <Layout>
            <h1 className="text-2xl text-gray-800 font-light">Crear nuevo pedido</h1>

            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">
                    <AsignarCliente />
                    <AsignarProductos />
                    <ResumenPedido />
                    <Total />
                </div>
            </div>
            
        </Layout>

     );
}
 
export default NuevoPedido;