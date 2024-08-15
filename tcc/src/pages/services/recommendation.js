import { useState } from "react"
const [userId, setUserId] = useState("")

export async function recommendation() {
    const token = localStorage.getItem("jwtToken")
  
    fetch(`https://localhost:3001/User/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setUserId(data))
}
