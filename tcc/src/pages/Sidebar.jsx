import { useEffect, useState } from "react";
import {
  Avatar,
  Divider,
  Flex,
  Space,
  Stack,
  Text,
} from "@mantine/core";
import {
  IconHome,
  IconLogout2,
  IconPresentation,
  IconUser,
  IconUserCircle,
  IconStar,
  IconCode,
} from "@tabler/icons-react";
import { useNav } from "../hooks/useNav";
import { decodeJWT } from "../utils/decodeJWT";
import SideBarButton from "../components/SideBarButton";

export default function Sidebar() {
  const navigate = useNav();
  const [user, setUser] = useState({ photo: "", stars: "", name: "Usuário", role: "Cargo" });

  useEffect(() => {
    try {
      const token = localStorage.getItem("jwtToken");
      const userPhoto = localStorage.getItem("userPhoto");
      const userStars = localStorage.getItem("userStars");

      if (token) {
        const decodedToken = decodeJWT(token);
        setUser({
          photo: userPhoto || "",
          stars: userStars || "Sem estrelas",
          name: decodedToken.unique_name,
          role: decodedToken.role,
        });
      }
    } catch (err) {
      console.error("Erro ao decodificar o token:", err);
    }
  }, []);

  return (
    <>
      <Flex gap={18} mt={20} align="center" justify="center">
        <Avatar radius={50} size="xl" src={user.photo} />

        <Stack spacing={4}>
          <Flex align="center" gap={4}>
            <IconUserCircle size={24} />
            <Text weight={700} size={20}>
              {user.name}
            </Text>
          </Flex>

          <Flex align="center" gap={4}>
            <IconCode size={24} />
            <Text weight={700}>{user.role}</Text>
          </Flex>

          <Flex align="center" gap={6}>
            <IconStar color="#2b3aa0" size={24} />
            <Text weight={700} size={26}>
              {user.stars}
            </Text>
          </Flex>
        </Stack>
      </Flex>

      <Space h={20} />

      <Divider size={2} />

      <Space h={20} />

      <Stack spacing={0} p={10}>
        <SideBarButton
          icon={<IconHome size={30} />}
          label="Início"
          onClick={() => setActiveTab("home")}
          isActive={true} // Exemplo de como poderia ser passado se estiver ativo
        />

        <SideBarButton
          icon={<IconUser size={30} />}
          label="Perfil"
          onClick={() => navigate("/profile")}
        />

        <SideBarButton
          icon={<IconPresentation size={30} />}
          label="Interações"
          onClick={() => navigate("/interations")}
        />

        <Space h={450} />

        <SideBarButton
          icon={<IconLogout2 size={30} />}
          label="Sair"
          onClick={() => navigate("/login")}
        />
      </Stack>
    </>
  );
}
