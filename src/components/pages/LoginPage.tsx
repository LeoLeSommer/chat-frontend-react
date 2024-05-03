import { Box, Container, Typography } from "@mui/material";
import Form from "../forms/Form";
import GoogleSignInButton from "../atomes/GoogleSignInButton";

export default function LoginPage() {
  return (
    <Container style={styles.container}>
      <Box style={styles.header}>
        <Typography component="h1" variant="h2" textAlign="center">
          Connexion
        </Typography>
      </Box>
      <Form style={styles.form} onSubmit={() => {}}>
        <Box style={styles.form}>
          {/*<Typography variant="subtitle1" textAlign="center">
            Connexion par mail
          </Typography>
          <TextField
            name="username"
            label="Email"
            type="text"
            required
            fullWidth
          />
          <TextField
            name="password"
            label="Mot de passe"
            type="password"
            required
            fullWidth
          />
          <SubmitButton variant="contained" fullWidth>
            Se connecter
          </SubmitButton>
  <Divider style={styles.divider}>OU</Divider>*/}
          <GoogleSignInButton />
        </Box>
      </Form>
    </Container>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
  },
  header: {
    display: "flex",
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  divider: {
    width: "100%",
  },
};
