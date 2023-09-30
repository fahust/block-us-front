import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ContractForm from "./contract-form";
import ContractProxy from "./contract-proxy";
import ContractLink from "./contract-link";
import ContractSuccess from "./contract-success";
import { createProxyContract } from "../../helper/deploy";
import { BaseContract, ethers } from "ethers";
import { ContractToken } from "../../helper/contract-token";
import Utils from "../../helper/utils";
import { Container, Grid } from "@mui/material";
import { createProject } from "../../api/project-api";

const steps = [
  "Contract Parameter",
  "Proxy Contrat Deployment",
  "Linking Contracts",
  "Project Created",
];

function getStepContent(
  step: number,
  setData: any,
  data: any,
  error: boolean,
  utils: Utils,
  setDeploymentSecurityToken: React.Dispatch<
    React.SetStateAction<BaseContract | null | undefined>
  >,
  setActiveStep: React.Dispatch<React.SetStateAction<number>>
) {
  switch (step) {
    case 0:
      return (
        <ContractForm
          setData={setData}
          data={data}
          error={error}
          utils={utils}
          setDeploymentSecurityToken={setDeploymentSecurityToken}
          setActiveStep={setActiveStep}
        />
      );
    case 1:
      return <ContractProxy />;
    case 2:
      return <ContractLink />;
    case 3:
      return <ContractSuccess />;
    default:
      throw new Error("Unknown step");
  }
}

function getStepButton(step: number) {
  switch (step) {
    case 0:
      return "Deploy Main Contract";
    case 1:
      return "Deploy Proxy Contract";
    case 2:
      return "Link Contract";
    case 3:
      return "Done";
    default:
      throw new Error("Unknown step");
  }
}

export default function ContractCreation(props: any) {
  const utils: Utils = props.utils;
  const [activeStep, setActiveStep] = React.useState(0);
  const [data, setData] = React.useState({});
  const [deploymentSecurityToken, setDeploymentSecurityToken] =
    React.useState<ethers.BaseContract | null>();
  const [deploymentProxy, setDeploymentProxy] =
    React.useState<ethers.BaseContract | null>();
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    console.log("render");
    if (error) {
      setError(false);
    }
  });

  const handleNext = async (data: any) => {
    if (activeStep === 0) {
      setError(true);
    }
    if (activeStep === 1) {
      createProxyContract(utils)
        .then((contract) => {
          setDeploymentProxy(contract as ethers.BaseContract);
          setActiveStep(activeStep + 1);
        })
        .catch((error) => console.log(error));
    }
    if (activeStep === 2) {
      if (
        deploymentSecurityToken instanceof ethers.BaseContract &&
        deploymentProxy instanceof ethers.BaseContract
      ) {
        const contractToken = new ContractToken(
          utils,
          deploymentSecurityToken.target as string
        );
        contractToken
          .addProxyToContract(deploymentProxy.target as string)
          .then(async () => {
            createProject(
              data.title,
              data.description,
              data.mainCategory,
              "subCategory",
              deploymentSecurityToken as ethers.BaseContract,
              deploymentProxy as ethers.BaseContract,
              utils.accessJwt,
              await utils.provider.getNetwork(),
              {
                pausable: data.pausable,
                rulesModifiable: data.rulesModifiable,
                voteToWithdraw: data.voteToWithdraw,
                dayToWithdraw: 0,
                startFundraising: data.startFundraising.unix(),
                endFundraising: data.endFundraising.unix(),
                maxSupply: +data.maxSupply,
              },
              utils
            )
              .then(() => setActiveStep(activeStep + 1))
              .catch((error) => console.log(error));
          })
          .catch((error) => console.log(error));
      }
    }
  };

  // const handleBack = () => {
  //   setActiveStep(activeStep - 1);
  // };

  return (
    <React.Fragment>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Paper
            variant="outlined"
            sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
          >
            <Typography component="h1" variant="h4" align="center">
              Contract deployment
            </Typography>
            <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your trust.
                </Typography>
                <Typography variant="subtitle1">
                  Your projet is now deployed on blockchain.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(
                  activeStep,
                  setData,
                  data,
                  error,
                  utils,
                  setDeploymentSecurityToken,
                  setActiveStep
                )}
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  {/* {activeStep !== 0 && (
                <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                  Back
                </Button>
              )} */}
                  <Button
                    variant="contained"
                    onClick={() => handleNext(data)}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {getStepButton(activeStep)}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </Paper>
        </Grid>
      </Container>
    </React.Fragment>
  );
}
