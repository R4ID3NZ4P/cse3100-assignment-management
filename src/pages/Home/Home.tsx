import { Navigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import { Container, Group, Image, Skeleton, Stack, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { RoomType } from "../../@types/types";
import RoomCard from "./RoomCard";
import wowImg from "../../assets/wow.jpeg"
import CreateRoom from "../../shared/CreateRoom";

const Home = () => {
    
    const { user, loading } = useAuth()!;
    const [rooms, setRooms] = useState<RoomType[] | []>([]);

    const fetchData = async () => {
        const res = await fetch(`http://localhost:5000/user/${user?.email}/rooms`);
        const roomsTemp = await res.json();
        console.log(roomsTemp);
        setRooms(roomsTemp);
    };

    useEffect(() => {
        fetchData();
    }, [])
    
    if(!user) return <Navigate to={"/login"}></Navigate>

    if (loading) return <>
        <Container>
            <Stack>
                <Skeleton height={120} mt={6} radius="lg" />
                <Skeleton height={120} mt={6} radius="lg" />
                <Skeleton height={120} mt={6} radius="lg" />
                <Skeleton height={120} mt={6} radius="lg" />
                <Skeleton height={120} mt={6} radius="lg" />
            </Stack>
        </Container>
    </>

    return (
        <Container>
            <Group justify="end"><CreateRoom refresh={fetchData}/></Group>
            <Title mb={16} order={3}>Your Rooms:</Title>
            <Stack>
                {rooms.length == 0 && <Image src={wowImg}/>}
                {rooms.map((item, idx) => <RoomCard key={idx} data={item} />)}
            </Stack>
        </Container>
    );
};

export default Home;