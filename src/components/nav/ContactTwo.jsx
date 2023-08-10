import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import { capitalizeFirstLetter } from "../../common/capitzalize";
import CloseIcon from "@mui/icons-material/Close";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { TroubleshootOutlined } from "@mui/icons-material";

export function ContactTwo() {
  const [contact, setContact] = useState(false);
  const [coverVisible, setCoverVisible] = useState(true);

  const handleCover = () => {
    setCoverVisible(false);
    setTimeout(() => setCoverVisible(true), 600);
  };

  const handleReveal = (bool) => {
    setTimeout(() => setContact(bool), 500);
  };

  return (
    <div
      style={{
        borderTop: "1px solid rgb(0,0,0,0.6)",
        width: "100vw",
        display: "flex",
        height: "90%",
      }}
    >
      <div style={{ flex: 1, padding: "30px" }}>
        <div style={{ height: "40%" }}>
          <div className="contact-title">Contact us</div>
          <div className="contact-subtitle">with any inquiries</div>
        </div>
        <span className="a-text">Leave us a message:</span>

        <div
          style={{
            width: "13em",
            position: "relative",
            left: "4em",
          }}
        >
          <button
            className="get-in-touch-btn"
            onClick={() => {
              if (!contact) handleCover();
              handleReveal(true);
            }}
          >
            Get in touch
          </button>
          {/* {contact ? (
            <ContactForm setContact={setContact} />
          ) : (
            <button
              className="get-in-touch-btn"
              onClick={() => setContact(true)}
            >
              Get in touch
            </button>
          )} */}
        </div>
        {/* <TestButton />
        <button className="my-button">Hover me!</button> */}
      </div>

      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "flex-start",
          marginTop: "3em",
        }}
      >
        <div className={`cover ${!coverVisible ? "" : "slide-away"}`}></div>

        {contact ? (
          <ContactForm
            setContact={setContact}
            handleCover={handleCover}
            handleReveal={handleReveal}
          />
        ) : (
          <ContactDetails />
        )}
      </div>
    </div>
  );
}

const ContactDetails = () => {
  return (
    <div style={{ marginTop: "4em", fontSize: "1.5em" }}>
      Feel free to contact us at any time with any questions:<br></br>
      <br></br>
      <span className="contact-nav-phones-wrapper">
        <PhoneIcon fontSize="small" />{" "}
        <span className="small-space">+972-54-218-5021</span>
      </span>
      <span className="contact-nav-phones-wrapper">
        <PhoneIcon fontSize="small" />
        <span className="small-space">+1(302)-219-4023</span>
      </span>
      <span className="contact-nav-phones-wrapper">
        <EmailIcon /> <span className="small-space">sales@in3d-tech.com</span>
      </span>
      <br></br> We also invite you to meet us at 1 Shefa Tal street, Tel Aviv.
    </div>
  );
};

const ContactForm = ({ setContact, handleCover, handleReveal }) => {
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");

  return (
    <div>
      <div>
        <CloseIcon
          className="nav-close-icon"
          sx={{
            // color: "black",
            fontSize: 30,
            position: "relative",
            right: "-96%",
            bottom: "1em",
            zIndex: 1,
          }}
          onClick={() => {
            handleCover();

            handleReveal(false);
          }}
        />
      </div>

      <div className="hhh">
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "40ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="standard-basic"
            label="First Name"
            variant="standard"
            value={capitalizeFirstLetter(firstName)}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            id="standard-basic"
            label="Email"
            variant="standard"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            id="standard-basic"
            label="Last Name"
            variant="standard"
            value={capitalizeFirstLetter(lastName)}
            onChange={(e) => setLastName(e.target.value)}
          />
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">
              Subject
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              label="Subject"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Project Inquiries</MenuItem>
              <MenuItem value={20}>Marketing</MenuItem>
              <MenuItem value={30}>Careers</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <TextField
          id="outlined-helperText"
          label=""
          placeholder="Message"
          // defaultValue=""
          helperText="Leave us a message and we'll get back to you as soon as possible!"
          FormHelperTextProps={{
            style: {
              fontSize: "1.2em",
            },
          }}
          InputProps={{
            style: {
              height: "100px",
              overflowY: "hidden",
              wordWrap: "break-word",
              padding: "10px",
              display: "flex",
              alignItems: "flex-start",
              marginTop: "2em",
              width: "50em",
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
              marginTop: "1.5em",
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
        {/* <div style={{ width: "10em" }}>
          <button
            onClick={() => setContact(false)}
            className="get-in-touch-btn"
          >
            Get in touch
          </button>
        </div> */}
      </div>
    </div>
  );
};

const ImageAni = () => {
  return (
    <div className="box">
      <div className="face face1">
        <span className="img-span"></span>
        <span className="img-span"></span>
        <span className="img-span"></span>
        <span className="img-span"></span>
      </div>
      <div className="face face2">
        <span className="img-span"></span>
        <span className="img-span"></span>
        <span className="img-span"></span>
        <span className="img-span"></span>
      </div>
    </div>
  );
};
