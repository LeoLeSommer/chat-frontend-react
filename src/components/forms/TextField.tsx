import { Controller, useFormContext } from "react-hook-form";
import {
  TextField as MuiTextField,
  TextFieldProps as MuiTextFieldProps,
} from "@mui/material";

export type TextFieldProps = Omit<
  MuiTextFieldProps,
  "onBlur" | "onChange" | "value" | "error"
> & {
  name: string;
  required?: boolean;
};

export default function TextField({
  name,
  required,
  ...props
}: TextFieldProps) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      rules={{
        required,
      }}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <MuiTextField
          {...props}
          onBlur={onBlur}
          onChange={onChange}
          value={value || ""}
          error={!!error}
        />
      )}
      name={name}
    />
  );
}
