import { Route, Routes } from "react-router";
import Root from "../layouts/Root";
import Home from "../pages/Home";
import { Login } from "../pages/Login/Login";

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Root/>}>
                <Route index element={<Home/>}></Route>
                <Route path="/login" element={<Login/>}></Route>
            </Route>
        </Routes>
    );
};

export default Router;