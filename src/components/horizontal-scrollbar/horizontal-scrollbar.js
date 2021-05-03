import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import "./hidescrollbar.css";
import Button from "@material-ui/core/Button";
import { useWindowDimensions } from "../window-dimensions";

const useStyles = makeStyles((theme) => ({
  right: {
    display: "flex",
    flexDirection: "row",
    width: "100vw",
    justifyContent: "center",
  },
  scrollbar: {
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: 57,
    marginBottom: 10,
    maxWidth: "95vw",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
      alignItems: "flex-start",
      marginBottom: 40,
    },
  },
  gridList: {
    overflowX: "auto",
    scrollbarWidth: "none",
    display: "flex",
    flexDirection: "row",
    scrollBehavior: "smooth",
  },
  listItem: { paddingLeft: 5, paddingRight: 5 },
  singlebutton: {
    fontFamily: "Yusei Magic",
    border: "none",
    height: 50,
    color: "#FFFFFF",
    background: "#457B9D",
    textTransform: "none",
    fontSize: "h6",
    lineHeight: 1.5,
    [theme.breakpoints.down("xs")]: {
      height: 35,
      fontSize: "h6",
      whiteSpace: "nowrap",
      overflow: "hidden",
      display: "inline-block",
      minWidth: "15vw",
    },
    [theme.breakpoints.up("sm")]: {
      width: 200,
    },

    [theme.breakpoints.only("sm")]: {
      fontSize: 13,
    },
  },
  phonefocusdiv: {
    margin: "auto",
    position: "absolute",
    display: "flex",
    justifyContent: "center",
  },
  phonefocusbutton: {
    border: "none",
    height: 60,
    color: "#FFFFFF",
    backgroundColor: "#1D3557",
    textTransform: "none",
    opacity: 1.0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
  },
  focusedtitle: {
    marginLeft: 5,
    marginRight: 5,
    textAlign: "center",
    fontSize: "h6",
  },
}));

const HorizontalScrollbar = ({ options, defaultValue, setParentState }) => {
  const id = "listview";
  const classes = useStyles();
  const theme = useTheme();
  const isWidthSm = useMediaQuery(theme.breakpoints.down("xs"));

  const [selectedOption, setSelectedOption] = useState(defaultValue);
  const [hideFocusOption, setHideFocusOption] = useState(false);

  const { width } = useWindowDimensions();

  const scrollToView = (optionName) => {
    let element = document.getElementById(optionName);
    if (element !== null)
      element.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
  };

  const clickBack = (id) => {
    document.getElementById(id).scrollLeft -= 100;
    if (selectedOption !== options[0].name) {
      for (let i = 0; i < options.length; i++) {
        if (options[i].name === selectedOption) {
          setSelectedOption(options[i - 1].name);
          setParentState(options[i - 1]);
          scrollToView(options[i - 1].name);
          break;
        }
      }
    }
  };

  const clickNext = (id) => {
    document.getElementById(id).scrollLeft += 100;
    if (selectedOption !== options[options.length - 1].name) {
      for (let i = 0; i < options.length; i++) {
        if (options[i].name === selectedOption) {
          setSelectedOption(options[i + 1].name);
          setParentState(options[i + 1]);
          scrollToView(options[i + 1].name);
          break;
        }
      }
    }
  };

  const handleClick = (option) => {
    setSelectedOption(option.name);
    setParentState(option);

    if (option) scrollToView(option.name);
  };

  // mobile
  let timeout = null; //hide the focused div while scrolling
  const handleScroll = () => {
    setHideFocusOption(true);

    if (timeout) {
      //if there is already a timeout in process cancel it
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      timeout = null;
      setHideFocusOption(false);
    }, 400);

    if (hideFocusOption !== true) setHideFocusOption(true);
  };

  const checkOverflow = () => {
    let el = document.getElementById(id);
    if (el !== null) {
      return el.scrollWidth > el.clientWidth;
    }
    return false;
  };

  //render options of the horizontal list
  return (
    <div className={`hideScrollbar ${classes.scrollbar}`}>
      <div className={classes.right}>
        <IconButton
          color="primary"
          aria-label="back"
          onClick={() => clickBack(id)}
          size={!!isWidthSm ? "small" : "normal"}
        >
          <KeyboardArrowLeftIcon />
        </IconButton>
        {isWidthSm ? ( //phone view
          <>
            <List //horizontal list here
              id={id}
              className={`hideScrollbar ${classes.gridList}`}
              onScroll={() => handleScroll()}
            >
              {options.map((option) => (
                <>
                  <ListItem key={option.name} className={classes.listItem}>
                    <Button
                      variant="contained"
                      id={option.name}
                      value={option.id}
                      className={classes.singlebutton}
                      style={{
                        opacity:
                          hideFocusOption || !checkOverflow(id) ? 1.0 : 0.6,
                        backgroundColor:
                          option.name === selectedOption && !checkOverflow(id)
                            ? "#50D06C"
                            : "#217333",
                      }}
                      onClick={() => {
                        handleClick(option);
                      }}
                    >
                      {option.name}
                    </Button>
                  </ListItem>
                </>
              ))}
            </List>
            {checkOverflow(id) ? (
              <div //the dark blue div that covers the list
                className={classes.phonefocusdiv}
                style={{
                  left: width / 2,
                  right: width / 2,
                  zIndex: hideFocusOption ? -10 : 1,
                }}
              >
                <div className={classes.phonefocusbutton}>
                  <div
                    className={classes.focusedtitle}
                    style={{ width: width / 2.5 }}
                  >
                    {selectedOption}
                  </div>
                </div>
              </div>
            ) : null}
          </>
        ) : (
          //desktop view
          <List id={id} className={`hideScrollbar ${classes.gridList}`}>
            {options.map((option) => (
              <ListItem key={option.name} className={classes.listItem}>
                <Button
                  variant="contained"
                  id={option.name}
                  value={option.id}
                  className={classes.singlebutton}
                  style={{
                    backgroundColor:
                      option.name === selectedOption ? "#50D06C" : "#217333",
                  }}
                  onClick={() => handleClick(option)}
                >
                  {option.name}
                </Button>
              </ListItem>
            ))}
          </List>
        )}
        <IconButton
          color="primary"
          aria-label="back"
          onClick={() => {
            clickNext(id);
          }}
          size={!!isWidthSm ? "small" : "normal"}
        >
          <KeyboardArrowRightIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default HorizontalScrollbar;
