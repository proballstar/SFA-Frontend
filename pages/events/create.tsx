import React from 'react'
import {NumberInput, Text, FileInput, Paper, TextInput, Button, Select, ActionIcon, Group, Box, Container, Input } from '@mantine/core'
import {useForm} from '@mantine/form'
import {app} from '../../src/firebase'
import { FacebookAuthProvider, getAuth } from 'firebase/auth'
import { usePlacesWidget } from 'react-google-autocomplete'
import axios from 'axios'
import {DatePicker, TimeInput} from '@mantine/dates'
import { IconClock } from '@tabler/icons'

export default function CreateBlogs() {
    
    const [cover, setCover] = React.useState <File | null >(null)
    const [eventName, setEName] = React.useState<string>("")
    const [desc, setDesc] = React.useState<string>("")
    const [typeEv, setTypeEv] = React.useState<string>("");
    const [location, setLocaiton] = React.useState<any>()
    const [date, setDate] = React.useState<any>()
    const [time, setTime] = React.useState<any>()
    const [error, setError] = React.useState<React.ReactNode>(<></>)
  
  const { ref, autocompleteRef } = usePlacesWidget({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP,
    onPlaceSelected: place => {
      console.log(date)
      console.table(place)
      setLocaiton(place);
    }
  })
  
  async function applyValues() {
    const auth = getAuth(app)
    const formData = new FormData()
    formData.append("UID", auth.currentUser.uid);
    formData.append("name", eventName);
    formData.append("latitude", String(location.geometry.location.lat()));
    formData.append("longitude", String(location.geometry.location.lng()));
    formData.append("cover", cover)
    formData.append("type", typeEv)
    formData.append("date", date)
    formData.append("time", time)
    const res = await axios.post("https://streaming-for-all.epiccodewizard2.repl.co/event/create", formData);
    if (String(res.data).length > 0) {
      setError(<Text>{res.data}</Text>)
    }
  }

    return (
      <Container py={20} p={10}>
        <Paper>
          <form>
            <TextInput
              withAsterisk
              label="Title"
              placeholder="The event's name"
              value={eventName}
              onChange={e => setEName(e.currentTarget.value)}
            />
            <TextInput
              withAsterisk
              label="Description"
              placeholder="My Description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
            <DatePicker
              label="Day of the Event"
              value={date}
              onChange={(e) => {
                setDate(
                  `${e.getMonth() + 1}/${e.getDate()}/${e.getFullYear()}`
                );
              }}
            />
            <TimeInput
              label="Time of Event"
              variant="filled"
              radius="xl"
              format="24"
              withAsterisk
              clearable
              onChange={(t: Date) => {
                let hrs = t.getHours();
                let mins: any = t.getMinutes();
                if (mins < 10) {
                  mins = "0" + String(mins);
                }
                if (hrs == 0) {
                  hrs = 12;
                }
                let format = `${hrs}:${mins}`;
                setTime(format);
              }}
              icon={<IconClock size={16} />}
            />
            <Select
              label="Type of Event"
              placeholder="Pick an event"
              data={[
                { value: "tournament", label: "Tournament" },
                { value: "casual", label: "Casual" },
                { value: "workshop", label: "Workshop" },
              ]}
              value={typeEv}
              onChange={setTypeEv}
            />
            <Box>
              <Text size="sm" weight={600}>
                Location of the Event
              </Text>
              <Input ref={ref} />
            </Box>
            <FileInput
              value={cover}
              onChange={setCover}
              label="Add your cover"
            />
            <Group position="right">
              <Button onClick={() => applyValues()}>Submit</Button>
            </Group>
            {error}
          </form>
        </Paper>
      </Container>
    );
}