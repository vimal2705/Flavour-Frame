import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import HomeScreen from "../HomeScreen";

const Container = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar>
          <Routes>
            <Route>
              <Route path="/" element={<HomeScreen />} />
            </Route>
          </Routes>
        </Navbar>
      </BrowserRouter>
    </div>
  );
};

export default Container;
