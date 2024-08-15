import { Modal, Button, Textarea, Flex, Stack, Text } from "@mantine/core"
import { useState } from "react"
import { toast } from "react-toastify"
import axios from "axios"
import { decodeJWT } from "../utils/decodeJWT"

export default function FeedbackModal(props) {
  const { opened, onClose, userIdUrl } = props
  const [feedbackText, setFeedbackText] = useState("")

  const handleSendFeedback = async () => {
    try {
      const token = localStorage.getItem("jwtToken")
      const decodedToken = decodeJWT(token)
      const userId = decodedToken.userId

      const payload = {
        description: feedbackText,
        authorId: userId,
        AuthorName: decodedToken.unique_name,
      }

      await axios.post(`https://localhost:3001/User/${userIdUrl}/feedback`, payload, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      })

      onClose()
      toast("Feedback enviado com sucesso", {type: "success"})
    } catch (err) {
      console.error("Erro ao enviar feedback:", err)
    }
  }

  return (
    <>
      <Modal
        opened={opened}
        onClose={onClose}
        title={
          <Text weight={700} size={20}>
            Feedback
          </Text>
        }
        centered
        size="lg"
      >
        <Stack spacing={20}>
          <Textarea
            placeholder="Digite seu feedback"
            w="100%"
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.currentTarget.value)}
          />
          <Flex justify="space-between">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button onClick={handleSendFeedback}>Enviar</Button>
          </Flex>
        </Stack>
      </Modal>
    </>
  )
}
