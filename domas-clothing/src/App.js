// Outlet needed for nested routes
import { Routes, Route } from "react-router-dom"
import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component.jsx";

const Shop = () => {
  return <h1>I am the Shop page</h1>
};

const App = () =>  {

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        {/* Index routes render in the parent routes outlet at the parent route's path. */}
        {/* just "index" equal to index={true} */}
        <Route index={true} element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
      </Route>      
    </Routes>
  );
}

export default App;
