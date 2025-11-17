import React, { useState } from 'react';
import { TextField, Button, Card, CardContent, Typography, Box, CircularProgress, Container, Alert, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { PersonSearch, Person } from '@mui/icons-material';

const VerifyUsername = () => {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await fetch(`https://employee-management-app-gdm5.onrender.com/verify-username/${username}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      setLoading(false);

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          navigate(`/reset-password?username=${username}`);
        }, 1000); // Redirect to reset password page after a short delay
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Username not found.');
      }
    } catch (err) {
      setLoading(false);
      setError('Something went wrong. Please try again later.');
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingY: '2rem' }}>
      <Container maxWidth="sm">
        <Card sx={{ borderRadius: '16px', border: '1px solid #e0e7ff', boxShadow: '0 10px 30px rgba(13, 148, 136, 0.1)' }}>
          {/* Header */}
          <Box sx={{ background: 'linear-gradient(135deg, #0d9488 0%, #14b8a6 100%)', padding: '2rem', color: 'white', textAlign: 'center' }}>
            <Box sx={{ width: '60px', height: '60px', borderRadius: '12px', backgroundColor: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', marginBottom: '1rem', border: '2px solid white' }}>
              <PersonSearch sx={{ fontSize: '1.8rem', color: 'white' }} />
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 800, marginBottom: '0.5rem' }}>
              Verify Username
            </Typography>
            <Typography sx={{ fontSize: '0.95rem', opacity: 0.95 }}>
              Find your account to reset password
            </Typography>
          </Box>

          <CardContent sx={{ padding: '2.5rem' }}>
            <form onSubmit={handleSubmit}>
              <Stack spacing={2.5}>
                {/* Username Field */}
                <Box>
                  <Typography sx={{ fontSize: '0.85rem', fontWeight: 600, color: '#666', marginBottom: '0.5rem' }}>
                    Username *
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="Enter your username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <Person sx={{ color: '#0d9488', marginRight: '0.75rem', fontSize: '1.2rem' }} />
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '8px',
                        backgroundColor: '#f8fafc',
                        '&:hover fieldset': { borderColor: '#0d9488' },
                        '&.Mui-focused fieldset': { borderColor: '#0d9488', borderWidth: '2px' },
                      },
                      '& .MuiOutlinedInput-input::placeholder': { color: '#999', opacity: 0.7 },
                    }}
                  />
                </Box>

                {/* Error Alert */}
                {error && <Alert severity="error" sx={{ borderRadius: '8px' }}>{error}</Alert>}

                {/* Success Alert */}
                {success && <Alert severity="success" sx={{ borderRadius: '8px' }}>Username verified! Redirecting to reset password...</Alert>}

                {/* Submit Button */}
                {loading ? (
                  <Box sx={{ display: 'flex', justifyContent: 'center', paddingY: '1rem' }}>
                    <CircularProgress sx={{ color: '#0d9488' }} size={40} />
                  </Box>
                ) : (
                  <Button
                    fullWidth
                    variant="contained"
                    type="submit"
                    sx={{
                      backgroundColor: '#0d9488',
                      color: 'white',
                      padding: '0.9rem',
                      fontSize: '1rem',
                      fontWeight: 700,
                      textTransform: 'none',
                      borderRadius: '8px',
                      marginTop: '1rem',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        backgroundColor: '#0a7066',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 16px rgba(13, 148, 136, 0.3)',
                      },
                    }}
                  >
                    Verify Username
                  </Button>
                )}

                {/* Divider */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem', marginY: '1rem' }}>
                  <Box sx={{ flex: 1, height: '1px', backgroundColor: '#e0e7ff' }} />
                  <Typography sx={{ color: '#999', fontSize: '0.85rem' }}>or</Typography>
                  <Box sx={{ flex: 1, height: '1px', backgroundColor: '#e0e7ff' }} />
                </Box>

                {/* Back to Login */}
                <Button
                  fullWidth
                  component="a"
                  href="/login"
                  variant="outlined"
                  sx={{
                    borderColor: '#14b8a6',
                    color: '#0d9488',
                    padding: '0.75rem',
                    textTransform: 'none',
                    fontWeight: 600,
                    borderRadius: '8px',
                    '&:hover': {
                      backgroundColor: '#f0fdf4',
                      borderColor: '#0d9488',
                    },
                  }}
                >
                  Back to Login
                </Button>
              </Stack>
            </form>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default VerifyUsername;
