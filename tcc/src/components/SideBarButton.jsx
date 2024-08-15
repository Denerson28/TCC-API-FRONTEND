import { Flex, UnstyledButton, Text } from "@mantine/core"

export default function SideBarButton({ icon, label, onClick, isActive = false }) {
  return (
    <UnstyledButton
      onClick={onClick}
      style={{
        backgroundColor: isActive ? "#b1b8e4" : "transparent",
        borderRadius: 8,
        padding: "10px 10px",
      }}
    >
      <Flex gap={8}>
        {icon}
        <Text size={20} weight={700}>{label}</Text>
      </Flex>
    </UnstyledButton>
  );
}
