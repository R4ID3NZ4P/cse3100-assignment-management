import { Button, NavLink, Stack, Title } from "@mantine/core";
import { useLocation, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";

const Navbar = () => {

    const { user, logout } = useAuth()!;
    const location = useLocation();
    const navigate = useNavigate();

    console.log(location.pathname);

    return (
        <div>
            <Stack
                h={300}
                bg="var(--mantine-color-body)"
                align="stretch"
                justify="flex-start"
                gap="sm"
            >
                {/* {!user && <Button variant={location.pathname === "/login" ? "filled" : "default"}><NavLink to={"/login"}>Login</NavLink></Button>} */}
                {!user && <NavLink variant="light" color="blue.4" onClick={() => navigate("/login")} active={location.pathname === "/login"} label="Login"/>}
                {user && (
                    <>
                        <Title order={4}>Welcome {user.displayName}</Title>
                        <Button onClick={logout} color="red">Logout</Button>
                        <NavLink variant="filled" color="blue.4" onClick={() => navigate("/")} active={location.pathname === "/"} label="Home"/>
                    </>
                )}
                <Button variant="default">3</Button>
            </Stack>
        </div>
    );
};

export default Navbar;
