import React from 'react';
import { Box, Container, Grid, Typography, Link, IconButton, Stack, Divider } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const Footer = () => {
  return (
    <Box component="footer" sx={{ background: 'linear-gradient(135deg, #0d9488 0%, #0a7066 100%)', color: 'white', padding: '4rem 0 0 0', marginTop: '5rem', position: 'relative', overflow: 'hidden' }}>
      <Box sx={{ position: 'absolute', top: -100, right: -100, width: '300px', height: '300px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.05)', zIndex: 0 }} />
      <Box sx={{ position: 'absolute', bottom: -50, left: -50, width: '200px', height: '200px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.05)', zIndex: 0 }} />
      
      <Container maxWidth="lg" sx={{ paddingY: '3rem', position: 'relative', zIndex: 1 }}>
        <Grid container spacing={4} sx={{ mb: 3 }}>
          {/* Brand Section */}
          <Grid item xs={12} sm={6} md={2.4}>
            <Typography variant="h6" sx={{ fontWeight: 800, marginBottom: '1.5rem', fontSize: '1.2rem' }}>
              ✦ WorkHub
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9, lineHeight: 1.8 }}>
              Modern employee management platform designed for the future of HR.
            </Typography>
            <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
              <IconButton size="small" sx={{ color: 'white', '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } }}>
                <FacebookIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" sx={{ color: 'white', '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } }}>
                <TwitterIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" sx={{ color: 'white', '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } }}>
                <LinkedInIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" component="a" href="https://github.com/TEJA6777" target="_blank" rel="noopener" sx={{ color: 'white', '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } }}>
                <GitHubIcon fontSize="small" />
              </IconButton>
            </Stack>
          </Grid>

          {/* Product Links */}
          <Grid item xs={12} sm={6} md={2.4}>
            <Typography variant="h6" sx={{ fontWeight: 700, marginBottom: '1.5rem', fontSize: '1rem' }}>
              Product
            </Typography>
            <Stack spacing={1}>
              <Link href="/dashboard" underline="none" sx={{ color: 'inherit', opacity: 0.8, transition: 'all 0.3s', '&:hover': { opacity: 1, color: '#a7f3d0' } }}>Dashboard</Link>
              <Link href="/employees" underline="none" sx={{ color: 'inherit', opacity: 0.8, transition: 'all 0.3s', '&:hover': { opacity: 1, color: '#a7f3d0' } }}>Employees</Link>
              <Link href="/departments" underline="none" sx={{ color: 'inherit', opacity: 0.8, transition: 'all 0.3s', '&:hover': { opacity: 1, color: '#a7f3d0' } }}>Departments</Link>
              <Link href="/profile" underline="none" sx={{ color: 'inherit', opacity: 0.8, transition: 'all 0.3s', '&:hover': { opacity: 1, color: '#a7f3d0' } }}>Profile</Link>
            </Stack>
          </Grid>

          {/* Company Links */}
          <Grid item xs={12} sm={6} md={2.4}>
            <Typography variant="h6" sx={{ fontWeight: 700, marginBottom: '1.5rem', fontSize: '1rem' }}>
              Company
            </Typography>
            <Stack spacing={1}>
              <Link href="/" underline="none" sx={{ color: 'inherit', opacity: 0.8, transition: 'all 0.3s', '&:hover': { opacity: 1, color: '#a7f3d0' } }}>Home</Link>
              <Link href="/about" underline="none" sx={{ color: 'inherit', opacity: 0.8, transition: 'all 0.3s', '&:hover': { opacity: 1, color: '#a7f3d0' } }}>About</Link>
              <Link href="/features" underline="none" sx={{ color: 'inherit', opacity: 0.8, transition: 'all 0.3s', '&:hover': { opacity: 1, color: '#a7f3d0' } }}>Features</Link>
              <Link href="/pricing" underline="none" sx={{ color: 'inherit', opacity: 0.8, transition: 'all 0.3s', '&:hover': { opacity: 1, color: '#a7f3d0' } }}>Pricing</Link>
            </Stack>
          </Grid>

          {/* Resources Links */}
          <Grid item xs={12} sm={6} md={2.4}>
            <Typography variant="h6" sx={{ fontWeight: 700, marginBottom: '1.5rem', fontSize: '1rem' }}>
              Resources
            </Typography>
            <Stack spacing={1}>
              <Link href="/docs" underline="none" sx={{ color: 'inherit', opacity: 0.8, transition: 'all 0.3s', '&:hover': { opacity: 1, color: '#a7f3d0' } }}>Documentation</Link>
              <Link href="/blog" underline="none" sx={{ color: 'inherit', opacity: 0.8, transition: 'all 0.3s', '&:hover': { opacity: 1, color: '#a7f3d0' } }}>Blog</Link>
              <Link href="/support" underline="none" sx={{ color: 'inherit', opacity: 0.8, transition: 'all 0.3s', '&:hover': { opacity: 1, color: '#a7f3d0' } }}>Support</Link>
              <Link href="/faq" underline="none" sx={{ color: 'inherit', opacity: 0.8, transition: 'all 0.3s', '&:hover': { opacity: 1, color: '#a7f3d0' } }}>FAQ</Link>
            </Stack>
          </Grid>

          {/* Contact Section */}
          <Grid item xs={12} sm={6} md={2.4}>
            <Typography variant="h6" sx={{ fontWeight: 700, marginBottom: '1.5rem', fontSize: '1rem' }}>
              Contact
            </Typography>
            <Stack spacing={1.5}>
              <Stack direction="row" spacing={1} sx={{ alignItems: 'flex-start' }}>
                <EmailIcon sx={{ fontSize: '1.2rem', mt: 0.5, opacity: 0.8 }} />
                <Link href="mailto:saitejakodati6777@gmail.com" underline="none" sx={{ color: 'inherit', opacity: 0.8, transition: 'all 0.3s', '&:hover': { opacity: 1, color: '#a7f3d0' }, fontSize: '0.9rem' }}>
                  saitejakodati6777@gmail.com
                </Link>
              </Stack>
              <Stack direction="row" spacing={1} sx={{ alignItems: 'flex-start' }}>
                <LocationOnIcon sx={{ fontSize: '1.2rem', mt: 0.5, opacity: 0.8 }} />
                <Typography variant="body2" sx={{ opacity: 0.8, fontSize: '0.9rem' }}>
                  Global Platform
                </Typography>
              </Stack>
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ backgroundColor: 'rgba(255,255,255,0.2)', my: 2 }} />

        {/* Bottom Section */}
        <Box sx={{ paddingY: '2rem', textAlign: 'center', backgroundColor: 'rgba(0,0,0,0.1)', borderRadius: '8px', px: 2 }}>
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Link href="/privacy" underline="none" sx={{ color: 'inherit', opacity: 0.8, fontSize: '0.85rem', '&:hover': { opacity: 1, color: '#a7f3d0' } }}>
                Privacy Policy
              </Link>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Link href="/terms" underline="none" sx={{ color: 'inherit', opacity: 0.8, fontSize: '0.85rem', '&:hover': { opacity: 1, color: '#a7f3d0' } }}>
                Terms of Service
              </Link>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Link href="/cookies" underline="none" sx={{ color: 'inherit', opacity: 0.8, fontSize: '0.85rem', '&:hover': { opacity: 1, color: '#a7f3d0' } }}>
                Cookie Policy
              </Link>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Link href="/sitemap" underline="none" sx={{ color: 'inherit', opacity: 0.8, fontSize: '0.85rem', '&:hover': { opacity: 1, color: '#a7f3d0' } }}>
                Sitemap
              </Link>
            </Grid>
          </Grid>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            © {new Date().getFullYear()} WorkHub - Modern Employee Management Platform. All rights reserved.
          </Typography>
          <Typography variant="caption" sx={{ opacity: 0.7, display: 'block', mt: 1 }}>
            Built by <Link href="https://github.com/TEJA6777" target="_blank" rel="noopener" sx={{ color: 'inherit', textDecoration: 'underline', '&:hover': { color: '#a7f3d0' } }}>Kodati Sai Teja</Link> with ❤️
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
