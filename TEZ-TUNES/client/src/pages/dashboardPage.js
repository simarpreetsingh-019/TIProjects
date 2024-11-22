import React from "react";
import {
  Music,
  Wallet,
  TrendingUp,
  DollarSign,
  Upload,
  Clock,
  BarChart3,
} from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function App() {
  const wallet = useSelector((state) => state.wallet);
  const { songs } = useSelector((state) => state.songs);

  function logOut() {
    window.localStorage.clear();
    window.location.href = "/";
  }

  return (
    <div className="min-h-screen bg-[#0B1121] text-gray-100">
      {/* Header */}
      <header className="bg-[#0D1526] border-b border-gray-800">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold  from-purple-400  transparent">
              TezTunes
            </h1>
          </div>
          <div className="flex items-center space-x-6">
            <Link to="/upload">
              <button className="bg-pink-500 hover:bg-pink-600 text-white rounded-md px-4 py-2">
                Upload
              </button>
            </Link>
            <Link to="/explore">
              <button className="bg-pink-500 hover:bg-pink-600 text-white rounded-md px-4 py-2">
                Explore
              </button>
            </Link>

            <div className="flex items-center bg-[#1A2234] rounded-lg px-4 py-2">
              <Wallet className="w-5 h-5 text-purple-400 mr-2" />
              <span className="font-medium">{wallet.balance}</span>
            </div>
            <button
              onClick={logOut}
              className="p-2 rounded-full hover:bg-[#1A2234] transition-colors"
            >
              {/* <Settings className="w-6 h-6" /> */}
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={<Music className="w-6 h-6 text-purple-400" />}
            title="Total Songs"
            value={songs.length}
            subtitle="8 new this month"
          />
          <StatCard
            icon={<TrendingUp className="w-6 h-6 text-green-400" />}
            title="Total Investments"
            value="1,250 XTZ"
            subtitle="+12.5% from last month"
          />
          <StatCard
            icon={<DollarSign className="w-6 h-6 text-blue-400" />}
            title="Earnings"
            value="458.32 XTZ"
            subtitle="Last 30 days"
          />
          <StatCard
            icon={<BarChart3 className="w-6 h-6 text-pink-400" />}
            title="Royalty Share"
            value="25.5%"
            subtitle="Across all songs"
          />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Songs */}
          <div className="bg-[#1A2234] rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Your Songs</h2>
              <button className="text-purple-400 hover:text-purple-300 text-sm font-medium">
                View All
              </button>
            </div>
            <div className="space-y-4">
              {songs
                .filter((song) => song.artist === wallet.address)
                .map((song) => (
                  <SongItem
                    title={song.title}
                    artist={song.artist_name}
                    earnings={song.price}
                    image={song.image}
                  />
                ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-[#1A2234] rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Recent Activity</h2>
              <button className="text-purple-400 hover:text-purple-300 text-sm font-medium">
                View All
              </button>
            </div>
            <div className="space-y-4">
              <ActivityItem
                icon={<Upload className="w-5 h-5" />}
                title="New Song Upload"
                description="Urban Rhythm was successfully uploaded"
                time="2 hours ago"
              />
              <ActivityItem
                icon={<Wallet className="w-5 h-5" />}
                title="Royalty Payment"
                description="Received 25.8 XTZ from royalties"
                time="5 hours ago"
              />
              <ActivityItem
                icon={<Clock className="w-5 h-5" />}
                title="Investment Matured"
                description="Investment in 'Summer Vibes' matured"
                time="1 day ago"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({ icon, title, value, subtitle }) {
  return (
    <div className="bg-[#1A2234] rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="bg-[#0B1121] p-3 rounded-lg">{icon}</div>
      </div>
      <h3 className="text-2xl font-bold mb-1">{value}</h3>
      <p className="text-gray-400 text-sm mb-2">{title}</p>
      <p className="text-xs text-gray-500">{subtitle}</p>
    </div>
  );
}

function SongItem({ title, artist, earnings, image }) {
  return (
    <div className="flex items-center space-x-4 p-3 hover:bg-[#242B3D] rounded-lg transition-colors">
      <img
        src={image}
        alt={title}
        className="w-12 h-12 rounded-lg object-cover"
      />
      <div className="flex-1">
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-gray-400">{artist}</p>
      </div>
      <div className="text-right">
        <p className="font-medium text-purple-400">{earnings}</p>
        <p className="text-xs text-gray-500">Price</p>
      </div>
    </div>
  );
}

function ActivityItem({ icon, title, description, time }) {
  return (
    <div className="flex items-start space-x-4 p-3 hover:bg-[#242B3D] rounded-lg transition-colors">
      <div className="bg-[#0B1121] p-2 rounded-lg text-purple-400">{icon}</div>
      <div className="flex-1">
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-gray-400">{description}</p>
        <p className="text-xs text-gray-500 mt-1">{time}</p>
      </div>
    </div>
  );
}

export default App;
