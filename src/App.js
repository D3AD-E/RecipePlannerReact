
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage';
import MenuPage from './pages/menu/menu';
import AddRecipePage from './pages/recipes/add';
import EditRecipePage from './pages/recipes/edit';

function App() {
    return (
      <div className="App">
          <Header />
          <Switch>
                <Route exact path='/' component={HomePage} />
                <Route exact path='/recipes/add' component={AddRecipePage} />
                <Route exact path='/recipes/edit/:id' component={EditRecipePage} />
                <Route exact path='/menu' component={MenuPage} />
          </Switch>
    </div>
  );
}

export default App;
