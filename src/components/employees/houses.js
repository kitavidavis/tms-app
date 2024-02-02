import { ActionIcon, Center, Menu, Table, Text } from "@mantine/core";
import { useContext, useState } from "react"
import { Dots } from "tabler-icons-react";
import { AuthContext } from "../../App";
import Pic3 from "../../assets/pic3-nobg.png";

export default function EmployeesHouse(){
    const { state, dispatch } = useContext(AuthContext);
    const [houses, setHouses] = useState([]);
    return (
       houses.length === 0 ? (
        <Center mt="10%" mb="10%" >
        <div>
        <img height={200} src={Pic3} />
        <Text mt={30}>No houses have been assigned to you</Text>
        </div>
        </Center>
       ) : (
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>House Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Ngara House</td>
                        <td>
                            <Menu>
                                <Menu.Target>
                                    <ActionIcon>
                                        <Dots />
                                    </ActionIcon>
                                </Menu.Target>
                                <Menu.Dropdown>
                                    <Menu.Item>View Details</Menu.Item>
                                    <Menu.Item>Raise Complains</Menu.Item>
                                    <Menu.Item>Quit</Menu.Item>
                                </Menu.Dropdown>
                            </Menu>
                        </td>
                    </tr>
                </tbody>
            </Table>
       )
    )
}