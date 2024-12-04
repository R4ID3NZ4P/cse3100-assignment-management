// import { AppShell, Burger } from "@mantine/core";
// import { useDisclosure } from "@mantine/hooks";
// import { Outlet } from "react-router";

import { Outlet } from "react-router";

// const Root = () => {
//     const [opened, { toggle }] = useDisclosure();

//     return (
//         <AppShell
//             header={{ height: 60 }}
//             navbar={{
//                 width: 300,
//                 breakpoint: "sm",
//                 collapsed: { mobile: !opened },
//             }}
//             padding="md"
//         >
//             <AppShell.Header>
//                 <Burger
//                     opened={opened}
//                     onClick={toggle}
//                     hiddenFrom="sm"
//                     size="sm"
//                 />
//                 <div>Logo</div>
//             </AppShell.Header>

//             <AppShell.Navbar p="md">Navbar</AppShell.Navbar>

//             <AppShell.Main><Outlet/></AppShell.Main>
//         </AppShell>
//     );
// };

// export default Root;

const Root = () => {
    return (
        <div>
            <Outlet/>
        </div>
    );
};

export default Root;