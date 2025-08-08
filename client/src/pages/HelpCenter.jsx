import React from "react";
import {
  HelpCircle,
  PhoneCall,
  Mail,
  ShieldCheck,
  UserRound,
  Settings,
} from "lucide-react";

const HelpCenter = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0f1c2f] via-[#132b4d] to-[#102f54] text-white px-4 py-[10rem]">
      <div className="max-w-6xl mx-auto flex flex-col gap-12">
        {/* Title */}
        <div className="text-center animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-primary-400 to-primary-600 text-transparent bg-clip-text mb-4">
            Help Center
          </h1>
          <p className="text-gray-300 text-lg md:text-xl">
            Got questions? We're here to help you navigate MovieWave with ease.
          </p>
        </div>

        {/* Quick Help Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-up">
          {[
            {
              title: "Account Support",
              desc: "Issues with login, password, or profile.",
              icon: UserRound,
            },
            {
              title: "Technical Help",
              desc: "Something not working right? We’ll fix it.",
              icon: Settings,
            },
            {
              title: "Security & Privacy",
              desc: "Your data safety is our top priority.",
              icon: ShieldCheck,
            },
            {
              title: "Report Content",
              desc: "Seen something inappropriate? Let us know.",
              icon: HelpCircle,
            },
            {
              title: "Contact Us",
              desc: "We’re just a click away from your questions.",
              icon: Mail,
            },
            {
              title: "Live Support",
              desc: "Speak with a real person in minutes.",
              icon: PhoneCall,
            },
          ].map(({ title, desc, icon: Icon }, i) => (
            <div
              key={i}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md hover:scale-105 transition-all shadow-lg hover:shadow-primary-500/20"
            >
              <Icon className="w-8 h-8 text-primary-300 mb-4 animate-pulse" />
              <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
              <p className="text-sm text-gray-300 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6 max-w-4xl mx-auto">
            {[
              {
                q: "How do I reset my password?",
                a: "Go to your account settings, click 'Reset Password' and follow the instructions sent to your email.",
              },
              {
                q: "How can I delete my MovieWave account?",
                a: "Please contact support with your email and username. Our team will assist you with account deletion.",
              },
              {
                q: "Why is a movie not playing?",
                a: "Ensure your internet is stable. Try refreshing the page or check if the issue persists across other devices.",
              },
            ].map(({ q, a }, i) => (
              <div
                key={i}
                className="border-l-4 border-primary-500 bg-white/5 p-4 rounded-xl shadow-sm"
              >
                <h4 className="text-lg font-semibold text-white mb-2">
                  {q}
                </h4>
                <p className="text-lg text-gray-300">{a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 text-center animate-fade-in">
          <p className="text-lg text-gray-400 italic max-w-xl mx-auto">
            Still need help? Our support team is ready to assist you 24/7 — we
            care about your MovieWave experience.
          </p>
          <button className="mt-6 px-6 py-3 bg-primary-600 hover:bg-primary-700 transition-all text-white font-bold rounded-full shadow-xl">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;