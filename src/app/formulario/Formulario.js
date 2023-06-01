'use client';
import { Check, Save } from "@mui/icons-material";
import { Alert, Button, CircularProgress, FormControl, InputLabel, MenuItem, Select, Snackbar, TextField } from "@mui/material";
import { useState } from "react";
import api from "../service/api-config";

function Resultado(result, dados) {
  return (
    <>
      <p>De acordo com a análise dos dados informados:</p>
      <p style={{ marginTop: 5 }}></p>
      <p>Resultado: <b>{result.resultado === 1 ? 'Pessoa será inadimplente' : 'Pessoa não será inadimplente'}</b></p>
      <p>Probabilidade de pagamento das dívidas: <b>{result.probabilidade_pagar * 100}%</b></p>
      <p>Probabilidade de não honrar o pagamento: <b>{result.probabilidade_nao_pagar * 100}%</b></p>
      <p>O ideal é que o valor de crédito não ultrapasse: {result.resultado === 1 ? <b>R$ 0</b> : <b>R$ {dados.RendaMensal * 0.25}</b>}</p>
    </>
  )
}


export default function Formulario() {

  const [dados, setDados] = useState({
    Idade: '',
    Sexo: '',
    EstadoCivil: '',
    RendaMensal: ''
  });
  const [result, setResult] = useState([]);
  const [mostrar, setMostrar] = useState(false);
  const [open, setOpen] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setDados({ ...dados, [name]: value });
  }

  function onSubmitCategoria(e) {
    e.preventDefault();

    setMostrar(true)

    api.post('/predict', dados)
      .then(function (response) {
        setResult(response.data);
        setMostrar(false);
      })
      .catch(function (error) {
        console.log(error);
        setOpen(true);
      });
  }

  const handleClose = (Event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <div>

      <Snackbar open={open} autoHideDuration={4500} onClose={handleClose}>
        <Alert severity="error">Não foi possível buscar os dados da API!</Alert>
      </Snackbar>

      <h3>Preencha os campos a seguir para realizar a análise!</h3>

      <form onSubmit={onSubmitCategoria}>

        <div style={{ marginTop: '15px' }}>

          <TextField
            label="Idade"
            style={{ marginLeft: 20, minWidth: 220, marginTop: 10 }}
            variant="outlined"
            name="Idade"
            title="Idade"
            onChange={handleChange}
            value={dados.Idade}
            autoFocus
            required
          />

          <FormControl style={{ marginLeft: 20, minWidth: 220, marginTop: 10 }}>
            <InputLabel required>Sexo</InputLabel>
            <Select
              id="sexo"
              value={dados.Sexo}
              label="Sexo"
              name="Sexo"
              title="Sexo"
              onChange={handleChange}
              required
            >
              <MenuItem value={0} title="Não informado">Não informado</MenuItem>
              <MenuItem value={1} title="Feminino">Feminino</MenuItem>
              <MenuItem value={2} title="Masculino">Masculino</MenuItem>
            </Select>
          </FormControl>

          <FormControl style={{ marginLeft: 20, minWidth: 220, marginTop: 10 }}>
            <InputLabel required>Estado Civil</InputLabel>
            <Select
              id="estadoCivil"
              name="EstadoCivil"
              title="Estado Civil"
              value={dados.EstadoCivil}
              label="Estado Civil"
              onChange={handleChange}
              required
            >
              <MenuItem value={0} title="Não informado">Não informado</MenuItem>
              <MenuItem value={1} title="Casado(a)">Casado(a)</MenuItem>
              <MenuItem value={2} title="Divorciado(a)">Divorciado(a)</MenuItem>
              <MenuItem value={3} title="Separado(a)">Separado(a)</MenuItem>
              <MenuItem value={4} title="Solteiro(a)">Solteiro(a)</MenuItem>
              <MenuItem value={5} title="Viúvo(a)">Viúvo(a)</MenuItem>
            </Select>
          </FormControl>


          <TextField
            style={{ marginLeft: 20, minWidth: 220, marginTop: 10 }}
            label="Renda mensal"
            title="Renda mensal aproximada"
            variant="outlined"
            name="RendaMensal"
            onChange={handleChange}
            value={dados.RendaMensal}
            required
          />

          <Button
            type="submit"
            variant="outlined"
            style={{ marginLeft: 20, marginTop: 15 }} startIcon={<Check />}
          >Analisar</Button>
        </div>

      </form>



      <div style={{ marginTop: 20 }}>
        {result.length === 0 ? "" : !!mostrar ? <CircularProgress /> : Resultado(result, dados)}
      </div>

    </div>
  );
}