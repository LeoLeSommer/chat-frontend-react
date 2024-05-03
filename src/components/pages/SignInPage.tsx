import { useCallback } from "react";
import { Box, Container, Typography } from "@mui/material";
import * as Yup from "yup";
import TextField from "../forms/TextField";
import Form from "../forms/Form";
import SubmitButton from "../forms/SubmitButton";
import { useAppDispatch } from "../../store";
import { register } from "../../store/auth";

const schema = Yup.object().shape({
  firstName: Yup.string().required("Ce champ est requis"),
  lastName: Yup.string().required("Ce champ est requis"),
});

export default function SignInPage() {
  const dispatch = useAppDispatch();
  const handleSubmit = useCallback(
    (values: any) =>
      dispatch(
        register({
          ...values,
        })
      ),
    [dispatch]
  );

  return (
    <Container style={styles.container}>
      <Box style={styles.header}>
        <Typography component="h1" variant="h2" textAlign="center">
          Inscription
        </Typography>
      </Box>
      <Form style={styles.form} schema={schema} onSubmit={handleSubmit}>
        <Box style={styles.formContent}>
          <Typography variant="subtitle1">Quel est votre nom ?</Typography>
          <TextField
            name="lastName"
            label="Nom"
            type="text"
            required
            fullWidth
          />
          <Typography variant="subtitle1">Quel est votre prénom ?</Typography>
          <TextField
            name="firstName"
            label="Prénom"
            type="text"
            required
            fullWidth
          />
          <SubmitButton variant="contained" fullWidth>
            S'inscrire
          </SubmitButton>
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
  },
  formContent: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    gap: 16,
  },
};
