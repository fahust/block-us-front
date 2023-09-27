import * as React from "react";
import Typography from "@mui/material/Typography";

export default function ContractLink() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Your proxy contract was deployed
      </Typography>
      <Typography variant="body1" gutterBottom>
        All you have to do now is link the two contracts to enable you to
        interact with them
      </Typography>
    </React.Fragment>
  );
}
