import { getUsers } from "./actions"
import { UserTable } from "./components/user-table"

export default async function UsersPage() {
  const { users, error } = await getUsers()

  if (error) {
    return <div className="container mx-auto py-10">Error: {error}</div>
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Users</h1>
      <UserTable initialUsers={users || []} />
    </div>
  )
}