import React, { useState } from 'react';
import { TextField, Button, Card, CardContent, Typography, Box, CircularProgress, IconButton, InputAdornment, Container, Alert, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff, Lock, Person, LockOpen } from '@mui/icons-material';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('https://employee-management-app-gdm5.onrender.com/authenticate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('EMSusername', username);
        alert('Login successful. Welcome!');
        navigate('/dashboard');
      } else {
        setError('Invalid credentials. Please try again.');
      }
    } catch (err) {
      setLoading(false);
      setError('Invalid credentials or our server is not currently active. Please try again later.');
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingY: '2rem' }}>
      <Container maxWidth="sm">
        <Card sx={{ borderRadius: '16px', border: '1px solid #e0e7ff', boxShadow: '0 10px 30px rgba(13, 148, 136, 0.1)' }}>
          {/* Header */}
          <Box sx={{ background: 'linear-gradient(135deg, #0d9488 0%, #14b8a6 100%)', padding: '2rem', color: 'white', textAlign: 'center' }}>
            <Box sx={{ width: '60px', height: '60px', borderRadius: '12px', backgroundColor: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', marginBottom: '1rem', border: '2px solid white' }}>
              <LockOpen sx={{ fontSize: '1.8rem', color: 'white' }} />
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 800, marginBottom: '0.5rem' }}>
              Welcome Back
            </Typography>
            <Typography sx={{ fontSize: '0.95rem', opacity: 0.95 }}>
              Sign in to your WorkHub account
            </Typography>
          </Box>

          <CardContent sx={{ padding: '2.5rem' }}>
            <form onSubmit={handleSubmit}>
              <Stack spacing={2}>
                {/* Username Field */}
                <Box>
                  <Typography sx={{ fontSize: '0.85rem', fontWeight: 600, color: '#666', marginBottom: '0.5rem' }}>
                    Username
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
                      style: { fontFamily: 'Poppins, sans-serif' },
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

                {/* Password Field */}
                <Box>
                  <Typography sx={{ fontSize: '0.85rem', fontWeight: 600, color: '#666', marginBottom: '0.5rem' }}>
                    Password
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="Enter your password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <Lock sx={{ color: '#0d9488', marginRight: '0.75rem', fontSize: '1.2rem' }} />
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleTogglePasswordVisibility}
                            edge="end"
                            sx={{ color: '#0d9488' }}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                      style: { fontFamily: 'Poppins, sans-serif' },
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
                {error && (
                  <Alert severity="error" sx={{ borderRadius: '8px', backgroundColor: '#fef2f2', border: '1px solid #fecaca' }}>
                    {error}
                  </Alert>
                )}

                {/* Login Button */}
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
                    Sign In
                  </Button>
                )}

                {/* Divider */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem', marginY: '1.5rem' }}>
                  <Box sx={{ flex: 1, height: '1px', backgroundColor: '#e0e7ff' }} />
                  <Typography sx={{ color: '#999', fontSize: '0.85rem' }}>or</Typography>
                  <Box sx={{ flex: 1, height: '1px', backgroundColor: '#e0e7ff' }} />
                </Box>

                {/* Links Section */}
                <Stack spacing={1}>
                  <Button
                    fullWidth
                    component="a"
                    href="/register"
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
                    Create New Account
                  </Button>

                  <Button
                    fullWidth
                    component="a"
                    href="/verify-username"
                    variant="text"
                    sx={{
                      color: '#0d9488',
                      padding: '0.75rem',
                      textTransform: 'none',
                      fontWeight: 600,
                      '&:hover': {
                        backgroundColor: '#f0fdf4',
                      },
                    }}
                  >
                    Forgot Password?
                  </Button>
                </Stack>
              </Stack>
            </form>
          </CardContent>
        </Card>

        {/* Footer Text */}
        <Typography sx={{ textAlign: 'center', color: '#999', fontSize: '0.85rem', marginTop: '2rem' }}>
          Part of the WorkHub Employee Management Platform
        </Typography>
      </Container>
    </Box>
  );
};

export default Login;
