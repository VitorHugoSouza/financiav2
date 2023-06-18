import { XAxis, YAxis, ResponsiveContainer, Tooltip, LineChart, CartesianGrid, Legend, Line } from 'recharts';
import Title from './Title';

const data = [
  {
    name: 'Maio',
    Inadimplência: 13.71,
    amt: 20,
  },
  {
    name: 'Junho',
    Inadimplência: 12.53,
    amt: 20,
  },
];

export default function Inadimplencia() {

  return (
    <>
      <Title>Inadimplência mês (%)</Title>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Inadimplência" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}