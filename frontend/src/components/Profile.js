import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Card,
  CardContent,
  Box,
  Grid,
  Typography,
  Button,
  Snackbar,
  Alert,
  Paper,
  LinearProgress,
} from '@mui/material';
import {
  Person as PersonIcon,
  Business as BusinessIcon,
  Group as GroupIcon,
  TrendingUp as TrendingUpIcon,
  Edit as EditIcon,
  Logout as LogoutIcon,
  ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';

const Profile = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [employeeCount, setEmployeeCount] = useState(0);
  const [departmentCount, setDepartmentCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/auth/me', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.ok) {
          setIsLoggedIn(true);
          const data = await response.json();
          
          // Fetch employee count
          const empResponse = await fetch('http://localhost:8080/api/employees', {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
          });
          if (empResponse.ok) {
            const employees = await empResponse.json();
            setEmployeeCount(employees.length);
          }

          // Fetch department count
          const deptResponse = await fetch('http://localhost:8080/api/departments', {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
          });
          if (deptResponse.ok) {
            const departments = await deptResponse.json();
            setDepartmentCount(departments.length);
          }
        } else {
          setIsLoggedIn(false);
          navigate('/login');
        }
      } catch (error) {
        console.error('Error checking login status:', error);
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    checkLoginStatus();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setSnackbar({ open: true, message: 'Logged out successfully', severity: 'success' });
    setTimeout(() => {
      navigate('/login');
    }, 1500);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>
      </Container>
    );
  }

  if (!isLoggedIn) {
    return null;
  }

  // StatCard Component for organization statistics
  const StatCard = ({ icon: Icon, title, value, color }) => (
    <Card
      sx={{
        height: '100%',
        background: `linear-gradient(135deg, ${color}22 0%, ${color}11 100%)`,
        border: `1px solid ${color}33`,
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: `0 12px 24px ${color}44`,
        },
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Box
            sx={{
              p: 1.5,
              borderRadius: 2,
              backgroundColor: `${color}22`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon sx={{ color, fontSize: '2rem' }} />
          </Box>
          <Box flex={1}>
            <Typography variant="body2" sx={{ color: '#6b7280', mb: 0.5 }}>
              {title}
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 800, color: '#1f2937' }}>
              {value}
            </Typography>
          </Box>
        </Box>
        <LinearProgress
          variant="determinate"
          value={value * 10 > 100 ? 100 : value * 10}
          sx={{
            backgroundColor: `${color}22`,
            '& .MuiLinearProgress-bar': { backgroundColor: color },
          }}
        />
      </CardContent>
    </Card>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header Card */}
      <Card
        sx={{
          mb: 4,
          background: 'linear-gradient(135deg, #0d9488 0%, #14b8a6 100%)',
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: -50,
            right: -50,
            width: 200,
            height: 200,
            backgroundColor: 'rgba(255,255,255,0.1)',
            borderRadius: '50%',
          }}
        />
        <CardContent sx={{ position: 'relative', zIndex: 1, pb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 2 }}>
            <Box
              sx={{
                p: 2,
                backgroundColor: 'rgba(255,255,255,0.2)',
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <PersonIcon sx={{ fontSize: '3rem', color: 'white' }} />
            </Box>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5 }}>
                User Profile
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9 }}>
                Manage your profile and organization statistics
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Organization Statistics */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h5"
          sx={{ fontWeight: 800, mb: 3, color: '#1f2937', display: 'flex', alignItems: 'center', gap: 1 }}
        >
          <TrendingUpIcon sx={{ color: '#0d9488' }} />
          Organization Statistics
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              icon={GroupIcon}
              title="Total Employees"
              value={employeeCount}
              color="#0d9488"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              icon={BusinessIcon}
              title="Total Departments"
              value={departmentCount}
              color="#14b8a6"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              icon={PersonIcon}
              title="Active Users"
              value={1}
              color="#2dd4bf"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              icon={TrendingUpIcon}
              title="Growth Rate"
              value={15}
              color="#fbbf24"
            />
          </Grid>
        </Grid>
      </Box>

      {/* Quick Actions */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h5"
          sx={{ fontWeight: 800, mb: 3, color: '#1f2937', display: 'flex', alignItems: 'center', gap: 1 }}
        >
          <EditIcon sx={{ color: '#0d9488' }} />
          Quick Actions
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              fullWidth
              variant="contained"
              sx={{
                backgroundColor: '#0d9488',
                '&:hover': { backgroundColor: '#0a7066' },
                py: 1.5,
                fontWeight: 600,
              }}
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate('/dashboard')}
            >
              Back to Dashboard
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              fullWidth
              variant="outlined"
              sx={{
                borderColor: '#0d9488',
                color: '#0d9488',
                '&:hover': { backgroundColor: '#f0fdfa', borderColor: '#0a7066' },
                py: 1.5,
                fontWeight: 600,
              }}
              onClick={() => navigate('/employees')}
            >
              View Employees
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              fullWidth
              variant="outlined"
              sx={{
                borderColor: '#14b8a6',
                color: '#14b8a6',
                '&:hover': { backgroundColor: '#f0fdfa', borderColor: '#0d9488' },
                py: 1.5,
                fontWeight: 600,
              }}
              onClick={() => navigate('/departments')}
            >
              View Departments
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              fullWidth
              variant="contained"
              sx={{
                backgroundColor: '#ef4444',
                '&:hover': { backgroundColor: '#dc2626' },
                py: 1.5,
                fontWeight: 600,
              }}
              startIcon={<LogoutIcon />}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Info Cards */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              background: 'linear-gradient(135deg, #e0f2f1 0%, #b2dfdb 100%)',
              border: '1px solid #80cbc4',
            }}
          >
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: '#00695c' }}>
                Welcome to WorkHub
              </Typography>
              <Typography variant="body2" sx={{ color: '#004d40', lineHeight: 1.6 }}>
                WorkHub is a modern employee management platform designed to streamline HR operations
                and improve organizational efficiency. Manage employees, departments, and more with ease.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              background: 'linear-gradient(135deg, #fff9c4 0%, #fff59d 100%)',
              border: '1px solid #fbc02d',
            }}
          >
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: '#f57f17' }}>
                Pro Tip
              </Typography>
              <Typography variant="body2" sx={{ color: '#e65100', lineHeight: 1.6 }}>
                Use the dashboard to get a quick overview of your organization. Navigate to the
                Employees or Departments sections to manage your workforce more effectively.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Profile;
