import { Button } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useAppDispatch } from "../../store";
import { signInWithGoogle } from "../../store/auth";
import LoadingOverlay from "./LoadingOverlay";
import { Google } from "@mui/icons-material";

export type GoogleSignInButtonProps = {
  style?: React.CSSProperties;
};

export default function GoogleSignInButton({ style }: GoogleSignInButtonProps) {
  const dispatch = useAppDispatch();
  const mutation = useMutation({
    mutationFn: async () => dispatch(signInWithGoogle()),
  });

  return (
    <>
      <LoadingOverlay isVisible={mutation.isPending} />
      <Button
        variant="contained"
        startIcon={<Google />}
        onClick={() => mutation.mutate()}
      >
        Se connecter avec Google
      </Button>
    </>
  );
}
