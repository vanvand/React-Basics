// Outlet needed for nested routes
import { Routes, Route } from "react-router-dom"
import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import SignIn from "./routes/sign-in/sign-in.component";

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
        <Route path="sign-in" element={<SignIn />} />
      </Route>      
    </Routes>
  );
}

export default App;
