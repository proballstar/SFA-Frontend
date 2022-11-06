import Link from "next/link";
import useSWR from "swr";
import { Button, Text, Box, Center } from "@mantine/core";

export default function Index() {
  const title = 'Stream for All'
  return (
    <Center size={300} py={20}>
      <Box>
        <Text py={10}>Welcome to {title}</Text>
        <Link href={"/auth/authenticate"}>
          <Button>Register Now!</Button>
        </Link>
      </Box>
    </Center>
  );
}