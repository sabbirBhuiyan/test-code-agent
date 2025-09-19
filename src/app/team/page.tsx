
import Image from 'next/image';

interface TeamMember {
  id: number;
  name: string;
  title: string;
  email: string;
  phone: string;
  imageUrl: string;
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: 'Bjorn Ironside',
    title: 'CEO & Founder',
    email: 'bjorn.ironside@example.com',
    phone: '+1 (555) 123-4567',
    imageUrl: '/vercel.svg', // Placeholder image
  },
  {
    id: 2,
    name: 'Freya Valkyrie',
    title: 'Chief Technology Officer',
    email: 'freya.valkyrie@example.com',
    phone: '+1 (555) 987-6543',
    imageUrl: '/next.svg', // Placeholder image
  },
  {
    id: 3,
    name: 'Erik the Red',
    title: 'Head of Product',
    email: 'erik.thered@example.com',
    phone: '+1 (555) 234-5678',
    imageUrl: '/globe.svg', // Placeholder image
  },
  {
    id: 4,
    name: 'Astrid Shieldmaiden',
    title: 'Lead Designer',
    email: 'astrid.shieldmaiden@example.com',
    phone: '+1 (555) 876-5432',
    imageUrl: '/file.svg', // Placeholder image
  },
  {
    id: 5,
    name: 'Ragnar Lothbrok',
    title: 'Marketing Director',
    email: 'ragnar.lothbrok@example.com',
    phone: '+1 (555) 345-6789',
    imageUrl: '/vercel.svg', // Placeholder image
  },
  {
    id: 6,
    name: 'Ingrid Stormborn',
    title: 'HR Manager',
    email: 'ingrid.stormborn@example.com',
    phone: '+1 (555) 765-4321',
    imageUrl: '/next.svg', // Placeholder image
  },
];

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-extrabold text-center text-gray-900 mb-12">Our Amazing Team</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-500 hover:scale-105 hover:shadow-2xl"
            >
              <div className="relative h-64 w-full">
                <Image
                  src={member.imageUrl}
                  alt={member.name}
                  layout="fill"
                  objectFit="contain"
                  className="p-4"
                />
              </div>
              <div className="p-8 text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">{member.name}</h2>
                <p className="text-xl text-indigo-600 font-semibold mb-4">{member.title}</p>
                <div className="text-gray-600 text-lg">
                  <p className="mb-1">Email: <a href={`mailto:${member.email}`} className="text-blue-600 hover:underline">{member.email}</a></p>
                  <p>Phone: <a href={`tel:${member.phone}`} className="text-blue-600 hover:underline">{member.phone}</a></p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
