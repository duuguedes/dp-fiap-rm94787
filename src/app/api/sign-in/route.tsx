/* eslint-disable @typescript-eslint/no-unused-vars */
import { promises as fs } from 'node:fs'
import { NextResponse } from 'next/server'
import { UserType } from '@/types/user'

export async function POST(request: Request) {
  try {
    const { username, rm, password } = await request.json()

    const file = await fs.readFile(
      process.cwd() + '/src/utils/db.json',
      'utf-8'
    )
    const data = JSON.parse(file)

    const userExists = data.users.some(
      (user: UserType) =>
        (user.rm === rm || user.name === username) && user.password === password
    )

    if (!userExists) {
      return NextResponse.json(
        { error: 'User not found', statusCode: 401 },
        { status: 401 }
      )
    }

    return NextResponse.json(
      { message: 'Login successful', statusCode: 200 },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: 'Error while logging in', statusCode: 500 },
      { status: 500 }
    )
  }
}
