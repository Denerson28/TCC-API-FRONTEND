import { Modal, Button, Textarea, Flex, Stack, Text } from "@mantine/core"
import { useState } from "react"
import { toast } from "react-toastify"
import axios from "axios"
import { decodeJWT } from "../utils/decodeJWT"

export default function RecomendationModal(props) {
  const { opened, onClose, userIdUrl } = props
  const [recommendationText, setRecommendationText] = useState("")
  const [error, setError] = useState(null)

  const handleSendRecommendation = async () => {
    const token = localStorage.getItem("jwtToken")
    const decodedToken = decodeJWT(token)
    const data = {
      description: recommendationText,
      authorId: decodedToken.userId,
      authorName: decodedToken.unique_name,
    }
    try {
      await axios.post(`https://localhost:3001/User/${userIdUrl}/recommend`, data, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      })
      onClose()
      toast("Recomendação enviada com sucesso", {type: "success"})
    } catch (err) {
      setError("Erro ao enviar a recomendação, tente novamente.")
      console.error(err)
    }
  }

  return (
    <>
      <Modal
        opened={opened}
        onClose={onClose}
        title={
          <Text weight={700} size={20}>
            Recomendação
          </Text>
        }
        centered
        size="lg"
      >
        <Stack spacing={20}>
          <Textarea
            placeholder="Digite sua recomendação"
            w="100%"
            value={recommendationText}
            onChange={(event) => setRecommendationText(event.currentTarget.value)}
          />
          {error && <Text color="red">{error}</Text>}
          <Flex justify="space-between">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button onClick={handleSendRecommendation}>Enviar</Button>
          </Flex>
        </Stack>
      </Modal>
    </>
  )
}
