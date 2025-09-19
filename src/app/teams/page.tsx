import React from 'react';

interface TeamMember {
  name: string;
  title: string;
  email: string;
  phone: string;
  image: string; // Placeholder for an image
}

const teamMembers: TeamMember[] = [
  {
    name: "Bjorn Ironside",
    title: "CEO",
    email: "bjorn.ironside@example.com",
    phone: "+1-555-123-4567",
    image: "https://via.placeholder.com/150/cccccc/ffffff?text=Bjorn"
  },
  {
    name: "Freya Valkyrie",
    title: "CTO",
    email: "freya.valkyrie@example.com",
    phone: "+1-555-987-6543",
    image: "https://via.placeholder.com/150/cccccc/ffffff?text=Freya"
  },
  {
    name: "Ragnar Lothbrok",
    title: "Lead Developer",
    email: "ragnar.lothbrok@example.com",
    phone: "+1-555-234-5678",
    image: "https://via.placeholder.com/150/cccccc/ffffff?text=Ragnar"
  },
  {
    name: "Astrid Shieldmaiden",
    title: "Product Manager",
    email: "astrid.shieldmaiden@example.com",
    phone: "+1-555-876-5432",
    image: "https://via.placeholder.com/150/cccccc/ffffff?text=Astrid"
  },
  {
    name: "Erik the Red",
    title: "Marketing Director",
    email: "erik.thered@example.com",
    phone: "+1-555-345-6789",
    image: "https://via.placeholder.com/150/cccccc/ffffff?text=Erik"
  },
  {
    name: "Ingrid Stormborn",
    title: "UI/UX Designer",
    email: "ingrid.stormborn@example.com",
    phone: "+1-555-765-4321",
    image: "https://via.placeholder.com/150/cccccc/ffffff?text=Ingrid"
  }
];

const TeamsPage: React.FC = () => {
  return (
    <div className="font-sans p-5 max-w-6xl mx-auto">
      <h1 className="text-center text-gray-800 mb-10 text-4xl font-bold">Our Team</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-center">
        {teamMembers.map((member, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-5 text-center transition-transform duration-300 ease-in-out hover:-translate-y-1">
            <img
              src={member.image}
              alt={member.name}
              className="w-36 h-36 rounded-full object-cover mb-4 border-4 border-gray-300 mx-auto"
            />
            <h2 className="text-gray-800 text-xl font-semibold mb-1">{member.name}</h2>
            <p className="text-gray-600 text-base mb-2">{member.title}</p>
            <p className="text-gray-700 text-sm">Email: <a href={`mailto:${member.email}`} className="text-blue-600 hover:underline">{member.email}</a></p>
            <p className="text-gray-700 text-sm">Phone: {member.phone}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamsPage;