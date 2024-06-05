
import { BrowserRouter, Routes,Route } from "react-router-dom";
import Home from "./pages/Home";
import Bookshelf from "./pages/Bookshelf";


function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/books" element={<Bookshelf/>}/>
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
