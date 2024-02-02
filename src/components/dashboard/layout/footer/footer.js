import { Box, Group, Text } from "@mantine/core";
import UseStyles from "./footer.style";

export default function Footer(){
    const { classes } = UseStyles();
    return (
        <Box className={classes.wrapper} >
            <Group position="apart">
                <Group position="left">
                    <Text size='xs'>
                        copyright&copy;{new Date().getFullYear()} {" "} tms. All rights reserved.
                    </Text>
                </Group>
            </Group>
        </Box>
    )
}