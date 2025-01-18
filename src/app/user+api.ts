import { ExpoResponse, ExpoRequest } from "expo-router/server"

export async function POST(request:  ExpoRequest): Promise<ExpoResponse> {
  const { email, password } = await request.json()

  if (email === "dwander616@gmail.com" && password === "123") {
    return ExpoResponse.json({
      email,
      name: "David Wander",
    })
  }

  return new ExpoResponse("User or password incorrect!", {
    status: 404,
    headers: {
      "Content-type": "text/plain",
    }
  })

}