import { Avatar, Group, Stack, Text } from "@mantine/core";

export default function UserItem({ user, index }) {
    const getBorderColor = (index) => {
      if (index === 0) return "#FFD700";
      if (index === 1) return "#C0C0C0";
      if (index === 2) return "#CD7F32";
      return "#228be6";
    };
  
    return (
      <Group mt={10}>
        <Avatar
          radius="xl"
          size="md"
          src={user.profilePictureUrl}
          style={{
            border: `3px solid ${getBorderColor(index)}`,
            padding: 2,
          }}
        />
        <Stack spacing={0} style={{ flex: 1 }}>
          <Text weight={700} style={{ overflowWrap: "break-word", whiteSpace: "normal" }}>
            {user.name}
          </Text>
          <Text size={14} color="gray">
            {user.stars} estrelas
          </Text>
        </Stack>
      </Group>
    );
  }
  