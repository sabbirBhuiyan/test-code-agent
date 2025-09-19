import Image from "next/image";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  email: string;
  phone: string;
  imageUrl: string;
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Bjorn Ironside",
    role: "Lead Developer",
    email: "bjorn.ironside@example.com",
    phone: "+1 (555) 123-4567",
    imageUrl: "/next.svg", // Placeholder image
  },
  {
    id: 2,
    name: "Freya Valkyrie",
    role: "UI/UX Designer",
    email: "freya.valkyrie@example.com",
    phone: "+1 (555) 987-6543",
    imageUrl: "/next.svg", // Placeholder image
  },
  {
    id: 3,
    name: "Ragnar Lothbrok",
    role: "Project Manager",
    email: "ragnar.lothbrok@example.com",
    phone: "+1 (555) 234-5678",
    imageUrl: "/next.svg", // Placeholder image
  },
  {
    id: 4,
    name: "Astrid Shieldmaiden",
    role: "Frontend Developer",
    email: "astrid.shieldmaiden@example.com",
    phone: "+1 (555) 876-5432",
    imageUrl: "/next.svg", // Placeholder image
  },
  {
    id: 5,
    name: "Erik the Red",
    role: "Backend Developer",
    email: "erik.red@example.com",
    phone: "+1 (555) 345-6789",
    imageUrl: "/next.svg", // Placeholder image
  },
  {
    id: 6,
    name: "Ingrid Stormborn",
    role: "QA Engineer",
    email: "ingrid.stormborn@example.com",
    phone: "+1 (555) 765-4321",
    imageUrl: "/next.svg", // Placeholder image
  },
];

export default function TeamsPage() {
  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20">
      <h1 className="text-4xl font-bold text-center mb-12">Our Team</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {teamMembers.map((member) => (
          <div
            key={member.id}
            className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg transform transition duration-300 hover:scale-105"
          >
            <Image
              className="rounded-full mb-4"
              src={member.imageUrl}
              alt={member.name}
              width={96}
              height={96}
            />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {member.name}
            </h2>
            <p className="text-md text-gray-600 dark:text-gray-400 mb-1">
              {member.role}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              {member.email}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              {member.phone}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
