import { FC, useState } from "react";
import { api } from "../api/api";
import { Typography, Box } from "@mui/material";

interface QuestionProps {
  num: number;
  handleOptionClick: (optionIndex: number) => void;
}

const Question: FC<QuestionProps> = ({ num, handleOptionClick }) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex);
    handleOptionClick(optionIndex);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Q.{api[num].id} {api[num].question}
      </Typography>
      <audio
        controls
        autoPlay
        src={(num + 1).toString() + ".mp3"}
        style={{ marginBottom: "1rem" }}
      />
      <Box>
        {api[num].options.map((option, index) => (
          <Box
            key={index}
            onClick={() => handleOptionSelect(index)}
            sx={{
              padding: "1rem",
              border: "1px solid #ccc",
              borderRadius: "0.5rem",
              cursor: "pointer",
              marginBottom: "0.5rem",
              backgroundColor:
                selectedOption === index ? "#e1e1e1" : "transparent",
            }}
          >
            <Typography variant="h6">
              {String.fromCharCode(65 + index)}. {option}
            </Typography>
          </Box>
        ))}
      </Box>
    </div>
  );
};

export default Question;
