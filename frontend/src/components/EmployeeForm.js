import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addEmployee, getEmployeeById, updateEmployee } from '../services/employeeService';
import { getAllDepartments } from '../services/departmentService';
import {
  TextField,
  Button,
  MenuItem,
  Box,
  CircularProgress,
  Container,
  Card,
  CardContent,
  Typography,
  Stack,
} from '@mui/material';
import { styled } from '@mui/system';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const CenteredSpinner = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
});

const EmployeeForm = () => {
  const [employee, setEmployee] = useState({
    firstName: '',
    lastName: '',
    email: '',
    age: '',
    salary: '',
    department: { id: '' },
  });
  const [departments, setDepartments] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // Fetch departments and employee details
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const departmentsData = await getAllDepartments();
        setDepartments(departmentsData);

        if (id) {
          const employeeData = await getEmployeeById(id);
          if (employeeData) {
            setEmployee({
              firstName: employeeData.firstName || '',
              lastName: employeeData.lastName || '',
              email: employeeData.email || '',
              age: employeeData.age || '',
              salary: employeeData.salary || '',
              department: {
                id: employeeData.department ? employeeData.department.id : '',
              },
            });
          }
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'department.id') {
      setEmployee({ ...employee, department: { id: value } });
    } else {
      setEmployee({
        ...employee,
        [name]: name === 'age' || name === 'salary' ? Number(value) : value,
      });
    }
  };

  // Handle submit (add/update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (id) {
        await updateEmployee(id, employee);
      } else {
        await addEmployee(employee);
      }
      setIsLoading(false);
      navigate('/employees');
    } catch (error) {
      console.error('Error saving employee:', error);
      setIsLoading(false);
    }
  };

  if (isLoading && id) {
    return (
      <CenteredSpinner>
        <CircularProgress sx={{ color: '#0d9488' }} />
      </CenteredSpinner>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f0fdf4', padding: '2rem 0' }}>
      <Container maxWidth="md">
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/employees')}
          sx={{ mb: 3, color: '#0d9488', fontWeight: 600 }}
        >
          Back to Employees
        </Button>

        <Card
          sx={{
            borderRadius: '16px',
            border: '1px solid #e0e7ff',
            boxShadow: '0 10px 30px rgba(13, 148, 136, 0.1)',
          }}
        >
          <Box
            sx={{
              background: 'linear-gradient(135deg, #0d9488 0%, #14b8a6 100%)',
              padding: '2rem',
              color: 'white',
              textAlign: 'center',
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5 }}>
              {id ? '✎ Edit Employee' : '➕ Add New Employee'}
            </Typography>
            <Typography sx={{ opacity: 0.95, fontSize: '0.95rem' }}>
              {id
                ? 'Update employee information'
                : 'Add a new team member to your organization'}
            </Typography>
          </Box>

          <CardContent sx={{ padding: '2.5rem' }}>
            <Box component="form" onSubmit={handleSubmit}>
              <Stack spacing={3}>
                {/* First & Last Name */}
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                    gap: 2,
                  }}
                >
                  <Box>
                    <Typography
                      sx={{
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        color: '#666',
                        mb: 0.5,
                      }}
                    >
                      First Name
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="John"
                      name="firstName"
                      value={employee.firstName}
                      onChange={handleChange}
                      required
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '8px',
                          backgroundColor: '#f8fafc',
                          '&.Mui-focused fieldset': {
                            borderColor: '#0d9488',
                            borderWidth: '2px',
                          },
                        },
                      }}
                    />
                  </Box>

                  <Box>
                    <Typography
                      sx={{
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        color: '#666',
                        mb: 0.5,
                      }}
                    >
                      Last Name
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="Doe"
                      name="lastName"
                      value={employee.lastName}
                      onChange={handleChange}
                      required
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '8px',
                          backgroundColor: '#f8fafc',
                          '&.Mui-focused fieldset': {
                            borderColor: '#0d9488',
                            borderWidth: '2px',
                          },
                        },
                      }}
                    />
                  </Box>
                </Box>

                {/* Email */}
                <Box>
                  <Typography
                    sx={{
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      color: '#666',
                      mb: 0.5,
                    }}
                  >
                    Email Address
                  </Typography>
                  <TextField
                    fullWidth
                    type="email"
                    placeholder="john.doe@example.com"
                    name="email"
                    value={employee.email}
                    onChange={handleChange}
                    required
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '8px',
                        backgroundColor: '#f8fafc',
                        '&.Mui-focused fieldset': {
                          borderColor: '#0d9488',
                          borderWidth: '2px',
                        },
                      },
                    }}
                  />
                </Box>

                {/* Age & Salary */}
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                    gap: 2,
                  }}
                >
                  <Box>
                    <Typography
                      sx={{
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        color: '#666',
                        mb: 0.5,
                      }}
                    >
                      Age
                    </Typography>
                    <TextField
                      fullWidth
                      type="number"
                      placeholder="30"
                      name="age"
                      value={employee.age}
                      onChange={handleChange}
                      required
                      inputProps={{ min: 18, max: 75 }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '8px',
                          backgroundColor: '#f8fafc',
                          '&.Mui-focused fieldset': {
                            borderColor: '#0d9488',
                            borderWidth: '2px',
                          },
                        },
                      }}
                    />
                  </Box>

                  <Box>
                    <Typography
                      sx={{
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        color: '#666',
                        mb: 0.5,
                      }}
                    >
                      Salary
                    </Typography>
                    <TextField
                      fullWidth
                      type="number"
                      placeholder="50000"
                      name="salary"
                      value={employee.salary}
                      onChange={handleChange}
                      required
                      inputProps={{ min: 0 }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '8px',
                          backgroundColor: '#f8fafc',
                          '&.Mui-focused fieldset': {
                            borderColor: '#0d9488',
                            borderWidth: '2px',
                          },
                        },
                      }}
                    />
                  </Box>
                </Box>

                {/* Department */}
                <Box>
                  <Typography
                    sx={{
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      color: '#666',
                      mb: 0.5,
                    }}
                  >
                    Department
                  </Typography>
                  <TextField
                    fullWidth
                    select
                    name="department.id"
                    value={employee.department.id}
                    onChange={handleChange}
                    required
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '8px',
                        backgroundColor: '#f8fafc',
                        '&.Mui-focused fieldset': {
                          borderColor: '#0d9488',
                          borderWidth: '2px',
                        },
                      },
                    }}
                  >
                    <MenuItem value="">
                      <em>Select a department</em>
                    </MenuItem>
                    {departments.map((dept) => (
                      <MenuItem key={dept.id} value={dept.id}>
                        {dept.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>

                {/* Buttons */}
                <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
                  <Button
                    fullWidth
                    type="button"
                    variant="outlined"
                    onClick={() => navigate('/employees')}
                    sx={{
                      color: '#0d9488',
                      borderColor: '#0d9488',
                      fontWeight: 600,
                      '&:hover': { backgroundColor: '#f0fdf4' },
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    sx={{
                      backgroundColor: '#0d9488',
                      color: 'white',
                      fontWeight: 600,
                      '&:hover': {
                        backgroundColor: '#0a7066',
                        transform: 'translateY(-2px)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {id ? 'Update Employee' : 'Add Employee'}
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default EmployeeForm;
