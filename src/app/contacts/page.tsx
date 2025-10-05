
export default function ContactsPage() {
  const teamMembers = [
    {
      name: "Bjørnar Håkonsson",
      role: "Chief Executive Officer",
      address: "Storgata 1, 0155 Oslo, Norway",
      phone: "+47 123 45 678",
    },
    {
      name: "Gudrun Ingvaldsdatter",
      role: "Chief Technology Officer",
      address: "Kirkegata 2, 5017 Bergen, Norway",
      phone: "+47 234 56 789",
    },
    {
      name: "Øyvind Sigurdsson",
      role: "Lead Software Engineer",
      address: "Dronningens gate 3, 7011 Trondheim, Norway",
      phone: "+47 345 67 890",
    },
    {
      name: "Ragnhild Eiriksdatter",
      role: "Product Manager",
      address: "Strandveien 4, 9008 Tromsø, Norway",
      phone: "+47 456 78 901",
    },
  ];

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold text-center mb-12">Our Team in Norway</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {teamMembers.map((member, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transform transition duration-300 hover:scale-105">
            <h2 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">{member.name}</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">{member.role}</p>
            <div className="text-gray-700 dark:text-gray-300">
              <p className="flex items-center mb-1">
                <svg className="w-5 h-5 mr-2 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                {member.address}
              </p>
              <p className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                {member.phone}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
