import ProfileManager from '@/components/profile/ProfileManager';

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Profile Management</h1>
          <p className="mt-2 text-gray-600">
            Manage your blockchain-stored profile with IPFS image storage
          </p>
        </div>
        
        <ProfileManager />
      </div>
    </div>
  );
}