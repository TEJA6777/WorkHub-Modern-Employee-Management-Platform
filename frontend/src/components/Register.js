import React, { useState } from 'react';
import { TextField, Button, Card, CardContent, Typography, Box, CircularProgress, IconButton, InputAdornment, Container, Alert, Stack, LinearProgress } from '@mui/material';
import { Visibility, VisibilityOff, PersonAdd, Lock, Person } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const getPasswordStrength = () => {
    if (!password) return 0;
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (password.length >= 12) strength += 25;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 15;
    if (/[!@#$%^&*]/.test(password)) strength += 10;
    return Math.min(strength, 100);
  };

  const getPasswordStrengthColor = () => {
    const strength = getPasswordStrength();
    if (strength < 30) return '#ef4444';
    if (strength < 60) return '#fbbf24';
    return '#10b981';
  };

  const getPasswordStrengthLabel = () => {
    const strength = getPasswordStrength();
    if (strength < 30) return 'Weak';
    if (strength < 60) return 'Fair';
    return 'Strong';
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (getPasswordStrength() < 30) {
      setError('Password is too weak. Please use a stronger password.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('https://employee-management-app-gdm5.onrender.com/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      setLoading(false);

      if (response.ok) {
        alert('User registered successfully. Please login to continue.');
        navigate('/login');
      } else {
        const data = await response.json();
        setError(data.message || 'Error registering user. Please try again.');
      }
    } catch (err) {
      setLoading(false);
      setError('Something went wrong. Please try again later.');
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingY: '2rem' }}>
      <Container maxWidth="sm">
        <Card sx={{ borderRadius: '16px', border: '1px solid #e0e7ff', boxShadow: '0 10px 30px rgba(13, 148, 136, 0.1)' }}>
          {/* Header */}
          <Box sx={{ background: 'linear-gradient(135deg, #0d9488 0%, #14b8a6 100%)', padding: '2rem', color: 'white', textAlign: 'center' }}>
            <Box sx={{ width: '60px', height: '60px', borderRadius: '12px', backgroundColor: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', marginBottom: '1rem', border: '2px solid white' }}>
              <PersonAdd sx={{ fontSize: '1.8rem', color: 'white' }} />
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 800, marginBottom: '0.5rem' }}>
              Create Account
            </Typography>
            <Typography sx={{ fontSize: '0.95rem', opacity: 0.95 }}>
              Join WorkHub and start managing your team
            </Typography>
          </Box>

          <CardContent sx={{ padding: '2.5rem' }}>
            <form onSubmit={handleSubmit}>
              <Stack spacing={2.5}>
                {/* Username Field */}
                <Box>
                  <Typography sx={{ fontSize: '0.85rem', fontWeight: 600, color: '#666', marginBottom: '0.5rem' }}>
                    Username
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="Choose a username"
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
                    placeholder="Create a password"
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
                  {password && (
                    <Box sx={{ marginTop: '0.75rem' }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <Typography sx={{ fontSize: '0.75rem', color: '#666' }}>
                          Password strength:
                        </Typography>
                        <Typography sx={{ fontSize: '0.75rem', color: getPasswordStrengthColor(), fontWeight: 600 }}>
                          {getPasswordStrengthLabel()}
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={getPasswordStrength()}
                        sx={{
                          borderRadius: '4px',
                          backgroundColor: '#e0e7ff',
                          '& .MuiLinearProgress-bar': {
                            backgroundColor: getPasswordStrengthColor(),
                            borderRadius: '4px',
                          },
                        }}
                      />
                    </Box>
                  )}
                </Box>

                {/* Confirm Password Field */}
                <Box>
                  <Typography sx={{ fontSize: '0.85rem', fontWeight: 600, color: '#666', marginBottom: '0.5rem' }}>
                    Confirm Password
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="Re-enter your password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <Lock sx={{ color: '#0d9488', marginRight: '0.75rem', fontSize: '1.2rem' }} />
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleToggleConfirmPasswordVisibility}
                            edge="end"
                            sx={{ color: '#0d9488' }}
                          >
                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
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

                {/* Register Button */}
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
                    Create Account
                  </Button>
                )}

                {/* Divider */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem', marginY: '1rem' }}>
                  <Box sx={{ flex: 1, height: '1px', backgroundColor: '#e0e7ff' }} />
                  <Typography sx={{ color: '#999', fontSize: '0.85rem' }}>or</Typography>
                  <Box sx={{ flex: 1, height: '1px', backgroundColor: '#e0e7ff' }} />
                </Box>

                {/* Login Link */}
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
                  Already have an account? Sign In
                </Button>
              </Stack>
            </form>
          </CardContent>
        </Card>

        {/* Footer Text */}
        <Typography sx={{ textAlign: 'center', color: '#999', fontSize: '0.85rem', marginTop: '2rem' }}>
          By registering, you agree to our Terms of Service and Privacy Policy
        </Typography>
      </Container>
    </Box>
  );
};

export default Register;
