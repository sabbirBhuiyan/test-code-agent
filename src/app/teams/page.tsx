import Image from 'next/image';

interface TeamMember {
  name: string;
  title: string;
  email: string;
  phone: string;
  imageUrl: string;
}

const teamMembers: TeamMember[] = [
  {
    name: 'Bjorn Ironside',
    title: 'CEO & Founder',
    email: 'bjorn.ironside@example.com',
    phone: '+1 (555) 123-4567',
    imageUrl: '/next.svg', // Placeholder image
  },
  {
    name: 'Freya Valkyrie',
    title: 'Chief Technology Officer',
    email: 'freya.valkyrie@example.com',
    phone: '+1 (555) 987-6543',
    imageUrl: '/vercel.svg', // Placeholder image
  },
  {
    name: 'Ragnar Lothbrok',
    title: 'Head of Product',
    email: 'ragnar.lothbrok@example.com',
    phone: '+1 (555) 234-5678',
    imageUrl: '/globe.svg', // Placeholder image
  },
  {
    name: 'Astrid Shieldmaiden',
    title: 'Lead Designer',
    email: 'astrid.shieldmaiden@example.com',
    phone: '+1 (555) 876-5432',
    imageUrl: '/file.svg', // Placeholder image
  },
];

export default function TeamsPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-extrabold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
          Our Esteemed Team
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-xl shadow-lg p-8 flex flex-col items-center transform transition duration-500 hover:scale-105 hover:shadow-2xl border border-gray-700"
            >
              <div className="relative w-32 h-32 mb-6 rounded-full overflow-hidden border-4 border-blue-500">
                <Image
                  src={member.imageUrl}
                  alt={member.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                />
              </div>
              <h2 className="text-3xl font-bold mb-2 text-blue-300">{member.name}</h2>
              <p className="text-lg text-purple-300 mb-4">{member.title}</p>
              <div className="text-center text-gray-400">
                <p className="text-md mb-1">Email: <a href={`mailto:${member.email}`} className="text-blue-400 hover:underline">{member.email}</a></p>
                <p className="text-md">Phone: <a href={`tel:${member.phone}`} className="text-blue-400 hover:underline">{member.phone}</a></p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
