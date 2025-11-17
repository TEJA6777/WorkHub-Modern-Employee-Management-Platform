import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Drawer, List, ListItem, ListItemText, Divider } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import useMediaQuery from '@mui/material/useMediaQuery';
import LogoutIcon from '@mui/icons-material/Logout';

const Navbar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const isMobile = useMediaQuery('(max-width:1000px)');

  const isActive = path => currentPath === path;

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem('token');
      setIsLoggedIn(!!token);
    };

    checkLoginStatus();
    const interval = setInterval(checkLoginStatus, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login');
  };

  const drawerContent = (
    <Box sx={{ width: 280, backgroundColor: '#f8fafc', height: '100%' }} role="presentation">
      <Box sx={{ padding: '1.5rem', background: 'linear-gradient(135deg, #0d9488 0%, #14b8a6 100%)', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>Menu</Typography>
        <IconButton onClick={handleDrawerToggle} sx={{ color: 'white' }}>
          <CloseIcon />
        </IconButton>
      </Box>
      <List>
        <ListItem button component={Link} to="/" selected={isActive('/')} onClick={handleDrawerToggle} sx={{ py: 1.5, '&.Mui-selected': { backgroundColor: '#f0fdf4', borderLeft: '4px solid #0d9488' } }}>
          <ListItemText primary="Home" sx={{ color: isActive('/') ? '#0d9488' : '#666' }} />
        </ListItem>
        <ListItem button component={Link} to="/dashboard" selected={isActive('/dashboard')} onClick={handleDrawerToggle} sx={{ py: 1.5, '&.Mui-selected': { backgroundColor: '#f0fdf4', borderLeft: '4px solid #0d9488' } }}>
          <ListItemText primary="Dashboard" sx={{ color: isActive('/dashboard') ? '#0d9488' : '#666' }} />
        </ListItem>
        <ListItem button component={Link} to="/employees" selected={isActive('/employees')} onClick={handleDrawerToggle} sx={{ py: 1.5, '&.Mui-selected': { backgroundColor: '#f0fdf4', borderLeft: '4px solid #0d9488' } }}>
          <ListItemText primary="Employees" sx={{ color: isActive('/employees') ? '#0d9488' : '#666' }} />
        </ListItem>
        <ListItem button component={Link} to="/departments" selected={isActive('/departments')} onClick={handleDrawerToggle} sx={{ py: 1.5, '&.Mui-selected': { backgroundColor: '#f0fdf4', borderLeft: '4px solid #0d9488' } }}>
          <ListItemText primary="Departments" sx={{ color: isActive('/departments') ? '#0d9488' : '#666' }} />
        </ListItem>
        <ListItem button component={Link} to="/profile" selected={isActive('/profile')} onClick={handleDrawerToggle} sx={{ py: 1.5, '&.Mui-selected': { backgroundColor: '#f0fdf4', borderLeft: '4px solid #0d9488' } }}>
          <ListItemText primary="Profile" sx={{ color: isActive('/profile') ? '#0d9488' : '#666' }} />
        </ListItem>
        <Divider sx={{ my: 1 }} />
        {isLoggedIn ? (
          <ListItem button onClick={() => { handleLogout(); handleDrawerToggle(); }} sx={{ py: 1.5 }}>
            <LogoutIcon sx={{ mr: 1, color: '#ef4444' }} />
            <ListItemText primary="Logout" sx={{ color: '#ef4444' }} />
          </ListItem>
        ) : (
          <>
            <ListItem button component={Link} to="/login" onClick={handleDrawerToggle} sx={{ py: 1.5 }}>
              <ListItemText primary="Login" />
            </ListItem>
            <ListItem button component={Link} to="/register" onClick={handleDrawerToggle} sx={{ py: 1.5 }}>
              <ListItemText primary="Register" />
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="sticky" sx={{ 
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
        borderBottom: '1px solid #e0e7ff',
        padding: '0.75rem 0',
      }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              background: 'linear-gradient(135deg, #0d9488 0%, #14b8a6 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: '1.8rem',
              fontWeight: 800,
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'scale(1.02)',
              },
            }}
          >
            ✦ WorkHub
          </Typography>

          {/* Render drawer icon for mobile view */}
          {isMobile ? (
            <IconButton color="inherit" edge="start" onClick={handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
          ) : (
            <Box sx={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <Button component={Link} to="/" sx={{ fontSize: '0.95rem', fontWeight: 500, color: isActive('/') ? '#0d9488' : '#666', borderBottom: isActive('/') ? '3px solid #0d9488' : 'none', borderRadius: 0, pb: 0.5, '&:hover': { color: '#0d9488' } }}>
                Home
              </Button>
              <Button component={Link} to="/dashboard" sx={{ fontSize: '0.95rem', fontWeight: 500, color: isActive('/dashboard') ? '#0d9488' : '#666', borderBottom: isActive('/dashboard') ? '3px solid #0d9488' : 'none', borderRadius: 0, pb: 0.5, '&:hover': { color: '#0d9488' } }}>
                Dashboard
              </Button>
              <Button component={Link} to="/employees" sx={{ fontSize: '0.95rem', fontWeight: 500, color: isActive('/employees') ? '#0d9488' : '#666', borderBottom: isActive('/employees') ? '3px solid #0d9488' : 'none', borderRadius: 0, pb: 0.5, '&:hover': { color: '#0d9488' } }}>
                Employees
              </Button>
              <Button component={Link} to="/departments" sx={{ fontSize: '0.95rem', fontWeight: 500, color: isActive('/departments') ? '#0d9488' : '#666', borderBottom: isActive('/departments') ? '3px solid #0d9488' : 'none', borderRadius: 0, pb: 0.5, '&:hover': { color: '#0d9488' } }}>
                Departments
              </Button>
              <Button component={Link} to="/profile" sx={{ fontSize: '0.95rem', fontWeight: 500, color: isActive('/profile') ? '#0d9488' : '#666', borderBottom: isActive('/profile') ? '3px solid #0d9488' : 'none', borderRadius: 0, pb: 0.5, '&:hover': { color: '#0d9488' } }}>
                Profile
              </Button>
              <Box sx={{ ml: 1, display: 'flex', gap: '0.5rem' }}>
                {isLoggedIn ? (
                  <Button onClick={handleLogout} variant="outlined" sx={{ fontSize: '0.9rem', fontWeight: 600, color: '#ef4444', borderColor: '#ef4444', borderRadius: '8px', '&:hover': { backgroundColor: '#fef2f2', borderColor: '#ef4444' } }}>
                    <LogoutIcon sx={{ mr: 0.5, fontSize: '1rem' }} /> Logout
                  </Button>
                ) : (
                  <>
                    <Button component={Link} to="/login" sx={{ fontSize: '0.9rem', fontWeight: 600, color: '#0d9488', '&:hover': { color: '#0a7066' } }}>
                      Login
                    </Button>
                    <Button component={Link} to="/register" variant="contained" sx={{ fontSize: '0.9rem', fontWeight: 600, backgroundColor: '#0d9488', borderRadius: '8px', '&:hover': { backgroundColor: '#0a7066', boxShadow: '0 4px 12px rgba(13, 148, 136, 0.3)' } }}>
                      Register
                    </Button>
                  </>
                )}
              </Box>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Drawer for mobile view */}
      <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Navbar;
