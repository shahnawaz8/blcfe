import React, { useEffect, useState } from "react";
import { Avatar, Box, Button, Typography } from "@mui/material";
import { useWeb3Modal, useWeb3ModalAccount } from "@web3modal/ethers5/react";
import { styled } from "@mui/system";
import axios from "axios";

const StyledNavbar = styled(Box)({
  padding: "10px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

const CenteredContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
});

const AnimatedButton = styled(Button)({
  transition: "background-color 0.3s ease",
});

const WalletText = styled(Typography)({
  color: "white",
  cursor: "pointer",
});

function Navbar() {
  const { open, close } = useWeb3Modal();
  const { address, isConnected } = useWeb3ModalAccount();
  const [isAddressClicked, setIsAddressClicked] = useState(false);

  useEffect(() => {
    
  }, [address, isConnected]);


  async function addUser() {
    console.log("userWalletAddress:", address);

    try {
      const response = await axios.post(
        "https://blxbe-production.up.railway.app/user/connectWithWallet",
        { userwalletaddress: address },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("response", response);

      if (response.data.success) {
        console.log("Address sent to backend successfully");
        const { authToken } = response.data.data;
        localStorage.setItem("authToken", authToken);
        console.log("authToken stored in localStorage:", authToken);
      } else {
        console.error("Failed to send address to backend:", response.data.message);
      }
    } catch (error) {
      console.error("Error sending address to backend:", error);
    }
  }

  const handleAddressClick = () => {
    isAddressClicked ? close() : open();
    setIsAddressClicked(!isAddressClicked);
    if (address && isConnected) {
      addUser();
    }
  };

  return (
    <StyledNavbar>
      <Typography variant="h6" component="div" color="white">
        3D Website
      </Typography>
      <CenteredContainer>
        <AnimatedButton onClick={handleAddressClick}>
          {isConnected ? (
            <Avatar
              onClick={handleAddressClick}
              sx={{ cursor: "pointer" }}
              alt="A"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5KtdejQqauqNImJ364OiyPAPuJq6EoWBLaA&usqp=CAU"
            />
          ) : (
            <WalletText onClick={handleAddressClick}>
              {" "}
              Connect Wallet{" "}
            </WalletText>
          )}
        </AnimatedButton>
      </CenteredContainer>
    </StyledNavbar>
  );
}

export default Navbar;

