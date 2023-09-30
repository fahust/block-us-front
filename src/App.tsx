import "./App.css";
import Utils from "./helper/utils";
import "./App.css";
import { ContractProxy } from "./helper/contract-proxy";
import { ContractToken } from "./helper/contract-token";
import { Rules } from "./interface/rules.interface";
import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import {
  MainListItems,
  SecondaryListItems,
} from "./component/category/list-items";
import Orders from "./component/dashboard/invests-table";
import ContractCreation from "./component/stepper/contract-creation";
import { Route, Routes } from "react-router-dom";
import Projects from "./component/projects/projects";
import Project from "./component/project/project";
import Dashboard from "./component/dashboard/dashboard";
import { getUser } from "./api/user-api";
import { Link } from "@mui/material";
import News from "./component/news/news";
import { User } from "./interface/user.interface";
import MyProject from "./component/my-project/my-project";
import MyInvest from "./component/my-invests/my-invests";

// const rules: Rules = {
//   pausable: false,
//   rulesModifiable: true,
//   voteToWithdraw: false,
//   dayToWithdraw: 0,
//   startFundraising: Math.floor(Date.now() / 1000),
//   endFundraising: Math.floor(Date.now() / 1000) + 1000000000,
//   maxSupply: 10000,
// };
const addressProxy = "0x089767A98C6CAb59b429485d6360ab2243e6c4Ef";
const addressToken = "0xC5299f758c752902FE1f7a18922dE0defF8245D7";

const utils = new Utils();
// const contractProxy = new ContractProxy(utils, addressProxy);
// const contractToken = new ContractToken(utils, addressToken);

const fetchData = async () => {
  utils.user = (await getUser(utils)) as User;
};
fetchData().catch((err) => {
  console.log(err);
});

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="#">
        Block Us
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

function App() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Dashboard
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <MainListItems />
            <Divider sx={{ my: 1 }} />
            <SecondaryListItems />
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Routes>
            <Route path="/dashboard" element={<Dashboard utils={utils} />} />
            <Route path="/contract-creation" element={<ContractCreation utils={utils} />} />
            <Route path="/orders" element={<Orders utils={utils} />} />
            <Route
              path="/game"
              element={<Projects utils={utils} category={"game"} />}
            />
            <Route
              path="/web3"
              element={<Projects utils={utils} category={"web3"} />}
            />
            <Route
              path="/art"
              element={<Projects utils={utils} category={"art"} />}
            />
            <Route
              path="/technology"
              element={<Projects utils={utils} category={"technology"} />}
            />
            <Route
              path="/music"
              element={<Projects utils={utils} category={"music"} />}
            />
            <Route
              path="/crafts"
              element={<Projects utils={utils} category={"crafts"} />}
            />
            <Route
              path="/edition"
              element={<Projects utils={utils} category={"edition"} />}
            />
            <Route
              path="/gastronomy"
              element={<Projects utils={utils} category={"gastronomy"} />}
            />
            <Route
              path="/my-project"
              element={<MyProject utils={utils}/>}
            />
            <Route
              path="/my-invest"
              element={<MyInvest utils={utils}/>}
            />
            <Route path="project/:id" element={<Project utils={utils} />} />
            <Route path="news/:id" element={<News utils={utils} />} />
          </Routes>
          <Copyright sx={{ pt: 4 }} />
        </Box>
      </Box>
    </ThemeProvider>
  );
  // <div className="App">
  //   <header className="App-header">
  //     <button onClick={() => utils.connect()}>connect</button>
  //     <button onClick={() => utils.requestChallenge()}>
  //       requestChallenge
  //     </button>
  //     <button onClick={() => utils.sign()}>sign</button>
  //     <button onClick={() => utils.authenticate()}>authenticate</button>
  //     <button
  //       onClick={() =>
  //         processContract(
  //           "title",
  //           "code",
  //           "description",
  //           "mainCategory",
  //           "subCategory",
  //           rules,
  //           utils
  //         )
  //       }
  //     >
  //       DEPLOY PROJECT
  //     </button>
  //     <button onClick={() => contractToken.addProxyToContract(addressProxy)}>
  //       LINK CONTRACT TO PROXY
  //     </button>
  //     <button onClick={() => utils.switchNetwork(ChainIdHexa.POLYGONMUMBAI)}>
  //       SWITCH TO MUMBAI
  //     </button>
  //     <button onClick={() => utils.switchNetwork(ChainIdHexa.ETHEREUMGOERLI)}>
  //       SWITCH TO GOERLI
  //     </button>
  //     <button>SEND INVEST</button>
  //   </header>
  // </div>
}

export default App;
