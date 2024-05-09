import { useLocation, Link } from "react-router-dom";
import { Button, Typography, Container, Box } from "@mui/material";
import { api } from "../api/api";

const Results = () => {
  const location = useLocation();
  const { marks } = location.state;

  return (
    <Container maxWidth="sm">
      <Box textAlign="center" mt={4}>
        <Typography variant="h4" gutterBottom>
          Results
        </Typography>
        <Typography variant="body1" gutterBottom>
          Marks: {marks}/{api.length}
        </Typography>
        <Box mt={2}>
          <Button variant="contained" component={Link} to="/" color="primary">
            Retry
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Results;
