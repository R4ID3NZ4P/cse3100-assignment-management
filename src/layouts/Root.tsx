import { AppShell, Burger, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Outlet } from "react-router";
// import useAuth from "../hooks/useAuth";
import Navbar from "../shared/Navbar";

const Root = () => {
    const [opened, { toggle }] = useDisclosure();
    // const { user, logout, isStudent } = useAuth()!;

    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{
                width: 300,
                breakpoint: "sm",
                collapsed: { mobile: !opened },
            }}
            padding="md"
        >
            <AppShell.Header>
                <Burger
                    opened={opened}
                    onClick={toggle}
                    hiddenFrom="sm"
                    size="sm"
                />
                <div className="ml-2">
                    <Title order={3}>notClassroom</Title>
                </div>
            </AppShell.Header>

            <AppShell.Navbar p="md">
                <Navbar></Navbar>
            </AppShell.Navbar>

            <AppShell.Main>
                <Outlet />
            </AppShell.Main>
        </AppShell>
    );
};

export default Root;
