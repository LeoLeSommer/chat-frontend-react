import { FormControl, InputAdornment, InputLabel } from "@mui/material";
import { Send } from "@mui/icons-material";
import * as Yup from "yup";
import Form from "../forms/Form";
import OutlinedInput from "../forms/OutlinedInput";
import SubmitIconButton from "../forms/SubmitIconButton";
import { SendMessageBody } from "../../api/models/SendMessageBody";

const schema = Yup.object().shape({
  message: Yup.string().required("Ce champ est requis"),
});

export type SendMessageFormProps = {
  sendMessage: (body: SendMessageBody) => Promise<void>;
};

export default function SendMessageForm({ sendMessage }: SendMessageFormProps) {
  return (
    <Form
      style={styles.form}
      schema={schema}
      resetAfterSubmit
      onSubmit={sendMessage}
    >
      <FormControl fullWidth variant="outlined">
        <InputLabel htmlFor="chat-message-input">Envoyer un message</InputLabel>
        <OutlinedInput
          id="chat-message-input"
          name="message"
          label="Envoyer un message"
          type="text"
          autoComplete="off"
          required
          fullWidth
          endAdornment={
            <InputAdornment position="end">
              <SubmitIconButton aria-label="send message" edge="end">
                <Send />
              </SubmitIconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    </Form>
  );
}

const styles: Record<string, React.CSSProperties> = {
  form: {
    margin: 16,
  },
};
