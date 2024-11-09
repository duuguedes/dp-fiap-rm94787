/* eslint-disable @typescript-eslint/no-unused-vars */
import { promises as fs } from 'node:fs'
import path from 'node:path'
import { NextResponse } from 'next/server'

export async function GET() {
  const file = await fs.readFile(process.cwd() + '/src/utils/db.json', 'utf-8')
  return NextResponse.json(JSON.parse(file))
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData()

    // Lê o conteúdo do db.json
    const fileData = await fs.readFile(
      path.join(process.cwd(), 'src/utils/db.json'),
      'utf-8'
    )
    const data = JSON.parse(fileData)

    // Diretório de uploads
    const uploadDir = path.join(process.cwd(), 'public/uploads')
    try {
      await fs.access(uploadDir)
    } catch {
      await fs.mkdir(uploadDir, { recursive: true })
    }

    // Salva a imagem
    let imagePath = ''
    const image = formData.get('image') as File

    if (!image || typeof image !== 'object' || !('arrayBuffer' in image)) {
      return NextResponse.json(
        { error: 'Invalid image', statusCode: 400 },
        { status: 400 }
      )
    }

    const bytes = await image.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const fileName = `${image.name}-${Date.now()}.png`
    imagePath = `/uploads/${fileName}`
    await fs.writeFile(path.join(uploadDir, fileName), buffer)

    // Cria o novo usuário
    const newUser = {
      id: formData.get('id'),
      name: formData.get('name'),
      rm: formData.get('rm'),
      password: formData.get('password'),
      cpf: formData.get('cpf'),
      rg: formData.get('rg'),
      profession: formData.get('profession'),
      image: imagePath, // caminho relativo para recuperar a imagem
    }

    // Adiciona o novo usuário ao JSON e salva
    data.users.push(newUser)
    await fs.writeFile(
      path.join(process.cwd(), 'src/utils/db.json'),
      JSON.stringify(data, null, 2)
    )

    return NextResponse.json(
      {
        message: 'User registered successfully',
        data: newUser,
        statusCode: 200,
      },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: 'Error registering user', statusCode: 500 },
      { status: 500 }
    )
  }
}
