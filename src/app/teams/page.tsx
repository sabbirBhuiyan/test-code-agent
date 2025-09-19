import Image from 'next/image';

interface TeamMember {
  id: number;
  name: string;
  title: string;
  image: string;
  mobile: string;
  email: string;
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: 'Bjorn Ironside',
    title: 'CEO',
    image: '/next.svg', // Placeholder image
    mobile: '+1 (555) 123-4567',
    email: 'bjorn.ironside@example.com',
  },
  {
    id: 2,
    name: 'Freya Valkyrie',
    title: 'CTO',
    image: '/next.svg', // Placeholder image
    mobile: '+1 (555) 234-5678',
    email: 'freya.valkyrie@example.com',
  },
  {
    id: 3,
    name: 'Ragnar Lothbrok',
    title: 'Lead Developer',
    image: '/next.svg', // Placeholder image
    mobile: '+1 (555) 345-6789',
    email: 'ragnar.lothbrok@example.com',
  },
  {
    id: 4,
    name: 'Astrid Shieldmaiden',
    title: 'UI/UX Designer',
    image: '/next.svg', // Placeholder image
    mobile: '+1 (555) 456-7890',
    email: 'astrid.shieldmaiden@example.com',
  },
  {
    id: 5,
    name: 'Erik Bloodaxe',
    title: 'Marketing Manager',
    image: '/next.svg', // Placeholder image
    mobile: '+1 (555) 567-8901',
    email: 'erik.bloodaxe@example.com',
  },
  {
    id: 6,
    name: 'Ingrid Stormborn',
    title: 'Project Manager',
    image: '/next.svg', // Placeholder image
    mobile: '+1 (555) 678-9012',
    email: 'ingrid.stormborn@example.com',
  },
];

export default function TeamsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-12">Our Team</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {teamMembers.map((member) => (
          <div key={member.id} className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
              <Image
                src={member.image}
                alt={member.name}
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            </div>
            <h2 className="text-xl font-semibold mb-2">{member.name}</h2>
            <p className="text-gray-600 mb-4">{member.title}</p>
            <div className="text-sm text-gray-700">
              <p>Mobile: {member.mobile}</p>
              <p>Email: {member.email}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
