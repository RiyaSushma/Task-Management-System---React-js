import './App.css';
import Home from './Components/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import { StateProvider } from './state/context';

function App() {
  return (
    <StateProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route exact path="/create-user" element={<SignUp/>}></Route>
          <Route exact path="/home" element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
    </StateProvider>
  );
}

export default App;
