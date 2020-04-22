import React, { useState } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { red } from "@material-ui/core/colors";
interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

function a11yProps(index: any) {
  return {
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));

type Props = {
  tabButtonArr: JSX.Element[];
  tabContentArr: JSX.Element[];
};

const TabContent: React.FC<Props> = (Props) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const buttonList = () => (
    <div>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="on"
        indicatorColor="secondary"
        textColor="secondary"
        aria-label="scrollable force tabs example"
      >
        {Props.tabButtonArr.map((btn) => (
          <Tab icon={btn} {...a11yProps(Props.tabButtonArr.indexOf(btn))} />
        ))}
      </Tabs>
    </div>
  );
  const contentList = () => (
    <div>
      {Props.tabContentArr.map((contnt) => {
        return (
          <div>
            <TabPanel value={value} index={Props.tabContentArr.indexOf(contnt)}>
              {contnt}
            </TabPanel>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default" elevation={0}>
        {buttonList()}
      </AppBar>
      {contentList()}
    </div>
  );
};
export default TabContent;