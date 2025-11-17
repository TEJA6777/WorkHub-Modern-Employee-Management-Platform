import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAllEmployees, deleteEmployee } from '../services/employeeService';
import {
  Grid,
  Card,
  Button,
  TextField,
  Box,
  CircularProgress,
  Snackbar,
  Alert,
  Container,
  Typography,
  CardContent,
  Stack,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useMediaQuery,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import PersonIcon from '@mui/icons-material/Person';

const EmployeeList = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [deletingEmployeeId, setDeletingEmployeeId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setShowSnackbar(true);
    }
  }, [navigate]);

  useEffect(() => {
    if (isLoggedIn) {
      const fetchData = async () => {
        setLoading(true);
        try {
          const data = await getAllEmployees();
          setEmployees(data);
        } catch (error) {
          console.error('Error fetching employees:', error);
        }
        setLoading(false);
      };
      fetchData();
    }
  }, [isLoggedIn]);

  const handleDeleteClick = (employee) => {
    setSelectedEmployee(employee);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedEmployee) {
      setDeletingEmployeeId(selectedEmployee.id);
      try {
        await deleteEmployee(selectedEmployee.id);
        setEmployees(prevEmployees => prevEmployees.filter(emp => emp.id !== selectedEmployee.id));
        setDeleteDialogOpen(false);
      } catch (error) {
        console.error('Error deleting employee:', error);
      }
      setDeletingEmployeeId(null);
    }
  };

  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
  };

  const filteredEmployees = employees.filter(
    employee =>
      employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
        }}
      >
        <CircularProgress sx={{ color: '#0d9488' }} />
      </Box>
    );
  }

  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
    navigate('/login', { replace: true });
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f8fafc', padding: '2rem 0' }}>
      <Snackbar open={showSnackbar} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} sx={{ mt: 9 }}>
        <Alert onClose={handleCloseSnackbar} severity="warning" sx={{ width: '100%' }}>
          You must be logged in to access the employee list.{' '}
          <span
            onClick={handleLoginRedirect}
            style={{
              color: '#0d9488',
              textDecoration: 'underline',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            Login
          </span>
        </Alert>
      </Snackbar>

      <Container maxWidth="lg">
        {/* Header Section */}
        <Box sx={{ marginBottom: '3rem' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} sx={{ flexWrap: 'wrap', gap: '1rem' }}>
            <Box>
              <Typography variant="h3" sx={{ fontWeight: 800, color: '#0d9488', marginBottom: '0.5rem' }}>
                Team Members
              </Typography>
              <Typography sx={{ color: '#666', fontSize: '1rem' }}>
                Manage and track all your employees in one place
              </Typography>
            </Box>
            <Button
              component={Link}
              to="/add-employee"
              variant="contained"
              startIcon={<AddIcon />}
              sx={{
                backgroundColor: '#0d9488',
                color: 'white',
                padding: '0.8rem 1.5rem',
                borderRadius: '8px',
                fontWeight: 600,
                textTransform: 'none',
                fontSize: '1rem',
                '&:hover': {
                  backgroundColor: '#0a7066',
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.2s ease',
              }}
            >
              Add Employee
            </Button>
          </Stack>
        </Box>

        {/* Search Bar */}
        <Box sx={{ marginBottom: '2rem' }}>
          <TextField
            fullWidth
            placeholder="Search by name or email..."
            variant="outlined"
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                backgroundColor: '#ffffff',
                '&:hover fieldset': {
                  borderColor: '#0d9488',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#0d9488',
                },
              },
            }}
          />
        </Box>

        {/* Employee Cards Grid */}
        {filteredEmployees.length > 0 ? (
          <Grid container spacing={3}>
            {filteredEmployees.map(employee => (
              <Grid item xs={12} sm={6} md={4} key={employee.id}>
                <Card
                  sx={{
                    height: '100%',
                    borderRadius: '12px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                    transition: 'all 0.3s ease',
                    border: '1px solid #e0e7ff',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 12px 24px rgba(13, 148, 136, 0.15)',
                    },
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <CardContent sx={{ flex: 1, paddingBottom: 0 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                      <Box
                        sx={{
                          width: '50px',
                          height: '50px',
                          borderRadius: '50%',
                          backgroundColor: '#e0f2f1',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginRight: '1rem',
                        }}
                      >
                        <PersonIcon sx={{ color: '#0d9488', fontSize: '1.8rem' }} />
                      </Box>
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: '#1a1a1a' }}>
                          {employee.firstName} {employee.lastName}
                        </Typography>
                        <Typography sx={{ fontSize: '0.85rem', color: '#999' }}>
                          ID: {employee.id}
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ marginBottom: '1.5rem' }}>
                      <Typography sx={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem' }}>
                        <strong>Email:</strong>
                      </Typography>
                      <Typography sx={{ fontSize: '0.9rem', color: '#0d9488', wordBreak: 'break-all' }}>
                        {employee.email}
                      </Typography>
                    </Box>

                    {employee.department && (
                      <Box sx={{ marginBottom: '1.5rem' }}>
                        <Chip
                          label={employee.department}
                          sx={{
                            backgroundColor: '#f0fdf4',
                            color: '#0d9488',
                            fontWeight: 600,
                          }}
                        />
                      </Box>
                    )}

                    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.85rem' }}>
                      <Box>
                        <Typography sx={{ color: '#999', fontWeight: 600 }}>Age</Typography>
                        <Typography sx={{ color: '#1a1a1a', fontWeight: 700, fontSize: '1rem' }}>
                          {employee.age}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography sx={{ color: '#999', fontWeight: 600 }}>Salary</Typography>
                        <Typography sx={{ color: '#1a1a1a', fontWeight: 700, fontSize: '1rem' }}>
                          ${employee.salary}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>

                  {/* Action Buttons */}
                  <Box
                    sx={{
                      padding: '1rem',
                      borderTop: '1px solid #e0e7ff',
                      display: 'flex',
                      gap: '0.75rem',
                    }}
                  >
                    <Button
                      component={Link}
                      to={`/edit-employee/${employee.id}`}
                      variant="outlined"
                      size="small"
                      startIcon={<EditIcon />}
                      sx={{
                        flex: 1,
                        color: '#0d9488',
                        borderColor: '#0d9488',
                        textTransform: 'none',
                        fontWeight: 600,
                        '&:hover': {
                          backgroundColor: '#f0fdf4',
                          borderColor: '#0d9488',
                        },
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<DeleteIcon />}
                      onClick={() => handleDeleteClick(employee)}
                      disabled={deletingEmployeeId === employee.id}
                      sx={{
                        flex: 1,
                        color: '#ef4444',
                        borderColor: '#ef4444',
                        textTransform: 'none',
                        fontWeight: 600,
                        '&:hover': {
                          backgroundColor: '#fef2f2',
                          borderColor: '#ef4444',
                        },
                      }}
                    >
                      {deletingEmployeeId === employee.id ? 'Deleting...' : 'Delete'}
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box sx={{ textAlign: 'center', padding: '4rem 2rem' }}>
            <PersonIcon sx={{ fontSize: '4rem', color: '#ccc', marginBottom: '1rem' }} />
            <Typography variant="h6" sx={{ color: '#999', marginBottom: '1rem' }}>
              {searchTerm ? 'No employees found' : 'No employees yet'}
            </Typography>
            {!searchTerm && (
              <Button
                component={Link}
                to="/add-employee"
                variant="contained"
                sx={{
                  backgroundColor: '#0d9488',
                  color: 'white',
                  textTransform: 'none',
                  fontWeight: 600,
                }}
              >
                Add Your First Employee
              </Button>
            )}
          </Box>
        )}
      </Container>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle sx={{ fontWeight: 700, color: '#1a1a1a' }}>Delete Employee?</DialogTitle>
        <DialogContent>
          <Typography sx={{ marginTop: '1rem' }}>
            Are you sure you want to delete {selectedEmployee?.firstName} {selectedEmployee?.lastName}? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ padding: '1rem' }}>
          <Button onClick={() => setDeleteDialogOpen(false)} sx={{ color: '#666' }}>
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            variant="contained"
            sx={{
              backgroundColor: '#ef4444',
              color: 'white',
              '&:hover': {
                backgroundColor: '#dc2626',
              },
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EmployeeList;
