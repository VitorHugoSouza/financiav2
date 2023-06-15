import { XAxis, YAxis, ResponsiveContainer, BarChart, Bar, Tooltip } from 'recharts';
import Title from './Title';

const data = [
  {
    name: 'Não',
    Total: 1654,
    amt: 2000,
  },
  {
    name: 'Sim',
    Total: 263,
    amt: 400,
  },
];

export default function Chart() {

  return (
    <>
      <Title>Inadimplentes</Title>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            bottom: 5,
          }}>
            <Tooltip />
            <XAxis dataKey="name" />
            <YAxis />
          <Bar dataKey="Total" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}