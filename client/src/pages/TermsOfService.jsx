import React, { useState } from "react";
import {
  FileText,
  Users,
  CreditCard,
  Ban,
  Shield,
  AlertTriangle,
  Scale,
  RefreshCw,
  Mail,
  Clock,
  ChevronDown,
  ChevronUp,
  CheckCircle,
} from "lucide-react";

const TermsOfService = () => {
  const [expandedSection, setExpandedSection] = useState(null);
  const [acknowledged, setAcknowledged] = useState(false);

  const toggleSection = (index) => {
    setExpandedSection(expandedSection === index ? null : index);
  };

  const termsQuickStats = [
    { icon: Users, title: "User Agreement", desc: "Binding contract between you and MovieWave" },
    { icon: CreditCard, title: "Payment Terms", desc: "Clear billing and subscription policies" },
    { icon: Shield, title: "Content Protection", desc: "Respecting intellectual property rights" },
    { icon: Scale, title: "Legal Framework", desc: "Governed by applicable laws and regulations" },
  ];

  const termsSections = [
    {
      title: "Acceptance of Terms",
      icon: CheckCircle,
      content: [
        "By accessing or using MovieWave, you agree to be bound by these Terms of Service",
        "If you do not agree with any part of these terms, you may not use our service",
        "These terms apply to all users, including visitors, registered users, and subscribers",
        "Your continued use of the service constitutes acceptance of any updates to these terms",
        "You must be at least 13 years old to use MovieWave, or have parental consent",
        "Corporate accounts must be authorized by an official company representative"
      ]
    },
    {
      title: "User Accounts and Responsibilities",
      icon: Users,
      content: [
        "You are responsible for maintaining the confidentiality of your account credentials",
        "You agree to provide accurate and complete information when creating your account",
        "You must notify us immediately of any unauthorized use of your account",
        "One account per person unless you have a family plan",
        "You are responsible for all activities that occur under your account",
        "Account sharing outside of household members is prohibited"
      ]
    },
    {
      title: "Subscription and Payment",
      icon: CreditCard,
      content: [
        "Subscription fees are billed in advance on a monthly or yearly basis",
        "All payments are non-refundable except as required by applicable law",
        "We reserve the right to change subscription prices with 30 days notice",
        "Failed payments may result in service suspension after a grace period",
        "You can cancel your subscription at any time through your account settings",
        "Cancelled subscriptions remain active until the end of the current billing period"
      ]
    },
    {
      title: "Content and Usage Rights",
      icon: FileText,
      content: [
        "All content on MovieWave is licensed for personal, non-commercial use only",
        "You may not download, copy, or redistribute any content without permission",
        "Content availability may vary by geographic region and change over time",
        "We grant you a limited, non-exclusive license to stream content during your subscription",
        "Any unauthorized use of content may result in immediate account termination",
        "User-generated content must comply with our community guidelines"
      ]
    },
    {
      title: "Prohibited Activities",
      icon: Ban,
      content: [
        "Using the service for any illegal or unauthorized purpose",
        "Attempting to bypass geographic restrictions or access controls",
        "Sharing your account credentials with unauthorized users",
        "Using automated systems to access the service (bots, scrapers, etc.)",
        "Interfering with the security or integrity of the platform",
        "Creating multiple accounts to circumvent restrictions or bans"
      ]
    },
    {
      title: "Service Availability and Changes",
      icon: RefreshCw,
      content: [
        "We strive to maintain 99.9% uptime but do not guarantee uninterrupted service",
        "Scheduled maintenance will be announced with reasonable advance notice",
        "We reserve the right to modify or discontinue features with notice",
        "Emergency maintenance may occur without prior notice",
        "Service interruptions due to third-party issues are beyond our control",
        "We may limit service during peak usage to ensure quality for all users"
      ]
    },
    {
      title: "Termination",
      icon: AlertTriangle,
      content: [
        "Either party may terminate this agreement at any time",
        "We may suspend or terminate accounts for violation of these terms",
        "Upon termination, your access to the service will cease immediately",
        "Some provisions of these terms will survive termination",
        "Terminated users may not create new accounts without our permission",
        "We reserve the right to delete account data after termination"
      ]
    },
    {
      title: "Limitation of Liability",
      icon: Scale,
      content: [
        "MovieWave is provided 'as is' without warranties of any kind",
        "We are not liable for any indirect, incidental, or consequential damages",
        "Our total liability to you is limited to the amount you paid in the last 12 months",
        "We do not warrant that the service will be error-free or secure",
        "You use the service at your own risk and discretion",
        "Some jurisdictions do not allow limitation of liability, so these may not apply to you"
      ]
    }
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0f1c2f] via-[#132b4d] to-[#102f54] text-white px-4 py-[10rem]">
      <div className="max-w-6xl mx-auto flex flex-col gap-12">
        {/* Title */}
        <div className="text-center animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-primary-400 to-primary-600 text-transparent bg-clip-text mb-4">
            Terms of Service
          </h1>
          <p className="text-gray-300 text-lg md:text-xl">
            Please read these terms carefully. They govern your use of MovieWave and our relationship with you.
          </p>
          <div className="mt-4 flex items-center justify-center gap-2 text-gray-400">
            <Clock className="w-4 h-4" />
            <span className="text-sm">Last updated: January 8, 2025</span>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-up">
          {termsQuickStats.map(({ title, desc, icon: Icon }, i) => (
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

        {/* Terms Overview */}
        <div className="mt-16 animate-fade-in">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-md">
            <div className="flex items-center gap-3 mb-6">
              <FileText className="w-8 h-8 text-primary-300" />
              <h2 className="text-3xl font-bold text-white">Terms Overview</h2>
            </div>
            <p className="text-gray-300 leading-relaxed text-lg mb-6">
              These Terms of Service constitute a legally binding agreement between you and MovieWave. By using our streaming platform, you acknowledge that you have read, understood, and agree to be bound by these terms. We recommend reading the full terms below to understand your rights and responsibilities.
            </p>
            
            {/* Acknowledgment Section  */}
            <div className="flex items-start gap-3 p-4 bg-white/5 rounded-xl border border-primary-500/30">
              <input
                type="checkbox"
                checked={acknowledged}
                onChange={(e) => setAcknowledged(e.target.checked)}
                className="mt-1 w-4 h-4 text-primary-600 bg-transparent border-gray-300 rounded focus:ring-primary-500"
              />
              <div>
                <p className="text-primary-200 font-medium">
                  I acknowledge that I have read and understood these Terms of Service
                </p>
                <p className="text-gray-400 text-sm mt-1">
                  Check this box to confirm your understanding of the terms below
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Terms Sections */}
        <div className="mt-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
            Detailed Terms
          </h2>
          
          <div className="space-y-4">
            {termsSections.map(({ title, icon: Icon, content }, index) => (
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

        {/* Important Notices */}
        <div className="mt-16 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/5 border border-yellow-500/30 rounded-2xl p-6 backdrop-blur-md">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-yellow-400" />
                <h3 className="text-xl font-bold text-white">Changes to Terms</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                We may update these terms from time to time. We'll notify you of significant changes via email or through the platform. Your continued use after changes constitutes acceptance.
              </p>
            </div>
            
            <div className="bg-white/5 border border-blue-500/30 rounded-2xl p-6 backdrop-blur-md">
              <div className="flex items-center gap-3 mb-4">
                <Scale className="w-6 h-6 text-blue-400" />
                <h3 className="text-xl font-bold text-white">Governing Law</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                These terms are governed by the laws of the jurisdiction where MovieWave is incorporated. Any disputes will be resolved through binding arbitration.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-16 animate-fade-in">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-md">
            <div className="flex items-center gap-3 mb-6">
              <Mail className="w-8 h-8 text-primary-300" />
              <h2 className="text-3xl font-bold text-white">Questions About These Terms?</h2>
            </div>
            <p className="text-gray-300 leading-relaxed mb-6">
              If you have any questions about these Terms of Service or need clarification on any section, our legal team is available to help. We believe in transparency and clear communication.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-6 py-3 bg-primary-600 hover:bg-primary-700 transition-all text-white font-bold rounded-xl shadow-xl">
                Contact Legal Team
              </button>
              <button className="px-6 py-3 border border-white/20 hover:bg-white/5 transition-all text-white font-bold rounded-xl">
                Download Terms PDF
              </button>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-20 text-center animate-fade-in">
          <p className="text-lg text-gray-400 italic max-w-2xl mx-auto">
            These terms ensure a fair and secure experience for all MovieWave users. Thank you for taking the time to understand your rights and responsibilities.
          </p>
          {acknowledged && (
            <div className="mt-4 flex items-center justify-center gap-2 text-green-400">
              <CheckCircle className="w-5 h-5" />
              <span>Terms acknowledged - you're all set!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;