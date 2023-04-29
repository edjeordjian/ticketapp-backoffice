import { Typography, Link } from "@mui/material";

// eslint-disable-next-line require-jsdoc
export default function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="/">
        TicketApp
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
