import { getUsers } from '@/app/actions';
import { UsersTable } from '@/components/users/users-table';

export default async function UsersPage() {
  const { users, error } = await getUsers();

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  if (!users || users.length === 0) {
    return <div className="p-4 text-gray-500">No users found.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <UsersTable users={users} />
    </div>
  );
}
