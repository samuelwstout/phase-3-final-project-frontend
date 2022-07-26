import {BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Folders from './containers/Folders'
import Folder from './containers/Folder'
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/folders" element={<Folders />} />
        <Route path="/folders/:id/todos" element={<Folder />} />
      </Routes>
    </Router>
  );
}

export default App;
