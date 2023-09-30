import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import VideogameAssetIcon from "@mui/icons-material/VideogameAsset";
import CurrencyBitcoinIcon from "@mui/icons-material/CurrencyBitcoin";
import PaletteIcon from "@mui/icons-material/Palette";
import PhonelinkSetupIcon from "@mui/icons-material/PhonelinkSetup";
import DinnerDiningIcon from "@mui/icons-material/DinnerDining";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import CabinIcon from "@mui/icons-material/Cabin";
import HeadsetIcon from "@mui/icons-material/Headset";
import { useNavigate } from "react-router-dom";

export function MainListItems() {
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <ListItemButton onClick={() => navigate("/dashboard")}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
      <ListItemButton onClick={() => navigate("/my-project")}>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Projects" />
      </ListItemButton>
      <ListItemButton onClick={() => navigate("/my-invest")}>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Invests" />
      </ListItemButton>
      <ListItemButton onClick={() => navigate("/my-vote")}>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Vote" />
      </ListItemButton>
    </React.Fragment>
  );
}

export function SecondaryListItems() {
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <ListSubheader component="div" inset>
        Projects
      </ListSubheader>
      <ListItemButton onClick={() => navigate("/game")}>
        <ListItemIcon>
          <VideogameAssetIcon />
        </ListItemIcon>
        <ListItemText primary="Games" />
      </ListItemButton>
      <ListItemButton onClick={() => navigate("/web3")}>
        <ListItemIcon>
          <CurrencyBitcoinIcon />
        </ListItemIcon>
        <ListItemText primary="Web 3" />
      </ListItemButton>
      <ListItemButton onClick={() => navigate("/art")}>
        <ListItemIcon>
          <PaletteIcon />
        </ListItemIcon>
        <ListItemText primary="Art" />
      </ListItemButton>
      <ListItemButton onClick={() => navigate("/technology")}>
        <ListItemIcon>
          <PhonelinkSetupIcon />
        </ListItemIcon>
        <ListItemText primary="Technology" />
      </ListItemButton>
      <ListItemButton onClick={() => navigate("/music")}>
        <ListItemIcon>
          <HeadsetIcon />
        </ListItemIcon>
        <ListItemText primary="Music" />
      </ListItemButton>
      <ListItemButton onClick={() => navigate("/crafts")}>
        <ListItemIcon>
          <CabinIcon />
        </ListItemIcon>
        <ListItemText primary="Crafts" />
      </ListItemButton>
      <ListItemButton onClick={() => navigate("/edition")}>
        <ListItemIcon>
          <MenuBookIcon />
        </ListItemIcon>
        <ListItemText primary="Edition" />
      </ListItemButton>
      <ListItemButton onClick={() => navigate("/gastronomy")}>
        <ListItemIcon>
          <DinnerDiningIcon />
        </ListItemIcon>
        <ListItemText primary="Gastronomy" />
      </ListItemButton>
    </React.Fragment>
  );
}
