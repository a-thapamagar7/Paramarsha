import React from 'react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-4">
          <nav className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <img className="h-8" src="/logo.svg" alt="Logo" />
              <span className="text-gray-800 font-bold ml-2">CollegeFinder</span>
            </div>
            <div className="hidden md:block">
              <a href="#" className="text-gray-600 hover:text-gray-800 mx-4">Home</a>
              <a href="#" className="text-gray-600 hover:text-gray-800 mx-4">About</a>
              <a href="#" className="text-gray-600 hover:text-gray-800 mx-4">Contact</a>
              <button className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-2 font-medium">Sign In</button>
            </div>
            <div className="md:hidden">
              <button className="mobile-menu-button">
                <svg className="w-6 h-6 fill-current text-gray-600 hover:text-gray-800" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M3 6h18M3 12h18M3 18h18"></path></svg>
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-blue-500 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="md:flex justify-between items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="font-bold text-4xl md:text-5xl leading-tight mb-4">Find the Perfect College for You</h1>
              <p className="text-lg md:text-xl leading-relaxed mb-6">Discover colleges and courses that fit your interests and career goals.</p>
              <form className="flex items-center">
                <input type="text" placeholder="Search for Colleges or Courses" className="bg-gray-100 rounded-full py-2 px-4 text-gray-800 w-full md:w-auto" />
              </form>
            </div>
            <div className="md:w-1/2">
              <img src="/hero-image.svg" alt="Hero Image" />
            </div>
          </div>
        </div>
      </div>
            {/* Featured Colleges and Courses */}
            <div className="container mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Featured Colleges and Courses</h2>
        <div className="md:flex justify-between">
          <div className="md:w-1/3 mb-8 md:mb-0">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img src="/college-image-1.jpg" alt="College Image" className="w-full h-56 object-cover" />
              <div className="p-4 bg-white">
                <h3 className="text-lg font-bold mb-2">University of California, Los Angeles</h3>
                <p className="text-gray-700 mb-4">Bachelor's Degree in Computer Science</p>
                <button className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-2 font-medium">Learn More</button>
              </div>
            </div>
          </div>
          <div className="md:w-1/3 mb-8 md:mb-0">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img src="/college-image-2.jpg" alt="College Image" className="w-full h-56 object-cover" />
              <div className="p-4 bg-white">
                <h3 className="text-lg font-bold mb-2">Massachusetts Institute of Technology</h3>
                <p className="text-gray-700 mb-4">Master's Degree in Artificial Intelligence</p>
                <button className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-2 font-medium">Learn More</button>
              </div>
            </div>
          </div>
          <div className="md:w-1/3 mb-8 md:mb-0">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img src="/college-image-3.jpg" alt="College Image" className="w-full h-56 object-cover" />
              <div className="p-4 bg-white">
                <h3 className="text-lg font-bold mb-2">Stanford University</h3>
                <p className="text-gray-700 mb-4">Bachelor's Degree in Psychology</p>
                <button className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-2 font-medium">Learn More</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">What our users are saying</h2>
          <div className="md:flex justify-between">
            <div className="md:w-1/3 mb-8 md:mb-0">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <p className="text-lg leading-relaxed mb-4">"CollegeFinder helped me discover my dream school and I couldn't be happier with my decision."</p>
                <div className="flex items-center">
                  <img src="/user-image-1.jpg" alt="User Image" className="rounded-full w-12 h-12 object-cover" />
                  <div className="ml-4">
                    <h4 className="font-bold text-lg">Samantha Jones</h4>
                    <p className="text-gray-600">Los Angeles, CA</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:w-1/3 mb-8 md:mb-0">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <p className="text-lg leading-relaxed mb-4">"I was having a hard time finding a college that fit my interests and budget, but CollegeFinder made the process so much easier."</p>
                <div className="flex items-center">
                  <img src="/user-image-2.jpg" alt="User Image" className="rounded-full w-12 h-12 object-cover" />
                  <div className="ml-4">
                    <h4 className="font-bold text-lg">John Smith</h4>
                    <p className="text-gray-600">New York, NY</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:w-1/3 mb-8 md:mb-0">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <p className="text-lg leading-relaxed mb-4">"As a first-generation college student, I had no idea where to start. CollegeFinder guided me through the entire process and I am now a proud college graduate."</p>
                <div className="flex items-center">
                  <img src="/user-image-3.jpg" alt="User Image" className="rounded-full w-12 h-12 object-cover" />
                  <div className="ml-4">
                    <h4 className="font-bold text-lg">Maria Rodriguez</h4>
                    <p className="text-gray-600">Houston, TX</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">Our Features</h2>
        <div className="flex flex-wrap -mx-4">
          <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
            <div className="bg-white shadow-lg rounded-lg p-6">
              <div className="text-2xl text-gray-800 font-bold mb-4">Feature 1</div>
              <p className="text-gray-600 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec et magna at ligula placerat vehicula sed nec nulla.</p>
              <a href="#" className="text-blue-500 hover:text-blue-600 font-medium">Learn More</a>
            </div>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
            <div className="bg-white shadow-lg rounded-lg p-6">
              <div className="text-2xl text-gray-800 font-bold mb-4">Feature 2</div>
              <p className="text-gray-600 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec et magna at ligula placerat vehicula sed nec nulla.</p>
              <a href="#" className="text-blue-500 hover:text-blue-600 font-medium">Learn More</a>
            </div>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
            <div className="bg-white shadow-lg rounded-lg p-6">
              <div className="text-2xl text-gray-800 font-bold mb-4">Feature 3</div>
              <p className="text-gray-600 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec et magna at ligula placerat vehicula sed nec nulla.</p>
              <a href="#" className="text-blue-500 hover:text-blue-600 font-medium">Learn More</a>
            </div>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
            <div className="bg-white shadow-lg rounded-lg p-6">
              <div className="text-2xl text-gray-800 font-bold mb-4">Feature 4</div>
              <p className="text-gray-600 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec et magna at ligula placerat vehicula sed nec nulla.</p>
              <a href="#" className="text-blue-500 hover:text-blue-600 font-medium">Learn More</a>
            </div>
          </div>
        </div>
      </div>
    </section>


      <footer className="bg-gray-800 text-white py-8">
  <div className="container mx-auto px-4">
    <div className="md:flex justify-between">
      <div className="md:w-1/4 mb-8 md:mb-0">
        <img className="h-8" src="/logo-white.svg" alt="Logo" />
        <p className="text-gray-400 mt-4">CollegeFinder helps you discover colleges and courses that fit your interests and career goals.</p>
      </div>
      <div className="md:w-1/4 mb-8 md:mb-0">
        <h3 className="text-lg font-bold mb-4">Links</h3>
        <ul>
          <li><a href="#" className="text-gray-400 hover:text-white">Home</a></li>
          <li><a href="#" className="text-gray-400 hover:text-white">About</a></li>
          <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
          <li><a href="#" className="text-gray-400 hover:text-white">FAQ</a></li>
        </ul>
      </div>
      <div className="md:w-1/4 mb-8 md:mb-0">
        <h3 className="text-lg font-bold mb-4">Contact Us</h3>
        <p className="text-gray-400">123 Main St.</p>
        <p className="text-gray-400">Anytown, USA 12345</p>
        <p className="text-gray-400 mt-4">(123) 456-7890</p>
      </div>
      <div className="md:w-1/4">
        <h3 className="text-lg font-bold mb-4">Follow Us</h3>
        <div className="flex items-center">
          <a href="#" className="text-gray-400 hover:text-white mr-4">a</a>
          <a href="#" className="text-gray-400 hover:text-white mr-4">b</a>
          <a href="#" className="text-gray-400 hover:text-white mr-4">c</a>
          <a href="#" className="text-gray-400 hover:text-white">d</a>
        </div>
      </div>
    </div>
  </div>
</footer>
    </div>
    
      )
  }


export default LandingPage;