import MyEvents from '@/components/events/MyEvents';

export default function MyEventsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Events</h1>
          <p className="mt-2 text-sm text-gray-600">Manage your registered and saved events</p>
        </div>
        
        <div className="bg-white shadow rounded-lg p-6">
          <MyEvents />
        </div>
      </div>
    </div>
  );
}
