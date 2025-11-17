import React from 'react';
import { Box, Typography, Button, Container, Grid, Card, CardContent, useMediaQuery, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import BusinessIcon from '@mui/icons-material/Business';
import PeopleIcon from '@mui/icons-material/People';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';
import CloudIcon from '@mui/icons-material/Cloud';

const LandingPage = () => {
  const isSmallScreen = useMediaQuery(theme => theme.breakpoints.down('md'));

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#ffffff', overflow: 'hidden' }}>
      {/* Hero Section with Gradient Background */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #0d9488 0%, #14b8a6 50%, #2dd4bf 100%)',
          padding: isSmallScreen ? '4rem 1rem' : '6rem 2rem',
          textAlign: 'center',
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '-50%',
            right: '-50%',
            width: '100%',
            height: '100%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
            borderRadius: '50%',
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              marginBottom: '1.5rem',
              fontSize: isSmallScreen ? '2.5rem' : '3.5rem',
              textShadow: '0 4px 6px rgba(0,0,0,0.1)',
            }}
          >
            WorkHub
          </Typography>
          <Typography
            variant="h5"
            sx={{
              marginBottom: '2rem',
              fontSize: isSmallScreen ? '1rem' : '1.3rem',
              fontWeight: 300,
              maxWidth: '700px',
              margin: '0 auto 2rem',
              opacity: 0.95,
            }}
          >
            Transform Your HR Operations with AI-Powered Employee Management
          </Typography>
          <Stack
            direction={isSmallScreen ? 'column' : 'row'}
            spacing={2}
            justifyContent="center"
          >
            <Button
              component={Link}
              to="/dashboard"
              variant="contained"
              sx={{
                backgroundColor: '#ffffff',
                color: '#0d9488',
                padding: '1rem 2.5rem',
                fontSize: '1.1rem',
                fontWeight: 700,
                borderRadius: '50px',
                textTransform: 'none',
                boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                '&:hover': {
                  backgroundColor: '#f0fdf4',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 15px 40px rgba(0,0,0,0.3)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Get Started
            </Button>
            <Button
              href="https://github.com/TEJA6777/WorkHub-Modern-Employee-Management-Platform"
              target="_blank"
              variant="outlined"
              sx={{
                color: '#ffffff',
                borderColor: '#ffffff',
                padding: '1rem 2.5rem',
                fontSize: '1.1rem',
                fontWeight: 700,
                borderRadius: '50px',
                textTransform: 'none',
                border: '2px solid white',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Learn More
            </Button>
          </Stack>
        </Container>
      </Box>

      {/* Stats Section */}
      <Box sx={{ backgroundColor: '#f0fdf4', padding: '3rem 2rem' }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography sx={{ fontSize: '2.5rem', fontWeight: 800, color: '#0d9488', marginBottom: '0.5rem' }}>
                  10K+
                </Typography>
                <Typography sx={{ fontSize: '1rem', color: '#666', fontWeight: 500 }}>
                  Active Users
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography sx={{ fontSize: '2.5rem', fontWeight: 800, color: '#0d9488', marginBottom: '0.5rem' }}>
                  500+
                </Typography>
                <Typography sx={{ fontSize: '1rem', color: '#666', fontWeight: 500 }}>
                  Companies
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography sx={{ fontSize: '2.5rem', fontWeight: 800, color: '#0d9488', marginBottom: '0.5rem' }}>
                  99.9%
                </Typography>
                <Typography sx={{ fontSize: '1rem', color: '#666', fontWeight: 500 }}>
                  Uptime
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography sx={{ fontSize: '2.5rem', fontWeight: 800, color: '#0d9488', marginBottom: '0.5rem' }}>
                  24/7
                </Typography>
                <Typography sx={{ fontSize: '1rem', color: '#666', fontWeight: 500 }}>
                  Support
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ padding: '4rem 2rem', backgroundColor: '#ffffff' }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            sx={{
              textAlign: 'center',
              fontWeight: 800,
              marginBottom: '3rem',
              color: '#1a1a1a',
              fontSize: isSmallScreen ? '2rem' : '2.8rem',
            }}
          >
            Powerful Features
          </Typography>
          <Grid container spacing={3}>
            {[
              {
                icon: <PeopleIcon sx={{ fontSize: '3rem', color: '#0d9488' }} />,
                title: 'Employee Management',
                desc: 'Centralize all employee data with intuitive profiles and complete HR tracking.',
              },
              {
                icon: <BusinessIcon sx={{ fontSize: '3rem', color: '#0d9488' }} />,
                title: 'Department Tracking',
                desc: 'Organize departments efficiently and monitor organizational structure in real-time.',
              },
              {
                icon: <AnalyticsIcon sx={{ fontSize: '3rem', color: '#0d9488' }} />,
                title: 'Advanced Analytics',
                desc: 'Get actionable insights with comprehensive dashboards and detailed reports.',
              },
              {
                icon: <SecurityIcon sx={{ fontSize: '3rem', color: '#0d9488' }} />,
                title: 'Enterprise Security',
                desc: 'Bank-level encryption and compliance with international data protection standards.',
              },
              {
                icon: <SpeedIcon sx={{ fontSize: '3rem', color: '#0d9488' }} />,
                title: 'Lightning Fast',
                desc: 'Optimized performance with instant data retrieval and seamless user experience.',
              },
              {
                icon: <CloudIcon sx={{ fontSize: '3rem', color: '#0d9488' }} />,
                title: 'Cloud Based',
                desc: 'Access your data anywhere, anytime with reliable cloud infrastructure.',
              },
            ].map((feature, idx) => (
              <Grid item xs={12} md={4} key={idx}>
                <Card
                  sx={{
                    height: '100%',
                    padding: '2rem',
                    border: 'none',
                    boxShadow: '0 5px 20px rgba(0,0,0,0.08)',
                    borderRadius: '12px',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 15px 40px rgba(13, 148, 136, 0.15)',
                    },
                  }}
                >
                  <Box sx={{ marginBottom: '1rem' }}>{feature.icon}</Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, marginBottom: '0.5rem', color: '#1a1a1a' }}>
                    {feature.title}
                  </Typography>
                  <Typography sx={{ color: '#666', lineHeight: 1.6 }}>
                    {feature.desc}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #0d9488 0%, #14b8a6 100%)',
          padding: '4rem 2rem',
          textAlign: 'center',
          color: 'white',
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h3" sx={{ fontWeight: 800, marginBottom: '1rem', fontSize: isSmallScreen ? '1.8rem' : '2.5rem' }}>
            Ready to Transform Your HR?
          </Typography>
          <Typography variant="h6" sx={{ marginBottom: '2rem', fontWeight: 300, opacity: 0.95 }}>
            Join thousands of companies using WorkHub to streamline their employee management
          </Typography>
          <Button
            component={Link}
            to="/register"
            variant="contained"
            sx={{
              backgroundColor: '#ffffff',
              color: '#0d9488',
              padding: '1rem 2.5rem',
              fontSize: '1rem',
              fontWeight: 700,
              borderRadius: '50px',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#f0fdf4',
              },
            }}
          >
            Start Free Trial
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;
