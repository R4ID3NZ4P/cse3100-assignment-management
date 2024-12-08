import { useNavigate } from 'react-router';
import { AssignmentType } from '../../@types/types';
import { Card, Group, Text } from '@mantine/core';
import { FaAngleRight } from 'react-icons/fa';

const AssignmentCard = ( { data } : { data: AssignmentType} ) => {

    const navigate = useNavigate();

    return (
        <Card
            className="cursor-pointer"
            shadow="md"
            padding="lg"
            component="a"
            onClick={() => navigate(`/room/${data.roomId}/${data._id}`)}
        >
            <Text fw={500} size="lg">
                {data.title}
            </Text>

            <Text mt="s" c="dimmed" size="sm">
                {data.description.slice(0, 50)} ...
            </Text>

            <Group justify='end'><FaAngleRight size={28}/></Group>

            {/* <Text mt="xs" c="dimmed" size="sm">
                {data.}
            </Text> */}


        </Card>
    );
};

export default AssignmentCard;