/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import Button from '@/components/button'
import Input from '@/components/input'
import { UserType } from '@/types/user'
import { useRouter } from 'next/navigation'
import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast'

interface UserManagementEditModalProps {
  selectedUser: UserType | null
  isOpen: boolean
  onClose: () => void
}

export default function UserManagementEditModal({
  selectedUser,
  isOpen,
  onClose,
}: UserManagementEditModalProps) {
  const router = useRouter()
  const [editForm, setEditForm] = useState<UserType>({
    id: '',
    name: '',
    password: '',
    rm: '',
    cpf: '',
    rg: '',
    profession: '',
    image: '',
  })

  useEffect(() => {
    if (selectedUser) {
      setEditForm(selectedUser)
    }
  }, [selectedUser])

  async function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/${editForm.id}`,
        {
          method: 'PUT',
          body: JSON.stringify(editForm),
        }
      )

      const data = await response.json()

      if (data.statusCode !== 200) {
        toast.error('Error updating user')
        return
      }

      toast.success('User updated successfully!')
      onClose()
      router.refresh()
    } catch (error) {
      toast.error('Error updating user')
    }
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 cursor-pointer"
      onClick={onClose}
    >
      <div
        className="bg-custom-gray rounded-lg p-6 max-w-md w-full cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold">Edit User</h2>
          </div>

          <form onSubmit={handleUpdate} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Input
                id="name"
                label="Name:"
                type="text"
                value={editForm.name}
                onChange={(e) =>
                  setEditForm({ ...editForm, name: e.target.value })
                }
              />
              <Input
                id="password"
                label="Password:"
                type="password"
                value={editForm.password}
                onChange={(e) =>
                  setEditForm({ ...editForm, password: e.target.value })
                }
              />
              <Input
                id="rm"
                label="RM:"
                type="text"
                value={editForm.rm}
                disabled
                onChange={(e) =>
                  setEditForm({ ...editForm, rm: e.target.value })
                }
              />
              <Input
                id="cpf"
                label="CPF:"
                type="text"
                value={editForm.cpf}
                onChange={(e) =>
                  setEditForm({ ...editForm, cpf: e.target.value })
                }
              />
              <Input
                id="rg"
                label="RG:"
                type="text"
                value={editForm.rg}
                onChange={(e) =>
                  setEditForm({ ...editForm, rg: e.target.value })
                }
              />
              <Input
                id="profession"
                label="Profession:"
                type="text"
                value={editForm.profession}
                onChange={(e) =>
                  setEditForm({ ...editForm, profession: e.target.value })
                }
              />
              <Input
                id="image"
                label="Image:"
                type="text"
                value={editForm.image}
                disabled
                onChange={(e) =>
                  setEditForm({ ...editForm, image: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col gap-2">
              <Button type="submit">Update</Button>
              <Button variant="secondary" onClick={onClose}>
                Close
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
