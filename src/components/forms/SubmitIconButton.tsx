import { IconButton, IconButtonProps } from "@mui/material";
import { useFormContext } from "react-hook-form";

export type SubmitIconButtonProps = Omit<IconButtonProps, "disabled" | "type">;

export default function SubmitIconButton({ ...props }: SubmitIconButtonProps) {
  const form = useFormContext();
  const isValid = form.formState.isValid;
  const isDirty = form.formState.isDirty;

  return (
    <IconButton type="submit" disabled={!isValid || !isDirty} {...props} />
  );
}
