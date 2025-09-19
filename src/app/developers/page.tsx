import { 
  CodeBracketIcon, 
  MapPinIcon, 
  CurrencyDollarIcon,
  ClockIcon,
  StarIcon,
  ArrowRightIcon,
  SparklesIcon,
  BuildingOfficeIcon,
  BriefcaseIcon,
  FunnelIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';

export default function DevelopersPage() {
  const jobs: any[] = []; // Empty array - will be populated from smart contracts

  const filters = [
    { name: 'All Jobs', count: jobs.length },
    { name: 'Remote', count: 0 },
    { name: 'Full-time', count: 0 },
    { name: 'Contract', count: 0 },
    { name: 'Featured', count: 0 },
  ];

  const skills = ['Solidity', 'React', 'TypeScript', 'Web3', 'DeFi', 'Smart Contracts', 'Node.js', 'Ethereum'];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-transparent to-purple-600/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8 animate-fadeIn">
              <CodeBracketIcon className="h-4 w-4 mr-2" />
              Web3 Developer Jobs
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 animate-fadeInUp">
              <span className="gradient-text">Developer Jobs</span>
              <br />
              <span className="text-foreground">in Web3</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed animate-fadeInUp">
              Discover high-paying Web3 developer opportunities at leading blockchain companies. 
              Build the decentralized future with cutting-edge technology.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8 animate-fadeInUp">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search jobs, companies, or skills..."
                  className="w-full pl-12 pr-4 py-4 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
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
                <FunnelIcon className="h-5 w-5 mr-2" />
                Filters
              </h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-foreground mb-3">Job Type</h4>
                  <div className="space-y-2">
                    {['Full-time', 'Contract', 'Part-time', 'Internship'].map((type) => (
                      <label key={type} className="flex items-center">
                        <input type="checkbox" className="rounded border-border" />
                        <span className="ml-2 text-sm text-muted-foreground">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-foreground mb-3">Experience Level</h4>
                  <div className="space-y-2">
                    {['Entry Level', 'Mid Level', 'Senior Level', 'Lead'].map((level) => (
                      <label key={level} className="flex items-center">
                        <input type="checkbox" className="rounded border-border" />
                        <span className="ml-2 text-sm text-muted-foreground">{level}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-foreground mb-3">Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <button key={skill} className="px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground hover:bg-accent transition-colors">
                        {skill}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Jobs List */}
          <div className="lg:w-3/4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">
                {jobs.length} Web3 Developer Jobs
              </h2>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">Sort by:</span>
                <select className="input py-1">
                  <option>Most Recent</option>
                  <option>Salary High to Low</option>
                  <option>Company Rating</option>
                </select>
              </div>
            </div>
            
            {jobs.length === 0 ? (
              <div className="text-center py-12">
                <BriefcaseIcon className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">No Jobs Available</h3>
                <p className="text-muted-foreground mb-6">
                  Jobs will appear here once companies post them on the platform.
                </p>
                <button className="btn-primary">
                  Post a Job
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {jobs.map((job, index) => (
                  <div key={job.id} className={`card p-6 group hover:shadow-xl transition-all duration-300 animate-fadeInUp ${job.featured ? 'ring-2 ring-primary/20' : ''}`} style={{ animationDelay: `${index * 0.1}s` }}>
                    {job.featured && (
                      <div className="flex items-center text-primary text-sm font-medium mb-3">
                        <SparklesIcon className="h-4 w-4 mr-1" />
                        Featured Job
                      </div>
                    )}
                    
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-purple-600/20 flex items-center justify-center text-2xl">
                          {job.logo}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                            {job.title}
                          </h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-muted-foreground">{job.company}</span>
                            <span className="text-muted-foreground">•</span>
                            <span className="text-sm text-muted-foreground">{job.experience}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                          {job.type}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {job.description}
                    </p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <MapPinIcon className="h-4 w-4" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <CurrencyDollarIcon className="h-4 w-4" />
                          <span className="font-medium text-green-600">{job.salary}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <ClockIcon className="h-4 w-4" />
                          <span>{job.posted}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                        <BriefcaseIcon className="h-4 w-4" />
                        <span>{job.applicants} applicants</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-2">
                        {job.tags.map((tag: string) => (
                          <span key={tag} className="px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <button className="btn-primary flex items-center space-x-2 group-hover:scale-105 transition-transform">
                        <span>Apply Now</span>
                        <ArrowRightIcon className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Load More */}
            {jobs.length > 0 && (
              <div className="text-center mt-12">
                <button className="btn-secondary px-8 py-3 flex items-center space-x-2 mx-auto">
                  <span>Load More Jobs</span>
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