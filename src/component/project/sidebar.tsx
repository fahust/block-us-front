import * as React from "react";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { useNavigate } from "react-router-dom";
import { News } from "../../interface/news.interface";
import { Button } from "@mui/material";
import { ContractProxy } from "../../helper/contract-proxy";
import Utils from "../../helper/utils";
import { Project } from "../../interface/project.interface";
import { createInvest } from "../../api/invest-api";
import { ContractTransactionResponse } from "ethers";
import { withdraw } from "../../api/project-api";

interface Props {
  utils: Utils;
  project: Project;
  title: string;
  social: any;
}

export default function Sidebar(props: Props) {
  const navigate = useNavigate();
  const { project, social, title, utils } = props;
  const news = project.news as News[];
  const shortDescription = project.shortDescription;
  const contractProxy = new ContractProxy(utils, project.walletAddressProxy);
  const [amount, setAmount] = React.useState(1);
  const [value, setValue] = React.useState(1);

  return (
    <Grid item xs={12} md={4}>
      <Paper elevation={0} sx={{ p: 2, bgcolor: "grey.200" }}>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography>{shortDescription}</Typography>
        {project?.owner?.id !== utils.user.id ? (
          <Button
            onClick={() =>
              contractProxy
                .mint(utils.signer.address, amount, value * amount)
                .then((tx: bigint | ContractTransactionResponse) => {
                  createInvest(project.id, value * amount, utils, tx);
                })
                .catch((err) => console.log(err))
            }
            style={{ marginTop: 30 }}
            variant="contained"
          >
            Invest
          </Button>
        ) : (
          <Button
            onClick={() =>
              contractProxy
                .withdraw(amount, utils.signer.address)
                .then((tx: bigint | ContractTransactionResponse) => {
                  withdraw(project.id, amount, utils, tx);
                })
                .catch((err) => console.log(err))
            }
            style={{ marginTop: 30 }}
            variant="contained"
          >
            Withdraw
          </Button>
        )}
      </Paper>
      <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
        News
      </Typography>
      {news?.map((n: News) => (
        <Link
          display="block"
          variant="body1"
          onClick={() => navigate(`/news/${n.id}`, { state: { news: n } })}
          key={n.title}
        >
          {n.title}
        </Link>
      ))}
      <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
        Social
      </Typography>
      {social?.map((network: any) => (
        <Link
          display="block"
          variant="body1"
          href="#"
          key={network.name}
          sx={{ mb: 0.5 }}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <network.icon />
            <span>{network.name}</span>
          </Stack>
        </Link>
      ))}
    </Grid>
  );
}
