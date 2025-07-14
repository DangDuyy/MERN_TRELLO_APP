import React from 'react'
import Box from '@mui/material/Box'

function PageLoadingSpinner({ caption }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: 'primary.main',
        gap: 3
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2
        }}
      >
        <Box
          sx={{
            width: 40,
            height: 40,
            border: '4px solid',
            borderColor: 'rgba(255, 255, 255, 0.2)',
            borderTopColor: 'white',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            '@keyframes spin': {
              '0%': { transform: 'rotate(0deg)' },
              '100%': { transform: 'rotate(360deg)' }
            }
          }}
        />
        <Box
          sx={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: 'white',
            letterSpacing: '0.5px'
          }}
        >
          { caption }
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          gap: 1,
          alignItems: 'center'
        }}
      >
        {[0, 1, 2].map((index) => (
          <Box
            key={index}
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: 'white',
              opacity: 0.7,
              animation: `pulse 1.5s ease-in-out ${index * 0.2}s infinite`,
              '@keyframes pulse': {
                '0%, 100%': { opacity: 0.3, transform: 'scale(0.8)' },
                '50%': { opacity: 1, transform: 'scale(1.2)' }
              }
            }}
          />
        ))}
      </Box>
    </Box>
  )
}

export default PageLoadingSpinner