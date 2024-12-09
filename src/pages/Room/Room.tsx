import { useEffect, useState } from "react";
import { RoomAssignmentType } from "../../@types/types";
import { useNavigate, useParams } from "react-router";
import { Button, Container, Group, Stack } from "@mantine/core";
import useAuth from "../../hooks/useAuth";
import CreateAssignment from "../CreateAssignment/CreateAssignment";
import AssignmentCard from "./AssignmentCard";
import { FaBan } from "react-icons/fa";
import Swal from "sweetalert2";

const Room = () => {

    const [data, setData] = useState<RoomAssignmentType | null>(null);
    const { roomid } = useParams();
    const { isStudent } = useAuth()!;
    const navigate = useNavigate();

    const deleteData = async () => {
        const res = await fetch(`http://localhost:5000/deleteroom/${roomid}`, {
            headers: {
                'Content-Type': 'application/json'
              },
              method: "DELETE"
        });

        const data = await res.json();

        return data;
    }

    const handleDelete = async () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then(async (result) => {
            if (result.isConfirmed) {
              const response = await deleteData();
              if(response.deletedCount) {
                  Swal.fire({
                    title: "Deleted!",
                    text: "Your Room has been deleted.",
                    icon: "success"
                  });
                  navigate(-1);
              }
            }
          });
    }

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
                <Button onClick={handleDelete} color="red" rightSection={<FaBan size={14} />}>Delete Room</Button>
                <CreateAssignment refresh={getData} />
            </Group>}
            <Stack mt={16}>
                {data?.assignments.map((item, idx) => <AssignmentCard data={item} key={idx} />)}
            </Stack>
        </Container>
    );
};

export default Room;