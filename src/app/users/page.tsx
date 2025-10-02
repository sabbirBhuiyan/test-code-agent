
import { UsersTable } from '@/components/users/users-table';
import { getUsers } from '@/lib/actions';
import { User } from '@/lib/schemas';

export default async function UsersPage() {
  let users: User[] = [];
  let error: string | null = null;

  try {
    users = await getUsers();
  } catch (e: unknown) {
    console.error("Failed to fetch users:", e);
    error = "Failed to load users. Please try again later.";
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Users</h1>
      {error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <UsersTable users={users} />
      )}
    </div>
  );
}
