"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter for navigation
import {
  TextField,
  Button,
  Container,
  Paper,
  Typography,
  Snackbar,
  Alert,
  IconButton,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Header from '../components/Header';

const Page: React.FC = () => {
  const router = useRouter(); // Initialize the router
  const [answers, setAnswers] = useState<string[]>(Array(10).fill(''));
  const [showAlert, setShowAlert] = useState(false);

  const questions: string[] = [
    "What is the company's annual revenue?",
    "What is the current market size of your industry?",
    "What is your company's growth rate year over year?",
    "How many employees does your company have?",
    "What is your company's current profit margin?",
    "Who are your main competitors?",
    "What are your key competitive advantages?",
    "What is your customer acquisition cost?",
    "What is your customer lifetime value?",
    "What are your projected revenues for the next 3 years?",
  ];

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const handleBack = () => {
    router.back(); 
  };

  return (
    <>
    <Header/>
    <div style={{ backgroundColor: '#f9fafb', minHeight: '100vh' }}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Back Button */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
          <IconButton
            onClick={handleBack}
            sx={{
              color: '#1976d2',
              backgroundColor: '#e3f2fd',
              '&:hover': {
                backgroundColor: '#bbdefb',
              },
              marginRight: '1rem',
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" sx={{ fontWeight: 600, color: '#333' }}>
            Back 
          </Typography>
        </div>

        <Typography
          variant="h2"
          align="center"
          sx={{
            mt: 2,
            mb: 4,
            fontSize: { xs: '2rem', lg: '3.5rem' },
            background: 'linear-gradient(90deg, #ff7e5f, #feb47b)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 700,
          }}
        >
          Valuation Page
        </Typography>

        {questions.map((question, index) => (
          <Paper
            key={index}
            elevation={4}
            sx={{
              p: 4,
              mb: 3,
              borderRadius: '15px',
              background: 'linear-gradient(135deg, #ffffff, #f0f4f8)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                fontWeight: 600,
                color: '#333',
              }}
            >
              {index + 1}. {question}
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={3}
              variant="outlined"
              placeholder="Enter your answer here..."
              value={answers[index]}
              onChange={(e) => handleAnswerChange(index, e.target.value)}
              sx={{
                mt: 2,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '10px',
                  background: '#fff',
                  '& fieldset': {
                    borderColor: '#ddd',
                  },
                  '&:hover fieldset': {
                    borderColor: '#ff7e5f',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#feb47b',
                  },
                },
              }}
            />
          </Paper>
        ))}

        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <Button
            variant="contained"
            size="large"
            onClick={handleSubmit}
            sx={{
              px: 5,
              py: 1.8,
              fontSize: '1rem',
              background: 'linear-gradient(90deg, #ff7e5f, #feb47b)',
              borderRadius: '30px',
              boxShadow: '0 4px 15px rgba(255, 126, 95, 0.3)',
              '&:hover': {
                background: 'linear-gradient(90deg, #feb47b, #ff7e5f)',
              },
            }}
          >
            Submit Answers
          </Button>
        </div>

        <Snackbar
          open={showAlert}
          autoHideDuration={3000}
          onClose={handleCloseAlert}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert
            onClose={handleCloseAlert}
            severity="success"
            sx={{
              width: '100%',
              background: '#ff7e5f',
              color: '#fff',
            }}
          >
            ChatGPT API has been called successfully! Your answers are being processed.
          </Alert>
        </Snackbar>
      </Container>
    </div>
    </>

  );
};

export default Page;
