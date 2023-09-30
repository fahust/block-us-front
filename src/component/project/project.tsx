import * as React from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import Banner from "./banner";
import Content from "./content";
import Sidebar from "./sidebar";
import { Divider, Paper, Typography } from "@mui/material";
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
                  {/* <Paper elevation={1} sx={{ p: 1 }}> */}
                    <Typography variant="h3" gutterBottom>
                      {project?.title}
                    </Typography>
                    <Divider />
                    <Typography variant="body1" gutterBottom>
                      {project?.description}
                    </Typography>
                  {/* </Paper> */}
                </Grid>
                <Sidebar
                  title={new Date(project.created_at).toLocaleDateString("en")}
                  utils={props.utils}
                  project={project}
                  social={null}
                />
              </Grid>
              <Typography variant="h4" gutterBottom>
                Comments
              </Typography>
              <Grid container spacing={5} sx={{ mt: 3 }}>
                {typeof project?.comments !== "number" &&
                  project?.comments?.map((comment) => (
                    <Grid item xs={12} md={12}>
                      <Paper elevation={5} sx={{ p: 1, bgcolor: "grey.100" }}>
                        <Typography variant="h5" gutterBottom>
                          {comment.title}
                        </Typography>
                        <Typography variant="body1">
                          {comment.content}
                        </Typography>
                        <Typography variant="caption">
                          {new Date(comment.created_at).toLocaleDateString(
                            "en"
                          )}
                        </Typography>
                      </Paper>
                    </Grid>
                  ))}
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
