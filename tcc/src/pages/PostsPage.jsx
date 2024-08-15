import {
  Avatar,
  Button,
  Container,
  FileButton,
  Flex,
  Group,
  Image,
  Paper,
  Space,
  Stack,
  Text,
  Textarea,
  Title,
  Center,
  Box,
} from "@mantine/core"
import { useState, useEffect } from "react"
import { IconPhoto, IconSearch } from "@tabler/icons-react"
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import { decodeJWT } from "../utils/decodeJWT"
import { toast } from "react-toastify"

export default function PostsPage() {
  const navigate = useNavigate()
  const [users, setUsers] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [file, setFile] = useState(null)
  const [description, setDescription] = useState("")
  const [title, setTitle] = useState("")
  const [posts, setPosts] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])
  const [userId, setUserId] = useState("")
  const [error, setError] = useState("")

  const token = localStorage.getItem("jwtToken")
  const decodedToken = decodeJWT(token)

  const fetchPosts = async () => {
    try {
      const response = await fetch(`https://localhost:3001/User/${userId}/publishes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Erro na requisição');
      }
      const data = await response.json();
      const sortedPosts = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setPosts(sortedPosts);
    } catch (error) {
      console.error('Erro ao buscar publicações:', error);
    }
  };

  useEffect(() => {
    if (token) {
      fetch("https://localhost:3001/User", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => setUsers(data))
        .catch((error) => console.error('Erro ao buscar usuários:', error))
    }
  }, [token])

  useEffect(() => {
    if (token) {
      try {
        setUserId(decodedToken.userId);
      } catch (err) {
        console.error('Erro ao decodificar o token:', err)
      }
    }
  }, [token])

  useEffect(() => {
    if (userId && token) {
      fetchPosts();
    }
  }, [userId, token]);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase()
    setSearchTerm(value)

    if (value.trim() === "") {
      setFilteredUsers([])
    } else {
      const filtered = users.filter((user) =>
        user.name.toLowerCase().includes(value)
      )
      setFilteredUsers(filtered)
    }
  }

  const handleCreatePost = async () => {
    if (!description.trim() || !title.trim()) return

    const convertToBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = error => reject(error)
      })
    }

    try {
      const base64Image = file ? await convertToBase64(file) : null

      await axios.post(`https://localhost:3001/Publish/${userId}`, 
        { 
          Title: title,
          Description: description,
          Image: base64Image
        }, 
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );

      await fetchPosts();

      setTitle("")
      setDescription("")
      setFile(null)

      let userStars = parseInt(localStorage.getItem("userStars"), 10) || 0;
      userStars += 3;
      localStorage.setItem("userStars", userStars.toString());
      toast("publicação feita com sucesso", {type: "success"})
    } catch (err) {
      console.error("Erro ao tentar fazer publicação:", err)
      setError("Erro ao tentar fazer publicação. Tente novamente.")
    }
  }

  const handleUserClick = (userId) => {
    navigate(`/profile/${userId}`)
  }

  return (
    <Container>
      <Textarea
        icon={<IconSearch size={20} />}
        placeholder="Procure um usuário"
        value={searchTerm}
        onChange={handleSearch}
        autosize
        radius={8}
        style={{ position: "relative", zIndex: 1 }}
      />

      {filteredUsers.length > 0 && (
        <Box
          style={{
            position: "absolute",
            width: "100%",
            maxWidth: "60%",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 1,
            background: "white",
            borderRadius: 8,
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            marginTop: 10,
            padding: 10,
            marginLeft: 20,
          }}
        >
          {filteredUsers.map((user) => (
            
            <Paper
              key={user.userId}
              withBorder
              p={20}
              radius={8}
              mb={10}
              onClick={() => handleUserClick(user.userId)}
              style={{ cursor: "pointer" }}
            >
              <Group position="apart">
                <Flex align="center" gap={16} ml={20}>
                  <Avatar
                    width={50}
                    height={50}
                    src={user.profilePictureUrl}
                    radius="xl"
                    size="lg"
                  />
                  <Stack spacing={4}>
                    <Text weight={700}>Nome: {user.name}</Text>
                    <Text weight={700}>Time: {user.teamName}</Text>
                    <Text weight={700}>Estrelas: {user.stars}</Text>
                  </Stack>
                </Flex>
              </Group>
            </Paper>
          ))}
        </Box>
      )}

      <Space h={30} />

      <Title>Publicações</Title>

      <Space h={30} />

      <Text size={18} weight={700} mb={10}>
        Nova publicação
      </Text>

      <Paper withBorder p={20} radius={8} shadow="md">
        <Textarea
          placeholder="Título da publicação"
          w="100%"
          size="md"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          autosize
        />
        <Space h={20} />
        <Textarea
          placeholder="Descrição da publicação"
          w="100%"
          autosize
          size="xl"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {file && (
          <Center>
            <Image
              src={URL.createObjectURL(file)}
              alt="Imagem selecionada"
              radius="md"
              style={{
                height: 200,
                width: 200,
                marginTop: 20,
                marginBottom: 60,
              }}
            />
          </Center>
        )}
        <Space h={20} />

        <Flex spacing={16} justify="space-between">
          <FileButton onChange={setFile} accept="image/png,image/jpeg">
            {(props) => (
              <Button
                variant="outline"
                leftIcon={<IconPhoto size={16} />}
                {...props}
              >
                Imagem
              </Button>
            )}
          </FileButton>

          <Button variant="gradient" onClick={handleCreatePost}>
            Criar post
          </Button>
        </Flex>
      </Paper>

      <Space h={60} />

      {posts.map((post) => (
        <Box key={post.id}>
          <Text
            size={16}
            weight={700}
            style={{
              wordBreak: "break-word",
              overflowWrap: "break-word",
              maxHeight: "200px",
              overflowY: "auto",
            }}
          >
            {post.title}
          </Text>
          <Paper withBorder p={20} radius={12} shadow="md">
            {post.image && (
              <Center>
                <Image
                  src={post.image}
                  alt="Imagem do post"
                  withPlaceholder
                  radius="md"
                  style={{
                    width: 200,
                    height: 200,
                    marginBottom: 80,
                  }}
                />
              </Center>
            )}
            <Text
              style={{
                wordBreak: "break-word",
                overflowWrap: "break-word",
                maxHeight: "200px",
                overflowY: "auto",
              }}
            >
              {post.description}
            </Text>
          </Paper>
          <Space h={30} />
        </Box>
      ))}
    </Container>
  )
}
