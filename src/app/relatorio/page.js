"use client";
import React, { useState } from "react";
import { Check, Copyright } from "@mui/icons-material";
import { Box, Button, Container, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Toolbar } from "@mui/material";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Link from "next/link";
import SearchIcon from '@mui/icons-material/Search';


export default function Relatorio() {

  const [meses, setMeses] = useState({ primeiroMes: 5, segundoMes: 6 });

  function handleChange(e) {
    const { name, value } = e.target;
    setMeses({ ...meses, [name]: value });
  }

  return (
    <>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>

          <Grid item xs={12} md={8} lg={6}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 400,
              }}
            >
              <h3>Relatório de inadimplência mensal</h3>

              <div>

                {/* <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ptBR">
                  <DatePicker views={['month', 'year']} />
                </LocalizationProvider> */}

                <FormControl style={{ marginLeft: 20, minWidth: 150, marginTop: 30 }}>
                  <InputLabel required>Mês Início</InputLabel>
                  <Select
                    id="Historico"
                    name="Historico"
                    title="Informe um mês"
                    value={meses.primeiroMes}
                    label="Histórico Pagamento"
                    onChange={handleChange}
                    disabled
                  >
                    <MenuItem value={5}>Maio - 2023</MenuItem>
                  </Select>
                </FormControl>

                <FormControl style={{ marginLeft: 20, minWidth: 150, marginTop: 30 }}>
                  <InputLabel required>Mês Fim</InputLabel>
                  <Select
                    id="Historico"
                    name="Historico"
                    title="O cliente possui que tipo de histórico"
                    value={meses.segundoMes}
                    label="Histórico Pagamento"
                    onChange={handleChange}
                    disabled
                  >
                    <MenuItem value={6}>Junho - 2023</MenuItem>
                  </Select>
                </FormControl>

                <a href="https://financiav2.netlify.app/relatorio_mensal.pdf" target="_blank">
                  <Button
                    type="submit"
                    variant="outlined"
                    style={{ marginLeft: 20, marginTop: 40 }} startIcon={<SearchIcon />}
                  >Consultar</Button>
                </a>

              </div>



            </Paper>
          </Grid>
          <Copyright sx={{ pt: 4 }} />
        </Container>
      </Box>

    </>
  );
}