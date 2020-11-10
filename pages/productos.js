import Layout from '../components/Layout';
import Producto from '../components/Producto';
import { gql, useQuery } from '@apollo/client';
import Link from 'next/link';

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

const Productos = () => {

  //Consukltar Productos
  const { data, loading, error } = useQuery(OBTENER_PRODUCTOS); 

  console.log(data);

  if(!data) {
    return 'Accion no permitida';
}

  return (
    <div>
      <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Productos</h1>

      <Link href="/nuevoproducto">
        <a className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white hover:text-gray-200 mb-3 rounded uppercase font-bold text-sm w-full lg:w-auto text-center">
          Nuevo Producto
        </a>
      </Link>
      <div className="overflow-x-scroll">
          <table className="table-auto shadow-md mt-10 w-full w-lg">
            <thead className="bg-gray-800">
              <tr className="text-white">
                <th className="w-1/5 py-2">Nombre</th>
                <th className="w-1/5 py-2">Existencia</th>
                <th className="w-1/5 py-2">Precio</th>
                <th className="w-1/5 py-2">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              { data.obtenerProductos.map( producto => (
                  <Producto 
                    key={producto.id}
                    producto={producto}
                  />
              )) }
            </tbody>
          </table>
        </div>
      </Layout>
    </div>
  )
}

export default Productos;