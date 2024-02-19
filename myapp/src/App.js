
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom'
import Homepage from './pages/Home/Homepage';
import Headers from './component/Headers/Headers';
import Register from './pages/Register/Register';
import Edit from './pages/Edit/Edit';
import Profile from './pages/Profile/Profile';





function App() {
  return (
    <div className="App">
      <Headers/>
      <Routes>
         <Route exact path='/' element={<Homepage/>}/>
         <Route exact path='/register' element={<Register/>}/>
         <Route exact path='/edit/:id' element={<Edit/>}/>
         <Route exact path='/userprofile/:id' element={<Profile/>}/>
      </Routes>
     
    </div>
  );
}

export default App;
