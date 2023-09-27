import * as React from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { Divider, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import Utils from "../../helper/utils";
import Banner from "../project/banner";

interface Props {
  utils: Utils;
}

export default function News(props: Props) {
  const location = useLocation();
  const news = location.state.news;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {news ? (
          <Container maxWidth="lg">
          <Banner post={news} />
            <main>
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
                    {news?.title}
                  </Typography>
                  <Divider />
                  <Typography variant="body1" gutterBottom>
                    {news?.content}
                  </Typography>
                </Grid>
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
