import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import FadeInSection from "./FadeInSection";

const isHorizontal = window.innerWidth < 600;

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  if (isHorizontal) {
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
  } else {
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel`}
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
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  if (isHorizontal) {
    return {
      id: `full-width-tab-${index}`,
      "aria-controls": `full-width-tabpanel-${index}`
    };
  } else {
    return {
      id: `vertical-tab-${index}`
    };
  }
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
  const [value, setValue] = React.useState(0);

  const experienceItems = {
    HP: {
      jobTitle: "Product Test Automation Engineer Co-op @",
      duration: "MAY 2023 - DEC 2023",
      desc: [
        "Conducted comprehensive regression testing for HP Voice Products' OS builds, effectively identifying, documenting, and resolving software irregularities, which improved product quality.",
        "Implemented test scripts using Selenium, Jenkins, and Robot Framework, reducing testing duration by 45%.",
        "Resolved over 100 software issues, boosting reliability by 25%, and performance by 20%.",
        "Collaborated with the development team to integrate test automation into the CI/CD pipeline, ensuring seamless and timely code deployments."
      ]
    },
    IBM: {
      jobTitle: "Systems Engineer @",
      duration: "OCT 2019 - AUG 2022",
      desc: [
        "Developed custom security monitoring tools using Python and Java, enhancing the efficiency of SAP security processes and reducing the need for manual intervention by 35%.",
        "Formulated and enforced security policies and procedures, enhancing overall system security and user access controls, resulting in a 40% reduction in security incidents.",
        "Optimized Oracle SQL queries and database schemas to improve data retrieval efficiency by 20%.",
      ]
    },
    "IBM ": {
      jobTitle: "Software Engineer Intern @",
      duration: "MAY 2021 - SEPT 2021",
      desc: [
        "Streamlined end-to-end service support processes using RPA, achieving a 40% workload reduction.",
        "Automated internal website functions with Java and Selenium, reducing manual testing efforts by 50%."
      ]
    },
    Subex: {
      jobTitle: "Firmware Engineer @",
      duration: "SEPT 2019 - APR 2020",
      desc: [
        "Implemented a Bus-Tracking System with IoT Components such as a NodeMCU and a GPS Tracker.",
        "Designed the application using 'Blynk' using pre-defined widgets in the app such as a map for relaying the location along with value displays for latitude and longitude of the position."
      ]
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        orientation={!isHorizontal ? "vertical" : null}
        variant={isHorizontal ? "fullWidth" : "scrollable"}
        value={value}
        onChange={handleChange}
        className={classes.tabs}
      >
        {Object.keys(experienceItems).map((key, i) => (
          <Tab label={isHorizontal ? `0${i}.` : key} {...a11yProps(i)} />
        ))}
      </Tabs>
      {Object.keys(experienceItems).map((key, i) => (
        <TabPanel value={value} index={i}>
          <span className="joblist-job-title">
            {experienceItems[key]["jobTitle"] + " "}
          </span>
          <span className="joblist-job-company">{key}</span>
          <div className="joblist-duration">
            {experienceItems[key]["duration"]}
          </div>
          <ul className="job-description">
            {experienceItems[key]["desc"].map(function (descItem, i) {
              return (
                <FadeInSection delay={`${i + 1}00ms`}>
                  <li key={i}>{descItem}</li>
                </FadeInSection>
              );
            })}
          </ul>
        </TabPanel>
      ))}
    </div>
  );
};

export default JobList;
