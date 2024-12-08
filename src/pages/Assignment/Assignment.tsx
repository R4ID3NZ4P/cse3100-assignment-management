import { Button, Container, Group, Paper, Skeleton, Stack, Text, Title, TypographyStylesProvider } from "@mantine/core";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { AssignmentType } from "../../@types/types";
import EditAssignment from "./EditAssignment";
import { FaBan } from "react-icons/fa";
import Swal from "sweetalert2";
// import { MdOutlineDeleteForever } from "react-icons/md";

const Assignment = () => {

    const { roomid, assignmentid } = useParams();
    const [data, setData] = useState<AssignmentType | null>(null);
    const navigate = useNavigate();

    const getData = async () => {
        fetch(`http://localhost:5000/room/${roomid}/${assignmentid}`).then(res => res.json()).then(res => {
            setData(res);
            console.log(res);
        });
    }

    const deleteData = async () => {
        const res = await fetch(`http://localhost:5000/deleteassignment/${assignmentid}`, {
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
                    text: "Your assignment has been deleted.",
                    icon: "success"
                  });
                  navigate(-1);
              }
            }
          });
    }

    useEffect(() => {
        getData();
        console.log(data)
    }, []);

    if(!data) return <>
    <Container>
        <Stack>
            <Skeleton height={12} mt={6} radius="lg" />
            <Skeleton height={12} mt={6} radius="lg" />
            <Skeleton height={12} mt={6} radius="lg" />
            <Skeleton height={12} mt={6} radius="lg" />
            <Skeleton height={12} mt={6} radius="lg" />
        </Stack>
    </Container>
</>
    
    return (
        <Container>
            <Group justify="end">
                <Button onClick={handleDelete} color="red" rightSection={<FaBan size={14} />}>Delete</Button>
                <EditAssignment refresh={getData} data={data!} />
            </Group>
            <Paper mt={16} shadow="lg" p="xl">
                <TypographyStylesProvider className="w-full">
                    <Title>{data?.title}</Title>
                    <Title order={6}>By: {data?.createdBy}</Title>
                    <Text>{data?.description}</Text>
                </TypographyStylesProvider>
            </Paper>
        </Container>
    );
};

export default Assignment;