/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import Button from '@/components/button'
import Input from '@/components/input'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'

export default function SignIn() {
  const router = useRouter()

  const [form, setForm] = useState({
    username: '',
    password: '',
  })

  const [errors, setErrors] = useState({
    username: '',
    password: '',
  })

  function validateForm() {
    let isValid = true
    const newErrors = {
      username: '',
      password: '',
    }

    // Validação do RM
    if (!form.username.trim()) {
      newErrors.username = 'RM is required'
      isValid = false
    }

    // Validação da Senha
    if (!form.password) {
      newErrors.password = 'Password is required'
      isValid = false
    } else if (form.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/sign-in`,
        {
          method: 'POST',
          body: JSON.stringify({
            rm: form.username,
            password: form.password,
          }),
        }
      )
      const data = await response.json()

      if (data.statusCode === 401) {
        toast.error('Invalid username or password')
        return
      }

      toast.success('User logged in successfully!')
      setForm({
        username: '',
        password: '',
      })

      router.push('/user-management')
    } catch (error) {
      toast.error('Error logging in user')
    }
  }

  return (
    <div className="w-full min-h-screen flex flex-col gap-8 items-center justify-center">
      <div className="w-full md:w-[450px] flex flex-col gap-4 bg-custom-gray p-8 rounded-md">
        <h2 className="text-center text-3xl font-semibold">User Login</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Input
              id="username"
              label="Username:"
              type="text"
              value={form.username}
              placeholder="Enter RM"
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              error={errors.username}
            />
            <Input
              id="password"
              label="Password:"
              type="password"
              value={form.password}
              placeholder="Enter password"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              error={errors.password}
            />
          </div>
          <Button type="submit">Login</Button>
        </form>

        <Link href="/sign-up" className="text-center">
          <Button variant="ghost">Don&apos;t have an account? Sign up</Button>
        </Link>
      </div>
    </div>
  )
}
