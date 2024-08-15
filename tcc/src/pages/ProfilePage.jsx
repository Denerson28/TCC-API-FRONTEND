import { useState, useEffect } from "react"
import {
  Avatar,
  Button,
  Center,
  FileButton,
  Flex,
  Paper,
  Stack,
  Text,
  Textarea,
  UnstyledButton,
} from "@mantine/core"
import {
  IconArrowLeft,
  IconMail,
  IconPhoto,
  IconUser,
  IconUsers,
} from "@tabler/icons-react"
import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import { useNav } from "../hooks/useNav"
import { decodeJWT } from "../utils/decodeJWT"

export default function ProfilePage() {
  const navigate = useNav()
  const [userName, setUserName] = useState("")
  const [userEmail , setUserEmail] = useState("")
  const [userRole, setUserRole] = useState("")
  const [file, setFile] = useState(null)
  const [userPhoto, setUserPhoto] = useState("")
  const [userId, setUserId] = useState("")


  useEffect(() => {
    setUserPhoto(localStorage.getItem("userPhoto"))
    const token = localStorage.getItem("jwtToken")

    if (token) {
      try {
        const decodedToken = decodeJWT(token)
        setUserName(decodedToken.unique_name)
        setUserEmail(decodedToken.email) 
        setUserRole(decodedToken.role)
        setUserId(decodedToken.userId)
      } catch (err) {
        console.error('Erro ao decodificar o token:', err)
      }
    }
  }, [])

  const handleFileChange = (file) => {
    setFile(file)
    const reader = new FileReader()
    reader.onloadend = () => {
      setUserPhoto(reader.result)
      localStorage.setItem("userPhoto", reader.result)
    }
    reader.readAsDataURL(file)
  }

  function handleUpdateUser() {
      const token = localStorage.getItem("jwtToken")
  
      fetch(`https://localhost:3001/User/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: userName,
          photo: userPhoto,
        }),
      }, )
        .then((response) => response.json())
        .then((data) => setUserId(data))
        localStorage.setItem("userName", userName)


        toast("As informações foram salvas, refaça o login para atualizar", {type: "success"})
        navigate("/login")

  }

  return (
    <>
      <UnstyledButton onClick={() => navigate(-1)}>
        <Flex gap={8} align="center" ml={80} mt={30}>
          <IconArrowLeft size={30} />
          <Text size={24}>Voltar</Text>
        </Flex>
      </UnstyledButton>

      <Center>
        <Stack>
        <Paper withBorder p={20} radius={12} shadow="md">
          <Stack w={500}>
            <Flex align="center" justify="center" gap={40} mb={10}>
              <Avatar
                radius="50%"
                size={180}
                src={userPhoto}
              />
              <FileButton onChange={handleFileChange} accept="image/png,image/jpeg">
                {(props) => (
                  <Button
                    variant="default"
                    leftIcon={<IconPhoto size={16} />}
                    {...props}
                  >
                    Alterar
                  </Button>
                )}
              </FileButton>
            </Flex>
            <Stack spacing={10}>
              <Textarea
                value={userName}
                onChange={(event) => setUserName(event.currentTarget.value)}
                icon={<IconUser size={24} />}
                label="Nome de usuário"
                autosize
                radius={8}
              />

              <Textarea
                value={userEmail}
                icon={<IconMail size={24} />}
                label="E-mail"
                autosize
                radius={8}
                disabled
              />

              <Textarea
                value={userRole}
                icon={<IconUsers size={24} />}
                label="Cargo"
                autosize
                radius={8}
                disabled
              />
            </Stack>
          </Stack>
        </Paper>

        <Button onClick={() => handleUpdateUser()}>
          Salvar
        </Button>
        </Stack>
      </Center>
    </>
  )
}
