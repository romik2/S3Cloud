import FileList from './route/FileList';
import HeaderMenu from './component/HeaderMenu';
import Home from './route/Home';
import Login from './route/Login';
import AlertText from './component/AlertText';
import { BrowserRouter as Router, Route , Routes } from "react-router-dom";
import { useState } from 'react';

function App() {
  const [alert, setAlert] = useState(false);
  const [text, setText] = useState('');
  const [severity, setSeverity] = useState('success');

  const sendNotfication = ({severity, text}) => {
    setSeverity(severity);
    setText(text);
    setAlert(true);
  }

  if (window.localStorage.getItem('connection')) {
    return (
      <>
        <AlertText open={alert} handleClose={() => setAlert(false)} textAlert={text} severity={severity}/>
        <Router>
          <HeaderMenu/>
          <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/files" element={<FileList sendNotfication={sendNotfication}/>} />
              <Route path="*" element={<Home/>} />
          </Routes>
        </Router>
      </>
    );
  }
  return (
    <>
      <Login />
    </>
  );
}

export default App;
