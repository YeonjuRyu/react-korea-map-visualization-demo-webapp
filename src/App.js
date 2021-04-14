import './App.css';
import Choropleth from './Choropleth';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import PieChartPage from './PieChartPage';
import BubblePage from './BubblePage';
import PointPage from './PointPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/bubble">
          <BubblePage />
        </Route>
        <Route path="/point">
          <PointPage />
        </Route>
        <Route path="/pieChart">
          <PieChartPage />
        </Route>
        <Route path="/">
          <Choropleth />
        </Route>
      </Switch>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

export default App;
