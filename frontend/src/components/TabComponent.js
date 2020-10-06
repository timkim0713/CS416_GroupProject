import React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import "./TabComponent.css";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import sbu from "../images/sbu.png";
import fit from "../images/fit.png";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}
const themePrimary = createMuiTheme({
  palette: {
    primary: {
      main: "#ea7229",
    },
  },
});
const useStyles = makeStyles((theme) => ({
  root: {
    color: "black",
    width: 700,
  },
}));

export default function FullWidthTabs() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
      <MuiThemeProvider theme={themePrimary}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="Description Tab"
          >
            <Tab label="Stony Brook University" {...a11yProps(0)} />
            <Tab label="Fashion Institute of Technology" {...a11yProps(1)} />
            <Tab label="Others" {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel
            style={{ fontSize: "30px" }}
            value={value}
            index={0}
            dir={theme.direction}
          >
            <img style={{ width: "100px" }} src={sbu} />
            Description of SBU.
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <img style={{ width: "200px" }} src={fit} />
            Description of FIT.
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
            Description of other IGC universities.
          </TabPanel>
        </SwipeableViews>
      </MuiThemeProvider>
    </div>
  );
}
