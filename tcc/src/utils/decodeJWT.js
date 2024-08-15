export function decodeJWT(token)  {
    const parts = token.split('.')
    if (parts.length !== 3) {
      throw new Error('Token JWT inválido')
    }
  
    const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/')
    const decodedPayload = atob(base64)
    return JSON.parse(decodedPayload)
  }