/* eslint-disable @typescript-eslint/no-unused-vars */
import { promises as fs } from 'node:fs'
import { NextResponse } from 'next/server'
import { UserType } from '@/types/user'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id
  const file = await fs.readFile(process.cwd() + '/src/utils/db.json', 'utf-8')
  const data = JSON.parse(file)

  if (!id) {
    return NextResponse.json(data.users)
  }

  const user = data.users.find((user: UserType) => user.id === id)

  if (!user) {
    return NextResponse.json(
      { error: 'User not found', statusCode: 404 },
      { status: 404 }
    )
  }

  // Se o usuário tem uma imagem salva, lê o arquivo
  if (user.image) {
    try {
      const imagePath = process.cwd() + '/public' + user.image
      const imageBuffer = await fs.readFile(imagePath)
      const base64Image = `data:image/png;base64,${imageBuffer.toString(
        'base64'
      )}`
      user.image = base64Image
    } catch (error) {
      user.image = '' // Limpa o caminho da imagem se houver erro
    }
  }

  return NextResponse.json(
    { message: 'User found successfully', user, statusCode: 200 },
    { status: 200 }
  )
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id
  const body = await request.json()
  const file = await fs.readFile(process.cwd() + '/src/utils/db.json', 'utf-8')
  const data = JSON.parse(file)

  const userIndex = data.users.findIndex((user: UserType) => user.id === id)

  if (userIndex === -1) {
    return NextResponse.json(
      { error: 'User not found', statusCode: 404 },
      { status: 404 }
    )
  }

  data.users[userIndex] = {
    ...data.users[userIndex],
    ...body,
  }

  await fs.writeFile(
    process.cwd() + '/src/utils/db.json',
    JSON.stringify(data, null, 2)
  )

  return NextResponse.json({
    message: 'User updated successfully',
    data: data.users[userIndex],
    statusCode: 200,
  })
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id
  const file = await fs.readFile(process.cwd() + '/src/utils/db.json', 'utf-8')
  const data = JSON.parse(file)

  const userIndex = data.users.findIndex((user: UserType) => user.id === id)

  if (userIndex === -1) {
    return NextResponse.json(
      { error: 'User not found', statusCode: 404 },
      { status: 404 }
    )
  }

  data.users.splice(userIndex, 1)
  await fs.writeFile(
    process.cwd() + '/src/utils/db.json',
    JSON.stringify(data, null, 2)
  )

  return NextResponse.json(
    { message: 'User removed successfully', statusCode: 200 },
    { status: 200 }
  )
}
