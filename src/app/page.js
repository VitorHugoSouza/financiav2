'use client';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useState } from 'react';
import Image from 'next/image';
import Logo from '../app/assets/img/logo_financia_t.png';
import Formulario from './formulario/Formulario';
import { ListItemButton, ListItemIcon, ListItemText, Paper } from '@mui/material';
import Link from 'next/link';
import Chart from './components/Chart';
import EstadoCivil from './components/EstadoCivil';
import HomeIcon from '@mui/icons-material/Home';
import InadimplentesSexo from './components/InadimplentesSexo';
import Inadimplencia from './components/Inadimplencia';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import LoginIcon from '@mui/icons-material/Login';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Financ.ia '}
      {new Date().getFullYear()}
    </Typography>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);


export default function Home() {

  const [open, setOpen] = useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="absolute" open={open}>
        <Toolbar
          sx={{
            pr: '24px', // keep right padding when drawer closed
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: '36px',
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            Performance em análise
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={0} color="secondary">
              <LoginIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>

        <div style={{ display: 'flex', alignItems: 'flex-start', paddingBottom: '5px', paddingTop: '10px', paddingLeft: '10px' }}>
          <Image src={Logo} alt="Logo Financia" width={50} placeholder='Financ.ia' loading="lazy" />
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
            style={{ display: 'flex', marginTop: '5px', marginLeft: '20px' }}
          >
            <b>Financ.ia</b>
          </Typography>

          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </div>

        <Divider />
        <List component="nav">
          <Link href='/'>
            <ListItemButton>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Início" />
            </ListItemButton>
          </Link>
          {/* <Link href='/relatorio'> 
            <ListItemButton disabled>
              <ListItemIcon>
                <PictureAsPdfIcon />
              </ListItemIcon>
              <ListItemText primary="Relatórios (em breve)" disableTypography={true} />
            </ListItemButton>
          {/* </Link> */}
        </List>
      </Drawer>
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
          <Grid container spacing={2}>
            {/* Chart */}
            <Grid item xs={12} md={8} lg={4}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 240,
                }}
              >
                <Chart />
              </Paper>
            </Grid>
            {/* Inadimplentes X Sexo */}
            <Grid item xs={12} md={8} lg={4}>
              <Paper
                sx={{
                  paddingLeft: 2,
                  paddingTop: 2,
                  paddingRight: 0,
                  marginRight: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 240,
                }}
              >
                <InadimplentesSexo />
              </Paper>
            </Grid>
            {/* Inadimplencia */}
            <Grid item xs={12} md={8} lg={4}>
              <Paper
                sx={{
                  paddingLeft: 2,
                  paddingTop: 2,
                  paddingRight: 0,
                  marginRight: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 240,
                }}
              >
                <Inadimplencia />
              </Paper>
            </Grid>
            {/* Estado Civil */}
            <Grid item xs={12} md={8} lg={6}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 240,
                }}
              >
                <EstadoCivil />
              </Paper>
            </Grid>
            {/* Forms */}
            <Grid item xs={12} md={8} lg={6}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 800,
                }}
              >
                <Formulario />
              </Paper>
            </Grid>
          </Grid>
          <Copyright sx={{ pt: 4 }} />
        </Container>
      </Box>
    </Box>
  );

}
