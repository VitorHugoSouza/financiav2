import { XAxis, YAxis, ResponsiveContainer, BarChart, Bar } from 'recharts';
import Title from './Title';

const estadoCivil = [
  {
    name: 'Casado(a)',
    pv: 537,
    amt: 2000,
  },
  {
    name: 'Divorciado(a)',
    pv: 11,
    amt: 400,
  },
  {
    name: 'Não informado',
    pv: 1176,
    amt: 400,
  },
  {
    name: 'Separado(a)',
    pv: 9,
    amt: 400,
  },
  {
    name: 'Solteiro(a)',
    pv: 166,
    amt: 400,
  },
  {
    name: 'Viúvo(a)',
    pv: 18,
    amt: 400,
  },
];

export default function Chart() {

  return (
    <>
      <Title>Estado Civil</Title>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart width={200}
          height={150}
          data={estadoCivil}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}>
            <XAxis dataKey="name" />
            <YAxis />
          <Bar dataKey="pv" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}