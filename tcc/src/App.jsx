import "./App.css"
import PostsPage from "./pages/PostsPage"
import Ranking from "./pages/Ranking"
import Sidebar from "./pages/Sidebar"

import { AppShell, Aside, Navbar } from "@mantine/core"

function App() {
  return (
    <>
      <AppShell
        navbar={
          <Navbar width={{ base: 340 }} p="xs">
            <Sidebar />
          </Navbar>
        }
        header={<></>}
        aside={
          <Aside p="md" width={{ base: 250 }}>
            <Ranking />
          </Aside>
        }
      >
        <PostsPage />
      </AppShell>
    </>
  )
}

export default App
