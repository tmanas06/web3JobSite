import Link from 'next/link';
import { 
  ArrowRightIcon, 
  SparklesIcon, 
  RocketLaunchIcon, 
  GlobeAltIcon,
  UserGroupIcon,
  BuildingOfficeIcon,
  CodeBracketIcon,
  BriefcaseIcon,
  CheckCircleIcon,
  CurrencyDollarIcon,
  ShieldCheckIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

export default function Home() {
  const stats = [
    { label: 'Active Jobs', value: '0', icon: BriefcaseIcon },
    { label: 'Companies', value: '0', icon: BuildingOfficeIcon },
    { label: 'Developers', value: '0', icon: CodeBracketIcon },
    { label: 'Success Stories', value: '0%', icon: CheckCircleIcon },
  ];

  const features = [
    {
      title: 'Smart Matching',
      description: 'AI-powered job matching based on your skills, preferences, and career goals.',
      icon: SparklesIcon,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Instant Payments',
      description: 'Get paid instantly in crypto with our decentralized payment system.',
      icon: CurrencyDollarIcon,
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Verified Profiles',
      description: 'Blockchain-verified credentials ensure trust and authenticity.',
      icon: ShieldCheckIcon,
      color: 'from-purple-500 to-violet-500'
    },
    {
      title: '24/7 Support',
      description: 'Round-the-clock support from our dedicated Web3 community.',
      icon: ClockIcon,
      color: 'from-orange-500 to-red-500'
    }
  ];

  const categories = [
    {
      title: 'For Companies',
      description: 'Find the best Web3 talent for your decentralized team',
      icon: BuildingOfficeIcon,
      href: '/companies',
      color: 'from-blue-600 to-blue-700',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      title: 'For Developers',
      description: 'Discover cutting-edge Web3 opportunities and projects',
      icon: CodeBracketIcon,
      href: '/developers',
      color: 'from-purple-600 to-purple-700',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20'
    },
    {
      title: 'For Freelancers',
      description: 'Connect with clients and build your decentralized career',
      icon: BriefcaseIcon,
      href: '/freelancers',
      color: 'from-green-600 to-green-700',
      bgColor: 'bg-green-50 dark:bg-green-900/20'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-cyan-400/10 rounded-full blur-xl animate-float"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-purple-500/10 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-pink-500/10 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 rounded-full glass border border-cyan-400/30 text-cyan-400 text-sm font-medium mb-8 animate-fadeIn neon-glow">
              <SparklesIcon className="h-4 w-4 mr-2" />
              The Future of Work is Here
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 animate-fadeInUp">
              <span className="gradient-text animate-glow">Web3</span>
              <br />
              <span className="text-white">Job Network</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed animate-fadeInUp">
              Connect with the world's leading Web3 companies, discover remote opportunities, 
              and build your decentralized career with blockchain-verified credentials.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-fadeInUp">
              <Link href="/developers" className="btn-primary text-lg px-8 py-4 flex items-center space-x-2 group animate-neon-pulse">
                <span>Find Your Dream Job</span>
                <ArrowRightIcon className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/companies" className="btn-secondary text-lg px-8 py-4 flex items-center space-x-2">
                <span>Hire Talent</span>
                <UserGroupIcon className="h-5 w-5" />
              </Link>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={stat.label} className="text-center animate-fadeInUp card p-6" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-cyan-400/20 text-cyan-400 mb-3 neon-glow">
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-1 neon-text">{stat.value}</div>
                  <div className="text-sm text-gray-300">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-pink-500/5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4 neon-text">
              Why Choose Web3Job Network?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Experience the next generation of job platforms with blockchain technology
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={feature.title} className="card p-6 text-center group hover:scale-105 transition-transform animate-fadeInUp" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} mb-4 mx-auto neon-glow`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4 neon-text">
              Choose Your Path
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Whether you're looking for opportunities or seeking talent, we've got you covered
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <Link key={category.title} href={category.href} className="group">
                <div className={`card p-8 h-full hover:shadow-xl transition-all duration-300 group-hover:scale-105 animate-fadeInUp`} style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${category.color} mb-6 neon-glow`}>
                    <category.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{category.title}</h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">{category.description}</p>
                  <div className="flex items-center text-cyan-400 font-medium group-hover:translate-x-2 transition-transform">
                    <span>Get Started</span>
                    <ArrowRightIcon className="h-5 w-5 ml-2" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-90"></div>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-flex items-center px-4 py-2 rounded-full glass border border-white/30 text-white text-sm font-medium mb-8 neon-glow">
            <RocketLaunchIcon className="h-4 w-4 mr-2" />
            Ready to Launch Your Web3 Career?
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 neon-text animate-glow">
            Join the Decentralized Workforce
          </h2>
          
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Connect with innovative companies, build your reputation on-chain, 
            and be part of the future of work.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/developers" className="inline-flex items-center px-8 py-4 bg-white text-black font-semibold rounded-lg hover:bg-white/90 transition-colors neon-glow animate-neon-pulse">
              <span>Start Job Hunting</span>
              <ArrowRightIcon className="h-5 w-5 ml-2" />
            </Link>
            <Link href="/events" className="inline-flex items-center px-8 py-4 glass border border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors">
              <GlobeAltIcon className="h-5 w-5 mr-2" />
              <span>Explore Events</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
