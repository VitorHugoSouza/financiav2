import { XAxis, YAxis, ResponsiveContainer, BarChart, Bar, Tooltip } from 'recharts';
import Title from './Title';

const estadoCivil = [
  {
    name: 'Casado(a)',
    Total: 537,
    amt: 2000,
  },
  {
    name: 'Divorciado(a)',
    Total: 11,
    amt: 400,
  },
  {
    name: 'Sem Class.',
    Total: 1176,
    amt: 400,
  },
  {
    name: 'Separado(a)',
    Total: 9,
    amt: 400,
  },
  {
    name: 'Solteiro(a)',
    Total: 166,
    amt: 400,
  },
  {
    name: 'Viúvo(a)',
    Total: 18,
    amt: 400,
  },
];

export default function Chart() {

  return (
    <>
      <Title>Estado Civil</Title>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart width={200}
          height={50}
          data={estadoCivil}
          margin={{
            top: 5,
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