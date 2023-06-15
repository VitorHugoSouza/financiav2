import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import Title from "./Title";

const data = [
  {
    name: 'Feminino',
    Não: 724,
    Sim: 143,
    amt: 1000,
  },
  {
    name: 'Masculino',
    Não: 180,
    Sim: 37,
    amt: 400,
  },
  {
    name: 'Sem Class.',
    Não: 750,
    Sim: 83,
    amt: 1000,
  },
];

export default function InadimplentesSexo() {
  return (
    <>
      <Title>Inadimplentes X Sexo</Title>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 5,
            bottom: 5,
          }}
        >
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