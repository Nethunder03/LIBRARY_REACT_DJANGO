import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Register from './components/Register';
import UserForm from './components/UserForm';
import UserList from './components/UserList';
import MainLib from './server/MainLib';
import HomeLib from './client/HomeLib';
import Books from './components/Books';
import Loans from './components/Loans';
import Users from './components/Users';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/main' exact element={<MainLib/>}/>
          <Route path='/homelib' exact element={<HomeLib/>}/>
          <Route path='/main/books/' exact element={<Books/>}/>
          <Route path='/main/loans/' exact element={<Loans/>}/>
          <Route path='/main/users/' exact element={<Users/>}/>
          <Route path='/form' exact element={<UserForm/>}/>
          <Route path='/userlist' exact element={<UserList/>}/>
          <Route path='/' exact element={<Register/>}/>

        </Routes>
      </Router>
    </div>
  );
}

export default App;
