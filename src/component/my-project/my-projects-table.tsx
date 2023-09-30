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
  title: string;
  projects: (Project | undefined)[] | undefined;
}

export default function MyProjectsTable(props: Props) {
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <Title>{props.title}</Title>
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
          {props.projects?.map((project: Project | undefined) => {
            let amount = 0;
            project?.invests?.forEach((invest) => {
              amount += invest.value;
            });

            return project ? (
              <TableRow key={project?.id}>
                <TableCell>
                  <Button
                    onClick={() => navigate(`/project/${project?.id}`)}
                    variant="text"
                  >
                    {project?.title}
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    href={`${props.utils.scanAddressByNetwork(
                      project!.chainId
                    )}${project?.walletAddressToken}`}
                    target="_blank"
                  >
                    {project?.walletAddressToken}
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    href={`${props.utils.scanAddressByNetwork(
                      project!.chainId
                    )}${project?.walletAddressProxy}`}
                    target="_blank"
                  >
                    {project?.walletAddressProxy}
                  </Button>
                </TableCell>
                <TableCell align="right">{`${props.utils.convertValue(
                  amount
                )} ${props.utils.convertSymbol(amount)}`}</TableCell>
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
