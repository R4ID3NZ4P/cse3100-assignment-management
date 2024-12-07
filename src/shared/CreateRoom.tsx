import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, TextInput, Group, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";

const CreateRoom = () => {
    const [opened, { open, close }] = useDisclosure(false);
    const { user, loading } = useAuth()!;
    console.log(user?.email);
    const form = useForm({
        mode: "uncontrolled",
        initialValues: {
            roomName: "",
            description: "",
        }
    });

    const handleSubmit = async (values: typeof form.values) => {
        const subInfo = {
            roomName: values.roomName,
            description: values.description,
            owner: user?.email,
            members: []
        };

        console.log(subInfo);

        try {
            const res = await fetch("http://localhost:5000/createroom", {
                headers: {
                    'Content-Type': 'application/json'
                  },
                  method: "POST",
                  body: JSON.stringify(subInfo)
            });
            const resJson = await res.json();
            console.log(resJson);
            Swal.fire({
                position: "top",
                icon: "success",
                title: `Room Created Successfully`,
                showConfirmButton: false,
                timer: 1000,
            });

        } catch (error) {
            console.error(error);
        }

        close();
    }

    return (
        <>
            <Modal opened={opened} onClose={close} title="Create Room">
                {!loading ? <form onSubmit={form.onSubmit(handleSubmit)}>
                    <TextInput
                        withAsterisk
                        label="Room Name"
                        placeholder="What is room?"
                        key={form.key("roomName")}
                        {...form.getInputProps("roomName")}
                    />

                    <TextInput
                        withAsterisk
                        label="Room Description"
                        placeholder="What is in the room?"
                        key={form.key("description")}
                        {...form.getInputProps("description")}
                    />

                    <Group justify="flex-end" mt="md">
                        <Button type="submit">Submit</Button>
                    </Group>
                </form> : <Title>Loading</Title>}
            </Modal>

            <Button onClick={open}>Create Room</Button>
        </>
    );
};

export default CreateRoom;
