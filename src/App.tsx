import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect, FC } from "react";
import { CircularProgress, Container } from "@mui/material";
import Test from "./pages/test";
import TimesUp from "./pages/timesup";
import Results from "./pages/results";
import QuestionManager from "./pages/manager";

const App: FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <Router>
      {loading ? (
        <Container
          maxWidth="sm"
          style={{ textAlign: "center", marginTop: "20vh" }}
        >
          <CircularProgress />
        </Container>
      ) : (
        <Routes>
          <Route path="/" element={<Test />} />
          <Route path="/timesup" element={<TimesUp />} />
          <Route path="/results" element={<Results />} />
          <Route path="/manager" element={<QuestionManager />} />
        </Routes>
      )}
    </Router>
  );
};

export default App;
