import { Route, Routes } from "react-router";
import Root from "../layouts/Root";
import Home from "../pages/Home/Home";
import { Login } from "../pages/Login/Login";
import Room from "../pages/Room/Room";
import Assignment from "../pages/Assignment/Assignment";

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Root/>}>
                <Route index element={<Home/>}></Route>
                <Route path="/login" element={<Login/>}></Route>
                <Route path="/room/:roomid" element={<Room/>}></Route>
                <Route path="/room/:roomid/:assignmentid" element={<Assignment/>}></Route>
            </Route>
        </Routes>
    );
};

export default Router;