import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import {
  Box,
  FormControl,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
} from "@mui/material";
import { categories } from "../category/categories";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { createTokenContract } from "../../helper/deploy";
import { ethers } from "ethers";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Utils from "../../helper/utils";

interface Props {
  utils: Utils;
  error: boolean;
  setData: any;
  data: any;
  setDeploymentSecurityToken: any;
  setActiveStep: any;
}

export default function ContractForm(props: Props) {
  const [title, setTitle] = React.useState("");
  const [code, setCode] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [mainCategory, setMainCategory] = React.useState("");
  const [startFundraising, setStartFundraising] = React.useState<Dayjs | null>(
    dayjs().add(5, "day")
  );
  const [endFundraising, setEndFundraising] = React.useState<Dayjs | null>(
    dayjs().add(35, "day")
  );
  const [maxSupply, setMaxSupply] = React.useState("");
  const [rulesModifiable, setRulesModifiable] = React.useState(false);
  const [pausable, setPausable] = React.useState(false);
  const [voteToWithdraw, setVoteToWithdraw] = React.useState(false);

  const [errorTitle, setErrorTitle] = React.useState(false);
  const [errorCode, setErrorCode] = React.useState(false);
  const [errorDescription, setErrorDescription] = React.useState(false);
  const [errorMainCatergoy, setErrorMainCatergoy] = React.useState(false);
  const [errorMaxSupply, setErrorMaxSupply] = React.useState(false);
  const [deployment, setDeployment] = React.useState(false);

  //https://codesandbox.io/s/react-playground-qjoyf?file=/src/components/QuillEditor/ToolbarOptions.js
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "color",
  ];

  let data = {
    title,
    code,
    description,
    mainCategory,
    startFundraising,
    endFundraising,
    maxSupply,
    rulesModifiable,
    pausable,
    voteToWithdraw,
  };

  React.useEffect(() => {
    if (props.error) {
      setErrorTitle(!title.length);
      setErrorCode(!code.length);
      setErrorDescription(!description.length);
      setErrorMainCatergoy(!mainCategory.length);
      setErrorMaxSupply(
        !maxSupply.length ||
          +maxSupply <= 0 ||
          +maxSupply > 10000000000 ||
          isNaN(+maxSupply)
      );

      if (
        title.length &&
        code.length &&
        description.length &&
        mainCategory.length &&
        (maxSupply.length ||
          +maxSupply > 0 ||
          +maxSupply < 10000000000 ||
          !isNaN(+maxSupply))
      ) {
        setDeployment(true);
        createTokenContract(
          title,
          code,
          {
            pausable: pausable,
            rulesModifiable: rulesModifiable,
            voteToWithdraw: voteToWithdraw,
            dayToWithdraw: 0,
            startFundraising: startFundraising!.unix(),
            endFundraising: endFundraising!.unix(),
            maxSupply: +maxSupply,
          },
          props.utils
        )
          .then((contract) => {
            props.setDeploymentSecurityToken(contract as ethers.BaseContract);
            props.setActiveStep(1);
          })
          .catch((error) => {
            setDeployment(false);
            console.log(error);
          });
      }
    }

    data = {
      title,
      code,
      description,
      mainCategory,
      startFundraising,
      endFundraising,
      maxSupply,
      rulesModifiable,
      pausable,
      voteToWithdraw,
    };
  });

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Contract parameter
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            helperText={errorTitle ? "Cannot be empty" : ""}
            error={errorTitle}
            onChange={(event) => {
              props.setData(data);
              setTitle(event.target.value);
            }}
            value={title}
            required
            id="title"
            name="title"
            placeholder="Block Us"
            label="Title"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            helperText={errorCode ? "Cannot be empty" : ""}
            error={errorCode}
            onChange={(event) => {
              props.setData(data);
              setCode(event.target.value);
            }}
            value={code}
            required
            id="code"
            name="code"
            placeholder="BU"
            label="Code"
            fullWidth
            variant="standard"
          />
        </Grid>

        <Grid item xs={12} style={{ zIndex: 999, overflow: "visible" }}>
          <ReactQuill
            placeholder="This is a description of my project"
            value={description}
            modules={modules}
            formats={formats}
            onChange={setDescription}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel required id="main-category">
              Main Category
            </InputLabel>
            <Select
              error={errorMainCatergoy}
              labelId="main-category"
              id="main-category"
              value={mainCategory}
              label="Main Category"
              onChange={(event) => {
                props.setData(data);
                setMainCategory(event.target.value as string);
              }}
            >
              {categories.map((category) => (
                <MenuItem value={category.name}>
                  {category.symbol} {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl disabled fullWidth>
            <InputLabel id="main-category">Sub Category</InputLabel>
            <Select
              labelId="main-category"
              id="main-category"
              value={mainCategory}
              label="Main Category"
              onChange={(event) => {
                props.setData(data);
                setMainCategory(event.target.value as string);
              }}
            ></Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputLabel id="start-fundraising">Start Date Fundraising</InputLabel>
          <FormControl fullWidth>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                value={startFundraising}
                onChange={(value) => {
                  props.setData(data);
                  setStartFundraising(value);
                }}
                minDate={dayjs().add(5, "day")}
              />
            </LocalizationProvider>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputLabel id="end-fundraising">End Date Fundraising</InputLabel>
          <FormControl fullWidth>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                value={endFundraising}
                onChange={(value) => {
                  props.setData(data);
                  setEndFundraising(value);
                }}
                minDate={dayjs().add(5, "day")}
              />
            </LocalizationProvider>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            helperText={errorMaxSupply ? "Must be between 1 - 10000000000" : ""}
            error={errorMaxSupply}
            value={maxSupply}
            onChange={(event) => {
              props.setData(data);
              setMaxSupply(event.target.value);
            }}
            fullWidth
            required
            id="maxSupply"
            label="Max supply"
            placeholder="100000"
          />
        </Grid>

        <Grid item xs={12} sm={6}></Grid>
        <Grid item xs={12} sm={4}>
          <FormControlLabel
            control={
              <Checkbox
                value={rulesModifiable}
                onChange={(event) => {
                  props.setData(data);
                  setRulesModifiable(event.target.checked);
                }}
                color="secondary"
                name="rulesModifiable"
              />
            }
            label="Rules modifiable after deployment of contract"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControlLabel
            control={
              <Checkbox
                value={pausable}
                onChange={(event) => {
                  props.setData(data);
                  setPausable(event.target.checked);
                }}
                color="secondary"
                name="pausable"
              />
            }
            label="Pausable Contract"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControlLabel
            control={
              <Checkbox
                onChange={(event) => {
                  props.setData(data);
                  setVoteToWithdraw(event.target.checked);
                }}
                color="secondary"
                name="voteToWithdraw"
                value={voteToWithdraw}
              />
            }
            label="Vote needed to withdraw funds"
          />
        </Grid>
        {deployment ? (
          <Box sx={{ width: "100%" }}>
            <LinearProgress />
          </Box>
        ) : (
          <></>
        )}
      </Grid>
    </React.Fragment>
  );
}
