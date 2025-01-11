"use client";
import { useEffect, useState } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  LinearProgress,
  MenuItem,
  Select,
} from "@mui/material";

// Imports des JSON
import theme1 from "./themes/b2.json";
import theme2 from "./themes/b3.json";
import theme3 from "./themes/b4.json";
import theme4 from "./themes/b5.json";
import theme5 from "./themes/b6.json";
import theme6 from "./themes/b7.json";
import theme7 from "./themes/b8.json";
import theme8 from "./themes/b9.json";
import theme9 from "./themes/b10.json";
import theme10 from "./themes/b11.json";
import theme11 from "./themes/b12.json";
import theme12 from "./themes/b13.json";

// Regroupe tous les thèmes dans un objet
const themes = {
  "Theme 1": theme1,
  "Theme 2": theme2,
  "Theme 3": theme3,
  "Theme 4": theme4,
  "Theme 5": theme5,
  "Theme 6": theme6,
  "Theme 7": theme7,
  "Theme 8": theme8,
  "Theme 9": theme9,
  "Theme 10": theme10,
  "Theme 11": theme11,
  "Theme 12": theme12,
};

export default function Home() {
  const [language, setLanguage] = useState("en"); // Langue par défaut
  const [selectedTheme, setSelectedTheme] = useState("Theme 1"); // Thème par défaut
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  // Lorsque le thème sélectionné change, on mélange et on réinitialise le quiz
  useEffect(() => {
    resetQuiz();
  }, [selectedTheme]);

  // Mélange les questions du thème ou de tous les thèmes
  const shuffleQuestions = (themeKey) => {
    if (themeKey === "All Themes") {
      const allQuestions = Object.values(themes).flatMap(
        (theme) => theme.questions
      );
      return allQuestions.sort(() => Math.random() - 0.5);
    } else {
      const questionsToShuffle = [...themes[themeKey].questions];
      return questionsToShuffle.sort(() => Math.random() - 0.5);
    }
  };

  const handleAnswer = (answer) => {
    // Vérifie la réponse
    const correctAnswer =
      questions[currentQuestion].correctAnswer[language] ||
      questions[currentQuestion].correctAnswer["en"]; // fallback en anglais si la langue n'existe pas
    if (answer === correctAnswer) {
      setScore(score + 1);
    } else {
      setScore(score - 1);
    }

    // Passe à la question suivante ou termine le quiz
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setFinished(true);
    }
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  // Quand on change de thème ou qu'on relance le quiz
  const resetQuiz = () => {
    const shuffled = shuffleQuestions(selectedTheme);
    setQuestions(shuffled);
    setCurrentQuestion(0);
    setScore(0);
    setFinished(false);
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "50px", textAlign: "center" }}>
      {/* Header avec Titre du quiz, Sélecteur de thème et Sélecteur de langue */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h5">
          {/* On affiche le titre du thème dans la langue courante (ou en anglais par défaut) */}
          {selectedTheme === "All Themes"
            ? "All Themes Quiz"
            : themes[selectedTheme].title[language] ||
              themes[selectedTheme].title["en"]}
        </Typography>

        {/* Sélecteur de thème */}
        <Select
          value={selectedTheme}
          onChange={(e) => {
            setSelectedTheme(e.target.value);
          }}
        >
          <MenuItem value="All Themes">All Themes</MenuItem>
          {Object.keys(themes).map((themeKey) => (
            <MenuItem key={themeKey} value={themeKey}>
              {themeKey}
            </MenuItem>
          ))}
        </Select>

        {/* Sélecteur de langue */}
        <Select value={language} onChange={handleLanguageChange}>
          <MenuItem value="en">English</MenuItem>
          <MenuItem value="fr">Français</MenuItem>
          <MenuItem value="es">Español</MenuItem>
          {/* Ajoutez d'autres langues si besoin */}
        </Select>
      </Box>

      {/* Barre de progression */}
      <Typography variant="h6">
        Question : {(currentQuestion + 1) || 0} / {questions.length}
      </Typography>
      <LinearProgress
        variant="determinate"
        value={(currentQuestion / questions.length) * 100 || 0}
        style={{ marginBottom: "20px", height: "10px" }}
      />

      {/* Corps du Quiz */}
      {!finished ? (
        <Box>
          {/* Affichage de la question */}
          {questions.length > 0 && (
            <>
              <Typography variant="h6" gutterBottom>
                {questions[currentQuestion].question[language] ||
                  questions[currentQuestion].question["en"]}
              </Typography>

              {/* Boutons de réponse */}
              <Box display="flex" justifyContent="space-around" mt={2} mb={3}>
                {questions[currentQuestion].answers[language]?.map((option) => (
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
            </>
          )}

          {/* Score provisoire */}
          <Typography variant="body1">
            <strong>Score:</strong> {score} / {questions.length}
          </Typography>
        </Box>
      ) : (
        // Fin du quiz
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