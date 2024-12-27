function About() {
  return (
    <div className="min-h-screen bg-gradient-to-bl from-indigo-700 via-purple-600 to-pink-600 flex items-center justify-center text-white">
      <div className="max-w-5xl p-6 md:p-12 text-center space-y-6">
        <h1 className="text-5xl font-extrabold animate__animated animate__zoomIn">
          About Our User Management Platform
        </h1>
        <p className="text-xl leading-relaxed animate__animated animate__fadeIn animate__delay-1s">
          Our user management system is designed to simplify your workflow. 
          With robust features for administrators and an intuitive interface for users, 
          we ensure seamless management of users, their roles, and activities.
        </p>
        <p className="text-lg animate__animated animate__fadeIn animate__delay-2s">
          Whether you're tracking user data, monitoring activity, or managing permissions, our platform has you covered. 
          We believe in making management effortless, secure, and futuristic.
        </p>

        <div className="flex justify-center mt-8 space-x-4 animate__animated animate__fadeInUp animate__delay-3s">
          <a href="/features">
            <button className="bg-gradient-to-r from-blue-500 to-teal-400 px-6 py-3 rounded-lg text-lg font-semibold shadow-md transform transition-all hover:scale-105 hover:from-blue-400 hover:to-teal-500">
              Learn More
            </button>
          </a>
          <a href="/contact">
            <button className="bg-gradient-to-r from-pink-500 to-red-400 px-6 py-3 rounded-lg text-lg font-semibold shadow-md transform transition-all hover:scale-105 hover:from-pink-400 hover:to-red-500">
              Contact Us
            </button>
          </a>
        </div>
      </div>

      {/* Animated background shapes */}
      <div className="absolute inset-0 z-[-1]">
        <div className="w-40 h-40 bg-purple-300 opacity-30 rounded-full blur-xl absolute top-10 left-10 animate-pulse"></div>
        <div className="w-72 h-72 bg-blue-400 opacity-20 rounded-full blur-2xl absolute bottom-20 right-20 animate-pulse"></div>
        <div className="w-52 h-52 bg-pink-500 opacity-25 rounded-full blur-lg absolute bottom-32 left-32 animate-pulse"></div>
      </div>
    </div>
  );
}

export default About;
