import { useState } from 'react';
import { motion } from 'framer-motion';
import useScrollReveal from '../../hooks/useScrollReveal';

export default function ContactSection() {
  const [ref, visible] = useScrollReveal();
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="relative py-16 md:py-28 lg:py-40 bg-white overflow-hidden" ref={ref}>
      <div className="absolute top-0 right-0 w-2/3 h-full bg-[radial-gradient(ellipse_at_80%_30%,rgba(197,160,89,0.10)_0%,transparent_50%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 md:px-10 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}>
            
            <p className="text-[11px] font-bold tracking-[0.25em] uppercase text-gold mb-5">The Selection Phase</p>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-medium text-obsidian leading-tight mb-6">
              Your reputation is your most valuable asset. Build it deliberately.
            </h2>
            <p className="text-obsidian/50 leading-relaxed mb-10">
              Book your Free Personal Brand Strategy Consultation today. No obligation. No pitch. Just a clear, honest look at where your brand is and where it can go.
            </p>
            <div className="space-y-4 text-obsidian/40 text-sm">
              <p>📍 17 Ellesmere Road, Windsor VIC 3181</p>
              <p>✉️ become@ausfamous.com.au</p>
              <p>📞 <a href="tel:+61434820067" className="hover:text-gold transition-colors">+61 434 820 067</a></p>
            </div>
          </motion.div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}>
            
            {submitted ?
            <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
                  </div>
                  <h3 className="font-display text-2xl text-obsidian mb-2">Thank you.</h3>
                  <p className="text-obsidian/50">We will respond shortly.</p>
                </div>
              </div> :

            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold tracking-widest uppercase text-obsidian/40 mb-2 block">First name</label>
                    <input
                    type="text"
                    required
                    value={form.firstName}
                    onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                    className="w-full bg-transparent border-b-2 border-obsidian/15 focus:border-gold pb-3 pt-1 text-obsidian outline-none transition-colors placeholder:text-obsidian/20" />
                  
                  </div>
                  <div>
                    <label className="text-[10px] font-bold tracking-widest uppercase text-obsidian/40 mb-2 block">Last name</label>
                    <input
                    type="text"
                    required
                    value={form.lastName}
                    onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                    className="w-full bg-transparent border-b-2 border-obsidian/15 focus:border-gold pb-3 pt-1 text-obsidian outline-none transition-colors" />
                  
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold tracking-widest uppercase text-obsidian/40 mb-2 block">Email</label>
                  <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-transparent border-b-2 border-obsidian/15 focus:border-gold pb-3 pt-1 text-obsidian outline-none transition-colors" />
                
                </div>
                <div>
                  <label className="text-[10px] font-bold tracking-widest uppercase text-obsidian/40 mb-2 block">Phone</label>
                  <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full bg-transparent border-b-2 border-obsidian/15 focus:border-gold pb-3 pt-1 text-obsidian outline-none transition-colors" />
                
                </div>
                <div>
                  <label className="text-[10px] font-bold tracking-widest uppercase text-obsidian/40 mb-2 block">Message</label>
                  <textarea
                  rows={4}
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Share context in a few sentences."
                  className="w-full bg-transparent border-b-2 border-obsidian/15 focus:border-gold pb-3 pt-1 text-obsidian outline-none transition-colors resize-none placeholder:text-obsidian/20" />
                
                </div>
                <button
                type="submit"
                className="w-full py-5 text-sm font-bold tracking-widest uppercase bg-gold text-obsidian rounded-sm hover:bg-gold-light transition-all duration-300 shadow-lg shadow-gold/20 mt-4">
                
                  Apply Now
                </button>
              </form>
            }
          </motion.div>
        </div>
      </div>
    </section>);

}