import * as React from "react";

import Card from "@mui/material/Card";

import IconButton from "@mui/material/IconButton";

import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

export default function Controls(props) {
  return (
    <>
      <Card style={{ marginTop: "50px" }} className="hidecont">
        <IconButton variant="contained" aria-label="up" onClick={props.up}>
          <KeyboardArrowUpIcon />
        </IconButton>
      </Card>
      <Card sx={{ display: "flex" }} id="hidecont2">
        <IconButton variant="contained" aria-label="left" onClick={props.left}>
          <ArrowBackIosIcon />
        </IconButton>

        <IconButton variant="contained" aria-label="left">
          <SportsEsportsIcon />
        </IconButton>

        <IconButton
          variant="contained"
          aria-label="right"
          onClick={props.right}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </Card>
      <Card className="hidecont">
        <IconButton variant="contained" aria-label="down" onClick={props.down}>
          <KeyboardArrowDownIcon />
        </IconButton>
      </Card>
    </>
  );
}
