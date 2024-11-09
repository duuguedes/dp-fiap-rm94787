/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import Alert from '@/components/alert'
import Button from '@/components/button'
import { UserType } from '@/types/user'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { BiEdit } from 'react-icons/bi'
import { RiDeleteBin6Line } from 'react-icons/ri'
import UserManagementEditModal from './user-management-edit-modal'
import toast from 'react-hot-toast'

interface UserManagementTableProps {
  users: UserType[]
}

export default function UserManagementTable({
  users,
}: UserManagementTableProps) {
  const router = useRouter()
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null)
  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  async function handleEdit(e: React.MouseEvent, user: UserType) {
    e.stopPropagation()
    setSelectedUser(user)
    setIsEditModalOpen(true)
  }

  async function handleDelete() {
    try {
      if (!selectedUser) return

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/${selectedUser.id}`,
        {
          method: 'DELETE',
        }
      )

      const data = await response.json()

      if (data.statusCode !== 200) {
        toast.error('Error removing user')
        return
      }

      toast.success('User removed successfully!')
      setIsAlertOpen(false)
      router.refresh()
    } catch (error) {
      toast.error('Error removing user')
    }
  }

  return (
    <>
      <table className="w-full">
        <thead>
          <tr className="bg-custom-gray-light">
            <th className="p-4 text-left">ID</th>
            <th className="p-4 text-left">Name</th>
            <th className="p-4 text-left">RM</th>
            <th className="p-4 text-left">CPF</th>
            <th className="p-4 text-left">RG</th>
            <th className="p-4 text-left">Profession</th>
            <th className="p-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className="cursor-pointer bg-neutral-800/30 hover:bg-custom-gray odd:bg-neutral-800/70"
              onClick={() => router.push(`/user-management/${user.id}`)}
            >
              <td className="p-4">{user.id}</td>
              <td className="p-4">{user.name}</td>
              <td className="p-4">{user.rm}</td>
              <td className="p-4">{user.cpf}</td>
              <td className="p-4">{user.rg}</td>
              <td className="p-4">{user.profession}</td>
              <td className="p-4" onClick={(e) => e.stopPropagation()}>
                <div className="flex gap-2">
                  <button
                    className="flex justify-center items-center"
                    onClick={(e) => handleEdit(e, user)}
                  >
                    <BiEdit className="text-neutral-400 w-6 h-6" />
                  </button>
                  <button
                    className="flex justify-center items-center"
                    onClick={(e) => {
                      e.stopPropagation()
                      setIsAlertOpen(true)
                      setSelectedUser(user)
                    }}
                  >
                    <RiDeleteBin6Line className="text-neutral-400 w-6 h-6" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Alert
        title="Are you sure you want to delete this user?"
        isOpen={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
      >
        <Button variant="destructive" onClick={handleDelete}>
          Remove
        </Button>
      </Alert>

      <UserManagementEditModal
        selectedUser={selectedUser}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />
    </>
  )
}
