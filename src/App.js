import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/home/Home';

function App() {
  return (
    <>
       <BrowserRouter>
        <Routes>
            <Route element={<Layout/>}>
              <Route path="/" element={<Home/>} />
            </Route>
        </Routes>
      </BrowserRouter>
   </>
  );
}

export default App;
