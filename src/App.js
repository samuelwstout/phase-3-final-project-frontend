import {BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Folders from './pages/Folders'
import Folder from './pages/Folder'

const App = () => {

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
