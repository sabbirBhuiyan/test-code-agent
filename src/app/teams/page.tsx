
import React from 'react';

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
    name: 'Bjorn Ironside',
    role: 'Lead Developer',
    email: 'bjorn.ironside@example.com',
    phone: '+1 (555) 123-4567',
    imageUrl: 'https://via.placeholder.com/150/FF5733/FFFFFF?text=BI',
  },
  {
    id: 2,
    name: 'Freya Valkyrie',
    role: 'UI/UX Designer',
    email: 'freya.valkyrie@example.com',
    phone: '+1 (555) 987-6543',
    imageUrl: 'https://via.placeholder.com/150/33FF57/FFFFFF?text=FV',
  },
  {
    id: 3,
    name: 'Ragnar Lothbrok',
    role: 'Project Manager',
    email: 'ragnar.lothbrok@example.com',
    phone: '+1 (555) 246-8010',
    imageUrl: 'https://via.placeholder.com/150/3357FF/FFFFFF?text=RL',
  },
  {
    id: 4,
    name: 'Astrid Shieldmaiden',
    role: 'Frontend Engineer',
    email: 'astrid.shieldmaiden@example.com',
    phone: '+1 (555) 112-2334',
    imageUrl: 'https://via.placeholder.com/150/FFFF33/000000?text=AS',
  },
  {
    id: 5,
    name: 'Erik the Red',
    role: 'Backend Engineer',
    email: 'erik.red@example.com',
    phone: '+1 (555) 334-4556',
    imageUrl: 'https://via.placeholder.com/150/FF33FF/FFFFFF?text=ER',
  },
];

const TeamsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-extrabold text-center text-gray-900 mb-12">Our Team</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-500 hover:scale-105 hover:shadow-2xl"
            >
              <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                <img
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 h-32 w-32 rounded-full object-cover border-4 border-white shadow-md"
                  src={member.imageUrl}
                  alt={member.name}
                />
              </div>
              <div className="pt-20 pb-8 px-6 text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">{member.name}</h2>
                <p className="text-lg text-purple-700 font-semibold mb-4">{member.role}</p>
                <div className="text-gray-700 space-y-2">
                  <p className="flex items-center justify-center text-md">
                    <svg className="w-5 h-5 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                    </svg>
                    {member.email}
                  </p>
                  <p className="flex items-center justify-center text-md">
                    <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                    </svg>
                    {member.phone}
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
