
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Products from "./components/Main/Body/Content/Products"
import Categories from "./components/Main/Body/Content/Categories"

function App() {
  return (
    <div className="App" onClick={(e) => {
      console.log(e);
      console.log(e.target)
    }}>
      <Header />
      <Routes>
        <Route path='/' element={<Main />}>
          <Route index path='/' element={<Categories />}></Route>
          <Route index path='/products' element={<Products />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
