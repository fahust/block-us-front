import * as React from "react";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Container,
  Grid,
  ImageList,
  ImageListItem,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Utils from "../../helper/utils";
import { getProjectByCategory } from "../../api/project-api";
import { Project } from "../../interface/project.interface";

interface Props {
  utils: Utils;
  category: string;
}

export default function Projects(props: Props) {
  const navigate = useNavigate();
  const utils = props.utils as Utils;
  const category = props.category;
  const [projects, setProjects] = React.useState<Project[]>([]);

  React.useEffect(() => {
    getProjectByCategory(category, utils).then((data: Project[] | void) => {
      if (data && projects[0]?.title !== data[0]?.title) setProjects(data);
    });
  });

  return (
    <React.Fragment>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={12}>
            <ImageList variant="masonry" cols={3} gap={2}>
              {projects.map((project: Project) => (
                <Card style={{ margin: 20 }}>
                  <CardActionArea
                    onClick={() => navigate(`/project/${project.id}`)}
                  >
                    <ImageListItem key={project.image}>
                      <img
                        srcSet={`${project.image}?w=248&fit=crop&auto=format&dpr=2 2x`}
                        src={`${project.image}?w=248&fit=crop&auto=format`}
                        alt={project.title}
                        loading="lazy"
                      />
                    </ImageListItem>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {project.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {project.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button size="small" color="primary">
                      Like
                    </Button>
                    <Button size="small" color="primary">
                      Comment
                    </Button>
                  </CardActions>
                </Card>
              ))}
            </ImageList>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}
