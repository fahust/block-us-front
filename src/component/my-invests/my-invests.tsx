import * as React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Utils from "../../helper/utils";
import ProjectsTable from "./my-invests-table";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Invest } from "../../interface/invest.interface";
import { Project } from "../../interface/project.interface";
import MyInvestTable from "./my-invests-table";

interface Props {
  utils: Utils;
}

export default function MyInvest(props: Props) {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Recent Deposits */}
        {/* <Grid item xs={12} md={4} lg={3}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 240,
            }}
          >
            <Deposits utils={props.utils} />
          </Paper>
        </Grid> */}
        {/* Recent Orders */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <MyInvestTable
              utils={props.utils}
              invests={props.utils.user.invests}
            />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
