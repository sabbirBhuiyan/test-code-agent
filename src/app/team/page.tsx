
import React from 'react';

interface TeamMember {
  name: string;
  title: string;
  email: string;
  phone: string;
  image: string;
}

const teamMembers: TeamMember[] = [
  {
    name: 'Bjorn Ironside',
    title: 'Chief Executive Officer',
    email: 'bjorn.ironside@example.com',
    phone: '+1 (555) 123-4567',
    image: 'https://via.placeholder.com/150/CCCCCC/FFFFFF?text=BI',
  },
  {
    name: 'Freya Valkyrie',
    title: 'Chief Technology Officer',
    email: 'freya.valkyrie@example.com',
    phone: '+1 (555) 234-5678',
    image: 'https://via.placeholder.com/150/CCCCCC/FFFFFF?text=FV',
  },
  {
    name: 'Ragnar Lothbrok',
    title: 'Head of Product',
    email: 'ragnar.lothbrok@example.com',
    phone: '+1 (555) 345-6789',
    image: 'https://via.placeholder.com/150/CCCCCC/FFFFFF?text=RL',
  },
  {
    name: 'Astrid Shieldmaiden',
    title: 'Lead Designer',
    email: 'astrid.shieldmaiden@example.com',
    phone: '+1 (555) 456-7890',
    image: 'https://via.placeholder.com/150/CCCCCC/FFFFFF?text=AS',
  },
  {
    name: 'Erik Bloodaxe',
    title: 'Senior Developer',
    email: 'erik.bloodaxe@example.com',
    phone: '+1 (555) 567-8901',
    image: 'https://via.placeholder.com/150/CCCCCC/FFFFFF?text=EB',
  },
  {
    name: 'Ingrid Stormborn',
    title: 'Marketing Manager',
    email: 'ingrid.stormborn@example.com',
    phone: '+1 (555) 678-9012',
    image: 'https://via.placeholder.com/150/CCCCCC/FFFFFF?text=IS',
  },
];

const TeamsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-extrabold text-center text-gray-800 mb-12">Our Team</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-500 hover:scale-105 hover:shadow-2xl"
            >
              <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                <img
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
                  src={member.image}
                  alt={member.name}
                />
              </div>
              <div className="pt-20 pb-8 px-6 text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{member.name}</h2>
                <p className="text-blue-600 text-lg font-medium mb-4">{member.title}</p>
                <div className="text-gray-700 text-base space-y-2">
                  <p>
                    <a href={`mailto:${member.email}`} className="hover:underline text-purple-700">
                      {member.email}
                    </a>
                  </p>
                  <p>
                    <a href={`tel:${member.phone}`} className="hover:underline text-purple-700">
                      {member.phone}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamsPage;
