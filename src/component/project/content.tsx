import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { useNavigate } from "react-router-dom";
import { News } from "../../interface/news.interface";

interface Props {
  post: News;
}

export default function Content(props: Props) {
  const navigate = useNavigate();
  const { post } = props;

  return (
    <Grid item xs={12} md={6}>
      <CardActionArea
        component="a"
        onClick={() => navigate(`/news/${post.id}`, { state: { news: post } })}
      >
        <Card sx={{ display: "flex", height: 200 }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2" variant="h5">
              {post.title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {new Date(post.created_at).toLocaleDateString("en")}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              {post.content.substring(0, 100) + "..."}
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            sx={{ width: 160, display: { xs: "none", sm: "block" } }}
            image={post.image}
          />
        </Card>
      </CardActionArea>
    </Grid>
  );
}
