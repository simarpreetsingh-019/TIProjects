import React, { useState, useEffect } from "react";
import { LogInWithAnonAadhaar, useAnonAadhaar } from "@anon-aadhaar/react";
import Web3 from "web3";
import { useRouter } from "next/router";
import GitHubIcon from "@mui/icons-material/GitHub";
import {
  Button,
  Container,
  Typography,
  AppBar,
  Toolbar,
  CssBaseline,
  Box,
  ThemeProvider,
  createTheme,
} from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#00a3ff",
    },
    secondary: {
      main: "#FFC107",
    },
    background: {
      default: "rgba(0, 0, 0, 0.9)",
      paper: "rgba(18, 18, 18, 0.9)",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 16,
    h3: {
      fontWeight: 700,
      fontSize: "3rem",
    },
    h5: {
      fontSize: "1.8rem",
    },
    h6: {
      fontWeight: 500,
      fontSize: "1.3rem",
    },
    body1: {
      fontSize: "1.1rem",
    },
    body2: {
      fontSize: "1rem",
    },
  },
});

export default function AadhaarVerification({ onVerified }) {
  const [anonAadhaar] = useAnonAadhaar();
  const [account, setAccount] = useState(null);
  const router = useRouter();

  const connectToMetaMask = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
        const web3 = new Web3(window.ethereum);
        console.log("Connected to MetaMask with account:", accounts[0]);
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
      }
    } else {
      console.error("MetaMask is not installed");
    }
  };

  const skipVerification = () => {
    // Set status to "logged-in"
    localStorage.setItem("status", "logged-in");
    // Navigate to home.js
    router.push({
      pathname: "/home",
      query: { status: "logged-in" },
    });
  };

  useEffect(() => {
    if (anonAadhaar.status === "logged-in") {
      onVerified();
    }
  }, [anonAadhaar, onVerified]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        display="flex"
        flexDirection="column"
        minHeight="100vh"
        bgcolor="background.default"
        color="text.primary"
      >
        <AppBar position="static" color="transparent" elevation={0}>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Aadhaar Verification
            </Typography>
          </Toolbar>
        </AppBar>
        <Container maxWidth="md" sx={{ flex: 1, my: 6 }}>
          <Box textAlign="center" mb={6}>
            <Typography
              variant="h3"
              gutterBottom
              sx={{ color: "primary.main" }}
            >
              briXchange
            </Typography>
            <Typography variant="h5" sx={{ color: "secondary.main", mb: 5 }}>
              Your Gateway to Smart Real Estate Deals
            </Typography>
            <Typography variant="h6" color="textSecondary">
              Please connect your MetaMask wallet and verify your Aadhaar
              details.
            </Typography>
          </Box>
          <Box textAlign="center">
            {!account ? (
              <Box>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={connectToMetaMask}
                  sx={{
                    py: 2,
                    px: 6,
                    fontSize: "1.4rem",
                    borderRadius: "30px",
                    boxShadow: "0 4px 6px rgba(76, 175, 80, 0.25)",
                    "&:hover": {
                      backgroundColor: "primary.dark",
                      boxShadow: "0 6px 8px rgba(76, 175, 80, 0.4)",
                    },
                    mb: 3,
                  }}
                >
                  Connect MetaMask
                </Button>
                <br />
                <Button
                  variant="outlined"
                  color="secondary"
                  size="large"
                  onClick={skipVerification}
                  sx={{
                    py: 2,
                    px: 6,
                    fontSize: "1.4rem",
                    borderRadius: "30px",
                    boxShadow: "0 4px 6px rgba(255, 193, 7, 0.25)",
                    "&:hover": {
                      backgroundColor: "rgba(255, 193, 7, 0.1)",
                      boxShadow: "0 6px 8px rgba(255, 193, 7, 0.4)",
                    },
                  }}
                >
                  Skip Verification (For Testers)
                </Button>
              </Box>
            ) : (
              <Box>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ color: "primary.light" }}
                >
                  Connected with MetaMask account:
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ wordBreak: "break-all", mb: 4 }}
                >
                  {account}
                </Typography>
                <LogInWithAnonAadhaar
                  nullifierSeed={1234}
                  fieldsToReveal={["revealAgeAbove18", "revealPinCode"]}
                />
                <Typography variant="h6" color="textSecondary" sx={{ mt: 3 }}>
                  {anonAadhaar?.status}
                </Typography>
              </Box>
            )}
          </Box>
        </Container>
        <Box
          component="footer"
          py={4}
          textAlign="center"
          bgcolor="background.paper"
          mt="auto"
        >
          <Typography variant="body1" sx={{ fontSize: "1.2rem" }}>
            © {new Date().getFullYear()} briXchange. All rights reserved.
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<GitHubIcon />}
            href="https://github.com/ahkharsha/briXchange"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              mt: 2,
              borderColor: "primary.main",
              color: "primary.main",
              "&:hover": {
                backgroundColor: "rgba(0,163,255,0.1)",
              },
            }}
          >
            briXchange - GitHub
          </Button>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
