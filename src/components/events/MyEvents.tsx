import Link from 'next/link';

const myEvents = [
  {
    id: 1,
    title: 'Web3 Hackathon 2023',
    date: '2023-11-15',
    time: '09:00 AM',
    location: 'Blockchain Center, New York',
    status: 'registered',
    role: 'Participant',
    rsvpDate: '2023-10-20',
    ticketType: 'Early Bird',
    eventLink: '/events/1'
  },
  {
    id: 2,
    title: 'DeFi Deep Dive',
    date: '2023-11-20',
    time: '02:00 PM',
    location: 'Crypto Hub, San Francisco',
    status: 'registered',
    role: 'Speaker',
    rsvpDate: '2023-10-25',
    ticketType: 'VIP Pass',
    eventLink: '/events/2'
  },
  {
    id: 3,
    title: 'NFT Creators Meetup',
    date: '2023-12-05',
    time: '06:30 PM',
    location: 'Art Gallery, Miami',
    status: 'saved',
    role: 'Attendee',
    rsvpDate: '',
    ticketType: 'Free',
    eventLink: '/events/3'
  },
  {
    id: 4,
    title: 'DAO Governance Workshop',
    date: '2023-12-10',
    time: '11:00 AM',
    location: 'Online',
    status: 'past',
    role: 'Attendee',
    rsvpDate: '2023-11-15',
    ticketType: 'Standard',
    eventLink: '/events/4'
  }
];

export default function MyEvents() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">My Events</h2>
        <div className="flex space-x-2">
          <button className="px-3 py-1.5 text-sm font-medium rounded-md bg-indigo-100 text-indigo-700">
            Upcoming
          </button>
          <button className="px-3 py-1.5 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-100">
            Past
          </button>
          <button className="px-3 py-1.5 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-100">
            Saved
          </button>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {myEvents.map((event) => (
            <li key={event.id} className="hover:bg-gray-50">
              <Link href={event.eventLink} className="block hover:bg-gray-50">
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-indigo-600 truncate">{event.title}</p>
                    <div className="ml-2 flex-shrink-0 flex">
                      <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${event.status === 'registered' ? 'bg-green-100 text-green-800' : 
                          event.status === 'saved' ? 'bg-blue-100 text-blue-800' : 
                          'bg-gray-100 text-gray-800'}">
                        {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-gray-500">
                        <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                        {new Date(event.date).toLocaleDateString('en-US', {
                          weekday: 'short',
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                        {' '}{event.time}
                      </p>
                      <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                        <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        {event.location}
                      </p>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                      <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v1h8v-1zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-1a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v1h-3zM4.75 12.094A5.973 5.973 0 004 15v1H1v-1a3 3 0 013.75-2.906z" />
                      </svg>
                      {event.role}
                    </div>
                  </div>
                  {event.rsvpDate && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        RSVP'd on {new Date(event.rsvpDate).toLocaleDateString()}
                        {event.ticketType && ` • ${event.ticketType}`}
                      </p>
                    </div>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
