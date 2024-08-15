import {
  TextInput,
  PasswordInput,
  Button,
  Paper,
  Title,
  Container,
  Image,
  Flex,
  Stack,
  Alert,
} from "@mantine/core"
import { useState } from "react"
import { IconLock, IconMail } from "@tabler/icons-react"
import axios from "axios"
import { useNav } from "../hooks/useNav"
import { decodeJWT } from "../utils/decodeJWT"

export default function LoginPage() {
  const navigate = useNav()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleLogin = async () => {
    try {
      const response = await axios.post("https://localhost:3001/Login", { email, password })

      if (response.data.token) {
        const token = response.data.token
        const user = response.data.user
        localStorage.setItem("jwtToken", token)
        localStorage.setItem("userPhoto", user.photo) 
        localStorage.setItem("userStars", user.stars) 
        try {
          const decodedToken = decodeJWT(token)

        } catch (err) {
          console.error('Erro ao decodificar o token:', err)
        }

        navigate("/home")
      } else {
        setError("Email ou senha incorretos")
      }
    } catch (err) {
      console.error("Erro ao realizar login:", err)
      setError("Erro ao realizar login. Tente novamente.")
    }
  }

  return (
    <Container mt={100}>
      <Flex align="center">
        <Image
          mt={60}
          src="https://www.amcham.lv/uploads/news/1832/thumb/white-grey-photo-winter-facebook-cover-11.png"
          style={{ width: "50%" }}
        />

        <Stack>
          <Title align="center">Login</Title>

          <Paper
            withBorder
            shadow="md"
            p={30}
            mt={30}
            radius="md"
            h={300}
            w={400}
          >
            {error && (
              <Alert color="red" mb="md">
                {error}
              </Alert>
            )}
            <TextInput
              label="Email"
              placeholder="E-mail"
              required
              icon={<IconMail size="1rem" />}
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
              error={!!error}
            />
            <PasswordInput
              label="Senha"
              placeholder="Senha"
              required
              icon={<IconLock size="1rem" />}
              mt="md"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
              error={!!error}
            />
            <Button fullWidth mt={30} onClick={handleLogin}>
              Entrar
            </Button>
          </Paper>
        </Stack>
      </Flex>
    </Container>
  )
}
