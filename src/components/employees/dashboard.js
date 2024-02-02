import { Anchor, Divider, Group, Paper, Progress, SimpleGrid, Space, Title, Text, Card, Center, Button, ActionIcon } from "@mantine/core";
import { IconChecklist, IconFile } from "@tabler/icons";
import { useContext } from "react";
import { AuthContext } from "../../App";
import { BreadcrumbsSlash } from "../BreadCrumbs";
import Pic from "../../assets/pic2-nobg.png";
import Pic3 from "../../assets/pic3-nobg.png";
import { UserCheck, X } from "tabler-icons-react";
import { Link } from "react-router-dom";

export default function EmployeeDashboard(){
    const { state, dispatch } = useContext(AuthContext);
    const items = [
        {title: 'app', href: "/employee/"},
        {title: 'Dashboard', href: "#"}
    ].map((item, index) => (
        <Anchor size="xs" href={item.href} key={index}>
            {item.title}
        </Anchor>
    ));

    return (
        <>
        <Group mb={20} position="apart">
            <Group position="left">
                <Title order={4} weight={300}>Welcome, {state.userData.username.split("@")[0]}</Title>
            </Group>
            <Group position="right">
                <BreadcrumbsSlash items={items} />
            </Group>
        </Group>

        <Paper mb={20} withBorder p="md">
            <Group position="apart">
                <Group position="left">
                    <UserCheck />
                    <Text>Your staff account is not yet verified. Please verify your account to access more staff services.</Text>
                </Group>
                <Group position="right">
                    <ActionIcon>
                        <X />
                    </ActionIcon>
                </Group>
            </Group>
        </Paper>

        <SimpleGrid cols={2} spacing="lg" breakpoints={[
            { maxWidth: 980, cols: 2, spacing: 'md'},
            { maxWidth: 755, cols: 1, spacing: 'sm'}
        ]}>
            <Paper shadow="xs" p="md">
                <Group position="left">
                    <IconFile color="#E8590C" />
                    <Text>Tasks</Text>
                </Group>

                <Space h="md" />
                <Divider />
                <Space h="md" />
                <Title weight={500} order={5}>0 tasks assigned</Title>
                <Space h="md" />
                <Progress sections={[ {value: 100, color: "#99E9F2"}]} />
                <Space h="md" />
                <Group>
                    <Text inline>Next Up:</Text>
                    <Text weight="bold">View tasks</Text>
                </Group>
                <Space h="lg" />

                <Group position="center">
                    <div>
                        <img height={200} src={Pic} />
                        <Center>
                            <Button component={Link} to="/employee/tasks" mt={20}>View Tasks</Button>
                        </Center>
                    </div>
                </Group>
            </Paper>

            <Paper shadow="xs" p="md">
                <Group position="left">
                    <IconChecklist color="#E8590C" />
                    <Text>Complains</Text>
                </Group>

                <Space h="md" />
                <Divider />
                <Space h="md" />
                <Title weight={500} order={5}>0 complains received</Title>
                <Space h="md" />
                <Progress sections={[ {value: 100, color: "#99E9F2"}]} />
                <Space h="md" />
                <Group>
                    <Text inline>Next Up: </Text>
                    <Text weight={"bold"}>View Complains</Text>
                </Group>
                <Space h="lg" />

                <Group position="center">
                    <div>
                        <img height={200} src={Pic3} />
                        <Center mt={20}>
                            <Button component={Link} to="/employee/complains" >View Complains</Button>
                        </Center>
                    </div>
                </Group>
            </Paper>
            
        </SimpleGrid>
        </>
    )
}