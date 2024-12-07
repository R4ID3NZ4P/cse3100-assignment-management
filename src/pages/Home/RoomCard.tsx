import { Card, Text } from "@mantine/core";
import { RoomType } from "../../@types/types";
import { useNavigate } from "react-router";

const RoomCard = ( { data } : { data: RoomType} ) => {

    const navigate = useNavigate();

    return (
        <Card
            className="cursor-pointer"
            shadow="md"
            bg={"#000000A0"}
            padding="lg"
            component="a"
            onClick={() => navigate(`/room/${data._id}`)}
        >
            <Text c={"white"} fw={500} size="lg">
                {data.roomName}
            </Text>

            <Text mt="s" c="dimmed" size="sm">
                {data.description}
            </Text>

            <Text mt="xs" c="dimmed" size="sm">
                {data.owner}
            </Text>


        </Card>
    );
};

export default RoomCard;
