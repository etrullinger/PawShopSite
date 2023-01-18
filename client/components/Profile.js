import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { editUserAsync, fetchSingleUserAsync, selectSingleUser } from '../features/singleUserSlice';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const Profile = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("")

  const { userId } = useParams();
  const user = useSelector(selectSingleUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchSingleUserAsync(userId));
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editUserAsync({ firstName, lastName, email, userId}));
    navigate("/account")
  }

  return(
    <div>
      <Button
        component={Link}
        to={`/account`}
        variant="outlined"
        size="small"
        sx={{ textTransform: "none" }}
      >
        Back to Profile
      </Button>
      <div>
        <h1 align="center">Edit Profile</h1>
      </div>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "ch" },
        }}
        noValidate
        autoComplete="off"
        align="center"
        onSubmit={handleSubmit}
      >
        <div>
          <TextField
          focused
            required
            id="outlined-first-name"
            label="First Name"
            placeholder={user.firstName}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <br />
          <TextField
          focused
          required
          id="outlined-last-name"
            label="Last Name"
            value={lastName}
            placeholder={user.lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <br />
          <TextField
          focused
          required
            label="Email"
            id="outlined-email"
            value={email}
            placeholder={user.email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <Button variant="contained" type="submit">
            Update Profile
          </Button>
        </div>
      </Box>
    </div>
  )

}

export default Profile;