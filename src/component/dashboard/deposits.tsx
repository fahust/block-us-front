import * as React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Title from "./title";
import { Invest } from "../../interface/invest.interface";
import Utils from "../../helper/utils";

interface Props {
  utils: Utils;
}

export default function Deposits(props: Props) {
  let amount = 0;
  props.utils?.user?.invests?.map((invest: Invest) => {
    amount += invest.value;
  });
  const invests = props.utils?.user?.invests as Invest[];
  const date = invests[invests.length - 1].created_at;

  return (
    <React.Fragment>
      <Title>Total</Title>
      <Typography component="p" variant="h4">
        {`${props.utils.convertValue(amount)} ${props.utils.convertSymbol(amount)}`}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        {new Date(date).toLocaleTimeString("en-us", {
          year: "numeric",
          month: "numeric",
          day: "numeric",
        })}
      </Typography>
      {/* <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View balance
        </Link>
      </div> */}
    </React.Fragment>
  );
}
