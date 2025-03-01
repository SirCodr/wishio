import React, { useState } from 'react';
import { Heart, Share2, Link, CheckCircle, ArrowRight, Gift, Users, Globe, Search, Bookmark } from 'lucide-react';

function App() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send this to your backend
    console.log('Email submitted:', email);
    setIsSubmitted(true);
    setEmail('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white overflow-x-hidden">
      {/* Header */}
      <header className="container mx-auto px-4 py-4 sm:py-6 flex justify-between items-center">
        <div className="flex items-center">
          <Heart className="h-6 w-6 sm:h-8 sm:w-8 text-indigo-600 mr-2" />
          <span className="text-xl sm:text-2xl font-bold text-indigo-900">Wishio</span>
        </div>
        <nav className="hidden md:flex space-x-8">
          <a href="#features" className="text-gray-600 hover:text-indigo-600 transition-colors">Features</a>
          <a href="#how-it-works" className="text-gray-600 hover:text-indigo-600 transition-colors">How it works</a>
          <a href="#waitlist" className="text-gray-600 hover:text-indigo-600 transition-colors">Join waitlist</a>
        </nav>
        <button className="bg-indigo-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base rounded-lg hover:bg-indigo-700 transition-colors">
          Join waitlist
        </button>
      </header>

      {/* Story Section - First 100vh section */}
      <section className="bg-indigo-900 text-white min-h-[calc(100vh-64px)] sm:min-h-[calc(100vh-76px)] flex items-center py-10">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-8 sm:mb-12">Does this sound familiar?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
            <div className="bg-indigo-800 p-4 sm:p-6 rounded-lg hover:bg-indigo-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
              <Bookmark className="h-8 w-8 sm:h-10 sm:w-10 text-indigo-300 mx-auto mb-3 sm:mb-4" />
              <p className="text-sm sm:text-base text-indigo-100">You saved a product on Instagram, but now you can't remember where it is</p>
            </div>
            <div className="bg-indigo-800 p-4 sm:p-6 rounded-lg hover:bg-indigo-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
              <Search className="h-8 w-8 sm:h-10 sm:w-10 text-indigo-300 mx-auto mb-3 sm:mb-4" />
              <p className="text-sm sm:text-base text-indigo-100">You spend hours searching through Pinterest, TikTok, and Facebook for that item you loved</p>
            </div>
            <div className="bg-indigo-800 p-4 sm:p-6 rounded-lg hover:bg-indigo-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg sm:col-span-2 md:col-span-1 sm:mx-auto sm:max-w-sm md:max-w-none">
              <Gift className="h-8 w-8 sm:h-10 sm:w-10 text-indigo-300 mx-auto mb-3 sm:mb-4" />
              <p className="text-sm sm:text-base text-indigo-100">When someone asks what you want as a gift, you don't know how to share your wishes</p>
            </div>
          </div>
          <p className="text-lg sm:text-xl md:text-2xl font-medium mb-6 sm:mb-8 px-2">
            We've all been there. Content saved across different platforms, wishes scattered all over the web, and when you really need them...
          </p>
          <p className="text-xl sm:text-2xl md:text-3xl font-bold text-indigo-200">
            Where was that product I liked so much saved?
          </p>
        </div>
      </section>

      {/* Hero Section - Second 100vh section */}
      <section className="min-h-screen py-12 sm:py-0 flex items-center bg-gradient-to-br from-white via-indigo-50 to-white">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-indigo-900 leading-tight mb-4 sm:mb-6">
              All your wishes in one place
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8">
              Wishio was born to solve this problem. A platform where you can save, organize, and share your wishes from any online store with just a URL.
            </p>
            <a 
              href="#waitlist" 
              className="inline-flex items-center bg-indigo-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-indigo-700 transition-colors text-base sm:text-lg font-medium shadow-md hover:shadow-lg transition-all duration-300"
            >
              Join the waitlist
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </a>
          </div>
          <div className="md:w-1/2 relative mt-8 md:mt-0">
            <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl opacity-30 blur-lg"></div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Wishlist organization" 
                className="rounded-xl shadow-2xl transform transition-all duration-500 hover:scale-[1.02] border-4 border-white w-full"
              />
              <div className="absolute -bottom-4 sm:-bottom-6 -right-2 sm:-right-6 bg-white p-2 sm:p-4 rounded-lg shadow-lg transform rotate-3 border border-indigo-100 hidden sm:block">
                <div className="flex items-center space-x-2">
                  <Heart className="h-4 w-4 sm:h-5 sm:w-5 text-red-500" />
                  <span className="text-xs sm:text-sm font-medium text-gray-800">Save your favorite items</span>
                </div>
              </div>
              <div className="absolute -top-4 sm:-top-6 -left-2 sm:-left-6 bg-white p-2 sm:p-4 rounded-lg shadow-lg transform -rotate-3 border border-indigo-100 hidden sm:block">
                <div className="flex items-center space-x-2">
                  <Share2 className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-600" />
                  <span className="text-xs sm:text-sm font-medium text-gray-800">Share with friends</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-white py-12 sm:py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-indigo-900 mb-10 sm:mb-16">Why choose Wishio?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 md:mx-20">
            <div className="bg-indigo-50 p-6 sm:p-8 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="bg-indigo-100 p-3 rounded-full inline-block mb-4">
                <Gift className="h-6 w-6 sm:h-8 sm:w-8 text-indigo-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-indigo-900 mb-2 sm:mb-3">Universal Wishlists</h3>
              <p className="text-sm sm:text-base text-gray-600">
                Add products from any online store. Just paste the URL and we'll automatically generate a preview.
              </p>
            </div>
            
            <div className="bg-indigo-50 p-6 sm:p-8 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="bg-indigo-100 p-3 rounded-full inline-block mb-4">
                <Share2 className="h-6 w-6 sm:h-8 sm:w-8 text-indigo-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-indigo-900 mb-2 sm:mb-3">Easy Sharing</h3>
              <p className="text-sm sm:text-base text-gray-600">
                Share your wishlists with friends and family through a simple link or social media.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-12 sm:py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-indigo-900 mb-10 sm:mb-16">How does Wishio work?</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-indigo-100 h-12 w-12 sm:h-16 sm:w-16 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-md">
                <span className="text-xl sm:text-2xl font-bold text-indigo-600">1</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-indigo-900 mb-2 sm:mb-3">Create your wishlist</h3>
              <p className="text-sm sm:text-base text-gray-600">
                Sign up and create your first list. You can make multiple lists for different occasions.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-indigo-100 h-12 w-12 sm:h-16 sm:w-16 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-md">
                <span className="text-xl sm:text-2xl font-bold text-indigo-600">2</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-indigo-900 mb-2 sm:mb-3">Add products from any site</h3>
              <p className="text-sm sm:text-base text-gray-600">
                Found something you love? Just copy the URL and add it to your list with a click.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-indigo-100 h-12 w-12 sm:h-16 sm:w-16 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-md">
                <span className="text-xl sm:text-2xl font-bold text-indigo-600">3</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-indigo-900 mb-2 sm:mb-3">Share with others</h3>
              <p className="text-sm sm:text-base text-gray-600">
                Share your list with friends and family so they know exactly what you want.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Preview */}
      <section className="bg-indigo-900 text-white py-12 sm:py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10 sm:mb-16">See Wishio in action</h2>
          
          <div className="bg-indigo-800 p-4 sm:p-6 rounded-xl shadow-2xl max-w-4xl mx-auto transform hover:scale-[1.01] transition-transform duration-300 overflow-hidden">
            <div className="bg-white rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
              <div className="flex justify-between items-center mb-3 sm:mb-4">
                <h3 className="text-lg sm:text-xl font-bold text-indigo-900">Sara's Birthday List</h3>
                <Share2 className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-600" />
              </div>
              
              <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300">
                  <img 
                    src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" 
                    alt="Smart watch" 
                    className="w-full h-24 sm:h-32 object-cover"
                  />
                  <div className="p-2">
                    <p className="text-xs sm:text-sm text-gray-900 font-medium truncate">Smart Watch Pro</p>
                    <p className="text-xs sm:text-sm text-gray-500">$199.99</p>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300">
                  <img 
                    src="https://images.unsplash.com/photo-1560343090-f0409e92791a?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" 
                    alt="Headphones" 
                    className="w-full h-24 sm:h-32 object-cover"
                  />
                  <div className="p-2">
                    <p className="text-xs sm:text-sm text-gray-900 font-medium truncate">Wireless Headphones</p>
                    <p className="text-xs sm:text-sm text-gray-500">$149.99</p>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300 xs:col-span-2 md:col-span-1">
                  <img 
                    src="https://images.unsplash.com/photo-1544816155-12df9643f363?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" 
                    alt="Sneakers" 
                    className="w-full h-24 sm:h-32 object-cover"
                  />
                  <div className="p-2">
                    <p className="text-xs sm:text-sm text-gray-900 font-medium truncate">Running Sneakers</p>
                    <p className="text-xs sm:text-sm text-gray-500">$89.99</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center text-indigo-200 text-xs sm:text-sm">
              This is a preview of how Wishio will look. The final product may vary.
            </div>
          </div>
        </div>
      </section>

      {/* Waitlist Section */}
      <section id="waitlist" className="py-12 sm:py-20">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-indigo-900 mb-4 sm:mb-6">Join our waitlist</h2>
          <p className="text-base sm:text-xl text-gray-600 mb-8 sm:mb-10">
            Be the first to know when Wishio launches. We'll notify you as soon as we're ready.
          </p>
          
          {isSubmitted ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 sm:p-6">
              <CheckCircle className="h-10 w-10 sm:h-12 sm:w-12 text-green-500 mx-auto mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-bold text-green-800 mb-2">Thank you for joining our waitlist!</h3>
              <p className="text-sm sm:text-base text-green-700">
                We'll notify you as soon as Wishio is ready to launch.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3 sm:gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                className="bg-indigo-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium shadow-md hover:shadow-lg transition-all duration-300 text-sm sm:text-base"
              >
                Join the waitlist
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-indigo-900 text-white py-8 sm:py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-6 md:mb-0">
              <Heart className="h-6 w-6 sm:h-8 sm:w-8 text-indigo-300 mr-2" />
              <span className="text-xl sm:text-2xl font-bold">Wishio</span>
            </div>
            
            <div className="flex space-x-6">
              <a href="#" className="text-indigo-200 hover:text-white transition-colors">
                <Globe className="h-5 w-5 sm:h-6 sm:w-6" />
              </a>
              <a href="#" className="text-indigo-200 hover:text-white transition-colors">
                <Users className="h-5 w-5 sm:h-6 sm:w-6" />
              </a>
              <a href="#" className="text-indigo-200 hover:text-white transition-colors">
                <Link className="h-5 w-5 sm:h-6 sm:w-6" />
              </a>
            </div>
          </div>
          
          <div className="border-t border-indigo-800 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-indigo-200 text-sm">
            <p>&copy; {new Date().getFullYear()} Wishio. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;