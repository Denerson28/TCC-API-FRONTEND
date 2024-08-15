import { Stack, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import UserItem from "../components/UserItem";

export default function Ranking() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");

    fetch("https://localhost:3001/User/ranking", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <Stack mt={20} w={250}>
      <Text size={20} weight={700}>
        Ranking
      </Text>
      {users.map((user, index) => (
        <UserItem key={user.userId} user={user} index={index} />
      ))}
    </Stack>
  );
}
