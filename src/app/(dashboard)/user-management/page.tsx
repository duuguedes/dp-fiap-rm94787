import { UserType } from '@/types/user'
import UserManagementTable from './_components/user-management-table'

export default async function UserManagement() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user`, {
    cache: 'no-store',
  })
  const { users }: { users: UserType[] } = await response.json()

  return (
    <div className="w-full min-h-screen flex flex-col gap-8 items-center justify-center p-16">
      <div className="max-w-7xl my-0 mx-auto w-full flex flex-col gap-4 bg-custom-gray p-10 rounded-md">
        <h2 className="text-center text-4xl font-semibold">User Management</h2>

        <div className="w-full overflow-x-auto mt-8">
          <UserManagementTable users={users} />
        </div>
      </div>
    </div>
  )
}
