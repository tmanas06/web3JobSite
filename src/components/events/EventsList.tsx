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

const events: any[] = []; // Empty array - will be populated from smart contracts

export default function EventsList() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Upcoming Events</h2>
        <div className="flex space-x-2">
          <button className="px-3 py-1.5 text-sm font-medium rounded-md bg-indigo-100 text-indigo-700">
            All Events
          </button>
          <button className="px-3 py-1.5 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-100">
            Online
          </button>
          <button className="px-3 py-1.5 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-100">
            In-Person
          </button>
        </div>
      </div>

      {events.length === 0 ? (
        <div className="text-center py-12">
          <CalendarIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Events Yet</h3>
          <p className="text-gray-600 mb-6">
            Events will appear here once they are posted on the platform.
          </p>
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Post an Event
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div key={event.id} className="bg-white shadow overflow-hidden sm:rounded-lg hover:shadow-lg transition-shadow duration-200">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-medium text-gray-900">{event.title}</h3>
                  {event.featured && (
                    <div className="flex items-center text-indigo-600 text-sm font-medium">
                      <SparklesIcon className="h-4 w-4 mr-1" />
                      Featured
                    </div>
                  )}
                </div>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{event.description}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <CalendarIcon className="h-4 w-4 mr-2" />
                    {new Date(event.date).toLocaleDateString('en-US', {
                      weekday: 'short',
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                    {' '}{event.time}
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-500">
                    {event.online ? (
                      <VideoCameraIcon className="h-4 w-4 mr-2" />
                    ) : (
                      <MapPinIcon className="h-4 w-4 mr-2" />
                    )}
                    {event.location}
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-500">
                    <UsersIcon className="h-4 w-4 mr-2" />
                    {event.attendees} attendees
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-1">
                    <StarIcon className="h-4 w-4 text-yellow-400" />
                    <span className="text-sm font-medium text-gray-900">{event.rating}</span>
                  </div>
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                    {event.category}
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {event.tags.map((tag: string) => (
                    <span key={tag} className="px-2 py-1 text-xs font-medium rounded-full bg-indigo-100 text-indigo-800">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    by {event.organizer}
                  </div>
                  <Link href={event.eventLink || '#'} className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500">
                    View Details
                    <ArrowRightIcon className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}