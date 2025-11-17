import React, { useEffect, useState } from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { getAllEmployees } from '../services/employeeService';
import { getAllDepartments } from '../services/departmentService';
import { Chart, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Card, CardContent, Grid, Typography, Box, CircularProgress, Container } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import BusinessIcon from '@mui/icons-material/Business';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AgeIcon from '@mui/icons-material/AccessibleForward';

Chart.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, ArcElement);

const Dashboard = () => {
  const [employeeCount, setEmployeeCount] = useState(0);
  const [departmentCount, setDepartmentCount] = useState(0);
  const [averageAge, setAverageAge] = useState(0);
  const [employeeGrowth, setEmployeeGrowth] = useState([]);
  const [ageRangeData, setAgeRangeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [genderData] = useState({ male: 295 - 120, female: 120 });
  const [jobSatisfactionData] = useState({ satisfied: 295 - 50 - 30, neutral: 50, dissatisfied: 30 });
  const [remoteWorkData] = useState({ onsite: 295 - 70 - 80, remote: 70, hybrid: 80 });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const employees = await getAllEmployees();
      const departments = await getAllDepartments();
      setEmployeeCount(employees.length);
      setDepartmentCount(departments.length);

      const totalAge = employees.reduce((sum, emp) => sum + emp.age, 0);
      const avgAge = employees.length ? totalAge / employees.length : 0;
      setAverageAge(avgAge.toFixed(1));

      const ageRanges = {
        '20-29': 0,
        '30-39': 0,
        '40-49': 0,
        '50-59': 0,
        '60+': 0,
      };

      employees.forEach(emp => {
        if (emp.age >= 20 && emp.age <= 29) ageRanges['20-29'] += 1;
        else if (emp.age >= 30 && emp.age <= 39) ageRanges['30-39'] += 1;
        else if (emp.age >= 40 && emp.age <= 49) ageRanges['40-49'] += 1;
        else if (emp.age >= 50 && emp.age <= 59) ageRanges['50-59'] += 1;
        else if (emp.age >= 60) ageRanges['60+'] += 1;
      });

      setAgeRangeData(ageRanges);

      setEmployeeGrowth([
        { month: 'January', count: 50 },
        { month: 'February', count: 70 },
        { month: 'March', count: 100 },
        { month: 'April', count: 130 },
        { month: 'May', count: 160 },
        { month: 'June', count: 200 },
      ]);

      setLoading(false);
    };
    fetchData();
  }, []);

  const StatCard = ({ icon: Icon, title, value, color }) => (
    <Card
      sx={{
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        border: '1px solid #e0e7ff',
        padding: '1.5rem',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 10px 24px rgba(13, 148, 136, 0.12)',
        },
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box>
          <Typography sx={{ color: '#666', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            {title}
          </Typography>
          <Typography sx={{ fontSize: '2.2rem', fontWeight: 800, color: '#1a1a1a' }}>
            {value}
          </Typography>
        </Box>
        <Box
          sx={{
            width: '50px',
            height: '50px',
            borderRadius: '10px',
            background: `linear-gradient(135deg, ${color}20 0%, ${color}10 100%)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon sx={{ color, fontSize: '1.8rem' }} />
        </Box>
      </Box>
    </Card>
  );

  const totalOverviewData = {
    labels: ['Employees', 'Departments'],
    datasets: [
      {
        label: 'Count',
        data: [employeeCount, departmentCount],
        backgroundColor: ['#0d9488', '#14b8a6'],
        borderColor: ['#ffffff'],
        borderWidth: 2,
      },
    ],
  };

  const genderChartData = {
    labels: ['Male', 'Female'],
    datasets: [
      {
        label: 'Gender Distribution',
        data: [genderData.male, genderData.female],
        backgroundColor: ['#3b82f6', '#ec4899'],
        borderColor: ['#ffffff'],
        borderWidth: 2,
      },
    ],
  };

  const jobSatisfactionChartData = {
    labels: ['Satisfied', 'Neutral', 'Dissatisfied'],
    datasets: [
      {
        label: 'Job Satisfaction',
        data: [jobSatisfactionData.satisfied, jobSatisfactionData.neutral, jobSatisfactionData.dissatisfied],
        backgroundColor: ['#10b981', '#f59e0b', '#ef4444'],
        borderColor: ['#ffffff'],
        borderWidth: 2,
      },
    ],
  };

  const remoteWorkChartData = {
    labels: ['Onsite', 'Remote', 'Hybrid'],
    datasets: [
      {
        label: 'Work Preference',
        data: [remoteWorkData.onsite, remoteWorkData.remote, remoteWorkData.hybrid],
        backgroundColor: ['#06b6d4', '#8b5cf6', '#f97316'],
        borderColor: ['#ffffff'],
        borderWidth: 2,
      },
    ],
  };

  const ageRangeChartData = {
    labels: Object.keys(ageRangeData),
    datasets: [
      {
        label: 'Employees by Age Range',
        data: Object.values(ageRangeData),
        backgroundColor: ['#0d9488', '#14b8a6', '#2dd4bf', '#67e8f9', '#a7f3d0'],
        borderColor: '#ffffff',
        borderWidth: 2,
      },
    ],
  };

  const lineChartData = employeeGrowth.length
    ? {
        labels: employeeGrowth.map(d => d.month),
        datasets: [
          {
            label: 'Growth Trend',
            data: employeeGrowth.map(d => d.count),
            fill: false,
            borderColor: '#0d9488',
            backgroundColor: 'rgba(13, 148, 136, 0.05)',
            tension: 0.4,
            borderWidth: 3,
            pointRadius: 5,
            pointBackgroundColor: '#0d9488',
          },
        ],
      }
    : null;

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

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f8fafc', padding: '2rem 0' }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ marginBottom: '3rem' }}>
          <Typography variant="h3" sx={{ fontWeight: 800, color: '#0d9488', marginBottom: '0.5rem' }}>
            Analytics Dashboard
          </Typography>
          <Typography sx={{ color: '#666', fontSize: '1rem' }}>
            Real-time insights and metrics for your organization
          </Typography>
        </Box>

        {/* KPI Cards */}
        <Grid container spacing={3} sx={{ marginBottom: '3rem' }}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard icon={PeopleIcon} title="Total Employees" value={employeeCount} color="#0d9488" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard icon={BusinessIcon} title="Departments" value={departmentCount} color="#14b8a6" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard icon={AgeIcon} title="Average Age" value={`${averageAge} yrs`} color="#2dd4bf" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard icon={TrendingUpIcon} title="Growth Rate" value="+12%" color="#06b6d4" />
          </Grid>
        </Grid>

        {/* Charts Grid */}
        <Grid container spacing={3}>
          {/* Employee Growth Chart */}
          <Grid item xs={12} lg={8}>
            <Card sx={{ borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', border: '1px solid #e0e7ff' }}>
              <CardContent sx={{ padding: '2rem' }}>
                <Typography variant="h6" sx={{ fontWeight: 700, marginBottom: '1.5rem', color: '#1a1a1a' }}>
                  Employee Growth Trend
                </Typography>
                {lineChartData && <Line data={lineChartData} options={{ responsive: true, maintainAspectRatio: true }} />}
              </CardContent>
            </Card>
          </Grid>

          {/* Total Overview */}
          <Grid item xs={12} sm={6} lg={4}>
            <Card sx={{ borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', border: '1px solid #e0e7ff', height: '100%' }}>
              <CardContent sx={{ padding: '2rem' }}>
                <Typography variant="h6" sx={{ fontWeight: 700, marginBottom: '1.5rem', color: '#1a1a1a' }}>
                  Organization Overview
                </Typography>
                <Bar data={totalOverviewData} options={{ indexAxis: 'y', responsive: true, maintainAspectRatio: true }} />
              </CardContent>
            </Card>
          </Grid>

          {/* Age Range Distribution */}
          <Grid item xs={12} sm={6} lg={4}>
            <Card sx={{ borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', border: '1px solid #e0e7ff', height: '100%' }}>
              <CardContent sx={{ padding: '2rem' }}>
                <Typography variant="h6" sx={{ fontWeight: 700, marginBottom: '1.5rem', color: '#1a1a1a' }}>
                  Age Distribution
                </Typography>
                <Pie data={ageRangeChartData} options={{ responsive: true, maintainAspectRatio: true }} />
              </CardContent>
            </Card>
          </Grid>

          {/* Gender Distribution */}
          <Grid item xs={12} sm={6} lg={4}>
            <Card sx={{ borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', border: '1px solid #e0e7ff', height: '100%' }}>
              <CardContent sx={{ padding: '2rem' }}>
                <Typography variant="h6" sx={{ fontWeight: 700, marginBottom: '1.5rem', color: '#1a1a1a' }}>
                  Gender Distribution
                </Typography>
                <Pie data={genderChartData} options={{ responsive: true, maintainAspectRatio: true }} />
              </CardContent>
            </Card>
          </Grid>

          {/* Job Satisfaction */}
          <Grid item xs={12} sm={6} lg={4}>
            <Card sx={{ borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', border: '1px solid #e0e7ff', height: '100%' }}>
              <CardContent sx={{ padding: '2rem' }}>
                <Typography variant="h6" sx={{ fontWeight: 700, marginBottom: '1.5rem', color: '#1a1a1a' }}>
                  Job Satisfaction
                </Typography>
                <Pie data={jobSatisfactionChartData} options={{ responsive: true, maintainAspectRatio: true }} />
              </CardContent>
            </Card>
          </Grid>

          {/* Remote Work Preference */}
          <Grid item xs={12} sm={6} lg={4}>
            <Card sx={{ borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', border: '1px solid #e0e7ff', height: '100%' }}>
              <CardContent sx={{ padding: '2rem' }}>
                <Typography variant="h6" sx={{ fontWeight: 700, marginBottom: '1.5rem', color: '#1a1a1a' }}>
                  Work Preference
                </Typography>
                <Pie data={remoteWorkChartData} options={{ responsive: true, maintainAspectRatio: true }} />
              </CardContent>
            </Card>
          </Grid>

          {/* Age Range Bar Chart */}
          <Grid item xs={12} lg={8}>
            <Card sx={{ borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', border: '1px solid #e0e7ff' }}>
              <CardContent sx={{ padding: '2rem' }}>
                <Typography variant="h6" sx={{ fontWeight: 700, marginBottom: '1.5rem', color: '#1a1a1a' }}>
                  Age Range Breakdown
                </Typography>
                <Bar data={ageRangeChartData} options={{ responsive: true, maintainAspectRatio: true }} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard;
