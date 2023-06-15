import { XAxis, YAxis, ResponsiveContainer, BarChart, Bar, Tooltip, CartesianGrid, Legend } from 'recharts';
import Title from './Title';

const estadoCivil = [
  {
    name: 'Casado(a)',
    Não: 440,
    Sim: 97,
    amt: 2000,
  },
  {
    name: 'Divorciado(a)',
    Não: 10,
    Sim: 1,
    amt: 400,
  },
  {
    name: 'Sem Class.',
    Não: 1036,
    Sim: 140,
    amt: 400,
  },
  {
    name: 'Separado(a)',
    Não: 8,
    Sim: 1,
    amt: 400,
  },
  {
    name: 'Solteiro(a)',
    Não: 146,
    Sim: 20,
    amt: 400,
  },
  {
    name: 'Viúvo(a)',
    Não: 14,
    Sim: 4,
    amt: 400,
  },
];

export default function Chart() {

  return (
    <>
      <Title>Inadimplentes X Estado Civil</Title>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart width={200}
          height={50}
          data={estadoCivil}
          margin={{
            top: 5,
          }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Não" fill="#8884d8" />
          <Bar dataKey="Sim" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}