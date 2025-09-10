import Link from 'next/link';

const events = [
  {
    id: 1,
    title: 'Web3 Hackathon 2023',
    date: '2023-11-15',
    time: '09:00 AM',
    location: 'Blockchain Center, New York',
    description: '48-hour hackathon focusing on building decentralized applications on Ethereum and Solana',
    attendees: 350,
    category: 'Hackathon',
    image: '/images/hackathon.jpg',
    tags: ['Blockchain', 'Ethereum', 'Solana', 'Smart Contracts']
  },
  {
    id: 2,
    title: 'DeFi Deep Dive',
    date: '2023-11-20',
    time: '02:00 PM',
    location: 'Crypto Hub, San Francisco',
    description: 'Learn about the latest DeFi protocols, yield farming strategies, and risk management',
    attendees: 120,
    category: 'Workshop',
    image: '/images/defi.jpg',
    tags: ['DeFi', 'Yield Farming', 'Liquidity Pools']
  },
  {
    id: 3,
    title: 'NFT Creators Meetup',
    date: '2023-12-05',
    time: '06:30 PM',
    location: 'Art Gallery, Miami',
    description: 'Networking for NFT artists and collectors. Special guest speakers from top NFT projects',
    attendees: 200,
    category: 'Networking',
    image: '/images/nft.jpg',
    tags: ['NFT', 'Digital Art', 'Collectibles']
  },
  {
    id: 4,
    title: 'DAO Governance Workshop',
    date: '2023-12-10',
    time: '11:00 AM',
    location: 'Online',
    description: 'Learn how to participate in DAO governance and make an impact in decentralized organizations',
    attendees: 180,
    category: 'Webinar',
    image: '/images/dao.jpg',
    tags: ['DAO', 'Governance', 'Voting']
  },
  {
    id: 5,
    title: 'Crypto Trading Masterclass',
    date: '2023-12-15',
    time: '03:00 PM',
    location: 'Trading Floor, Chicago',
    description: 'Advanced trading strategies, technical analysis, and risk management in volatile crypto markets',
    attendees: 90,
    category: 'Workshop',
    image: '/images/trading.jpg',
    tags: ['Trading', 'TA', 'Risk Management']
  }
];

export default function EventsList() {
  return (
    <div className="space-y-6">
      {events.map((event) => (
        <div key={event.id} className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <span className="px-2 py-1 text-xs font-medium bg-indigo-100 text-indigo-800 rounded-full">
                  {event.category}
                </span>
                <span className="text-sm text-gray-500">
                  {new Date(event.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                <Link href={`/events/${event.id}`} className="hover:text-indigo-600">
                  {event.title}
                </Link>
              </h3>
              <p className="text-gray-600 mb-4">{event.description}</p>
              <div className="flex items-center text-sm text-gray-500 space-x-4">
                <span className="flex items-center">
                  <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  {event.location}
                </span>
                <span className="flex items-center">
                  <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  {event.time}
                </span>
                <span className="flex items-center">
                  <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v1h8v-1zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-1a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v1h-3zM4.75 12.094A5.973 5.973 0 004 15v1H1v-1a3 3 0 013.75-2.906z" />
                  </svg>
                  {event.attendees} attending
                </span>
              </div>
            </div>
            <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              RSVP
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
