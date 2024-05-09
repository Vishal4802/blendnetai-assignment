import { FC, useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Typography,
  Container,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
} from "@mui/material";
import { api } from "../api/api";

const QuestionManager: FC = () => {
  const [questions, setQuestions] = useState(api);
  const [isAdding, setIsAdding] = useState(false);
  const [newQuestion, setNewQuestion] = useState({
    question: "",
    options: ["", "", "", ""],
    answer: 0,
  });

  const handleAddQuestion = () => {
    const newId = questions.length + 1;
    const questionWithId = { ...newQuestion, id: newId };
    setQuestions([...questions, questionWithId]);
    setIsAdding(false);
    setNewQuestion({
      question: "",
      options: ["", "", "", ""],
      answer: 0,
    });
  };

  const handleDeleteQuestion = (id: number) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const updatedOptions = [...newQuestion.options];
    updatedOptions[index] = event.target.value;
    setNewQuestion({ ...newQuestion, options: updatedOptions });
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h3" align="center" gutterBottom>
        Question Manager
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setIsAdding(true)}
        sx={{ mb: 2 }}
      >
        Add Question
      </Button>
      {isAdding && (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Enter question"
              value={newQuestion.question}
              onChange={(e) =>
                setNewQuestion({ ...newQuestion, question: e.target.value })
              }
            />
          </Grid>
          {[0, 1, 2, 3].map((index) => (
            <Grid item xs={6} key={index}>
              <TextField
                fullWidth
                label={`Option ${index}`}
                value={newQuestion.options[index]}
                onChange={(e: any) => handleInputChange(e, index)}
              />
            </Grid>
          ))}
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Select Correct Answer</InputLabel>
              <Select
                value={newQuestion.answer}
                onChange={(e) =>
                  setNewQuestion({
                    ...newQuestion,
                    answer: parseInt(e.target.value as string),
                  })
                }
              >
                {newQuestion.options.map((_, index) => (
                  <MenuItem key={index} value={index}>
                    Option {index}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddQuestion}
              fullWidth
            >
              Add
            </Button>
          </Grid>
        </Grid>
      )}
      <ul>
        {questions.map((q) => (
          <li
            key={q.id}
            style={{
              listStyle: "none",
              padding: "10px",
              marginBottom: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          >
            <Typography variant="h6">{q.question}</Typography>
            <div>
              Options:
              {q.options.map((opt, index) => (
                <span key={index}> {opt} </span>
              ))}
            </div>
            <Typography variant="body2">
              Correct Answer: {q.options[q.answer]}
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleDeleteQuestion(q.id)}
            >
              Delete
            </Button>
          </li>
        ))}
      </ul>
      <Button variant="contained" component={Link} to="/" color="primary">
        Test Page
      </Button>
    </Container>
  );
};

export default QuestionManager;
