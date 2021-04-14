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
import { BubbleMap } from 'skmvtest';

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
  {
    regionCode: 11,
    component: (
      <div
        style={{
          width: 60,
          height: 60,
          borderRadius: 35,
          border: '1px solid rgb(180,0,180)',
          backgroundColor: 'rgba(180,0,180,0.5)'
        }}
      />
    )
  },
  { lon: 127.9784147, lat: 37.5666808 },
  { lon: 127.3784145, lat: 38.266681 },
  { lon: 128.3784144, lat: 36.466805 },
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

export default function BubblePage() {
  const [month, setMonth] = useState(1);
  const [data, setData] = useState();
  const [hovered, setHovered] = useState();
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
          if (region.region_code && region.region_code.length === 2) {
            let obj = {};
            obj['regionCode'] = region.region_code;
            let keyName = `Q2_1_${monthNum + 1}_stay_days_${month}`;
            obj['name'] = region.Name;
            let r = Number(region[keyName]) * 5;
            obj['value'] = r / 5;
            data_region.push(obj);
            let style = { width: r, height: r, borderRadius: r / 2, backgroundColor: 'rgba(255,0,0,0.5)', border: '1px solid red' };
            let positionStyle = {};
            if (region.region_code == 41) {
              positionStyle['marginBottom'] = 30;
            } else if (region.region_code == 46) {
              positionStyle['marginTop'] = 30;
              positionStyle['marginLeft'] = 30;
            } else if (region.region_code == 36) {
              positionStyle['marginBottom'] = 20;
            } else if (region.region_code == 30) {
              positionStyle['marginTop'] = 30;
            } else if (region.region_code == 44) {
              positionStyle['marginRight'] = 30;
            }
            obj['component'] = (
              <div style={positionStyle}>
                {/* <div style={{ position: 'fixed', width: 100, top: '0%', left: '0%', transform: 'translate(-50%, -50%)' }}>
                   <text style={{ fontSize: 10 }}>{region.Name}</text>
                   <text style={{ fontSize: 10 }}>{Number(region[keyName])}</text>
                 </div> */}
                <div style={style} />
              </div>
            );
          }
        });
        obj_m[monthNum + 1] = data_region;
      });
      setData(obj_m);
    });
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
            <Grid item xs={12} md={4} lg={9}>
              <Paper className={fixedHeightPaper}>
                {
                  <div>
                    <BubbleMap
                      containerStyle={{ backgroundColor: 'rgb(174,209,239)' }}
                      backgroundColor={'rgb(240,240,240)'}
                      borderColor={'rgba(0,0,0,0.3)'}
                      onBubbleHovered={setHovered}
                      data={data ? data[`${month}`] : dummyData}
                      bubbleStyle={{
                        borderRadius: 100,
                        backgroundColor: 'rgba(255,0,0,0.5)',
                        border: '1px solid red'
                      }}
                    />
                    {hovered?.properties && (
                      <div
                        style={{
                          position: 'fixed',
                          top: hovered?.clientY,
                          left: hovered?.clientX,
                          backgroundColor: 'beige',
                          alignSelf: 'baseline',
                          height: 20,
                          borderRadius: 5
                        }}
                      >
                        {`${hovered.properties.name}, ${hovered.properties.value.toFixed(2)}일`}
                      </div>
                    )}
                  </div>
                }
                {/* {console.log(data['1'])} */}
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
