import React, { useState, useEffect } from "react";
import axios from "axios";
import "./profile.css";
import { useWeb3ModalAccount } from "@web3modal/ethers5/react";
import { Avatar, Card } from "@mui/material";
import { keyframes } from "@emotion/react";

const pulse = keyframes`
  0% {
    border-color: #ccc;
  }
  50% {
    border-color: #4CAF50;
  }
  100% {
    border-color: #ccc;
  }
`;

const CardProfile = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [active, setActive] = useState("display");

  const { isConnected } = useWeb3ModalAccount();

  async function getUserDetails() {
    console.log('inside this function1')

    const authToken =await localStorage.getItem("authToken");
    
    // if (authToken) {
      console.log('inside this function')
      try {
        const response = axios.get(
          "https://blxbe-production.up.railway.app/user/getUserDetails",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
          }
        ).then((e)=>{
          console.log(e.data);
            const { name, profileUrl, description } = e.data.data;
  
            setName(e.data.data.name);
            setImagePreviewUrl(profileUrl);
            setDescription(description);
          
        })

        // if (response.data.success) {
        //   const { name, profileUrl, description } = response.data.data;

        //   setName(name);
        //   setImagePreviewUrl(profileUrl);
        //   setDescription(description);
        // }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    // }
  }

  useEffect(() => {
    // if (isConnected) {
      getUserDetails();
    // }
  }, []);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await axios.post(
        "https://blxbe-production.up.railway.app/user/upload-image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const imageUrl = response.data.data;

      setImagePreviewUrl(imageUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Set the state variables independently
    if (name === "name") {
      setName(value);
    } else if (name === "description") {
      setDescription(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const authToken = localStorage.getItem("authToken");

      const response = await axios.patch(
        "https://blxbe-production.up.railway.app/user/updateProfile",
        {
          name,
          description,
          profileUrl: imagePreviewUrl,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.data.success) {
        console.log("Profile updated successfully");
        setActive("display");
      } else {
        console.error("Error updating profile:", response.data.message);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  return (
    <div>
      {isConnected ? (
        active === "edit" ? (
          <div className="card">
            <form onSubmit={handleSubmit}>
              <h2>Update Profile Details</h2>
              <label htmlFor="photo-upload" className="custom-file-upload fas">
                <div className="img-wrap">
                  <img
                    htmlFor="photo-upload"
                    src={imagePreviewUrl}
                    alt="profile"
                  />
                </div>
                <input
                  id="photo-upload"
                  type="file"
                  onChange={handleFileChange}
                />
              </label>
              <div className="field">
                <label htmlFor="name">Name:</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  onChange={handleInputChange}
                  maxLength="25"
                  value={name}
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className="field">
                <label htmlFor="description">Description:</label>
                <input
                  id="description"
                  type="text"
                  name="description"
                  onChange={handleInputChange}
                  maxLength="35"
                  value={description}
                  placeholder="Enter your description"
                  required
                />
              </div>
              <button type="submit" id="button" className="save">
                Save
              </button>
            </form>
          </div>
        ) : (
          <Card
            sx={{
              p: 3,
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mx: "auto",
              border: "4px solid",
              borderColor: "#ccc",
              animation: `${pulse} 2s infinite`, // Apply pulse animation
            }}
          >
            <h2>Profile Details </h2>
            <Avatar
              src={imagePreviewUrl}
              alt="profile"
              sx={{ width: 96, height: 96, mb: 2 }}
            />
            <div className="name">Name: {name}</div>
            <div className="description">Description: {description}</div>
            <button
              type="button"
              id="button"
              className="edit"
              onClick={() => setActive("edit")}
            >
              Edit Profile
            </button>
          </Card>
        )
      ) : (
        <div
          style={{ width: "90%", justifyContent: "center", marginTop: "30%" }}
        >
          <marquee behavior="scroll" direction="left">
            <h1> Connect your wallet</h1>
          </marquee>
        </div>
      )}
    </div>
  );
};

export default CardProfile;
