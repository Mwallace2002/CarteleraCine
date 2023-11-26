import NavBar from "./components/NavBar";
import Favoritos from "./components/Favoritos";
import Formulario from "./components/Formulario";
import Info from "./components/Info";
import Movie from "./components/Movie";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import './CSS/App.css';




function App() {
  return (
    <div className="App bg-dark">
      <BrowserRouter>
        < NavBar />
        
        <Routes>
          <Route exact path="/" element={<Movie/>}/>
          <Route exact path="/movie" element={<Movie/>}/>
          <Route exact path="/formulario" element={<Formulario/>}/>
          <Route exact path="/info" element={<Info/>}/>
          <Route exact path="/favoritos" element={<Favoritos/>}/>

        </Routes>
      
      </BrowserRouter>
      
    </div>
  );
}

export default App;
