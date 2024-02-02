import { ActionIcon, Badge, Center, Menu, Table, Text } from "@mantine/core";
import { useContext, useState } from "react"
import { Dots } from "tabler-icons-react";
import { AuthContext } from "../../App"
import Pic3 from "../../assets/pic3-nobg.png";

export default function EmployeesTask(){
    const { state, dispatch } = useContext(AuthContext);
    const [tasks, setTasks] = useState([]);

    return (
       tasks.length === 0 ? (
            <Center mt="10%" mb="10%" >
                <div>
                <img height={200} src={Pic3} />
                <Text mt={30}>No tasks have been assigned to you</Text>
                </div>
            </Center>
       ) : (
            <Table>
                <thead>
                    <tr>
                        <th>
                            #
                        </th>
                        <th>
                            Task title
                        </th>
                        <th>
                            Due on
                        </th>
                        <th>
                            Status
                        </th>
                        <th>
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>House Disconnection</td>
                        <td>Monday, 13th 2022</td>
                        <td>
                            <Badge>Complete</Badge>
                        </td>
                        <td>
                            <Menu>
                                <Menu.Target>
                                    <ActionIcon>
                                        <Dots />
                                    </ActionIcon>
                                </Menu.Target>
                                <Menu.Dropdown>
                                    <Menu.Item>Mark as complete</Menu.Item>
                                    <Menu.Item>More Details</Menu.Item>
                                </Menu.Dropdown>
                            </Menu>
                        </td>
                    </tr>
                </tbody>
            </Table>
       )
    )
}