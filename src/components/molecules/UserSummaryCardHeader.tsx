import { Avatar, CardHeader } from "@mui/material";
import { UserSummaryResponse } from "../../api/models/UserSummaryResponse";
import { red } from "@mui/material/colors";

export type UserSummaryProps = {
  user: UserSummaryResponse;
};

export default function UserSummary({ user }: UserSummaryProps) {
  const initials = `${user.firstName[0]}${user.lastName[0]}`;

  return (
    <CardHeader
      avatar={
        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
          {initials}
        </Avatar>
      }
      title={user.firstName}
      subheader={user.lastName}
    />
  );
}
