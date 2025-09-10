const cities = [
  {
    id: 1,
    name: 'Ethereum NYC',
    location: 'New York, NY',
    members: 3250,
    upcomingEvents: 12,
    image: '/images/nyc.jpg',
    description: 'The largest Ethereum community in New York City. Join us for meetups, hackathons, and workshops.',
    tags: ['Ethereum', 'Smart Contracts', 'DeFi', 'NFTs'],
    founded: 2017
  },
  {
    id: 2,
    name: 'SF Crypto Devs',
    location: 'San Francisco, CA',
    members: 1980,
    upcomingEvents: 8,
    image: '/images/sf.jpg',
    description: 'San Francisco\'s premier community for blockchain developers and enthusiasts.',
    tags: ['Development', 'Web3', 'Smart Contracts', 'DApps'],
    founded: 2016
  },
  {
    id: 3,
    name: 'Austin Web3',
    location: 'Austin, TX',
    members: 1250,
    upcomingEvents: 5,
    image: '/images/austin.jpg',
    description: 'Connecting the Austin blockchain community through education and collaboration.',
    tags: ['Web3', 'Startups', 'Networking', 'Education'],
    founded: 2018
  },
  {
    id: 4,
    name: 'Global DAO Alliance',
    location: 'Remote',
    members: 8200,
    upcomingEvents: 15,
    image: '/images/dao-community.jpg',
    description: 'A global community of DAO enthusiasts and contributors working on decentralized governance.',
    tags: ['DAO', 'Governance', 'DeFi', 'Community'],
    founded: 2020
  },
  {
    id: 5,
    name: 'Miami DeFi',
    location: 'Miami, FL',
    members: 1870,
    upcomingEvents: 7,
    image: '/images/miami.jpg',
    description: 'Miami\'s hub for decentralized finance education and innovation.',
    tags: ['DeFi', 'Trading', 'Yield Farming', 'Liquidity'],
    founded: 2019
  },
  {
    id: 6,
    name: 'NFT Art Collective',
    location: 'Global',
    members: 5600,
    upcomingEvents: 10,
    image: '/images/nft-community.jpg',
    description: 'A global community of digital artists and NFT collectors pushing the boundaries of digital ownership.',
    tags: ['NFT', 'Digital Art', 'Collectibles', 'Creators'],
    founded: 2021
  }
];

export default function CityCommunities() {
  return (
    <div className="space-y-4">
      {cities.map((city) => (
        <div key={city.id} className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
          <div className="flex-shrink-0 h-12 w-12 bg-gray-200 rounded-lg overflow-hidden">
            {/* Replace with actual image */}
            <div className="h-full w-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold">
              {city.name.charAt(0)}
            </div>
          </div>
          <div className="ml-4 flex-1">
            <h3 className="text-sm font-medium text-gray-900">{city.name}</h3>
            <div className="flex text-xs text-gray-500">
              <span className="flex items-center">
                <svg className="h-3 w-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0116 8V6a2 2 0 012-2h.5a.5.5 0 00.5-.5V2.5a.5.5 0 00-.5-.5H4a2 2 0 00-2 2v14a2 2 0 002 2h8a.5.5 0 00.5-.5v-1.5a.5.5 0 00-.5-.5H6.5v-1.5a.5.5 0 01.5-.5h5.93zM3 20a1 1 0 100-2 1 1 0 000 2z" />
                </svg>
                {city.upcomingEvents} events
              </span>
              <span className="ml-3 flex items-center">
                <svg className="h-3 w-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0116 8V6a2 2 0 012-2h.5a.5.5 0 00.5-.5V2.5a.5.5 0 00-.5-.5H4a2 2 0 00-2 2v14a2 2 0 002 2h8a.5.5 0 00.5-.5v-1.5a.5.5 0 00-.5-.5H6.5v-1.5a.5.5 0 01.5-.5h5.93zM3 20a1 1 0 100-2 1 1 0 000 2z" />
                </svg>
                {city.members} members
              </span>
            </div>
          </div>
          <button className="ml-2 px-3 py-1 text-xs font-medium text-indigo-600 hover:text-indigo-800">
            Join
          </button>
        </div>
      ))}
      <button className="w-full mt-4 text-center text-sm font-medium text-indigo-600 hover:text-indigo-800">
        View all communities →
      </button>
    </div>
  );
}
