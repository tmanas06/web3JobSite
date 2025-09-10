export default function FreelancersPage() {
  const gigs = [
    {
      id: 1,
      title: 'Website Redesign',
      client: 'Startup Inc.',
      budget: '$2,000 - $5,000',
      posted: '1 day ago',
      skills: ['Web Design', 'UI/UX', 'Responsive Design'],
      duration: '1-3 months',
      level: 'Intermediate'
    },
    {
      id: 2,
      title: 'Mobile App Development',
      client: 'MobileFirst',
      budget: '$5,000 - $10,000',
      posted: '3 days ago',
      skills: ['React Native', 'Firebase', 'API Integration'],
      duration: '3-6 months',
      level: 'Expert'
    },
    {
      id: 3,
      title: 'E-commerce Development',
      client: 'ShopLocal',
      budget: '$3,000 - $7,000',
      posted: '1 week ago',
      skills: ['Shopify', 'Liquid', 'JavaScript'],
      duration: '2-4 months',
      level: 'Intermediate'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Freelance Gigs</h1>
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {gigs.map((gig) => (
            <li key={gig.id} className="hover:bg-gray-50">
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <p className="text-lg font-medium text-indigo-600">
                    {gig.title}
                  </p>
                  <div className="ml-2 flex-shrink-0 flex">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                      {gig.level}
                    </span>
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center text-sm text-gray-600">
                      {gig.client}
                    </p>
                    <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                      Budget: {gig.budget}
                    </p>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                    Duration: {gig.duration}
                  </div>
                </div>
                <div className="mt-2">
                  <div className="flex flex-wrap gap-2 mt-2">
                    {gig.skills.map((skill, index) => (
                      <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-xs text-gray-500">Posted {gig.posted}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
