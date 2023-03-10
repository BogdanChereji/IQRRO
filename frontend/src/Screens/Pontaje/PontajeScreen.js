import React, { useContext } from 'react';
import { Store } from '../../Store';
import TabelPontaje from '../../components/Tables/TabelPontaje/TabelPontaje';
import { Button, Container, Link, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

export default function PontajeScreen() {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const navigate = useNavigate();
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Container disableGutters={useMediaQuery(theme.breakpoints.down('md'))}>
      <div>
        {userInfo && userInfo.isAdmin && mdUp ? (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mb: 2,
            }}
          >
            <Breadcrumbs aria-label="breadcrumb">
              <Link
                underline="hover"
                color="inherit"
                onClick={() => navigate(`/`)}
              >
                IQR
              </Link>
              <Link
                underline="hover"
                color="inherit"
                onClick={() => navigate(`#`)}
              >
                Rapoarte angajati
              </Link>
              <Typography>Rapoarte</Typography>
            </Breadcrumbs>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate(`/pontajnou`)}
            >
              + Pontaj nou
            </Button>
          </Box>
        ) : (
          <Box
            sx={{
              textAlign: 'right',
              mb: 2,
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate(`/pontajnou`)}
            >
              + Pontaj nou
            </Button>
          </Box>
        )}
        <TabelPontaje />
      </div>
    </Container>
  );
}
