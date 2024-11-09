/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import Button from '@/components/button'
import Input from '@/components/input'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'
import ShortUniqueId from 'short-unique-id'

export default function SignUp() {
  const router = useRouter()

  const [form, setForm] = useState({
    name: '',
    password: '',
    confirmPassword: '',
    rm: '',
    cpf: '',
    rg: '',
    profession: '',
    image: null as File | null,
  })

  const [errors, setErrors] = useState({
    name: '',
    password: '',
    confirmPassword: '',
    rm: '',
    cpf: '',
    rg: '',
    profession: '',
    image: null,
  })

  function validateForm() {
    let isValid = true
    const newErrors = {
      name: '',
      password: '',
      confirmPassword: '',
      rm: '',
      cpf: '',
      rg: '',
      profession: '',
      image: null,
    }

    // Validação do Nome
    if (!form.name.trim()) {
      newErrors.name = 'Name is required'
      isValid = false
    } else if (form.name.length < 3) {
      newErrors.name = 'Name must have at least 3 characters'
      isValid = false
    }

    // Validação da Senha
    if (!form.password) {
      newErrors.password = 'Password is required'
      isValid = false
    } else if (form.password.length < 6) {
      newErrors.password = 'Password must have at least 6 characters'
      isValid = false
    }

    // Validação da Confirmação de Senha
    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
      isValid = false
    }

    // Validação do RM
    if (!form.rm.trim()) {
      newErrors.rm = 'RM is required'
      isValid = false
    }

    // Validação do CPF
    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/
    if (!form.cpf.trim()) {
      newErrors.cpf = 'CPF is required'
      isValid = false
    } else if (!cpfRegex.test(form.cpf)) {
      newErrors.cpf = 'Invalid CPF (format: xxx.xxx.xxx-xx)'
      isValid = false
    }

    // Validação do RG
    const rgRegex = /^\d{2}\.\d{3}\.\d{3}-\d{1}$/
    if (!form.rg.trim()) {
      newErrors.rg = 'RG is required'
      isValid = false
    } else if (!rgRegex.test(form.rg)) {
      newErrors.rg = 'Invalid RG (format: xx.xxx.xxx-x)'
      isValid = false
    }

    // Validação da Profissão
    if (!form.profession.trim()) {
      newErrors.profession = 'Profession is required'
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
      const uid = new ShortUniqueId({ length: 10 })
      const formData = new FormData()
      formData.append('id', uid.rnd())
      formData.append('name', form.name)
      formData.append('password', form.password)
      formData.append('rm', form.rm)
      formData.append('cpf', form.cpf)
      formData.append('rg', form.rg)
      formData.append('profession', form.profession)
      if (form.image) {
        formData.append('image', form.image)
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/user`,
        {
          method: 'POST',
          body: formData,
        }
      )

      const data = await response.json()

      if (data.statusCode !== 200) {
        toast.error('Error registering user')
        return
      }

      toast.success('User registered successfully!')
      setForm({
        name: '',
        password: '',
        confirmPassword: '',
        rm: '',
        cpf: '',
        rg: '',
        profession: '',
        image: null,
      })
      router.push('/sign-in')
    } catch (error) {
      toast.error('Error registering user')
    }
  }

  return (
    <div className="w-full min-h-screen flex flex-col gap-8 items-center justify-center">
      <div className="w-full md:w-[450px] flex flex-col gap-4 bg-custom-gray p-8 rounded-md">
        <h2 className="text-center text-3xl font-semibold">
          User Registration
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Input
              id="name"
              label="Name:"
              type="text"
              value={form.name}
              placeholder="Enter name"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              error={errors.name}
            />

            <Input
              id="password"
              label="Senha:"
              type="password"
              value={form.password}
              placeholder="Digite sua senha"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              error={errors.password}
            />

            <Input
              id="confirmPassword"
              label="Confirmar Senha:"
              type="password"
              value={form.confirmPassword}
              placeholder="Digite sua senha novamente"
              onChange={(e) =>
                setForm({ ...form, confirmPassword: e.target.value })
              }
              error={errors.confirmPassword}
            />

            <Input
              id="rm"
              label="RM:"
              type="text"
              value={form.rm}
              placeholder="Enter RM"
              onChange={(e) => setForm({ ...form, rm: e.target.value })}
              error={errors.rm}
            />

            <Input
              id="cpf"
              label="CPF:"
              type="text"
              value={form.cpf}
              placeholder="Enter CPF"
              onChange={(e) => setForm({ ...form, cpf: e.target.value })}
              error={errors.cpf}
            />

            <Input
              id="rg"
              label="RG:"
              type="text"
              value={form.rg}
              placeholder="Enter RG"
              onChange={(e) => setForm({ ...form, rg: e.target.value })}
              error={errors.rg}
            />

            <Input
              id="profession"
              label="Profession:"
              type="text"
              value={form.profession}
              placeholder="Enter profession"
              onChange={(e) => setForm({ ...form, profession: e.target.value })}
              error={errors.profession}
            />

            <Input
              id="image"
              label="Image:"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0]
                setForm({ ...form, image: file || null })
              }}
            />
          </div>
          <Button type="submit">Register</Button>
        </form>

        <Link href="/sign-in" className="text-center">
          <Button variant="ghost">Already have an account? Log in</Button>
        </Link>
      </div>
    </div>
  )
}
