import { useNavigate } from "react-router-dom"

export const useNav = () => {
  const navigate = useNavigate()

  return (path: string, options?: { replace?: boolean }) => {
    return navigate(path, options)
  }
}
