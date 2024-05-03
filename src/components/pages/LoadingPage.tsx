import { CircularProgress, Container } from "@mui/material";

export default function LoadingPage() {
  return (
    <Container style={styles.container}>
      <CircularProgress />
    </Container>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};
