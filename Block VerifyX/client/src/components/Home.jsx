import React from "react";
import { Link } from "react-router-dom";
import { User, ShieldCheck, Award } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col justify-between relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+CjxyZWN0IHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgZmlsbD0iIzFmMjkzNyI+PC9yZWN0Pgo8Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIxLjUiIGZpbGw9IiMzNzQxNTEiPjwvY2lyY2xlPgo8L3N2Zz4=')] opacity-30 animate-pulse"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 animate-gradient-xy"></div>
      </div>

      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-1/4 left-1/2 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

      <header className="container mx-auto px-4 py-6 relative z-10">
        <h1 className="text-2xl font-bold text-gray-100"></h1>
      </header>

      <main className="container mx-auto px-4 flex-grow flex items-center justify-center relative z-10">
        <div className="max-w-4xl w-full">
          <h2 className="text-5xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-text">
            Secure Certificate Verification
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            Leverage blockchain technology for tamper-proof certificate
            management.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              to="/user"
              className="group bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-lg p-6 transition-all duration-300 hover:bg-opacity-70 border border-gray-700 hover:border-blue-500"
            >
              <div className="flex items-center">
                <User size={24} className="text-blue-400 mr-4" />
                <div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-400 transition-colors duration-300">
                    Holder
                  </h3>
                  <p className="text-gray-300">
                    Verify and manage your certificates
                  </p>
                </div>
              </div>
            </Link>

            <Link
              to="/issuer"
              className="group bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-lg p-6 transition-all duration-300 hover:bg-opacity-70 border border-gray-700 hover:border-green-500"
            >
              <div className="flex items-center">
                <Award size={24} className="text-green-400 mr-4" />
                <div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-green-400 transition-colors duration-300">
                    Issuer
                  </h3>
                  <p className="text-gray-300">Issue and manage certificates</p>
                </div>
              </div>
            </Link>

            <Link
              to="/admin"
              className="group bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-lg p-6 transition-all duration-300 hover:bg-opacity-70 border border-gray-700 hover:border-purple-500"
            >
              <div className="flex items-center">
                <ShieldCheck size={24} className="text-purple-400 mr-4" />
                <div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-purple-400 transition-colors duration-300">
                    Verifier
                  </h3>
                  <p className="text-gray-300">
                    Manage users and oversee operations
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </main>

    </div>
  );
};

export default Home;
