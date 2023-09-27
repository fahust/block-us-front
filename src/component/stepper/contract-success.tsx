import * as React from "react";
import Typography from "@mui/material/Typography";

export default function ContractSuccess() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Your project is now on blockchain
      </Typography>
      <Typography variant="body1" gutterBottom>
        Your project is ready to be seen by the whole world and to receive
        investments from future interested parties. You can edit certain
        parameters of your contract at any time, such as the fundraising dates
        or the description and image, and add news to keep up to date with your
        project's progress.
      </Typography>
    </React.Fragment>
  );
}
