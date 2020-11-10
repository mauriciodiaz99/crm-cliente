import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import {
    BarChart, Bar, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  } from 'recharts';
import { gql, useQuery } from '@apollo/client';

const MEJORES_CLIENTES = gql`
    query mejoresClientes {
        mejoresClientes {
            cliente {
                nombre
                empresa
            }
            total
        }
    }
`;

const MejoresClientes = () => {

    const { data, loading, error, startPolling, stopPolling } = useQuery(MEJORES_CLIENTES);
    
    useEffect(() => {
        startPolling(1000);
        return () => {
            stopPolling();
        }
    }, [startPolling, stopPolling])

    if(loading) return 'cargando...';

    const { mejoresClientes } = data;

    const clienteGrafica = [];

    mejoresClientes.map((cliente, index) => {
        clienteGrafica[index] = {
            ...cliente.cliente[0],
            total: cliente.total
        }
    })
    
    return (
        <Layout>
            <h1 className="text-2xl text-gray-800 font-light">Mejores Clientes</h1>

            <ResponsiveContainer
                width={'99%'}
                height={450}
            >
                <BarChart
                  className="mt-10"
                  width={600}
                  height={500}
                  data={clienteGrafica}
                  margin={{
                    top: 5, right: 30, left: 20, bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="nombre" />
                  <YAxis /> 
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="total" fill="#468CD5" />
                </BarChart>
            </ResponsiveContainer>
        </Layout>
    );
}

export default MejoresClientes;