import { Route, Routes } from "react-router";
import Root from "../layouts/Root";
import Home from "../pages/Home";

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Root/>}>
                <Route index element={<Home/>}></Route>
            </Route>
        </Routes>
    );
};

export default Router;