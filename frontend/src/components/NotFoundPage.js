import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Box, Typography, Container, Card, CardContent, Stack } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import HomeIcon from '@mui/icons-material/Home';

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  const handleGoToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingY: '2rem' }}>
      <Container maxWidth="sm">
        <Card sx={{ borderRadius: '16px', border: '1px solid #e0e7ff', overflow: 'hidden' }}>
          {/* Header */}
          <Box sx={{ background: 'linear-gradient(135deg, #ef4444 0%, #f87171 100%)', padding: '3rem 2rem', color: 'white', textAlign: 'center' }}>
            <Box sx={{ width: '80px', height: '80px', borderRadius: '16px', backgroundColor: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', marginBottom: '1.5rem', border: '2px solid white' }}>
              <ErrorOutlineIcon sx={{ fontSize: '2.5rem', color: 'white' }} />
            </Box>
            <Typography sx={{ fontSize: '4rem', fontWeight: 800, marginBottom: '0.5rem', lineHeight: 1 }}>
              404
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 700, opacity: 0.95 }}>
              Page Not Found
            </Typography>
          </Box>

          <CardContent sx={{ padding: '3rem 2rem' }}>
            <Stack spacing={3} alignItems="center">
              {/* Error Message */}
              <Box sx={{ textAlign: 'center' }}>
                <Typography sx={{ fontSize: '1.1rem', color: '#666', marginBottom: '0.5rem', fontWeight: 600 }}>
                  Oops! The page you're looking for doesn't exist.
                </Typography>
                <Typography sx={{ fontSize: '0.95rem', color: '#999', lineHeight: 1.6 }}>
                  The page you are trying to access is not available or you may have typed the wrong URL. Don't worry, we'll help you find your way back.
                </Typography>
              </Box>

              {/* Action Buttons */}
              <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem' }}>
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<HomeIcon />}
                  onClick={handleGoHome}
                  sx={{
                    backgroundColor: '#0d9488',
                    color: 'white',
                    padding: '0.85rem',
                    fontSize: '1rem',
                    fontWeight: 700,
                    textTransform: 'none',
                    borderRadius: '8px',
                    '&:hover': {
                      backgroundColor: '#0a7066',
                    },
                  }}
                >
                  Go to Home
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={handleGoToDashboard}
                  sx={{
                    borderColor: '#0d9488',
                    color: '#0d9488',
                    padding: '0.85rem',
                    fontSize: '1rem',
                    fontWeight: 700,
                    textTransform: 'none',
                    borderRadius: '8px',
                    '&:hover': {
                      backgroundColor: '#f0fdf4',
                    },
                  }}
                >
                  Go to Dashboard
                </Button>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default NotFoundPage;
