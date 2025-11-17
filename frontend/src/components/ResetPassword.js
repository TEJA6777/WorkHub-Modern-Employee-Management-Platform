import React, { useState, useEffect } from 'react';
import { TextField, Button, Card, CardContent, Typography, Box, CircularProgress, IconButton, InputAdornment, Container, Alert, Stack, LinearProgress } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import Lock from '@mui/icons-material/Lock';
import LockOpen from '@mui/icons-material/LockOpen';

const ResetPassword = () => {
  const [username, setUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Get the username from the query params if available
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const usernameFromQuery = queryParams.get('username');
    if (usernameFromQuery) {
      setUsername(usernameFromQuery);
    }
  }, [location]);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    if (newPassword !== confirmPassword) {
      setLoading(false);
      setError('Passwords do not match.');
      return;
    }

    try {
      const response = await fetch('https://employee-management-app-gdm5.onrender.com/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, newPassword }),
      });

      setLoading(false);

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          navigate('/login');
        }, 2000); // Redirect to login page after success
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Error resetting password.');
      }
    } catch (err) {
      setLoading(false);
      setError('Something went wrong. Please try again later.');
    }
  };

  const handleToggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const getPasswordStrength = () => {
    if (!newPassword) return 0;
    let strength = 0;
    if (newPassword.length >= 8) strength += 25;
    if (newPassword.length >= 12) strength += 25;
    if (/[a-z]/.test(newPassword) && /[A-Z]/.test(newPassword)) strength += 25;
    if (/[0-9]/.test(newPassword)) strength += 15;
    if (/[!@#$%^&*]/.test(newPassword)) strength += 10;
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
              Reset Password
            </Typography>
            <Typography sx={{ fontSize: '0.95rem', opacity: 0.95 }}>
              Create a new secure password
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
                    placeholder="Your username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    disabled
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '8px',
                        backgroundColor: '#f0f0f0',
                        '&.Mui-disabled': { backgroundColor: '#f0f0f0' },
                      },
                    }}
                  />
                </Box>

                {/* New Password Field */}
                <Box>
                  <Typography sx={{ fontSize: '0.85rem', fontWeight: 600, color: '#666', marginBottom: '0.5rem' }}>
                    New Password
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="Create a new password"
                    type={showNewPassword ? 'text' : 'password'}
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <Lock sx={{ color: '#0d9488', marginRight: '0.75rem', fontSize: '1.2rem' }} />
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleToggleNewPasswordVisibility}
                            edge="end"
                            sx={{ color: '#0d9488' }}
                          >
                            {showNewPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '8px',
                        backgroundColor: '#f8fafc',
                        '&:hover fieldset': { borderColor: '#0d9488' },
                        '&.Mui-focused fieldset': { borderColor: '#0d9488', borderWidth: '2px' },
                      },
                    }}
                  />
                  {newPassword && (
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
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '8px',
                        backgroundColor: '#f8fafc',
                        '&:hover fieldset': { borderColor: '#0d9488' },
                        '&.Mui-focused fieldset': { borderColor: '#0d9488', borderWidth: '2px' },
                      },
                    }}
                  />
                </Box>

                {/* Error Alert */}
                {error && <Alert severity="error" sx={{ borderRadius: '8px' }}>{error}</Alert>}

                {/* Success Alert */}
                {success && <Alert severity="success" sx={{ borderRadius: '8px' }}>Password reset successful! Redirecting to login...</Alert>}

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
                    Reset Password
                  </Button>
                )}
              </Stack>
            </form>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default ResetPassword;
