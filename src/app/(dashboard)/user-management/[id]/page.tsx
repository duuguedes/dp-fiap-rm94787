/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { UserType } from '@/types/user'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { FaImage } from 'react-icons/fa'

interface UserDetailsProps {
  params: {
    id: string
  }
}

export default function UserDetails({ params }: UserDetailsProps) {
  const [user, setUser] = useState<UserType | null>(null)

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/${params.id}`
        )
        const data = await response.json()

        if (data.statusCode !== 200) {
          toast.error('Error loading user data')
          return
        }

        setUser(data.user)
      } catch (error) {
        toast.error('Error loading user data')
      }
    }

    fetchUser()
  }, [params.id])

  if (!user) {
    return <div>Usuário não encontrado</div>
  }

  return (
    <div className="w-full min-h-screen flex flex-col gap-8 items-center justify-center p-16">
      <div className="max-w-7xl my-0 mx-auto w-full flex flex-col gap-4 bg-custom-gray p-10 rounded-md">
        <h2 className="text-center text-3xl font-semibold mb-6">
          User Details
        </h2>

        <div className="bg-custom-gray p-6 rounded-lg">
          <div className="flex w-full gap-12">
            <div className="flex-1">
              {user.image ? (
                <Image
                  src={user.image}
                  alt={user.name}
                  width={320}
                  height={320}
                  className="min-w-80 min-h-80 w-80 h-80 rounded-lg object-cover"
                />
              ) : (
                <div className="bg-custom-gray-light min-w-80 min-h-80 w-80 h-80 rounded-lg flex flex-col items-center justify-center gap-2">
                  <FaImage className="text-neutral-400 w-28 h-28" />
                  <p className="text-neutral-400 text-lg">No image</p>
                </div>
              )}
            </div>

            <div className="flex-1 grid grid-cols-2 gap-4">
              <div>
                <p className="text-neutral-400 text-sm mb-1">ID</p>
                <p className="font-medium text-lg">{user.id}</p>
              </div>

              <div>
                <p className="text-neutral-400 text-sm mb-1">Name</p>
                <p className="font-medium text-lg">{user.name}</p>
              </div>

              <div>
                <p className="text-neutral-400 text-sm mb-1">RM</p>
                <p className="font-medium text-lg">{user.rm}</p>
              </div>

              <div>
                <p className="text-neutral-400 text-sm mb-1">CPF</p>
                <p className="font-medium text-lg">{user.cpf}</p>
              </div>

              <div>
                <p className="text-neutral-400 text-sm mb-1">RG</p>
                <p className="font-medium text-lg">{user.rg}</p>
              </div>

              <div>
                <p className="text-neutral-400 text-sm mb-1">Profession</p>
                <p className="font-medium text-lg">{user.profession}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
