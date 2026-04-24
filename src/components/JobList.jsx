import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import FadeInSection from "./FadeInSection";
import { experienceItems } from "../data/experienceData";

function TabPanel({ children, value, index, isHorizontal, ...other }) {
  const isVisible = value === index;
  const tabpanelId = isHorizontal ? `full-width-tabpanel-${index}` : "vertical-tabpanel";
  const ariaLabelledBy = isHorizontal ? `full-width-tab-${index}` : undefined;

  return (
    <div
      role="tabpanel"
      hidden={!isVisible}
      id={tabpanelId}
      aria-labelledby={ariaLabelledBy}
      {...other}
    >
      {isVisible && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
  isHorizontal: PropTypes.bool
};

function getA11yProps(index, isHorizontal) {
  return isHorizontal
    ? {
      id: `full-width-tab-${index}`,
      "aria-controls": `full-width-tabpanel-${index}`
    }
    : {
      id: `vertical-tab-${index}`
    };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: "theme.palette.background.paper",
    display: "flex",
    height: 300
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`
  }
}));

const JobList = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [isHorizontal, setIsHorizontal] = useState(window.innerWidth < 600);

  useEffect(() => {
    const handleResize = () => {
      setIsHorizontal(window.innerWidth < 600);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        orientation={isHorizontal ? "horizontal" : "vertical"}
        variant={isHorizontal ? "fullWidth" : "scrollable"}
        value={value}
        onChange={handleChange}
        className={classes.tabs}
      >
        {experienceItems.map((item, i) => (
          <Tab
            key={i}
            label={isHorizontal ? `0${i}.` : item.company}
            {...getA11yProps(i, isHorizontal)}
          />
        ))}
      </Tabs>
      {experienceItems.map((item, i) => (
        <TabPanel key={i} value={value} index={i} isHorizontal={isHorizontal}>
          <span className="joblist-job-title">
            {item.jobTitle}
          </span>
          {" "}
          <span className="joblist-job-company">{item.company}</span>
          <div className="joblist-duration">{item.duration}</div>
          <ul className="job-description">
            {item.desc.map((descItem, idx) => (
              <FadeInSection key={idx} delay={`${idx + 1}00ms`}>
                <li>{descItem}</li>
              </FadeInSection>
            ))}
          </ul>
        </TabPanel>
      ))}
    </div>
  );
};

export default JobList;
