import * as React from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import Banner from "./banner";
import Content from "./content";
import Sidebar from "./sidebar";
import { Divider, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import Utils from "../../helper/utils";
import { getProject } from "../../api/project-api";
import { Project as ProjectInterface } from "../../interface/project.interface";
import { News } from "../../interface/news.interface";

interface Props {
  utils: Utils;
}

export default function Project(props: Props) {
  const { id } = useParams();
  const utils = props.utils;

  const [project, setProject] = React.useState<ProjectInterface | null>(null);

  React.useEffect(() => {
    getProject(id!, utils).then((data) => {
      console.log(data);
      if (data && project?.title !== data?.title) setProject(data);
    });
  });
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {project ? (
          <Container maxWidth="lg">
            <main>
              <Banner post={project} />
              <Grid container spacing={4}>
                {typeof project?.news !== "number" &&
                  project?.news
                    ?.slice(0, 2)
                    .map((news: News) => (
                      <Content key={news.title} post={news} />
                    ))}
              </Grid>
              <Grid container spacing={5} sx={{ mt: 3 }}>
                <Grid
                  item
                  xs={12}
                  md={8}
                  sx={{
                    "& .markdown": {
                      py: 3,
                    },
                  }}
                >
                  <Typography variant="h3" gutterBottom>
                    {project?.title}
                  </Typography>
                  <Divider />
                  <Typography variant="body1" gutterBottom>
                    {project?.description}
                  </Typography>
                </Grid>
                <Sidebar
                  title={new Date(project.created_at).toLocaleDateString("en")}
                  description={project?.shortDescription}
                  news={project?.news}
                  // social={sidebar.social}
                />
              </Grid>
            </main>
          </Container>
        ) : (
          <></>
        )}
      </Grid>
    </Container>
  );
}
