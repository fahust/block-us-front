import * as React from "react";
import Typography from "@mui/material/Typography";

export default function PaymentForm() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Your main contract was to deploy
      </Typography>
      <Typography variant="body1" gutterBottom>
        For maximum security and the possibility of adapting and improving the
        contract, we need to deploy the proxy contract, which will act
        as a bridge between your main contract and you.
      </Typography>
    </React.Fragment>
  );
}
