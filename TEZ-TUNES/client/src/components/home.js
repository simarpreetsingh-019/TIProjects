import React from "react";
import { CircuitBoard, Hexagon, Shield, Wallet } from "lucide-react";
import { useSelector } from "react-redux";

export const HeroSection = ({
  isVisible,
  textConnect,
  connectWallet,
  disconnectWallet,
}) => {
  const wallet = useSelector((state) => state.wallet);
  return (
    <>
      <header className="relative container mx-auto px-4 py-24">
        <div
          className={`text-center transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="inline-block mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-purple-500 blur-xl opacity-20 animate-pulse"></div>
              <h1 className="text-6xl  font-bold bg-clip-text text-transparent color-text">
                TezTunes
              </h1>
            </div>
          </div>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            The next evolution in music royalties. Powered by blockchain, driven
            by innovation.
          </p>
          <button
            onClick={!wallet.connected ? connectWallet : disconnectWallet}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 shadow-lg hover:shadow-purple-500/25"
          >
            {textConnect}
          </button>
        </div>
      </header>
    </>
  );
};

export const HexagonBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
    {[...Array(20)].map((_, i) => (
      <Hexagon
        key={i}
        className="absolute text-purple-500"
        style={{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          transform: `scale(${Math.random() * 2 + 1})`,
        }}
      />
    ))}
  </div>
);

const features = [
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Secure Transactions",
    description: "Military-grade encryption powered by Tezos blockchain",
  },
  {
    icon: <Wallet className="w-6 h-6" />,
    title: "Smart Contracts",
    description: "Automated royalty distribution with zero delays",
  },
  {
    icon: <CircuitBoard className="w-6 h-6" />,
    title: "Decentralized",
    description: "No intermediaries, pure peer-to-peer transactions",
  },
];

export const FeatureSection = () => (
  <section className="relative py-24 bg-gray-800/50">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="group bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 hover:bg-gray-700/50 transition-all hover:scale-105"
          >
            <div className="inline-block p-4 bg-purple-500/20 rounded-xl mb-6 group-hover:bg-purple-500/30 transition-all">
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
            <p className="text-gray-400">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const LivePerformance = () => {
  return (
    <section className="relative container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent color-text">
        Featured Artists
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3].map((index) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-xl bg-gray-800 transition-all hover:scale-105"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
            <img
              src={`/api/placeholder/400/300`}
              alt="Artist Performance"
              className="w-full h-64 object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-xl font-bold mb-2">
                Live Performance {index}
              </h3>
              <p className="text-gray-300">
                Experience the future of music ownership
              </p>
            </div>
            <div className="absolute top-4 right-4 bg-purple-500 text-white px-3 py-1 rounded-full text-sm">
              Live Now
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const beneficiaries = [
  {
    title: "Artist",
    benefit: "Receive transparent and timely compensation",
  },
  {
    title: "Producers and Record Labels",
    benefit:
      "Streamlined royalty tracking and distribution, reducing administrative overhead",
  },
  {
    title: "Right Holders",
    benefit:
      "Individuals or organisations owning music rights gain automated payouts",
  },
  {
    title: "Investors",
    benefit:
      "Opportunities for investors to participate in royalty sharing models",
  },
  {
    title: "Fans",
    benefit: "Opportunities for fans to directly support artists",
  },
];

export const WhyUsSection = () => (
  <section className="relative container mx-auto px-4 py-24">
    <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent color-text">
      Why Choose TezTunes?
    </h2>
    <div className="max-w-3xl mx-auto space-y-6">
      {beneficiaries.map((item, index) => (
        <div
          key={index}
          className="group p-6 bg-gray-800/50 backdrop-blur-sm rounded-xl hover:bg-gray-700/50 transition-all hover:scale-102 border border-purple-500/20 hover:border-purple-500/40"
        >
          <h3 className="text-xl font-bold text-purple-400 mb-2">
            {item.title}
          </h3>
          <p className="text-gray-300">{item.benefit}</p>
        </div>
      ))}
    </div>
  </section>
);

export const Stats = () => (
  <section className="relative py-16 bg-gray-800/50">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {[
          { label: "Active Artists", value: "10K+" },
          { label: "Total Volume", value: "₮ 1M+" },
          { label: "Smart Contracts", value: "50K+" },
          { label: "Daily Transactions", value: "100K+" },
        ].map((stat, index) => (
          <div key={index} className="p-6">
            <div className="text-3xl font-bold text-purple-400 mb-2">
              {stat.value}
            </div>
            <div className="text-gray-400">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const Footer = () => (
  <footer className="relative bg-gray-800/30 backdrop-blur-sm py-12">
    <div className="container mx-auto px-4">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold bg-clip-text text-transparent color-text">
          Join the Revolution
        </h3>
        <p className="text-gray-400">
          Be part of the future of music royalties
        </p>
      </div>
      <div className="flex justify-center space-x-8 text-gray-400">
        <a href="#" className="hover:text-purple-400 transition-colors">
          About
        </a>
        <a href="#" className="hover:text-purple-400 transition-colors">
          Documentation
        </a>
        <a href="#" className="hover:text-purple-400 transition-colors">
          Terms
        </a>
        <a href="#" className="hover:text-purple-400 transition-colors">
          Privacy
        </a>
      </div>
    </div>
  </footer>
);
