import Link from 'next/link';
import { 
  MapPinIcon, 
  ClockIcon, 
  UsersIcon,
  CalendarIcon,
  ArrowRightIcon,
  SparklesIcon,
  StarIcon,
  GlobeAltIcon,
  VideoCameraIcon
} from '@heroicons/react/24/outline';

const events = [
  {
    id: 1,
    title: 'Web3 Hackathon 2024',
    date: '2024-01-15',
    time: '09:00 AM',
    location: 'Blockchain Center, New York',
    description: '48-hour hackathon focusing on building decentralized applications on Ethereum and Solana. Win $50K in prizes!',
    attendees: 350,
    category: 'Hackathon',
    image: '/images/hackathon.jpg',
    tags: ['Blockchain', 'Ethereum', 'Solana', 'Smart Contracts'],
    featured: true,
    online: false,
    price: 'Free',
    organizer: 'Ethereum Foundation',
    rating: 4.9
  },
  {
    id: 2,
    title: 'DeFi Deep Dive Workshop',
    date: '2024-01-20',
    time: '02:00 PM',
    location: 'Crypto Hub, San Francisco',
    description: 'Learn about the latest DeFi protocols, yield farming strategies, and risk management from industry experts',
    attendees: 120,
    category: 'Workshop',
    image: '/images/defi.jpg',
    tags: ['DeFi', 'Yield Farming', 'Liquidity Pools'],
    featured: true,
    online: true,
    price: '$99',
    organizer: 'DeFi Alliance',
    rating: 4.8
  },
  {
    id: 3,
    title: 'NFT Creators Meetup',
    date: '2024-02-05',
    time: '06:30 PM',
    location: 'Art Gallery, Miami',
    description: 'Networking for NFT artists and collectors. Special guest speakers from top NFT projects and marketplaces',
    attendees: 200,
    category: 'Networking',
    image: '/images/nft.jpg',
    tags: ['NFT', 'Digital Art', 'Collectibles'],
    featured: false,
    online: false,
    price: 'Free',
    organizer: 'NFT Miami',
    rating: 4.7
  },
  {
    id: 4,
    title: 'DAO Governance Masterclass',
    date: '2024-02-10',
    time: '11:00 AM',
    location: 'Online',
    description: 'Learn how to participate in DAO governance and make an impact in decentralized organizations',
    attendees: 180,
    category: 'Webinar',
    image: '/images/dao.jpg',
    tags: ['DAO', 'Governance', 'Voting'],
    featured: false,
    online: true,
    price: '$49',
    organizer: 'DAO University',
    rating: 4.6
  },
  {
    id: 5,
    title: 'Crypto Trading Masterclass',
    date: '2024-02-15',
    time: '03:00 PM',
    location: 'Trading Floor, Chicago',
    description: 'Advanced trading strategies, technical analysis, and risk management in volatile crypto markets',
    attendees: 90,
    category: 'Workshop',
    image: '/images/trading.jpg',
    tags: ['Trading', 'Technical Analysis', 'Risk Management'],
    featured: true,
    online: false,
    price: '$199',
    organizer: 'Crypto Trading Pro',
    rating: 4.8
  }
];

const getCategoryColor = (category: string) => {
  const colors = {
    'Hackathon': 'from-purple-500 to-pink-500',
    'Workshop': 'from-blue-500 to-cyan-500',
    'Networking': 'from-green-500 to-emerald-500',
    'Webinar': 'from-orange-500 to-red-500',
    'Conference': 'from-indigo-500 to-purple-500'
  };
  return colors[category as keyof typeof colors] || 'from-gray-500 to-gray-600';
};

const getCategoryIcon = (category: string) => {
  const icons = {
    'Hackathon': '🏆',
    'Workshop': '🔧',
    'Networking': '🤝',
    'Webinar': '💻',
    'Conference': '🎤'
  };
  return icons[category as keyof typeof icons] || '📅';
};

export default function EventsList() {
  return (
    <div className="space-y-6">
      {events.map((event, index) => (
        <div key={event.id} className={`card p-6 group hover:shadow-xl transition-all duration-300 animate-fadeInUp ${event.featured ? 'ring-2 ring-primary/20' : ''}`} style={{ animationDelay: `${index * 0.1}s` }}>
          {event.featured && (
            <div className="flex items-center text-primary text-sm font-medium mb-4">
              <SparklesIcon className="h-4 w-4 mr-1" />
              Featured Event
            </div>
          )}
          
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Event Image/Icon */}
            <div className="lg:w-1/4">
              <div className={`w-full h-48 lg:h-full rounded-xl bg-gradient-to-br ${getCategoryColor(event.category)} flex items-center justify-center text-6xl relative overflow-hidden`}>
                <span className="text-white/80">{getCategoryIcon(event.category)}</span>
                {event.online && (
                  <div className="absolute top-3 right-3 flex items-center space-x-1 px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs">
                    <VideoCameraIcon className="h-3 w-3" />
                    <span>Online</span>
                  </div>
                )}
              </div>
            </div>
            
            {/* Event Details */}
            <div className="lg:w-3/4">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <span className={`px-3 py-1 text-xs font-medium text-white rounded-full bg-gradient-to-r ${getCategoryColor(event.category)}`}>
                      {event.category}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {new Date(event.date).toLocaleDateString('en-US', {
                        weekday: 'short',
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                    <div className="flex items-center space-x-1">
                      <StarIcon className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium text-foreground">{event.rating}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    <Link href={`/events/${event.id}`}>
                      {event.title}
                    </Link>
                  </h3>
                  
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {event.description}
                  </p>
                </div>
                
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary mb-1">{event.price}</div>
                  <div className="text-sm text-muted-foreground">per person</div>
                </div>
              </div>
              
              {/* Event Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <MapPinIcon className="h-4 w-4" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <ClockIcon className="h-4 w-4" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <UsersIcon className="h-4 w-4" />
                  <span>{event.attendees} attending</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium">Organized by:</span> {event.organizer}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {event.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <button className="btn-secondary flex items-center space-x-2">
                    <span>Share</span>
                    <GlobeAltIcon className="h-4 w-4" />
                  </button>
                  <button className="btn-primary flex items-center space-x-2 group-hover:scale-105 transition-transform">
                    <span>RSVP Now</span>
                    <ArrowRightIcon className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
