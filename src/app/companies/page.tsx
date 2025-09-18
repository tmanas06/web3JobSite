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
  const companies = [
    { 
      id: 1, 
      name: 'Ethereum Foundation', 
      industry: 'Blockchain Infrastructure', 
      location: 'Global Remote',
      logo: '🟣',
      employees: '200+',
      funding: '$100M+',
      rating: 4.9,
      description: 'Leading the development of Ethereum blockchain technology',
      tags: ['Blockchain', 'Open Source', 'DeFi'],
      jobs: 12,
      verified: true
    },
    { 
      id: 2, 
      name: 'Uniswap Labs', 
      industry: 'DeFi Protocol', 
      location: 'New York, NY',
      logo: '🦄',
      employees: '50+',
      funding: '$165M+',
      rating: 4.8,
      description: 'Building the future of decentralized trading',
      tags: ['DeFi', 'Trading', 'Liquidity'],
      jobs: 8,
      verified: true
    },
    { 
      id: 3, 
      name: 'OpenSea', 
      industry: 'NFT Marketplace', 
      location: 'San Francisco, CA',
      logo: '🌊',
      employees: '150+',
      funding: '$300M+',
      rating: 4.7,
      description: 'The world\'s largest NFT marketplace',
      tags: ['NFT', 'Marketplace', 'Digital Art'],
      jobs: 15,
      verified: true
    },
    { 
      id: 4, 
      name: 'Chainlink Labs', 
      industry: 'Oracle Network', 
      location: 'San Francisco, CA',
      logo: '🔗',
      employees: '100+',
      funding: '$50M+',
      rating: 4.8,
      description: 'Connecting smart contracts with real-world data',
      tags: ['Oracle', 'Data', 'Smart Contracts'],
      jobs: 6,
      verified: true
    },
    { 
      id: 5, 
      name: 'Polygon', 
      industry: 'Layer 2 Scaling', 
      location: 'Global Remote',
      logo: '🔷',
      employees: '300+',
      funding: '$450M+',
      rating: 4.6,
      description: 'Scaling Ethereum with Layer 2 solutions',
      tags: ['Scaling', 'Layer 2', 'Ethereum'],
      jobs: 20,
      verified: true
    },
    { 
      id: 6, 
      name: 'Coinbase', 
      industry: 'Cryptocurrency Exchange', 
      location: 'San Francisco, CA',
      logo: '🔷',
      employees: '4000+',
      funding: '$500M+',
      rating: 4.5,
      description: 'Making crypto accessible to everyone',
      tags: ['Exchange', 'Crypto', 'Trading'],
      jobs: 45,
      verified: true
    },
  ];

  const filters = [
    { name: 'All Companies', count: companies.length },
    { name: 'DeFi', count: 2 },
    { name: 'Infrastructure', count: 2 },
    { name: 'NFT', count: 1 },
    { name: 'Exchange', count: 1 },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-transparent to-purple-600/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8 animate-fadeIn">
              <BuildingOfficeIcon className="h-4 w-4 mr-2" />
              Leading Web3 Companies
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 animate-fadeInUp">
              <span className="gradient-text">Top Companies</span>
              <br />
              <span className="text-foreground">Hiring Web3 Talent</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed animate-fadeInUp">
              Discover the most innovative Web3 companies and find your next career opportunity 
              with industry leaders building the decentralized future.
            </p>
            
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

      {/* Companies Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {companies.map((company, index) => (
              <div key={company.id} className="card p-6 group hover:shadow-xl transition-all duration-300 animate-fadeInUp" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-purple-600/20 flex items-center justify-center text-2xl">
                      {company.logo}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {company.name}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-muted-foreground">{company.industry}</span>
                        {company.verified && (
                          <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-white" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <StarIcon className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-foreground">{company.rating}</span>
                  </div>
                </div>
                
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {company.description}
                </p>
                
                <div className="flex items-center space-x-4 mb-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <MapPinIcon className="h-4 w-4" />
                    <span>{company.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <UsersIcon className="h-4 w-4" />
                    <span>{company.employees}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-1 text-green-600">
                    <CurrencyDollarIcon className="h-4 w-4" />
                    <span className="text-sm font-medium">{company.funding}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-primary">
                    <SparklesIcon className="h-4 w-4" />
                    <span className="text-sm font-medium">{company.jobs} jobs</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {company.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <button className="w-full btn-primary flex items-center justify-center space-x-2 group-hover:scale-105 transition-transform">
                  <span>View Jobs</span>
                  <ArrowRightIcon className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            ))}
          </div>
          
          {/* Load More */}
          <div className="text-center mt-12">
            <button className="btn-secondary px-8 py-3 flex items-center space-x-2 mx-auto">
              <GlobeAltIcon className="h-5 w-5" />
              <span>Load More Companies</span>
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-foreground mb-6">
            Can't Find Your Company?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of companies already using Web3Job Network to find top talent
          </p>
          <button className="btn-primary text-lg px-8 py-4 flex items-center space-x-2 mx-auto">
            <span>List Your Company</span>
            <ArrowRightIcon className="h-5 w-5" />
          </button>
        </div>
      </section>
    </div>
  );
}
