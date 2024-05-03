import { Button, ButtonProps } from "@mui/material";
import { useFormContext } from "react-hook-form";

export type SubmitButtonProps = Omit<ButtonProps, "disabled" | "type">;

export default function SubmitButton({ ...props }: SubmitButtonProps) {
  const form = useFormContext();
  const isValid = form.formState.isValid;
  const isDirty = form.formState.isDirty;

  return <Button type="submit" disabled={!isValid || !isDirty} {...props} />;
}
