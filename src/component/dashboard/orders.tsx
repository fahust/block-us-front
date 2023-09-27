import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./title";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { Invest } from "../../interface/invest.interface";
import Utils from "../../helper/utils";

interface Props {
  utils: Utils;
}

export default function Orders(props: Props) {
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <Title>Recent Orders</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Project</TableCell>
            <TableCell>Hash Transaction</TableCell>
            <TableCell>Network</TableCell>
            <TableCell align="right">Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.utils?.user?.invests?.map((invest: Invest) => (
            <TableRow key={invest.id}>
              <TableCell>{new Date(invest.created_at).toLocaleTimeString('en-us', { year:"numeric", month:"numeric", day:"numeric"})}</TableCell>
              <TableCell>
                <Button
                  onClick={() => navigate(`/project/${invest?.project?.id}`)}
                  variant="text"
                >
                  {invest?.project?.title}
                </Button>
              </TableCell>
              <TableCell>{invest.hash}</TableCell>
              <TableCell>{invest.chainId}</TableCell>
              <TableCell align="right">{`${invest.value} Ξ`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link> */}
    </React.Fragment>
  );
}
