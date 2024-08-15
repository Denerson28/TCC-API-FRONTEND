import React, { useState, useEffect } from "react"
import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Group,
  Image,
  Paper,
  Space,
  Stack,
  Text,
  Title,
  UnstyledButton,
} from "@mantine/core"
import { useParams } from "react-router-dom"
import { IconArrowLeft } from "@tabler/icons-react"
import { useNav } from "../hooks/useNav"
import RecomendationModal from "../components/RecomendationModal"
import FeedbackModal from "../components/FeedbackModal"
import { decodeJWT } from "../utils/decodeJWT"

export default function UserPage() {
  const [openRecommendation, setOpenRecommendation] = useState(false)
  const [openFeedback, setOpenFeedback] = useState(false)
  const [userData, setUserData] = useState([])
  const [userId, setUserId] = useState("")
  const { userIdUrl } = useParams()
  const navigate = useNav()

  useEffect(() => {
    const token = localStorage.getItem("jwtToken")
    const decodedToken = decodeJWT(token)
    setUserId(decodedToken.userId)

    fetch(`https://localhost:3001/User/${userIdUrl}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setUserData(data))
    }, [userIdUrl])

  return (
    <>
      <UnstyledButton onClick={() => navigate(-1)} >
        <Flex gap={8} align="center" ml={80} mt={30}>
          <IconArrowLeft size={30} />
          <Text size={24}>Voltar</Text>
        </Flex>
      </UnstyledButton>

      <Box p={50} w={"80%"} m="auto">
        <Center>
        <Box
          style={{ border: "1px solid #CCC", borderRadius: 10, padding: 20, width: "90%" }}
        >
          <Group position="apart">
            <Flex align="center" gap={16} ml={20}>
              <Avatar
                width={50}
                height={50}
                src={userData.photo}
                radius="xl"
                size="lg"
              />
              <Stack spacing={4}>
                <Text weight={700}>Nome: {userData.name}</Text>
                <Text weight={700}>Time: {userData.teamName}</Text>
                <Text weight={700}>Estrelas: {userData.stars}</Text>
              </Stack>
            </Flex>
            <Stack>
              <Button
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation()
                  setOpenFeedback(true)
                }}
              >
                Feedback
              </Button>
              <Button
                variant="gradient"
                onClick={(e) => {
                  e.stopPropagation()
                  setOpenRecommendation(true)
                }}
              >
                Recomendar
              </Button>
            </Stack>
          </Group>
        </Box></Center>

        <Center mt={40}>
        <Title>Publicações do usuário</Title>
        </Center>

        <Space h={40} />

        {userData?.publishes?.map(publish => (
            <Box key={publish.id} mb={30} >
            <Group mb={10}>
            <Avatar
                width={50}
                height={50}
                src={userData.photo}
                radius="xl"
                size="md"
              />
              <Text>{userData.name}</Text>
            </Group>

        <Paper withBorder p={20} radius={12} shadow="md">
            <Text size={24} weight={700} mb={20}>
              {publish.title}
            </Text>

            <Text size={20} mb={20}>
              {publish.description}
            </Text>
          <Group position="center">

            <Image
              src={publish.image}
              style={{ width: 400 }}
              radius="md"
              mb={20}
            />
          </Group>
          
        </Paper>
        </Box>
          )
        )}
       
      </Box>

      <RecomendationModal
        opened={openRecommendation}
        onClose={() => setOpenRecommendation(false)}
        userIdUrl={userIdUrl}
      />
      <FeedbackModal
        opened={openFeedback}
        onClose={() => setOpenFeedback(false)}
        userIdUrl={userIdUrl}
      />
    </>
  )
}
