import {
  useForm,
  SubmitHandler,
  FieldValues,
  FormProvider,
} from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export type FormProps<FormValues extends FieldValues> = {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  schema?: Yup.AnyObjectSchema;
  resetAfterSubmit?: boolean;
  onSubmit: SubmitHandler<FormValues>;
};

export default function Form<FormValues extends FieldValues>({
  children,
  style,
  schema,
  resetAfterSubmit,
  onSubmit,
}: FormProps<FormValues>) {
  const methods = useForm<FormValues>({
    resolver: schema ? yupResolver(schema) : undefined,
  });

  return (
    <FormProvider {...methods}>
      <form
        style={style}
        onSubmit={(values) => {
          methods.handleSubmit(onSubmit)(values);

          if (resetAfterSubmit) {
            methods.reset();
          }
        }}
      >
        {children}
      </form>
    </FormProvider>
  );
}
