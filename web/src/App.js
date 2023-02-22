import FileList from './route/FileList';
import Menu from './component/Menu';
import Home from './route/Home';
import Login from './route/Login';
import { BrowserRouter as Router, Route , Routes } from "react-router-dom";

function App() {
  if (window.localStorage.getItem('connection')) {
    return (
      <>
        <Router>
          <Menu/>
          <Routes>
              <Route path="/" element={<Home/>} />
              {/* <Route path="/files/:prefix" element={<FileList/>} /> */}
              <Route path="/files" element={<FileList/>} />
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
