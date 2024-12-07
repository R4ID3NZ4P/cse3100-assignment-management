import { Button, Group, Modal, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { useParams } from "react-router";
import { FaPlus } from "react-icons/fa";

const CreateAssignment = ( { data }: { data: () => Promise<void> } ) => {
    const [opened, { open, close }] = useDisclosure(false);
    const { user, loading } = useAuth()!;
    const { roomid } = useParams();

    console.log(user?.email);
    
    const form = useForm({
        mode: "uncontrolled",
        initialValues: {
            title: "",
            description: "",
        }
    });

    const handleSubmit = async (values: typeof form.values) => {
        const subInfo = {
            title: values.title,
            description: values.description,
            createdBy: user?.email,
            roomId: roomid
        };

        console.log(subInfo);

        try {
            const res = await fetch("http://localhost:5000/createassignment", {
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
                title: `Assignment Created Successfully`,
                showConfirmButton: false,
                timer: 1000,
            });

            data();

        } catch (error) {
            console.error(error);
        }

        close();
    }

    return (
        <>
            <Modal opened={opened} onClose={close} title="Create Assignment">
                {!loading ? <form onSubmit={form.onSubmit(handleSubmit)}>
                    <TextInput
                        withAsterisk
                        label="Assignment Title"
                        placeholder="What is life?"
                        key={form.key("title")}
                        {...form.getInputProps("title")}
                    />

                    <TextInput
                        withAsterisk
                        label="Assignment Description"
                        placeholder="What is the purpose???"
                        key={form.key("description")}
                        {...form.getInputProps("description")}
                    />

                    <Group justify="flex-end" mt="md">
                        <Button type="submit">Submit</Button>
                    </Group>
                </form> : <Title>Loading</Title>}
            </Modal>

            <Button rightSection={<FaPlus size={14} />} onClick={open}>Create Assignment</Button>
        </>
    );
};

export default CreateAssignment;