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
import { ChoroplethMap, ColorBar } from 'skmvtest';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        ReactKoeraMapVisualizationDemoWebapp
      </Link>
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

let dummyColorsGreen = [
  { color: 'rgb(223,235,204)', level: 1 },
  { color: 'rgb(180,217,205)', level: 2 },
  { color: 'rgb(137,196,206)', level: 3 },
  { color: 'rgb(101,178,207)', level: 4 },
  { color: 'rgb(85,147,188)', level: 5 },
  { color: 'rgb(68,116,167)', level: 6 },
  { color: 'rgb(52,85,148)', level: 7 },
  { color: 'rgb(36,55,129)', level: 8 },
  { color: 'rgb(25,35,103)', level: 9 },
  { color: 'rgb(17,24,72)', level: 10 }
];
let dummyColorsBlue = [
  { color: '#e1f5fe', level: 1 },
  { color: '#b3e5fc', level: 2 },
  { color: '#81d4fa', level: 3 },
  { color: '#4fc3f7', level: 4 },
  { color: '#29b6f6', level: 5 },
  { color: '#03a9f4', level: 6 },
  { color: '#039be5', level: 7 },
  { color: '#0288d1', level: 8 },
  { color: '#0277bd', level: 9 },
  { color: '#01579b', level: 10 }
];
let dummyColorsRed = [
  { color: 'rgb(252,248,217)', level: 1 },
  { color: 'rgb(249,227,125)', level: 2 },
  { color: 'rgb(249,199,110)', level: 3 },
  { color: 'rgb(231,170,95)', level: 4 },
  { color: 'rgb(224,144,81)', level: 5 },
  { color: 'rgb(217,117,67)', level: 6 },
  { color: 'rgb(211,92,55)', level: 7 },
  { color: 'rgb(163,78,50)', level: 8 },
  { color: 'rgb(113,64,48)', level: 9 },
  { color: 'rgb(72,53,49)', level: 10 }
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

export default function ChoroplethPage() {
  const [month, setMonth] = useState(12);
  const [data, setData] = useState();
  const [colorBarStyle, setColorBarStyle] = useState('discrete');
  const [colors, setColors] = useState(dummyColorsRed);
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  useEffect(() => {
    csv(process.env.PUBLIC_URL + '/data_2019.csv', function(err, data) {
      let obj_m = {};
      ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'].map((month, monthNum) => {
        let data_region = [];
        data.map((region, index) => {
          let obj = {};
          obj['regionCode'] = region.region_code;
          let keyName = `Q1_1_${monthNum + 1}_visited_region_${month}`;
          obj['level'] = getlevel(region[keyName]);

          data_region.push(obj);
        });
        obj_m[monthNum + 1] = data_region;
      });
      setData(obj_m);
    });
  }, []);

  const getlevel = useCallback(data => {
    if (data >= 800) {
      return 10;
    }
    if (data >= 700) {
      return 9;
    }
    if (data >= 600) {
      return 8;
    }
    if (data >= 500) {
      return 7;
    }
    if (data > 400) {
      return 6;
    }
    if (data > 300) {
      return 5;
    }
    if (data >= 200) {
      return 4;
    }
    if (data >= 100) {
      return 3;
    }
    if (data >= 20) {
      return 2;
    }
    if (data < 20) {
      return 1;
    }
  }, []);

  // useEffect(() => {
  //   for (let i = 1; i <= 12; i++) {
  //     setTimeout(() => {
  //       setMonth(i);
  //     }, 3000);
  //   }
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
            <Grid item xs={12} md={4} lg={8}>
              <Paper className={fixedHeightPaper} style={{ alignContent: 'center', alignItems: 'center' }}>
                <text style={{ textAlign: 'center', fontSize: 20 }}>{`한국여행 중 방문지역 2019년 ${month}월`}</text>
                <div style={{ height: '100%' }}>
                  <ColorBar
                    data={colors}
                    theme={colorBarStyle}
                    colorBarContainerStyle={{ position: 'relative', left: '20%', top: 40, height: '30px' }}
                    colorBarContentsStyle={{ border: '1px solid black', height: 20 }}
                    gridGap={0}
                    textStyle={{ fontSize: 8 }}
                  />
                  {data && data['1'] && (
                    <ChoroplethMap
                      data={data[month.toString()]}
                      colors={colors}
                      styledOnHover={{ backgroundColor: 'red' }}
                      containerStyle={{ width: 500, height: 450, backgroundColor: 'white' }}
                      isAdminLevelChanged={false}
                      onZoomScaleChange={x => console.log('onZoomScaleChange', x)}
                      onRegionHover={x => console.log('onRegionHover', x)}
                    />
                  )}
                </div>
                {/* <Scatter data={dummyData1} /> */}
              </Paper>
            </Grid>
            {/* Recent Deposits */}
            <Grid item xs={12} md={4} lg={4}>
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
                          <text style={{ fontSize: 12, marginRight: 12 }}>{`level ${item.level}: `}</text>
                          <div style={{ height: 20, width: 40, margin: '0px 10px', backgroundColor: item.color }} />
                          <input
                            name="chk_info"
                            value={item.color}
                            style={{ width: 130 }}
                            onChange={t => {
                              colors[index] = { color: t.target.value, level: item.level };
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
