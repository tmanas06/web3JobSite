import { Suspense } from 'react';
import Link from 'next/link';
import { PlusIcon, MapPinIcon, CalendarIcon, UsersIcon } from '@heroicons/react/24/outline';
import EventsList from '@/components/events/EventsList';
import CityCommunities from '@/components/events/CityCommunities';
import EventSearch from '@/components/events/EventSearch';

export default function EventsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-3xl font-bold text-gray-900">Events</h1>
            <div className="mt-4 sm:mt-0">
              <Link
                href="/events/create"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
                Create Event
              </Link>
            </div>
          </div>
          
          {/* Tabs */}
          <div className="mt-6">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                <Link
                  href="/events"
                  className="border-indigo-500 text-indigo-600 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                >
                  Upcoming Events
                </Link>
                <Link
                  href="/events/my-events"
                  className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                >
                  My Events
                </Link>
                <Link
                  href="/events/communities"
                  className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                >
                  Communities
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main content */}
          <div className="lg:w-2/3">
            {/* Search and Filters */}
            <div className="mb-6">
              <EventSearch />
              <div className="mt-4 flex flex-wrap gap-2">
                <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <MapPinIcon className="-ml-1 mr-2 h-4 w-4 text-gray-500" />
                  Location
                </button>
                <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <CalendarIcon className="-ml-1 mr-2 h-4 w-4 text-gray-500" />
                  Date
                </button>
                <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <UsersIcon className="-ml-1 mr-2 h-4 w-4 text-gray-500" />
                  Category
                </button>
              </div>
            </div>

            {/* Events List */}
            <Suspense fallback={
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="animate-pulse bg-white rounded-lg shadow p-6">
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                    <div className="space-y-3">
                      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                      <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            }>
              <EventsList />
            </Suspense>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3 space-y-6">
            {/* City Communities */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <MapPinIcon className="h-5 w-5 text-indigo-500 mr-2" />
                City Communities
              </h2>
              <CityCommunities />
            </div>

            {/* Trending Tags */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-4">Trending Tags</h2>
              <div className="flex flex-wrap gap-2">
                {['Tech', 'Networking', 'Workshop', 'Conference', 'Hackathon', 'Startup'].map((tag) => (
                  <a
                    key={tag}
                    href={`/events?tag=${tag.toLowerCase()}`}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 hover:bg-indigo-200"
                  >
                    {tag}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
