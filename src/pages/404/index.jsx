/* eslint-disable react/no-unknown-property */
import { Box, Typography, Button, Container } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home'
import SearchOffIcon from '@mui/icons-material/SearchOff'

function NotFound() {
  const navigate = useNavigate()

  const handleGoHome = () => {
    navigate('/')
  }

  return (
    <Container
      maxWidth="md"
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 3
        }}
      >
        {/* 404 Icon */}
        <SearchOffIcon
          sx={{
            fontSize: 120,
            color: 'primary.main',
            opacity: 0.8
          }}
        />

        {/* 404 Text */}
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: '4rem', md: '6rem' },
            fontWeight: 'bold',
            color: 'primary.main',
            textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          404
        </Typography>

        {/* Error Message */}
        <Typography
          variant="h4"
          sx={{
            fontSize: { xs: '1.5rem', md: '2rem' },
            fontWeight: 'medium',
            color: 'text.primary',
            mb: 1
          }}
        >
          Oops! Page Not Found
        </Typography>

        {/* Description */}
        <Typography
          variant="body1"
          sx={{
            fontSize: '1.1rem',
            color: 'text.secondary',
            maxWidth: 500,
            lineHeight: 1.6,
            mb: 3
          }}
        >
          The page you are looking for might have been removed, had its name changed,
          or is temporarily unavailable.
        </Typography>

        {/* Action Buttons */}
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            flexDirection: { xs: 'column', sm: 'row' }
          }}
        >
          <Button
            variant="contained"
            size="large"
            startIcon={<HomeIcon />}
            onClick={handleGoHome}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 2,
              textTransform: 'none',
              fontSize: '1rem',
              boxShadow: 2,
              '&:hover': {
                boxShadow: 4,
                transform: 'translateY(-2px)'
              },
              transition: 'all 0.3s ease'
            }}
          >
            Go Home
          </Button>

          <Button
            variant="outlined"
            size="large"
            onClick={() => window.history.back()}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 2,
              textTransform: 'none',
              fontSize: '1rem',
              borderWidth: 2,
              '&:hover': {
                borderWidth: 2,
                transform: 'translateY(-2px)'
              },
              transition: 'all 0.3s ease'
            }}
          >
            Go Back
          </Button>
        </Box>

        {/* Decorative Elements */}
        <Box
          sx={{
            position: 'absolute',
            top: '20%',
            left: '10%',
            width: 60,
            height: 60,
            borderRadius: '50%',
            backgroundColor: 'primary.light',
            opacity: 0.1,
            animation: 'float 3s ease-in-out infinite'
          }}
        />

        <Box
          sx={{
            position: 'absolute',
            top: '60%',
            right: '15%',
            width: 40,
            height: 40,
            borderRadius: '50%',
            backgroundColor: 'secondary.light',
            opacity: 0.1,
            animation: 'float 2s ease-in-out infinite reverse'
          }}
        />
      </Box>

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>
    </Container>
  )
}

export default NotFound