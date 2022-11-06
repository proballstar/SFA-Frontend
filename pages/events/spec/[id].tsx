import { useRouter } from "next/router";
import axios from 'axios'
import { BackgroundImage, Image, Container, Grid, Text, Button } from "@mantine/core";
import GoogleMap from "../../../components/Map/Map";
import { IconUserCircle } from "@tabler/icons";
import { getAuth, Auth } from 'firebase/auth';

function Maps(props) {
    return (
      <GoogleMap
            
            location={{
                address: props.name,
                lat: Number(props.latitude),
                lng: Number(props.longitude),
            }}
        />
    )
}

export default function SpecificEvent(props) {

    async function joinEvent() {
        let auth: Auth = getAuth()
        await axios.get(
          `https://streaming-for-all.epiccodewizard2.repl.co/user/${auth.currentUser.uid}/join/${props.eid}`
        );
    }

    return (
      <Container>
        <Container>
          <BackgroundImage src={props.cover} />
          <Image src={props.cover} fit="contain" />
        </Container>
        <Grid grow>
          <Grid.Col>
            <Container>
              <Text weight={800}>
                {props.name} by {props.host}
              </Text>
              <Text>{props.description}</Text>
            </Container>
            <Container>
              <Text>
                Info: Contact Information
                <IconUserCircle /> {props.contact}
                <br />
                Event Information Time: {props.time}
                Event Type: {props.type}
              </Text>
            </Container>
            <Grid.Col py={20}>
              <Image
                src="https://media.wired.com/photos/59269cd37034dc5f91bec0f1/191:100/w_1280,c_limit/GoogleMapTA.jpg"
                alt="London"
              />
              <Maps
                address={props.name}
                latitude={props.latitude}
                longitude={props.longitude}
              />
            </Grid.Col>
            <Container>
              <Button
                type="button"
                variant="light"
                onClick={async () => alert("Successful Joining")}
              >
                Join the Event
              </Button>
            </Container>
          </Grid.Col>
        </Grid>
      </Container>
    );
}

export async function getServerSideProps(context) {
    const { id } = context.query;
    const res = await axios.get(
      `https://streaming-for-all.epiccodewizard2.repl.co/event/get/${id}`
    );
  return {
      props: res.data
    }
}