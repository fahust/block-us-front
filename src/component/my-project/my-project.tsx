import * as React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Utils from "../../helper/utils";
import MyProjectsTable from "./my-projects-table";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Invest } from "../../interface/invest.interface";
import { Project } from "../../interface/project.interface";

interface Props {
  utils: Utils;
}

export default function MyProject(props: Props) {
  const navigate = useNavigate();
  console.log(props.utils.user);
  const projectsInvested: (Project | undefined)[] | undefined =
    props.utils.user.invests?.map((invest: Invest) => invest.project);
  const unique = projectsInvested?.filter(
    (project, index) =>
      projectsInvested.findIndex(
        (item: Project | undefined) => item?.id === project?.id
      ) === index
  );
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
            <MyProjectsTable
              utils={props.utils}
              projects={props.utils.user.projects!}
              title={"Your projects create"}
            />
            <Button
              onClick={() => navigate(`/contract-creation`)}
              variant="contained"
            >
              Create a project
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <MyProjectsTable
              utils={props.utils}
              projects={unique}
              title={"Your invested projects"}
            />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
