
import { UsersTable } from '@/components/users/users-table';
import { getUsers } from '@/lib/actions';

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Users</h1>
      <UsersTable users={users} />
    </div>
  );
}
