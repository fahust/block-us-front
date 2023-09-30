import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { Invest } from "../../interface/invest.interface";
import Utils from "../../helper/utils";
import Title from "../dashboard/title";
import { Project } from "../../interface/project.interface";

interface Props {
  utils: Utils;
  invests: (Invest | undefined)[] | undefined;
}

export default function MyInvestTable(props: Props) {
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <Title>Your investments</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Project</TableCell>
            <TableCell>Contract Address</TableCell>
            <TableCell>Contract Proxy Address</TableCell>
            <TableCell align="right">Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.invests?.map((invest: Invest | undefined) => {
            return invest ? (
              <TableRow key={invest?.id}>
                <TableCell>
                  <Button
                    onClick={() => navigate(`/project/${invest?.project?.id}`)}
                    variant="text"
                  >
                    {invest?.project?.title}
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    href={`${props.utils.scanTxByNetwork(invest!.chainId)}${
                      invest?.hash
                    }`}
                    target="_blank"
                  >
                    {invest?.hash}
                  </Button>
                </TableCell>
                <TableCell align="right">{`${props.utils.convertValue(
                  invest.value
                )} ${props.utils.convertSymbol(invest.value)}`}</TableCell>
              </TableRow>
            ) : (
              <></>
            );
          })}
        </TableBody>
      </Table>
      {/* <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link> */}
    </React.Fragment>
  );
}
