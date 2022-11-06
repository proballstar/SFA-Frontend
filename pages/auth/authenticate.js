import { TextInput, Checkbox, Button, Group, Box, Paper, Center, Text, Container } from "@mantine/core";
import { useForm } from "@mantine/form";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../../src/firebase";
import { useRouter } from "next/router";
import { title } from "process";
import axios from "axios";

export default function Register() {

    const router = useRouter()

    async function google() {
        const provider = new GoogleAuthProvider();
        const auth = getAuth(app);

        signInWithPopup(auth, provider)
          .then(async (result) => {
            // The signed-in user info.
            const user = result.user;
            // ...
            const data = JSON.stringify({
              uid: user.uid,
              name: user.displayName,
              email: user.email,
              profile: user.photoURL
            })

            const headers = new Headers()
            headers.append("Content-Type", "application/json")
            await fetch(`https://streaming-for-all.epiccodewizard2.repl.co/user/create`, {
              headers: headers,
              body: data,
              method: "POST"
            })
            router.push('/events/view')
          })


  }
  
  const title = 'Hello World'
  return (
    <Box sx={{ maxWidth: 300 }} mx="auto">
      <Paper>
        <Center>
          <Container px={100} py={50}>
            <Text py={25} weight="bold">Register for {title}</Text>
            <Button onClick={async () => google()} type="button">
              Submit
            </Button>
          </Container>
        </Center>
      </Paper>
    </Box>
  );
}
