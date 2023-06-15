'use client';
import { Check } from "@mui/icons-material";
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
      {dados.FormaPgto !== 1 && dados.FormaPgto !== 4 ? "" :
        <p>Por segurança o valor de crédito não deve ultrapassar:
          {result.resultado === 1 ? <b>R$ 0</b> :
            dados.Historico === 2 && (dados.FormaPgto === 1 || dados.FormaPgto === 4) ?
              <b>R$ 0</b> :
              dados.Historico === 1 && (dados.FormaPgto === 1 || dados.FormaPgto === 4) ?
                <b>R$ {dados.RendaMensal * 0.15}</b> : <b>R$ {dados.RendaMensal * 0.3}</b>
          }
        </p>
      }
    </>
  )
}


export default function Formulario() {

  const [dados, setDados] = useState({
    Idade: '',
    Sexo: '',
    EstadoCivil: '',
    RendaMensal: '',
    Historico: '',
    FormaPgto: ''
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
              <MenuItem value={0}>Não informado</MenuItem>
              <MenuItem value={1}>Feminino</MenuItem>
              <MenuItem value={2}>Masculino</MenuItem>
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
              <MenuItem value={0}>Não informado</MenuItem>
              <MenuItem value={1}>Casado(a)</MenuItem>
              <MenuItem value={2}>Divorciado(a)</MenuItem>
              <MenuItem value={3}>Separado(a)</MenuItem>
              <MenuItem value={4}>Solteiro(a)</MenuItem>
              <MenuItem value={5}>Viúvo(a)</MenuItem>
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

          <FormControl style={{ marginLeft: 20, minWidth: 220, marginTop: 10 }}>
            <InputLabel required>Média de Pagamento</InputLabel>
            <Select
              id="FormaPgto"
              name="FormaPgto"
              title="Média em que o cliente mais realiza o pagamento"
              value={dados.FormaPgto}
              label="Média de Pagamento"
              onChange={handleChange}
              required
            >
              <MenuItem value={0} title="Cartão">Cartão</MenuItem>
              <MenuItem value={1} title="Cheque">Cheque</MenuItem>
              <MenuItem value={2} title="Dinheiro">Dinheiro</MenuItem>
              <MenuItem value={3} title="Pix">Pix</MenuItem>
              <MenuItem value={4} title="Prazo">Prazo</MenuItem>
            </Select>
          </FormControl>

          {dados.FormaPgto !== 1 && dados.FormaPgto !== 4 ? "" :

            <FormControl style={{ marginLeft: 20, minWidth: 220, marginTop: 10 }}>
              <InputLabel required>Histórico Pagamento</InputLabel>
              <Select
                id="Historico"
                name="Historico"
                title="O cliente possui que tipo de histórico"
                value={dados.Historico}
                label="Histórico Pagamento"
                onChange={handleChange}
                required
              >
                <MenuItem value={0}>Bom</MenuItem>
                <MenuItem value={1}>Médio</MenuItem>
                <MenuItem value={2}>Ruim</MenuItem>
              </Select>
            </FormControl>
          }

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