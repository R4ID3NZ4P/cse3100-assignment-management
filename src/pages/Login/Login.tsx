import {
    Anchor,
    Button,
    Divider,
    Group,
    Paper,
    PaperProps,
    PasswordInput,
    Radio,
    Stack,
    Text,
    TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { upperFirst, useToggle } from "@mantine/hooks";
import { GoogleButton } from "./GoogleButton";
import useAuth from "../../hooks/useAuth";
import { Navigate, useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { FirebaseError } from "firebase/app";

export const Login = (props: PaperProps) => {
    const [type, toggle] = useToggle(["login", "register"]);
    const { user, login, register, update } = useAuth()!;
    const form = useForm({
        initialValues: {
            email: "",
            name: "",
            password: "",
            student: true,
        },

        validate: {
            email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
            password: (val) =>
                val.length <= 6
                    ? "Password should include at least 6 characters"
                    : null,
        },
    });

    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = async (values: typeof form.values) => {
        // console.log(values);
        const email = values.email;
        const password = values.password;
        const name = values.name;
        // const student = values.student;

        if (type == "register") {
            console.log(values);

            try {
            const regRes = await register(email, password);
            console.log(regRes);
            await update(name);
            } catch (error) {
              console.error(error);
            }
        } else {
            console.log({ email, password });

            try {
                const res = await login(email, password);
                Swal.fire({
                    position: "top",
                    icon: "success",
                    title: `${res.user?.displayName} Logged In Successfully`,
                    showConfirmButton: false,
                    timer: 1500,
                });
                if (location.state?.from) navigate(location.state?.from);
                else navigate("/");
            } catch (error) {
                console.error(error);
                if (
                    (error as FirebaseError).code ===
                        "auth/invalid-login-credentials" ||
                    (error as FirebaseError).code === "auth/invalid-credential"
                ) {
                    Swal.fire({
                        position: "top",
                        icon: "error",
                        title: "Invalid Email or Password",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            }
        }
    };

    if (user) return <Navigate to={"/"}></Navigate>;

    return (
        <Paper radius="md" p="xl" withBorder {...props}>
            <Text size="lg" fw={500}>
                Welcome to notClassroom, {type} with
            </Text>

            <Group grow mb="md" mt="md">
                <GoogleButton radius="xl">Google</GoogleButton>
            </Group>

            <Divider
                label="Or continue with email"
                labelPosition="center"
                my="lg"
            />

            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Stack>
                    {type === "register" && (
                        <TextInput
                            label="Name"
                            placeholder="Your name"
                            value={form.values.name}
                            onChange={(event) =>
                                form.setFieldValue(
                                    "name",
                                    event.currentTarget.value
                                )
                            }
                            radius="md"
                        />
                    )}

                    <TextInput
                        required
                        label="Email"
                        placeholder="hello@mantine.dev"
                        value={form.values.email}
                        onChange={(event) =>
                            form.setFieldValue(
                                "email",
                                event.currentTarget.value
                            )
                        }
                        error={form.errors.email && "Invalid email"}
                        radius="md"
                    />

                    <PasswordInput
                        required
                        label="Password"
                        placeholder="Your password"
                        value={form.values.password}
                        onChange={(event) =>
                            form.setFieldValue(
                                "password",
                                event.currentTarget.value
                            )
                        }
                        error={
                            form.errors.password &&
                            "Password should include at least 6 characters"
                        }
                        radius="md"
                    />

                    {type === "register" && (
                        <Radio
                            label="I am a Student"
                            checked={form.values.student}
                            onChange={(event) =>
                                form.setFieldValue(
                                    "student",
                                    event.currentTarget.checked
                                )
                            }
                        />
                    )}

                    {type === "register" && (
                        <Radio
                            label="I am a Teacher"
                            checked={!form.values.student}
                            onChange={(event) =>
                                form.setFieldValue(
                                    "student",
                                    !event.currentTarget.checked
                                )
                            }
                        />
                    )}
                </Stack>

                <Group justify="space-between" mt="xl">
                    <Anchor
                        component="button"
                        type="button"
                        c="dimmed"
                        onClick={() => toggle()}
                        size="xs"
                    >
                        {type === "register"
                            ? "Already have an account? Login"
                            : "Don't have an account? Register"}
                    </Anchor>
                    <Button type="submit" radius="xl">
                        {upperFirst(type)}
                    </Button>
                </Group>
            </form>
        </Paper>
    );
};
