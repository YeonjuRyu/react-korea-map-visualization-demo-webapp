import React, { useState, useEffect, useCallback } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { mainListItems } from './listItems';
import Orders from './Orders';
import Title from './Title';
import { csv } from 'd3-request';
import { PieChart, ColorBar } from 'skmvtest';
import { PieChartMap } from 'skmvtest/dist';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

let dummyData = [
  { regionCode: '11', level: 1 },
  { regionCode: '26', level: 1 },
  { regionCode: '27', level: 1 },
  { regionCode: '28', level: 1 },
  { regionCode: '29', level: 1 },
  { regionCode: '30', level: 1 },
  { regionCode: '31', level: 1 },
  { regionCode: '36', level: 1 },
  { regionCode: '41', level: 1 },
  { regionCode: '42', level: 1 },
  { regionCode: '43', level: 1 },
  { regionCode: '44', level: 1 },
  { regionCode: '45', level: 1 },
  { regionCode: '46', level: 1 },
  { regionCode: '47', level: 1 },
  { regionCode: '48', level: 1 },
  { regionCode: '50', level: 1 },
  { regionCode: '11110', level: 2 },
  { regionCode: '11140', level: 1 },
  { regionCode: '11500', level: 3 },
  { regionCode: '48740', level: 2 }
];

let dummyColors = [
  { color: '#adcaff', level: 1 },
  { color: '#6193f2', level: 2 },
  { color: '#2e79ff', level: 3 },
  { color: '#0048c9', level: 4 },
  { color: '#002973', level: 5 }
];

let dummyData1 = [
  { lon: 126.9784147, lat: 37.5666805 },
  { lon: 127.3784147, lat: 38.2666805 },
  { lon: 128.3784147, lat: 36.466805 },
  { lon: 129.16389, lat: 35.16083 },
  { lon: 126.5389, lat: 37.16083 },
  { lon: 127.17389, lat: 36.62083 },
  { lon: 127.16389, lat: 35.46083 }
];

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  menuButtonHidden: {
    display: 'none'
  },
  title: {
    flexGrow: 1
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9)
    }
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto'
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column'
  },
  fixedHeight: {
    height: 512
  }
}));

export default function PieChartPage() {
  const [month, setMonth] = useState(1);
  const [data, setData] = useState();
  const [colorBarStyle, setColorBarStyle] = useState(1);
  const [colors, setColors] = useState(dummyColors);
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  // useEffect(() => {
  //   csv(process.env.PUBLIC_URL + '/data_2019.csv', function(err, data) {
  //     let obj_m = {};
  //     ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'].map((month, monthNum) => {
  //       let data_region = [];
  //       data.map((region, index) => {
  //         let obj = {};
  //         obj['regionCode'] = region.region_code;
  //         let keyName = `Q1_1_${monthNum + 1}_visited_region_${month}`;
  //         obj['level'] = getlevel(region[keyName]);

  //         data_region.push(obj);
  //       });
  //       obj_m[monthNum + 1] = data_region;
  //     });
  //     setData(obj_m);
  //   });
  // }, []);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            한국 관광데이터 지도 시각화
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose)
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{mainListItems}</List>
        {/* <Divider />
                <List>{secondaryListItems}</List> */}
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />

        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={4} lg={9}>
              <Paper className={fixedHeightPaper}>
                <text>{`한국여행 중 방문지역 2019년 ${month}월`}</text>
                {/* <PieChartMap /> */}
              </Paper>
            </Grid>
            {/* Recent Deposits */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                <Title>데이터 옵션</Title>
                <div
                  style={{
                    margin: '10px 0px 20px 0px',
                    border: '1px solid black',
                    padding: '10px',
                    display: 'flex',
                    justifyContent: 'space-around'
                  }}
                >
                  <label for="month" style={{ fontSize: 12 }}>
                    달 선택:
                  </label>
                  <select
                    name="month"
                    id="month"
                    onChange={event => {
                      setMonth(event.target.value);
                    }}
                  >
                    {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                      <option value={month}>{month}</option>
                    ))}
                  </select>
                </div>
                <Title>시각화 변형</Title>
                <div style={{ margin: '10px 0px', border: '1px solid black', padding: '10px', display: 'flex', flexDirection: 'column' }}>
                  <p style={{ fontSize: 12 }}>색상변경</p>
                  <div>
                    {colors.map((item, index) => {
                      return (
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', margin: '5px 0px' }}>
                          <text style={{ fontSize: 12, marginRight: 12 }}>{`level ${item.scale}: `}</text>
                          <div style={{ height: 20, width: 40, margin: '0px 10px', backgroundColor: item.color }} />
                          <input
                            name="chk_info"
                            value={item.color}
                            style={{ width: 60 }}
                            onChangeEnd={t => {
                              let newC = colors;
                              newC[index] = { color: t.target.value, level: item.level };
                              setColors(newC);
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div style={{ margin: '10px 0px', border: '1px solid black', padding: '10px', display: 'flex', flexDirection: 'column' }}>
                  <label for="colorbar" style={{ fontSize: 12 }}>
                    Color bar 스타일 선택:
                  </label>
                  <select
                    name="colorbar"
                    id="colorbar"
                    onChange={event => {
                      setColorBarStyle(event.target.value);
                    }}
                  >
                    {['discrete', 'gradient'].map((item, index) => (
                      <option value={item}>{item}</option>
                    ))}
                  </select>
                </div>
              </Paper>
            </Grid>
            {/* Recent Orders */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Orders />
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}
