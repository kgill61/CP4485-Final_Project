"use client";

import { useState } from "react";

export default function AboutPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    sbj: "",
    msg: ""
  });

  // Handle input changes and update state dynamically
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the page from refreshing
    
    // TODO: Replace this URL with your actual API endpoint
    console.log("Attempting to send data:", formData);

    try {
      /* Example Fetch API setup:
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      console.log("API Response:", data);
      */
      
      // Clear the form after successful submission
      setFormData({ name: "", email: "", sbj: "", msg: "" });
      alert("Message sent successfully!");

    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="flex-1 p-6 md:p-12 flex flex-col items-center">
      
      {/* Main Content Container */}
      <div className="w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-2xl p-8 md:p-12 shadow-xl">
        
        {/* Page Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 border-b border-slate-800 pb-4 tracking-wide">
          Welcome to our website!
        </h1>
        
        {/* Subheading */}
        <h2 className="text-xl md:text-2xl font-semibold text-blue-400 mb-6">
          Our game review website lets users:
        </h2>
        
        {/* Feature List */}
        <ul className="space-y-4 text-slate-300 text-base md:text-lg mb-12">
          <li className="flex items-start gap-3 bg-slate-950/50 p-4 rounded-lg border border-slate-800/50 hover:border-slate-700 transition-colors">
            <span className="text-blue-500 font-bold">▶</span>
            View a selection of popular video games
          </li>
          <li className="flex items-start gap-3 bg-slate-950/50 p-4 rounded-lg border border-slate-800/50 hover:border-slate-700 transition-colors">
            <span className="text-blue-500 font-bold">▶</span>
            Write your own review on a video game
          </li>
          <li className="flex items-start gap-3 bg-slate-950/50 p-4 rounded-lg border border-slate-800/50 hover:border-slate-700 transition-colors">
            <span className="text-blue-500 font-bold">▶</span>
            See what others have to say on their own reviews
          </li>
        </ul>

        {/* Contact Form Section */}
        <div className="bg-slate-950 p-6 md:p-8 rounded-xl border border-slate-800">
          <h2 className="text-2xl font-bold text-white mb-6 tracking-wide">CONTACT US</h2>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            
            {/* Name Input */}
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-slate-300 font-medium text-sm">Name:</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                required
                className="px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              />
            </div>

            {/* Email Input */}
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-slate-300 font-medium text-sm">Email:</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                required
                className="px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              />
            </div>

            {/* Subject Input */}
            <div className="flex flex-col gap-2">
              <label htmlFor="sbj" className="text-slate-300 font-medium text-sm">Subject:</label>
              <input 
                type="text" 
                id="sbj" 
                name="sbj" 
                value={formData.sbj}
                onChange={handleChange}
                placeholder="Game Review Request"
                required
                className="px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              />
            </div>

            {/* Message Textarea */}
            <div className="flex flex-col gap-2">
              <label htmlFor="msg" className="text-slate-300 font-medium text-sm">Message:</label>
              <textarea 
                id="msg" 
                name="msg" 
                value={formData.msg}
                onChange={handleChange}
                placeholder="What's on your mind?"
                rows="4"
                required
                className="px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="mt-4">
              <button 
                type="submit"
                className="w-full md:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-colors duration-200 shadow-md shadow-blue-900/20"
              >
                Submit
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
}