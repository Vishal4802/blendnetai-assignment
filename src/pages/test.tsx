import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, Typography, Box } from "@mui/material";
import { api } from "../api/api";
import Question from "../components/question";

const Test: React.FC = () => {
  const [timeLimit, setTimeLimit] = useState<number>(15);
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [num, setNum] = useState<number>(0);
  const [intervalId, setIntervalId] = useState<number | null>(null);
  const [notStarted, isNotStarted] = useState<boolean>(true);
  const navigate = useNavigate();
  const [marks, setMarks] = useState<number>(0);

  // Start timer when the test starts
  useEffect(() => {
    if (!notStarted) {
      const id = window.setInterval(() => {
        setTimeLimit((prevSeconds) => prevSeconds - 1);
      }, 1000);

      setIntervalId(id);

      return () => clearInterval(id);
    }
  }, [notStarted]);

  useEffect(() => {
    if (timeLimit === 0 && intervalId) {
      clearInterval(intervalId);
      navigate("/timesup");
      console.log("Time's up!");
    }
  }, [timeLimit, intervalId, navigate]);

  const handleOptionClick = (optionIndex: number) => {
    setIsSelected(true);
    if (api[num].answer === optionIndex) {
      setMarks((prevMarks) => prevMarks + 1);
    }
  };

  const handleNextClick = () => {
    setNum((prevNum) => prevNum + 1);
    setIsSelected(false);
    setTimeLimit(15);
  };

  const handleSubmit = () => {
    navigate("/results", { state: { marks } });
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      {notStarted ? (
        <Box mt={5}>
          <Button
            variant="contained"
            onClick={() => isNotStarted(false)}
            size="large"
          >
            Start Test
          </Button>
          <Box mt={2}>
            <Button
              variant="contained"
              component={Link}
              to="/manager"
              color="primary"
            >
              Manage Questions
            </Button>
          </Box>
        </Box>
      ) : (
        <Box mt={5} textAlign="center">
          <Typography variant="h4" gutterBottom>
            {timeLimit}
          </Typography>
          <Question num={num} handleOptionClick={handleOptionClick} />
          <Box mt={2}>
            {num < api.length - 1 ? (
              <Button
                variant="contained"
                onClick={handleNextClick}
                style={{ display: isSelected ? "" : "none" }}
              >
                Next
              </Button>
            ) : (
              <Button variant="contained" onClick={handleSubmit}>
                Submit
              </Button>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Test;
