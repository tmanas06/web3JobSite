import { 
  BriefcaseIcon, 
  CurrencyDollarIcon,
  ClockIcon,
  ArrowRightIcon,
  SparklesIcon,
  StarIcon,
  UserIcon,
  CalendarIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  GlobeAltIcon,
  RocketLaunchIcon
} from '@heroicons/react/24/outline';

export default function FreelancersPage() {
  const gigs = [
    {
      id: 1,
      title: 'Web3 dApp Frontend Development',
      client: 'DeFi Startup',
      logo: '🚀',
      budget: '$8,000 - $15,000',
      posted: '1 day ago',
      skills: ['React', 'Web3', 'Ethers.js', 'TypeScript'],
      duration: '2-4 months',
      level: 'Expert',
      description: 'Build a modern DeFi interface with Web3 wallet integration and real-time data visualization',
      applicants: 23,
      featured: true,
      remote: true,
      rating: 4.9
    },
    {
      id: 2,
      title: 'Smart Contract Development & Audit',
      client: 'NFT Marketplace',
      logo: '🎨',
      budget: '$12,000 - $20,000',
      posted: '2 days ago',
      skills: ['Solidity', 'Hardhat', 'Security', 'Testing'],
      duration: '3-6 months',
      level: 'Expert',
      description: 'Develop and audit smart contracts for a new NFT marketplace with advanced trading features',
      applicants: 18,
      featured: true,
      remote: true,
      rating: 4.8
    },
    {
      id: 3,
      title: 'Blockchain Integration Specialist',
      client: 'E-commerce Platform',
      logo: '🛒',
      budget: '$5,000 - $10,000',
      posted: '3 days ago',
      skills: ['Blockchain', 'API Integration', 'Node.js', 'PostgreSQL'],
      duration: '2-3 months',
      level: 'Intermediate',
      description: 'Integrate blockchain payment solutions and NFT marketplace features into existing e-commerce platform',
      applicants: 31,
      featured: false,
      remote: true,
      rating: 4.7
    },
    {
      id: 4,
      title: 'DeFi Protocol UI/UX Design',
      client: 'Yield Farming Protocol',
      logo: '🌾',
      budget: '$6,000 - $12,000',
      posted: '1 week ago',
      skills: ['Figma', 'UI/UX', 'Web3 Design', 'Prototyping'],
      duration: '1-2 months',
      level: 'Intermediate',
      description: 'Design intuitive user interfaces for complex DeFi protocols with focus on user experience',
      applicants: 15,
      featured: false,
      remote: true,
      rating: 4.6
    },
    {
      id: 5,
      title: 'Cross-chain Bridge Development',
      client: 'Layer 2 Protocol',
      logo: '🌉',
      budget: '$15,000 - $25,000',
      posted: '4 days ago',
      skills: ['Rust', 'Substrate', 'Cross-chain', 'Cryptography'],
      duration: '4-6 months',
      level: 'Expert',
      description: 'Develop a secure cross-chain bridge for asset transfers between different blockchain networks',
      applicants: 8,
      featured: true,
      remote: true,
      rating: 4.9
    },
    {
      id: 6,
      title: 'Web3 Marketing & Community Manager',
      client: 'DAO Organization',
      logo: '🏛️',
      budget: '$3,000 - $6,000',
      posted: '5 days ago',
      skills: ['Marketing', 'Community Management', 'Discord', 'Twitter'],
      duration: '3-6 months',
      level: 'Intermediate',
      description: 'Manage community growth and marketing strategies for a decentralized autonomous organization',
      applicants: 42,
      featured: false,
      remote: true,
      rating: 4.5
    }
  ];

  const filters = [
    { name: 'All Gigs', count: gigs.length },
    { name: 'Remote', count: gigs.length },
    { name: 'Expert', count: 3 },
    { name: 'Featured', count: 3 },
    { name: 'High Budget', count: 4 },
  ];

  const categories = ['Development', 'Design', 'Marketing', 'Blockchain', 'DeFi', 'NFT', 'Smart Contracts', 'Web3'];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-transparent to-purple-600/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8 animate-fadeIn">
              <BriefcaseIcon className="h-4 w-4 mr-2" />
              Web3 Freelance Opportunities
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 animate-fadeInUp">
              <span className="gradient-text">Freelance Gigs</span>
              <br />
              <span className="text-foreground">in Web3</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed animate-fadeInUp">
              Find high-paying freelance opportunities in Web3, DeFi, and blockchain development. 
              Work with innovative projects and build your decentralized career.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8 animate-fadeInUp">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search gigs, skills, or clients..."
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
                  <h4 className="font-medium text-foreground mb-3">Budget Range</h4>
                  <div className="space-y-2">
                    {['$1K - $5K', '$5K - $10K', '$10K - $20K', '$20K+'].map((range) => (
                      <label key={range} className="flex items-center">
                        <input type="checkbox" className="rounded border-border" />
                        <span className="ml-2 text-sm text-muted-foreground">{range}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-foreground mb-3">Experience Level</h4>
                  <div className="space-y-2">
                    {['Entry Level', 'Intermediate', 'Expert', 'Guru'].map((level) => (
                      <label key={level} className="flex items-center">
                        <input type="checkbox" className="rounded border-border" />
                        <span className="ml-2 text-sm text-muted-foreground">{level}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-foreground mb-3">Categories</h4>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <button key={category} className="px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground hover:bg-accent transition-colors">
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Gigs List */}
          <div className="lg:w-3/4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">
                {gigs.length} Web3 Freelance Gigs
              </h2>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">Sort by:</span>
                <select className="input py-1">
                  <option>Most Recent</option>
                  <option>Budget High to Low</option>
                  <option>Client Rating</option>
                </select>
              </div>
            </div>
            
            <div className="space-y-6">
              {gigs.map((gig, index) => (
                <div key={gig.id} className={`card p-6 group hover:shadow-xl transition-all duration-300 animate-fadeInUp ${gig.featured ? 'ring-2 ring-primary/20' : ''}`} style={{ animationDelay: `${index * 0.1}s` }}>
                  {gig.featured && (
                    <div className="flex items-center text-primary text-sm font-medium mb-4">
                      <SparklesIcon className="h-4 w-4 mr-1" />
                      Featured Gig
                    </div>
                  )}
                  
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-purple-600/20 flex items-center justify-center text-2xl">
                        {gig.logo}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                          {gig.title}
                        </h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-muted-foreground">{gig.client}</span>
                          <span className="text-muted-foreground">•</span>
                          <span className="text-sm text-muted-foreground">{gig.level}</span>
                          {gig.remote && (
                            <>
                              <span className="text-muted-foreground">•</span>
                              <span className="flex items-center text-sm text-green-600">
                                <GlobeAltIcon className="h-3 w-3 mr-1" />
                                Remote
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary mb-1">{gig.budget}</div>
                      <div className="text-sm text-muted-foreground">budget</div>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {gig.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <CalendarIcon className="h-4 w-4" />
                        <span>{gig.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <ClockIcon className="h-4 w-4" />
                        <span>Posted {gig.posted}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <UserIcon className="h-4 w-4" />
                        <span>{gig.applicants} proposals</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <StarIcon className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium text-foreground">{gig.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {gig.skills.map((skill) => (
                        <span key={skill} className="px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
                          {skill}
                        </span>
                      ))}
                    </div>
                    <button className="btn-primary flex items-center space-x-2 group-hover:scale-105 transition-transform">
                      <span>Submit Proposal</span>
                      <ArrowRightIcon className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Load More */}
            <div className="text-center mt-12">
              <button className="btn-secondary px-8 py-3 flex items-center space-x-2 mx-auto">
                <span>Load More Gigs</span>
                <ArrowRightIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8">
            <RocketLaunchIcon className="h-4 w-4 mr-2" />
            Ready to Start Freelancing?
          </div>
          
          <h2 className="text-4xl font-bold text-foreground mb-6">
            Launch Your Web3 Freelance Career
          </h2>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of freelancers already building the decentralized future. 
            Create your profile and start earning in crypto.
          </p>
          
          <button className="btn-primary text-lg px-8 py-4 flex items-center space-x-2 mx-auto">
            <span>Create Profile</span>
            <ArrowRightIcon className="h-5 w-5" />
          </button>
        </div>
      </section>
    </div>
  );
}
