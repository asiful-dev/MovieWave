import React, { useState } from "react";
import {
  Shield,
  Eye,
  Lock,
  Database,
  UserCheck,
  AlertTriangle,
  FileText,
  Globe,
  Mail,
  Clock,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const PrivacyPolicy = () => {
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (index) => {
    setExpandedSection(expandedSection === index ? null : index);
  };

  const privacySections = [
    {
      title: "Information We Collect",
      icon: Database,
      content: [
        "Personal information you provide when creating an account (name, email, password)",
        "Usage data including viewing history, preferences, and device information",
        "Location data to provide region-appropriate content",
        "Payment information for subscription services (processed securely by third-party providers)",
        "Technical information such as IP address, browser type, and operating system"
      ]
    },
    {
      title: "How We Use Your Information",
      icon: UserCheck,
      content: [
        "Provide and improve our streaming services",
        "Personalize content recommendations based on your viewing history",
        "Process payments and manage your subscription",
        "Send important updates about service changes or security",
        "Analyze usage patterns to enhance user experience",
        "Prevent fraud and ensure platform security"
      ]
    },
    {
      title: "Data Sharing and Disclosure",
      icon: Globe,
      content: [
        "We do not sell your personal information to third parties",
        "Content partners may receive aggregated, non-personal viewing statistics",
        "Service providers who help operate our platform (hosting, payment processing)",
        "Legal authorities when required by law or to protect our users",
        "Business partners only with your explicit consent",
        "In case of company merger or acquisition (users will be notified)"
      ]
    },
    {
      title: "Data Security",
      icon: Lock,
      content: [
        "Industry-standard encryption for data transmission and storage",
        "Regular security audits and penetration testing",
        "Multi-factor authentication options for enhanced account security",
        "Secure data centers with 24/7 monitoring",
        "Employee access controls and regular security training",
        "Immediate breach notification procedures"
      ]
    },
    {
      title: "Your Privacy Rights",
      icon: Shield,
      content: [
        "Access and download your personal data",
        "Correct inaccurate information in your profile",
        "Delete your account and associated data",
        "Opt-out of marketing communications",
        "Control data sharing preferences",
        "Request information about how your data is used"
      ]
    },
    {
      title: "Cookies and Tracking",
      icon: Eye,
      content: [
        "Essential cookies for platform functionality",
        "Analytics cookies to understand user behavior (can be disabled)",
        "Preference cookies to remember your settings",
        "Third-party cookies for integrated services",
        "You can manage cookie preferences in your browser settings",
        "Some features may not work properly with cookies disabled"
      ]
    }
  ];

  const quickStats = [
    { icon: Shield, title: "GDPR Compliant", desc: "Full compliance with EU privacy regulations" },
    { icon: Lock, title: "256-bit Encryption", desc: "Bank-level security for all data" },
    { icon: AlertTriangle, title: "No Data Sales", desc: "We never sell your personal information" },
    { icon: Clock, title: "Updated Regularly", desc: "Policy reviewed and updated quarterly" },
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0f1c2f] via-[#132b4d] to-[#102f54] text-white px-4 py-[10rem]">
      <div className="max-w-6xl mx-auto flex flex-col gap-12">
        {/* Title */}
        <div className="text-center animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-primary-400 to-primary-600 text-transparent bg-clip-text mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-300 text-lg md:text-xl">
            Your privacy is our priority. Learn how we protect and handle your data at MovieWave.
          </p>
          <div className="mt-4 flex items-center justify-center gap-2 text-gray-400">
            <Clock className="w-4 h-4" />
            <span className="text-sm">Last updated: January 8, 2025</span>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-up">
          {quickStats.map(({ title, desc, icon: Icon }, i) => (
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

        {/* Policy Overview */}
        <div className="mt-16 animate-fade-in">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-md">
            <div className="flex items-center gap-3 mb-6">
              <FileText className="w-8 h-8 text-primary-300" />
              <h2 className="text-3xl font-bold text-white">Policy Overview</h2>
            </div>
            <p className="text-gray-300 leading-relaxed text-lg">
              At MovieWave, we believe transparency is key to building trust. This privacy policy explains how we collect, use, and protect your personal information when you use our streaming platform. We are committed to maintaining the highest standards of data protection and giving you control over your privacy.
            </p>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="mt-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
            Privacy Details
          </h2>
          
          <div className="space-y-4">
            {privacySections.map(({ title, icon: Icon, content }, index) => (
              <div
                key={index}
                className="bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md overflow-hidden"
              >
                <button
                  onClick={() => toggleSection(index)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-white/5 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-6 h-6 text-primary-300" />
                    <h3 className="text-xl font-bold text-white">{title}</h3>
                  </div>
                  {expandedSection === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-300" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-300" />
                  )}
                </button>
                
                {expandedSection === index && (
                  <div className="px-6 pb-6">
                    <div className="border-l-4 border-primary-500 pl-4">
                      <ul className="space-y-3">
                        {content.map((item, i) => (
                          <li key={i} className="text-gray-300 leading-relaxed flex items-start gap-2">
                            <div className="w-2 h-2 bg-primary-400 rounded-full mt-2 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-16 animate-fade-in">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-md">
            <div className="flex items-center gap-3 mb-6">
              <Mail className="w-8 h-8 text-primary-300" />
              <h2 className="text-3xl font-bold text-white">Questions About Privacy?</h2>
            </div>
            <p className="text-gray-300 leading-relaxed mb-6">
              If you have any questions about this privacy policy or how we handle your data, our privacy team is here to help. We're committed to transparency and will respond to all inquiries promptly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-6 py-3 bg-primary-600 hover:bg-primary-700 transition-all text-white font-bold rounded-xl shadow-xl">
                Contact Privacy Team
              </button>
              <button className="px-6 py-3 border border-white/20 hover:bg-white/5 transition-all text-white font-bold rounded-xl">
                Download Policy PDF
              </button>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 text-center animate-fade-in">
          <p className="text-lg text-gray-400 italic max-w-2xl mx-auto">
            Your trust is essential to us. We continuously update our privacy practices to ensure your data remains secure while providing you with the best MovieWave experience.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;