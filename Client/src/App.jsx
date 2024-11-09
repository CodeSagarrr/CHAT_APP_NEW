import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Chat from './Components/Chat';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Profile from './Pages/Profile';
import AddMembers from './Pages/AddMembers';
function App() {

  return (
    <>
      <Router>
          <Routes>
            <Route exact path="/" element={<><Chat/></>}/>
            <Route exact path="/signup" element={<><Signup/></>}/>
            <Route exact path="/login" element={<><Login/></>}/>
            <Route exact path="/profile" element={<><Profile/></>}/>
            <Route exact path="/member" element={<><AddMembers/></>}/>
          </Routes>
          <ToastContainer
            position="top-center"
            autoClose={2000}
            transition={Slide}
            theme='dark'
            hideProgressBar={true}/>
      </Router>
    </>
  )
}

export default App
