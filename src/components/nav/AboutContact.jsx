import { useState } from "react";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import CommentIcon from "@mui/icons-material/Comment";
import { capitalizeFirstLetter } from "../../common/capitzalize";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import SendIcon from "@mui/icons-material/Send";

export function About({ openInfoNav }) {
  return (
    <>
      <p>
        in3D Technologies Ltd is a software development company that specialize
        in 3D development.<br></br>
        <br></br> We at in3D have extensive experience in developing and
        adapting the right solution to the clients needs focusing on the world
        of XR – Extended Reality, among Virtual Reality – VR, Augmented Reality
        – AR and Mixed Reality – MR.<br></br>
        <br></br> We specialize in realization through verity ways, such as: 360
        Virtual tours, 3D modeling & rendering photorealistic images, videos &
        flythrough , virtual reality, augmented reality and more.<br></br>
        <br></br> Our Operations Department manage large projects with medium to
        large cooperations, military units, city halls and governments.<br></br>
        <br></br> We define our vision by constantly seeking for innovational
        ways to make various products accessible in new levels that simulates
        reality.<br></br>
        <br></br> in3D works according to international quality policies in
        development and production, information security and privacy security –
        ISO9001, ISO27001, ISO27701. The company undertakes and complies with
        legal and privacy requirements, engraves on its banner a high standard
        of service assembly, while maintaining accuracy, confidentiality and
        information security.
      </p>
    </>
  );
}

export function Contact({ openInfoNav }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  return (
    <>
      <Box
        sx={{
          "& > :not(style)": { m: 1 },
          display: "flex",
          flexDirection: "column",
          width: "70%",
        }}
      >
        <FormControl variant="standard" style={{ marginTop: "5em" }}>
          <InputLabel htmlFor="input-with-icon-adornment">Name</InputLabel>
          <Input
            id="input-with-icon-adornment"
            startAdornment={
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            }
            value={capitalizeFirstLetter(name)}
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>
        <TextField
          id="input-with-icon-textfield"
          label="Email"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AlternateEmailIcon />
              </InputAdornment>
            ),
          }}
          value={email}
          variant="standard"
          onChange={(e) => setEmail(e.target.value)}
        />
        {/* <Box sx={{ display: "flex", alignItems: "flex-end" }}>
        <CommentIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
        <TextField id="input-with-sx" label="MEssage" variant="standard" />
      </Box> */}
        <Box>
          <TextField
            id="outlined-helperText"
            label=""
            placeholder="Leave us a comment or question!"
            // defaultValue=""
            helperText="Leave us a comment or question and we'll get back to you as soon as possible!"
            InputProps={{
              style: {
                height: "200px",
                overflowY: "hidden",
                wordWrap: "break-word",
                padding: "3px",
                display: "flex",
                alignItems: "flex-start",
                marginTop: "2em",
              },
              //   startAdornment: (
              //     <InputAdornment position="end" style={{ marginTop: "1em" }}>
              //       <CommentIcon />
              //     </InputAdornment>
              //   ),
            }}
            multiline
            value={capitalizeFirstLetter(message)}
            onChange={(e) => setMessage(e.target.value)}
          />
        </Box>
        <span
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <LoadingButton
            loading={loading}
            loadingPosition="end"
            endIcon={<SendIcon />}
            variant="outlined"
            sx={{
              height: "3em",
              width: "9em",
              justifyContent: "space-evenly",
              //   borderColor: "blue",
              //   color: "rgb(151, 20, 20)",
            }}
            onClick={() => {
              setLoading(true);
              setTimeout(() => setLoading(false), 1000);
            }}
          >
            Send
          </LoadingButton>
        </span>
        <div style={{ marginTop: "4em" }}>
          Feel free to contact us at any time for any question:<br></br>{" "}
          +972-54-218-5021 or +1(302)-219-4023 or by email: sales@in3d-tech.com
          <br></br> We also invite you to meet us at 1 Shefa Tal street, Tel
          Aviv.
        </div>
      </Box>
    </>
  );
}
