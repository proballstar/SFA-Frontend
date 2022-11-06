import { Grid, Container, Card, Image, Group, Button, Text, Badge} from "@mantine/core";
import { IconAddressBook } from "@tabler/icons";
import Link from "next/link";

export default function ViewBlogs(props) {
    return (
        <div>
            {props.events.map((values, key) => {
                return (
                  <Container key={`event-id-${key}`}>
                    <Link href={`/events/spec/${values.eid}`}>
                      <Card shadow="sm" p="lg" radius="md" withBorder>
                        <Card.Section component="a">
                          <Image src={values.cover} height={160} alt="Image" />
                        </Card.Section>

                        <Group position="apart" mt="md" mb="xs">
                          <Text weight={500}>{values.name}</Text>
                          <Badge color="pink" variant="light">
                            {values.time}
                          </Badge>
                        </Group>

                        <Text size="sm" color="dimmed">
                          {values.description}
                        </Text>
                        <Grid>
                          <Button
                            variant="light"
                            color="blue"
                            fullWidth
                            mt="md"
                            radius="md"
                          >
                            Join the Event Today
                          </Button> 
                          <Text> 
                            <IconAddressBook size={20} />
                            {values.contact}
                          </Text>
                        </Grid>
                      </Card>
                    </Link>
                  </Container>
                );
            })}
        </div>
    )
}

export async function getStaticProps() {
    const result = await fetch(`https://streaming-for-all.epiccodewizard2.repl.co/event/all`);
    const json = await result.json()
    return {
        props: {
            events: json
        }
    }
}
