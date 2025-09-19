import { 
  BuildingOfficeIcon, 
  MapPinIcon, 
  UsersIcon, 
  CurrencyDollarIcon,
  StarIcon,
  ArrowRightIcon,
  SparklesIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';

export default function CompaniesPage() {
  const companies: any[] = []; // Empty array - will be populated from smart contracts

  const filters = [
    { name: 'All Companies', count: companies.length },
    { name: 'DeFi', count: 0 },
    { name: 'Infrastructure', count: 0 },
    { name: 'NFT', count: 0 },
    { name: 'Exchange', count: 0 },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-transparent to-purple-600/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8 animate-fadeIn">
              <BuildingOfficeIcon className="h-4 w-4 mr-2" />
              Web3 Companies
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 animate-fadeInUp">
              <span className="gradient-text">Leading Companies</span>
              <br />
              <span className="text-foreground">in Web3</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed animate-fadeInUp">
              Discover innovative Web3 companies building the decentralized future. 
              Connect with industry leaders and explore career opportunities.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8 animate-fadeInUp">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search companies, industries, or locations..."
                  className="w-full pl-4 pr-4 py-4 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 btn-primary px-6 py-2">
                  Search
                </button>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-3 mb-12 animate-fadeInUp">
              {filters.map((filter, index) => (
                <button 
                  key={filter.name}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    index === 0 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-secondary text-secondary-foreground hover:bg-accent'
                  }`}
                >
                  {filter.name}
                  <span className="ml-2 px-2 py-0.5 rounded-full bg-white/20 text-xs">
                    {filter.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-1/4">
            <div className="card p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                <SparklesIcon className="h-5 w-5 mr-2" />
                Filters
              </h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-foreground mb-3">Industry</h4>
                  <div className="space-y-2">
                    {['DeFi', 'NFT', 'Infrastructure', 'Exchange', 'Gaming', 'DAO'].map((industry) => (
                      <label key={industry} className="flex items-center">
                        <input type="checkbox" className="rounded border-border" />
                        <span className="ml-2 text-sm text-muted-foreground">{industry}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-foreground mb-3">Company Size</h4>
                  <div className="space-y-2">
                    {['Startup (1-10)', 'Small (11-50)', 'Medium (51-200)', 'Large (200+)'].map((size) => (
                      <label key={size} className="flex items-center">
                        <input type="checkbox" className="rounded border-border" />
                        <span className="ml-2 text-sm text-muted-foreground">{size}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-foreground mb-3">Location</h4>
                  <div className="space-y-2">
                    {['Remote', 'San Francisco', 'New York', 'London', 'Singapore'].map((location) => (
                      <label key={location} className="flex items-center">
                        <input type="checkbox" className="rounded border-border" />
                        <span className="ml-2 text-sm text-muted-foreground">{location}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Companies List */}
          <div className="lg:w-3/4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">
                {companies.length} Web3 Companies
              </h2>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">Sort by:</span>
                <select className="input py-1">
                  <option>Most Recent</option>
                  <option>Company Size</option>
                  <option>Rating</option>
                  <option>Jobs Available</option>
                </select>
              </div>
            </div>
            
            {companies.length === 0 ? (
              <div className="text-center py-12">
                <BuildingOfficeIcon className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">No Companies Yet</h3>
                <p className="text-muted-foreground mb-6">
                  Companies will appear here once they register on the platform.
                </p>
                <button className="btn-primary">
                  Register Your Company
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {companies.map((company, index) => (
                  <div key={company.id} className="card p-6 group hover:shadow-xl transition-all duration-300 animate-fadeInUp" style={{ animationDelay: `${index * 0.1}s` }}>
                    {company.verified && (
                      <div className="flex items-center text-primary text-sm font-medium mb-3">
                        <SparklesIcon className="h-4 w-4 mr-1" />
                        Verified Company
                      </div>
                    )}
                    
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-purple-600/20 flex items-center justify-center text-2xl">
                          {company.logo}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                            {company.name}
                          </h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-muted-foreground">{company.industry}</span>
                            <span className="text-muted-foreground">•</span>
                            <span className="text-sm text-muted-foreground">{company.employees} employees</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <StarIcon className="h-4 w-4 text-yellow-400" />
                        <span className="text-sm font-medium text-foreground">{company.rating}</span>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {company.description}
                    </p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <MapPinIcon className="h-4 w-4" />
                          <span>{company.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <CurrencyDollarIcon className="h-4 w-4" />
                          <span className="font-medium text-green-600">{company.funding}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <UsersIcon className="h-4 w-4" />
                          <span>{company.jobs} jobs</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-2">
                        {company.tags.map((tag: string) => (
                          <span key={tag} className="px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <button className="btn-primary flex items-center space-x-2 group-hover:scale-105 transition-transform">
                        <span>View Jobs</span>
                        <ArrowRightIcon className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Load More */}
            {companies.length > 0 && (
              <div className="text-center mt-12">
                <button className="btn-secondary px-8 py-3 flex items-center space-x-2 mx-auto">
                  <span>Load More Companies</span>
                  <ArrowRightIcon className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}