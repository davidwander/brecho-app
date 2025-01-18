import { ExpoResponse, ExpoRequest } from "expo-router/server";

// Simulação de banco de dados em memória
let products: { id: number; name: string }[] = [];
let nextId = 1;

export async function POST(request: ExpoRequest): Promise<ExpoResponse> {
  const { name } = await request.json();

  if (!name) {
    return new ExpoResponse("O nome da peça é necessário ", {
      status: 400,
      headers: {
        "Content-type": "text/plain",
      },
    });
  }

  const newProduct = { id: nextId++, name };
  products.push(newProduct);

  return ExpoResponse.json(newProduct);
}

export async function GET(): Promise<ExpoResponse> {
  return ExpoResponse.json(products);
}
