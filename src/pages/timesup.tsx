import { Link } from "react-router-dom";
import { Typography, Container, Button, Box } from "@mui/material";

const Timesup = () => {
  return (
    <Container maxWidth="sm">
      <Box textAlign="center" mt={4}>
        <Typography variant="h4" gutterBottom>
          Time Up
        </Typography>
        <Button variant="contained" component={Link} to="/" color="primary">
          Retry
        </Button>
      </Box>
    </Container>
  );
};

export default Timesup;
