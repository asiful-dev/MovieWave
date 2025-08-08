import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  Send,
  Clock,
  Globe,
  CheckCircle,
} from "lucide-react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0f1c2f] via-[#132b4d] to-[#102f54] text-white px-4 py-[10rem]">
      <div className="max-w-6xl mx-auto flex flex-col gap-12">
        {/* Title */}
        <div className="text-center animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-primary-400 to-primary-600 text-transparent bg-clip-text mb-4">
            Contact Us
          </h1>
          <p className="text-gray-300 text-lg md:text-xl">
            We'd love to hear from you! Get in touch with our MovieWave team.
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-up">
          {[
            {
              title: "Email Us",
              desc: "support@moviewave.com",
              icon: Mail,
              detail: "Response within 24 hours",
            },
            {
              title: "Call Us",
              desc: "+1 (555) 123-4567",
              icon: Phone,
              detail: "Mon-Fri, 9AM-6PM EST",
            },
            {
              title: "Live Chat",
              desc: "Available 24/7",
              icon: MessageCircle,
              detail: "Instant support online",
            },
            {
              title: "Office",
              desc: "123 Movie Street, Hollywood, CA",
              icon: MapPin,
              detail: "Visit us anytime",
            },
          ].map(({ title, desc, detail, icon: Icon }, i) => (
            <div
              key={i}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md hover:scale-105 transition-all shadow-lg hover:shadow-primary-500/20"
            >
              <Icon className="w-8 h-8 text-primary-300 mb-4 animate-pulse" />
              <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
              <p className="text-sm text-primary-200 mb-1">{desc}</p>
              <p className="text-xs text-gray-400">{detail}</p>
            </div>
          ))}
        </div>

        {/* Contact Form */}
        <div className="mt-16 animate-fade-out">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
              Send us a Message
            </h2>

            {isSubmitted && (
              <div className="mb-6 bg-green-500/20 border border-green-500/30 rounded-xl p-4 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                  <p className="text-green-300 font-medium">
                    Thank you! Your message has been sent successfully.
                  </p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Contact Form */}
              <div className="space-y-6">
                <div>
                  <div className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name
                  </div>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange(e)}
                    name="name"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 backdrop-blur-md focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <div className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </div>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange(e)}
                    name="email"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 backdrop-blur-md focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <div className="block text-sm font-medium text-gray-300 mb-2">
                    Subject
                  </div>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => handleInputChange(e)}
                    name="subject"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 backdrop-blur-md focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <div className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                  </div>
                  <textarea
                    value={formData.message}
                    onChange={(e) => handleInputChange(e)}
                    name="message"
                    rows={5}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 backdrop-blur-md focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all resize-none"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full px-6 py-3 bg-primary-600 hover:bg-primary-700 transition-all text-white font-bold rounded-xl shadow-xl flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Send Message
                </button>
              </div>

              {/* Additional Info */}
              <div className="space-y-6">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
                  <Clock className="w-8 h-8 text-primary-300 mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">
                    Support Hours
                  </h3>
                  <div className="space-y-1 text-gray-300">
                    <p>Monday - Friday: 9:00 AM - 6:00 PM EST</p>
                    <p>Saturday: 10:00 AM - 4:00 PM EST</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
                  <Globe className="w-8 h-8 text-primary-300 mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">
                    Global Reach
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    We serve MovieWave users worldwide and provide support in
                    multiple languages. Our team is here to help, no matter
                    where you are.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
                  <MessageCircle className="w-8 h-8 text-primary-300 mb-4 animate-pulse" />
                  <h3 className="text-xl font-bold text-white mb-2">
                    Quick Response
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    Most inquiries are answered within 4-6 hours during business
                    hours. For urgent matters, please use our live chat feature.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 text-center animate-fade-in">
          <p className="text-lg text-gray-400 italic max-w-xl mx-auto">
            Your feedback helps us improve MovieWave. We're committed to
            providing you with the best streaming experience possible.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
