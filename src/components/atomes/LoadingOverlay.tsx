import { CircularProgress, Container } from "@mui/material";

export type FormLoadingOverlayProps = {
  isVisible: boolean;
};

export default function LoadingOverlay({ isVisible }: FormLoadingOverlayProps) {
  return isVisible ? (
    <Container style={styles.container}>
      <CircularProgress />
    </Container>
  ) : (
    <></>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 9999,
  },
};
