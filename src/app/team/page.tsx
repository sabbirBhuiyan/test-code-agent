
import React from 'react';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  email: string;
  phone: string;
  image: string; // Placeholder for an image
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: 'Bjorn Ironside',
    role: 'CEO & Founder',
    email: 'bjorn.ironside@example.com',
    phone: '+1 (555) 123-4567',
    image: 'https://via.placeholder.com/150/cccccc/ffffff?text=BI',
  },
  {
    id: 2,
    name: 'Freya Valkyrie',
    role: 'Chief Technology Officer',
    email: 'freya.valkyrie@example.com',
    phone: '+1 (555) 987-6543',
    image: 'https://via.placeholder.com/150/cccccc/ffffff?text=FV',
  },
  {
    id: 3,
    name: 'Erik the Red',
    role: 'Head of Product',
    email: 'erik.thered@example.com',
    phone: '+1 (555) 234-5678',
    image: 'https://via.placeholder.com/150/cccccc/ffffff?text=ER',
  },
  {
    id: 4,
    name: 'Astrid Shieldmaiden',
    role: 'Lead Designer',
    email: 'astrid.shieldmaiden@example.com',
    phone: '+1 (555) 876-5432',
    image: 'https://via.placeholder.com/150/cccccc/ffffff?text=AS',
  },
  {
    id: 5,
    name: 'Ragnar Lothbrok',
    role: 'Marketing Director',
    email: 'ragnar.lothbrok@example.com',
    phone: '+1 (555) 345-6789',
    image: 'https://via.placeholder.com/150/cccccc/ffffff?text=RL',
  },
  {
    id: 6,
    name: 'Ingrid Stormborn',
    role: 'HR Manager',
    email: 'ingrid.stormborn@example.com',
    phone: '+1 (555) 765-4321',
    image: 'https://via.placeholder.com/150/cccccc/ffffff?text=IS',
  },
];

const TeamPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-extrabold text-center text-gray-900 mb-12">Our Esteemed Team</h1>
        <p className="text-xl text-center text-gray-700 mb-16 max-w-3xl mx-auto">
          Meet the brilliant minds behind our success. Each member brings unique skills and passion to our mission, driving innovation and excellence.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-500 hover:scale-105 hover:shadow-2xl"
            >
              <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                <img
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 h-32 w-32 rounded-full object-cover border-4 border-white shadow-md"
                  src={member.image}
                  alt={member.name}
                />
              </div>
              <div className="pt-20 pb-8 px-6 text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">{member.name}</h2>
                <p className="text-lg text-purple-700 font-semibold mb-4">{member.role}</p>
                <div className="text-gray-600 text-base space-y-2">
                  <p>
                    <strong className="text-gray-800">Email:</strong>{' '}
                    <a href={`mailto:${member.email}`} className="text-blue-600 hover:underline">
                      {member.email}
                    </a>
                  </p>
                  <p>
                    <strong className="text-gray-800">Phone:</strong>{' '}
                    <a href={`tel:${member.phone}`} className="text-blue-600 hover:underline">
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

export default TeamPage;
