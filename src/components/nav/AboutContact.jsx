import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import { capitalizeFirstLetter } from "../../common/capitzalize";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import { Label } from "@mui/icons-material";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function Contact({ openInfoNav }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Animation function
  // const animateElements = () => {
  //   // Animate Name input
  //   gsap.from(".name-input", {
  //     y: 100,
  //     // opacity: 0,
  //     duration: 1,
  //     stagger: 0.2,
  //     scrollTrigger: {
  //       trigger: ".name-input",
  //       start: "top 80%", // Adjust this value as needed
  //     },
  //   });

  //   // Animate Email input
  //   gsap.from(".email-input", {
  //     y: 100,
  //     // opacity: 0,
  //     duration: 1,
  //     stagger: 0.2,
  //     scrollTrigger: {
  //       trigger: ".email-input",
  //       start: "top 80%", // Adjust this value as needed
  //     },
  //   });

  //   // Animate Message textarea
  //   gsap.from(".message-textarea", {
  //     y: 100,
  //     // opacity: 0,
  //     duration: 1,
  //     scrollTrigger: {
  //       trigger: ".message-textarea",
  //       start: "top 80%", // Adjust this value as needed
  //     },
  //   });

  //   // Animate Send button
  //   gsap.from(".send-button", {
  //     y: 100,
  //     // opacity: 0,
  //     duration: 1,
  //     scrollTrigger: {
  //       trigger: ".send-button",
  //       start: "top 80%", // Adjust this value as needed
  //     },
  //   });
  // };

  // // Call the animateElements function when the component mounts
  // useEffect(() => {
  //   animateElements();
  // }, []);

  return (
    <>
      {/* <CancelIcon className="nav-contact-cancel-icon" /> */}

      <Box
        sx={{
          "& > :not(style)": { m: 1 },
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ marginTop: "1em", fontWeight: "bold", fontSize: "2em" }}>
          Get in touch:
        </div>

        <FormControl
          variant="standard"
          style={{ marginTop: "2em" }}
          className="name-input"
        >
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
          className="email-input"
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
          className="send-button"
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
              color: "#2d5237",
              border: "1px solid rgba(0, 0, 0, 0.4)",
              //   borderColor: "blue",
              //   color: "rgb(151, 20, 20)",
            }}
            onClick={() => {
              // if (!name || !email || !message) {
              //   return;
              // } else {
              setLoading(true);
              setTimeout(() => setLoading(false), 1000);
              // }
            }}
          >
            Send
          </LoadingButton>
        </span>
        <div style={{ marginTop: "4em" }}>
          Feel free to contact us at any time for any question:<br></br>
          <br></br>
          <span className="contact-nav-phones-wrapper">
            <PhoneIcon fontSize="small" /> +972-54-218-5021
          </span>
          <span className="contact-nav-phones-wrapper">
            <PhoneIcon fontSize="small" />
            +1(302)-219-4023
          </span>
          <span className="contact-nav-phones-wrapper">
            <EmailIcon />: sales@in3d-tech.com
          </span>
          <br></br> We also invite you to meet us at 1 Shefa Tal street, Tel
          Aviv.
        </div>
      </Box>
    </>
  );
}
