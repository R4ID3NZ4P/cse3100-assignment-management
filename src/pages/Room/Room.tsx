import { useEffect, useState } from "react";
import { RoomAssignmentType } from "../../@types/types";
import { useParams } from "react-router";
import { Container, Group, Stack } from "@mantine/core";
import useAuth from "../../hooks/useAuth";
import CreateAssignment from "../CreateAssignment/CreateAssignment";
import AssignmentCard from "./AssignmentCard";

const Room = () => {

    const [data, setData] = useState<RoomAssignmentType | null>(null);
    const { roomid } = useParams();
    const { isStudent } = useAuth()!;

    const getData = async () => {
        fetch(`http://localhost:5000/room/${roomid}`).then(res => res.json()).then(res => {
            setData(res);
            console.log(res);
        });
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <Container>
            {!isStudent && <Group justify="end">
                <CreateAssignment refresh={getData} />
            </Group>}
            <Stack mt={16}>
                {data?.assignments.map((item, idx) => <AssignmentCard data={item} key={idx} />)}
            </Stack>
        </Container>
    );
};

export default Room;