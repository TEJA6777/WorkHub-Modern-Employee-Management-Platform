import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAllDepartments, deleteDepartment } from '../services/departmentService';
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import BusinessIcon from '@mui/icons-material/Business';

const DepartmentList = () => {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [deletingDepartmentId, setDeletingDepartmentId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

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
          const data = await getAllDepartments();
          setDepartments(data);
        } catch (error) {
          console.error('Error fetching departments:', error);
        }
        setLoading(false);
      };
      fetchData();
    }
  }, [isLoggedIn]);

  const handleDeleteClick = (department) => {
    setSelectedDepartment(department);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedDepartment) {
      setDeletingDepartmentId(selectedDepartment.id);
      try {
        await deleteDepartment(selectedDepartment.id);
        setDepartments(prevDepartments => prevDepartments.filter(dept => dept.id !== selectedDepartment.id));
        setDeleteDialogOpen(false);
      } catch (error) {
        console.error('Error deleting department:', error);
      }
      setDeletingDepartmentId(null);
    }
  };

  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
  };

  const filteredDepartments = departments.filter(department =>
    department.name.toLowerCase().includes(searchTerm.toLowerCase())
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
          You must be logged in to access the department list.{' '}
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
                Departments
              </Typography>
              <Typography sx={{ color: '#666', fontSize: '1rem' }}>
                Organize and manage your company departments
              </Typography>
            </Box>
            <Button
              component={Link}
              to="/add-department"
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
              Add Department
            </Button>
          </Stack>
        </Box>

        {/* Search Bar */}
        <Box sx={{ marginBottom: '2rem' }}>
          <TextField
            fullWidth
            placeholder="Search departments..."
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

        {/* Department Cards Grid */}
        {filteredDepartments.length > 0 ? (
          <Grid container spacing={3}>
            {filteredDepartments.map(department => (
              <Grid item xs={12} sm={6} md={4} key={department.id}>
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
                  <CardContent sx={{ flex: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                      <Box
                        sx={{
                          width: '60px',
                          height: '60px',
                          borderRadius: '12px',
                          backgroundColor: 'linear-gradient(135deg, #0d9488 0%, #14b8a6 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginRight: '1rem',
                        }}
                      >
                        <BusinessIcon sx={{ color: 'white', fontSize: '1.8rem' }} />
                      </Box>
                      <Box flex={1}>
                        <Typography variant="h5" sx={{ fontWeight: 700, color: '#1a1a1a', wordBreak: 'break-word' }}>
                          {department.name}
                        </Typography>
                        <Typography sx={{ fontSize: '0.85rem', color: '#999' }}>
                          ID: {department.id}
                        </Typography>
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        padding: '1rem',
                        backgroundColor: '#f0fdf4',
                        borderRadius: '8px',
                        textAlign: 'center',
                        marginTop: '1rem',
                      }}
                    >
                      <Typography sx={{ fontSize: '0.85rem', color: '#666', marginBottom: '0.25rem' }}>
                        Department Status
                      </Typography>
                      <Typography sx={{ fontSize: '1rem', fontWeight: 700, color: '#0d9488' }}>
                        Active
                      </Typography>
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
                      to={`/edit-department/${department.id}`}
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
                      onClick={() => handleDeleteClick(department)}
                      disabled={deletingDepartmentId === department.id}
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
                      {deletingDepartmentId === department.id ? 'Deleting...' : 'Delete'}
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box sx={{ textAlign: 'center', padding: '4rem 2rem' }}>
            <BusinessIcon sx={{ fontSize: '4rem', color: '#ccc', marginBottom: '1rem' }} />
            <Typography variant="h6" sx={{ color: '#999', marginBottom: '1rem' }}>
              {searchTerm ? 'No departments found' : 'No departments yet'}
            </Typography>
            {!searchTerm && (
              <Button
                component={Link}
                to="/add-department"
                variant="contained"
                sx={{
                  backgroundColor: '#0d9488',
                  color: 'white',
                  textTransform: 'none',
                  fontWeight: 600,
                }}
              >
                Add Your First Department
              </Button>
            )}
          </Box>
        )}
      </Container>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle sx={{ fontWeight: 700, color: '#1a1a1a' }}>Delete Department?</DialogTitle>
        <DialogContent>
          <Typography sx={{ marginTop: '1rem' }}>
            Are you sure you want to delete {selectedDepartment?.name}? This action cannot be undone.
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

export default DepartmentList;
