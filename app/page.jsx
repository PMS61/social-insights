import { BarChart3, TrendingUp, Clock, Target, Instagram } from "lucide-react";
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-[#0A0A0A]/95 backdrop-blur z-50 border-b border-[#1a1a1a]">
        <div className="max-w-7xl mx-auto flex h-16 items-center px-4 sm:px-8">
          <div className="flex items-center space-x-2">
            <Instagram className="h-6 w-6 sm:h-8 sm:w-8 text-[#4F46E5]" />
            <span className="text-lg sm:text-xl font-bold">Social Insights</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 sm:pt-32 pb-12 sm:pb-16 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-6 sm:space-y-8">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight max-w-3xl bg-clip-text text-transparent bg-gradient-to-r from-[#4F46E5] via-[#7C3AED] to-[#9333EA]">
            Transform Your Social Media Strategy with AI-Powered Insights
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl">
            Unlock the power of AI to analyze your Instagram content performance and get actionable recommendations to boost engagement.
          </p>
          <button className="h-12 px-8 text-lg bg-[#4F46E5] hover:bg-[#4338CA] text-white rounded-lg transition-colors">
            <Link href="/insights">Get Insights</Link> {/* Updated button */}
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-20 bg-[#111111]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              {
                icon: BarChart3,
                title: "Comprehensive Analytics",
                description: "Deep dive into your content performance with detailed metrics and engagement analysis."
              },
              {
                icon: TrendingUp,
                title: "Trend Detection",
                description: "Stay ahead with AI-powered trend analysis and content recommendations."
              },
              {
                icon: Clock,
                title: "Optimal Timing",
                description: "Discover the best times to post for maximum engagement with your audience."
              },
              {
                icon: Target,
                title: "Targeted Insights",
                description: "Get personalized recommendations based on your specific content and goals."
              }
            ].map((feature, index) => (
              <div key={index} className="p-6 bg-[#1A1A1A] border border-[#2A2A2A] hover:border-[#4F46E5] rounded-lg transition-colors">
                <feature.icon className="h-12 w-12 mb-4 text-[#4F46E5]" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="max-w-2xl mx-auto space-y-6 sm:space-y-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
              Ready to Elevate Your Social Media Game?
            </h2>
            <p className="text-lg sm:text-xl text-gray-400">
              Join thousands of content creators who are already using Social Insights to optimize their Instagram strategy.
            </p>
            <button className="h-12 px-8 text-lg bg-[#4F46E5] hover:bg-[#4338CA] text-white rounded-lg transition-colors">
              <Link href="/insights">Start Analyzing Now</Link> {/* Updated button */}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

