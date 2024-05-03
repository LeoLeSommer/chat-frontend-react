import { Controller, useFormContext } from "react-hook-form";
import {
  OutlinedInput as MuiOutlinedInput,
  OutlinedInputProps as MuiOutlinedInputProps,
} from "@mui/material";

export type OutlinedInputProps = Omit<
  MuiOutlinedInputProps,
  "onBlur" | "onChange" | "value" | "error"
> & {
  name: string;
  required?: boolean;
};

export default function TextField({
  name,
  required,
  ...props
}: OutlinedInputProps) {
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
        <MuiOutlinedInput
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
