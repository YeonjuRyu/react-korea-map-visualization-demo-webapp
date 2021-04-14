import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

export const mainListItems = (
  <div>
    <Link to={'/'}>
      <ListItem button>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="월별 방문 지역" />
      </ListItem>
    </Link>
    <Link to={'/pieChart'}>
      <ListItem button>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="국적별 방문 지역" />
      </ListItem>
    </Link>
    <Link to={'/bubble'}>
      <ListItem button>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="시도별 평균 체제기간" />
      </ListItem>
    </Link>
    <Link to={'/point'}>
      <ListItem button>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="2019년 방문지" />
      </ListItem>
    </Link>
  </div>
);
