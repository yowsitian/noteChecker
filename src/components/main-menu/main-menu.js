import React, { useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { HorizontalScrollbar } from "../horizontal-scrollbar";
import { useWindowDimensions } from "../window-dimensions";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  canvas: {
    backgroundColor: "#E5E5E5",
    minHeight: "100vh",
    minWidth: "100vw",
  },
  header: {
    textAlign: "center",
    paddingTop: 10,
    fontSize: 30,
    fontFamily: "Yusei Magic",
  },
  main: {
    display: "flex",
    flexDirection: "row",
    flex: 5,
  },
  left: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    backgroundColor: "#253A52",
    margin: "20px 10px 10px 20px",
  },
  right: {
    display: "flex",
    flexDirection: "column",
    flex: 3,
    backgroundColor: "#253A52",
    margin: "20px 10px 10px 20px",
  },
}));

const MainMenu = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isWidthSm = useMediaQuery(theme.breakpoints.down("sm"));
  const { height } = useWindowDimensions();
  const options = [
    {
      id: "note_list",
      name: "NOTE LIST",
    },
    {
      id: "checklist",
      name: "CHECKLIST",
    },
    {
      id: "in_progress",
      name: "IN PROGRESS",
    },
    {
      id: "calender",
      name: "CALENDER",
    },
  ];
  const [selectedOption, setSelectedOption] = useState({ id: "", name: "" });
  return (
    <React.Fragment>
      <CssBaseline />
      <div className={classes.canvas}>
        <header className={classes.header}>NOTE CHECKER</header>
        <HorizontalScrollbar
          options={options}
          defaultValue={options[0]}
          setParentState={setSelectedOption}
        />
        <div className={classes.main}>
          <Paper className={classes.left} style={{ minHeight: height - 200 }} />
          <Paper
            className={classes.right}
            style={{ minHeight: height - 200 }}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default MainMenu;
