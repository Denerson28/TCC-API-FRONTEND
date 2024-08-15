import {
  Tabs,
  Text,
  Stack,
  Paper,
  Flex,
  Avatar,
  Title,
  UnstyledButton,
  Blockquote,
} from "@mantine/core"
import {
  IconMessageCircle,
  IconPresentation,
  IconArrowLeft,
} from "@tabler/icons-react"
import { useState, useEffect } from "react"
import { useNav } from "../hooks/useNav"
import { decodeJWT } from "../utils/decodeJWT"

export default function Interations() {
  const navigate = useNav()
  const token = localStorage.getItem("jwtToken")
  const [userId, setUserId] = useState("")
  const [recommends, setRecommends] = useState([])
  const [feedbacks, setFeedbacks] = useState([])

  useEffect(() => {
    if (token) {
      const decodedToken = decodeJWT(token)
      setUserId(decodedToken.userId)
    }
  }, [token])

  useEffect(() => {
    if (userId) {
      fetch(`https://localhost:3001/User/${userId}/recommends`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          const sortedRecommends = data.sort((a, b) => new Date(b.CreatedAt) - new Date(a.CreatedAt))
          setRecommends(sortedRecommends.reverse())
        })
      }
    }, [userId, token])
    
  useEffect(() => {
    if (userId) {
      fetch(`https://localhost:3001/User/${userId}/feedbacks`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          const sortedFeedbacks = data.sort((a, b) => new Date(b.CreatedAt) - new Date(a.CreatedAt))
          setFeedbacks(sortedFeedbacks.reverse()); 
        })
    }
  }, [userId, token])

  return (
    <>
      <UnstyledButton onClick={() => navigate(-1)}>
        <Flex gap={8} align="center" ml={80} mt={30}>
          <IconArrowLeft size={30} />
          <Text size={24}>Voltar</Text>
        </Flex>
      </UnstyledButton>

      <Stack align="center">
        <Title align="center" mb={60}>
          Interações
        </Title>

        <Tabs variant="pills" defaultValue="recommendations" w={700}>
          <Tabs.List position="center">
            <Tabs.Tab
              value="recommendations"
              icon={<IconPresentation size={26} />}
            >
              <Text size={20}>Recomendações</Text>
              
            </Tabs.Tab>
            <Tabs.Tab value="feedback" icon={<IconMessageCircle size={26} />}>
            <Text size={20}>
              Feedbacks
            </Text>
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="recommendations" pt={30}>
            {recommends.length === 0 ? (
              <Text align="center">Você ainda não possui recomendações</Text>
            ) : (
              recommends.map((recommend, index) => (
                <Paper withBorder p={20} radius={12} shadow="md" key={index} mb={20}>
                  <Stack spacing={4}>
                    <Flex gap={6} align="center" mb={10}>
                      <Avatar
                        radius="xl"
                        size="md"
                        src={recommend.authorProfilePictureUrl}
                      />
                      <Text weight={700} size={20}>
                        {recommend.authorName}
                      </Text>
                    </Flex>

                    <Text mb={10}>Enviou uma recomendação para você</Text>
                    <Blockquote>
                      <Text mb={10}>{recommend.description}</Text>
                    </Blockquote>
                  </Stack>
                </Paper>
              ))
            )}
          </Tabs.Panel>

          <Tabs.Panel value="feedback" pt="xl">
            {feedbacks.length === 0 ? (
              <Text align="center">Você ainda não possui feedbacks</Text>
            ) : (
              feedbacks.map((feedback, index) => (
                <Paper withBorder p={20} radius={12} shadow="md" key={index} mb={20}>
                  <Stack spacing={4}>
                    <Flex gap={6} align="center" mb={10}>
                      <Avatar
                        radius="xl"
                        size="md"
                        src={feedback.authorProfilePictureUrl}
                      />
                      <Text weight={700} size={20}>
                        {feedback.authorName} 
                      </Text>
                    </Flex>
                    <Text mb={10}>Enviou um feedback para você</Text>
                    <Blockquote>
                    <Text mb={10}>{feedback.description}</Text>
                    </Blockquote>
                  </Stack>
                </Paper>
              ))
            )}
          </Tabs.Panel>
        </Tabs>
      </Stack>
    </>
  )
}
