import { useCallback } from "react";
import * as Yup from "yup";
import Form from "../forms/Form";
import { Box, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SubmitIconButton from "../forms/SubmitIconButton";
import TextField from "../forms/TextField";
import { useAppDispatch } from "../../store";
import { createThread } from "../../store/threads";

const schema = Yup.object().shape({
  title: Yup.string().required("Ce champ est requis"),
});

export type CreateThreadInlineProps = {
  onSubmit: (values: any) => void;
};

export default function CreateThreadInlineForm() {
  const dispatch = useAppDispatch();
  const handleSubmit = useCallback(
    (values: any) =>
      dispatch(
        createThread({
          ...values,
        }) as any
      ),
    [dispatch]
  );

  return (
    <Box style={styles.container}>
      <Typography variant="subtitle1">
        Créer un nouveau fil de discussion
      </Typography>
      <Form style={styles.form} schema={schema} onSubmit={handleSubmit}>
        <TextField name="title" label="Nom" type="text" required fullWidth />
        <div style={styles.buttonContainer}>
          <SubmitIconButton>
            <AddIcon />
          </SubmitIconButton>
        </div>
      </Form>
    </Box>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: "flex",
    flex: 0,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: 8,
    gap: 8,
  },
  form: {
    display: "flex",
    gap: 8,
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};
