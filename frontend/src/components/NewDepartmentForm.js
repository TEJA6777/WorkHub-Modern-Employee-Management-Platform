import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, CircularProgress, Box, Container, Card, CardContent, Typography, Stack, Alert, Grid } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BusinessIcon from '@mui/icons-material/Business';
import AddIcon from '@mui/icons-material/Add';

const NewDepartmentForm = () => {
  const [department, setDepartment] = useState({ name: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!department.name.trim()) {
      newErrors.name = 'Department name is required';
    }
    if (department.name.trim().length < 3) {
      newErrors.name = 'Department name must be at least 3 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = e => {
    setDepartment({ ...department, [e.target.name]: e.target.value });
    if (errors.name) setErrors({ ...errors, name: '' });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setError(null);

    const newDepartment = {
      id: Math.floor(Math.random() * 10000),
      name: department.name,
      employees: [],
    };

    try {
      const response = await fetch('https://employee-management-app-gdm5.onrender.com/api/departments', {
        method: 'POST',
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newDepartment),
      });

      if (!response.ok) {
        throw new Error('Failed to create department');
      }

      navigate('/departments');
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to create department. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f8fafc', paddingY: '2rem' }}>
      <Container maxWidth="md">
        {/* Header */}
        <Box sx={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/departments')}
            sx={{ color: '#0d9488', textTransform: 'none', fontWeight: 600 }}
          >
            Back to Departments
          </Button>
        </Box>

        <Card sx={{ borderRadius: '16px', border: '1px solid #e0e7ff', overflow: 'hidden', maxWidth: '600px', margin: '0 auto' }}>
          {/* Header Card */}
          <Box sx={{ background: 'linear-gradient(135deg, #0d9488 0%, #14b8a6 100%)', padding: '2rem', color: 'white' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Box sx={{ width: '50px', height: '50px', borderRadius: '12px', backgroundColor: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid white' }}>
                <AddIcon sx={{ fontSize: '1.5rem' }} />
              </Box>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 800, marginBottom: '0.25rem' }}>
                  Create New Department
                </Typography>
                <Typography sx={{ fontSize: '0.9rem', opacity: 0.95 }}>
                  Add a new department to your organization
                </Typography>
              </Box>
            </Box>
          </Box>

          <CardContent sx={{ padding: '2.5rem' }}>
            <form onSubmit={handleSubmit}>
              <Stack spacing={2.5}>
                {error && <Alert severity="error">{error}</Alert>}

                <Box>
                  <Typography sx={{ fontSize: '0.85rem', fontWeight: 600, color: '#666', marginBottom: '0.75rem' }}>
                    Department Name *
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="e.g., Human Resources, Engineering, Sales"
                    name="name"
                    value={department.name}
                    onChange={handleChange}
                    error={!!errors.name}
                    helperText={errors.name}
                    InputProps={{
                      startAdornment: (
                        <BusinessIcon sx={{ color: '#0d9488', marginRight: '0.75rem', fontSize: '1.2rem' }} />
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

                {/* Info Box */}
                <Box sx={{ backgroundColor: '#f0fdf4', border: '1px solid #dbeafe', borderRadius: '8px', padding: '1rem' }}>
                  <Typography sx={{ fontSize: '0.85rem', color: '#666', lineHeight: 1.6 }}>
                    <strong>Department Name Tips:</strong>
                  </Typography>
                  <Typography sx={{ fontSize: '0.85rem', color: '#666', lineHeight: 1.6, marginTop: '0.5rem' }}>
                    • Use clear, descriptive names<br />
                    • Avoid special characters<br />
                    • Keep it concise and memorable
                  </Typography>
                </Box>

                {/* Action Buttons */}
                <Box sx={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    variant="contained"
                    sx={{
                      backgroundColor: '#0d9488',
                      color: 'white',
                      padding: '0.85rem 2rem',
                      fontSize: '1rem',
                      fontWeight: 700,
                      textTransform: 'none',
                      borderRadius: '8px',
                      flex: 1,
                      '&:hover': {
                        backgroundColor: '#0a7066',
                      },
                    }}
                  >
                    {isSubmitting ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Create Department'}
                  </Button>
                  <Button
                    type="button"
                    onClick={() => navigate('/departments')}
                    variant="outlined"
                    sx={{
                      borderColor: '#e0e7ff',
                      color: '#666',
                      padding: '0.85rem 2rem',
                      fontSize: '1rem',
                      fontWeight: 700,
                      textTransform: 'none',
                      borderRadius: '8px',
                      flex: 1,
                      '&:hover': {
                        backgroundColor: '#f8fafc',
                      },
                    }}
                  >
                    Cancel
                  </Button>
                </Box>
              </Stack>
            </form>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default NewDepartmentForm;
