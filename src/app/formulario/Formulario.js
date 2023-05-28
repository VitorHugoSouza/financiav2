'use client';
import { Check, Save } from "@mui/icons-material";
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useState } from "react";
import api from "../service/api-config";


export default function Formulario() {

    const [dados, setDados] = useState({
        Idade: '',
        Sexo: '',
        EstadoCivil: '',
        RendaMensal: ''
    });
    const [result, setResult] = useState([]);
    const [mostrar, setMostrar] = useState(true);

    function handleChange(e) {
        const {name, value} = e.target;
		setDados({...dados, [name]:value});
    }

    function onSubmitCategoria(e) {
        e.preventDefault();

        api.post('/predict', dados)
        .then(function (response) {
            setResult(response.data);
            setMostrar(false);
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    return (
        <div>
            <h3>Preencha os campos a seguir para realizar a análise!</h3>

            <form onSubmit={onSubmitCategoria}>

                <div style={{marginTop: '15px'}}>

                    <TextField 
                        label="Idade"
                        style={{ marginLeft: 20, minWidth: 180, marginTop: 10 }} 
                        variant="outlined"
                        name="Idade"
                        onChange={handleChange}
                        value={dados.Idade}
                    />

                    {/* <input type="number" name="Idade" style={{ marginLeft: 20, minWidth: 200, marginTop: 10 }} placeholder="Idade" onChange={handleChange}
                             value={dados.Idade} required="required" /> */}


                    <FormControl style={{ marginLeft: 20, minWidth: 220, marginTop: 10 }}>
                        <InputLabel>Sexo</InputLabel>
                        <Select
                            id="sexo"
                            value={dados.Sexo}
                            label="Sexo"
                            name="Sexo"
                            onChange={handleChange}
                        >
                            <MenuItem value={0}>Não informado</MenuItem>
                            <MenuItem value={1}>Feminino</MenuItem>
                            <MenuItem value={2}>Masculino</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl style={{ marginLeft: 20, minWidth: 220, marginTop: 10 }}>
                    <InputLabel>Estado Civil</InputLabel>
                    <Select
                        id="estadoCivil"
                        name="EstadoCivil"
                        value={dados.EstadoCivil}
                        label="Estado Civil"
                        onChange={handleChange}
                    >
                        <MenuItem value={0}>Não informado</MenuItem>
                        <MenuItem value={1}>Casado</MenuItem>
                        <MenuItem value={2}>Divorciado</MenuItem>
                        <MenuItem value={3}>Separado</MenuItem>
                        <MenuItem value={4}>Solteiro</MenuItem>
                        <MenuItem value={5}>Viúvo</MenuItem>
                    </Select>
                    </FormControl>


                    <TextField 
                        style={{ marginLeft: 20, minWidth: 180, marginTop: 10 }}
                        label="Renda mensal (em R$)" 
                        variant="outlined"
                        name="RendaMensal"
                        onChange={handleChange}
                        value={dados.RendaMensal} 
                    />

                    <Button 
                        type="submit"
                        variant="outlined" 
                        style={{ marginLeft: 20, marginTop: 15 }} startIcon={<Check />}
                    >Analisar</Button>
                </div>

            </form>
            
            <div style={{marginTop: 20}} hidden={mostrar}>
                <p>De acordo com a análise dos dados informados:</p>
                <p>Resultado: <b>{result.resultado === 1 ? 'Pessoa será inadimplente': 'Pessoa não será inadimplente'}</b></p>
                <p>Probabilidade de pagamento das dívidas: <b>{result.probabilidade_pagar * 100}%</b></p>
                <p>Probabilidade de não honrar o pagamento: <b>{result.probabilidade_nao_pagar * 100}%</b></p>
            </div>
            
        </div>
    );
}