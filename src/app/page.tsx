export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Welcome to Job Network
          </h1>
          <p className="text-xl text-gray-600 mb-12">
            Connect with opportunities that match your skills and interests
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold mb-2">For Companies</h3>
            <p className="text-gray-600 mb-4">Find the best talent for your team</p>
            <a 
              href="/companies" 
              className="text-indigo-600 hover:text-indigo-800 font-medium"
            >
              Browse Companies →
            </a>
          </div>
          
          <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold mb-2">For Developers</h3>
            <p className="text-gray-600 mb-4">Find your dream job</p>
            <a 
              href="/developers" 
              className="text-indigo-600 hover:text-indigo-800 font-medium"
            >
              Explore Jobs →
            </a>
          </div>
          
          <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold mb-2">For Freelancers</h3>
            <p className="text-gray-600 mb-4">Find freelance opportunities</p>
            <a 
              href="/freelancers" 
              className="text-indigo-600 hover:text-indigo-800 font-medium"
            >
              Find Gigs →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
