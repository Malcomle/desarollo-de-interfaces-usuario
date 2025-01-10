"use client";
import { useState } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  LinearProgress,
  MenuItem,
  Select,
} from "@mui/material";

import {themes} from "./themes";

export default function Home() {
  const [language, setLanguage] = useState("en"); // Default language
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedTheme, setSelectedTheme] = useState("Theme 1");
  const [finished, setFinished] = useState(false);

  const questions = themes[selectedTheme];

  const handleAnswer = (answer) => {
    if (answer === questions[currentQuestion].correct_answer) {
      setScore(score + 1);
    }
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setFinished(true);
    }
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setFinished(false);
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "50px", textAlign: "center" }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h5">Quiz - UI Design</Typography>
        <Select
          value={selectedTheme}
          onChange={(e) => {
            setSelectedTheme(e.target.value);
            resetQuiz();
          }}
        >
          {Object.keys(themes).map((theme) => (
            <MenuItem key={theme} value={theme}>
              {theme}
            </MenuItem>
          ))}
        </Select>
        <Select value={language} onChange={handleLanguageChange}>
          <MenuItem value="en">English</MenuItem>
          <MenuItem value="fr">Français</MenuItem>
          <MenuItem value="es">Español</MenuItem>
        </Select>
      </Box>

      <LinearProgress
        variant="determinate"
        value={(currentQuestion / questions.length) * 100}
        style={{ marginBottom: "20px", height: "10px" }}
      />

      {!finished ? (
        <Box>
          <Typography variant="h6" gutterBottom>
            {questions[currentQuestion].affirmation[language]}
          </Typography>
          <Box display="flex" justifyContent="space-around" mt={2} mb={3}>
            {questions[currentQuestion].options.map((option) => (
              <Button
                key={option}
                variant="contained"
                color="primary"
                onClick={() => handleAnswer(option)}
              >
                {option}
              </Button>
            ))}
          </Box>
          <Typography variant="body1">
            <strong>Score:</strong> {score} / {questions.length}
          </Typography>
        </Box>
      ) : (
        <Box>
          <Typography variant="h5" gutterBottom>
            Quiz Finished!
          </Typography>
          <Typography variant="h6">
            Your Score: {score} / {questions.length}
          </Typography>
          <Button variant="contained" color="primary" onClick={resetQuiz}>
            Restart Quiz
          </Button>
        </Box>
      )}
    </Container>
  );
}
