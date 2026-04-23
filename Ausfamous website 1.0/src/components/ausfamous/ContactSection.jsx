import { useState } from 'react';
import { base44 } from '@/api/base44Client';

function generateCaptcha() {
  const a = Math.floor(Math.random() * 9) + 1;
  const b = Math.floor(Math.random() * 9) + 1;
  return { a, b, answer: a + b };
}

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '', honeypot: '' });
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [captchaInput, setCaptchaInput] = useState('');
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.honeypot) return; // bot trap
    if (parseInt(captchaInput, 10) !== captcha.answer) {
      alert('Incorrect answer — please try again.');
      setCaptcha(generateCaptcha());
      setCaptchaInput('');
      return;
    }
    setStatus('sending');
    try {
      await base44.integrations.Core.SendEmail({
        to: 'become@ausfamous.com',
        subject: `New Enquiry from ${form.name}`,
        body: `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\n\nMessage:\n${form.message}`,
      });
      setStatus('success');
      setForm({ name: '', email: '', phone: '', message: '', honeypot: '' });
      setCaptchaInput('');
      setCaptcha(generateCaptcha());
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="bg-obsidian py-24 md:py-32 px-5 md:px-10">
      <div className="max-w-3xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-14">
          <p className="text-xs font-bold tracking-[0.26em] uppercase text-gold/50 mb-4">Begin Your Ascent</p>
          <h2 className="font-display text-4xl md:text-5xl font-medium text-platinum mb-4">
            Request a Free<br /><span className="text-gold italic">Brand Audit</span>
          </h2>
          <p className="text-sm text-platinum/40 max-w-md mx-auto leading-relaxed">
            Tell us about yourself and your goals. We'll review your current presence and outline exactly what's possible.
          </p>
        </div>

        {status === 'success' ? (
          <div className="text-center py-16 border border-gold/20 rounded-sm bg-gold/5">
            <p className="font-display text-2xl text-gold mb-3">Thank you.</p>
            <p className="text-sm text-platinum/50">We'll be in touch within one business day.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Honeypot */}
            <input name="honeypot" value={form.honeypot} onChange={handleChange} style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold tracking-widest uppercase text-platinum/40 mb-2">Full Name *</label>
                <input
                  name="name" required value={form.name} onChange={handleChange}
                  placeholder="Your name"
                  className="w-full bg-graphene border border-gold/15 text-platinum placeholder-platinum/25 text-sm px-4 py-3 rounded-sm focus:outline-none focus:border-gold/50 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold tracking-widest uppercase text-platinum/40 mb-2">Email *</label>
                <input
                  name="email" type="email" required value={form.email} onChange={handleChange}
                  placeholder="your@email.com"
                  className="w-full bg-graphene border border-gold/15 text-platinum placeholder-platinum/25 text-sm px-4 py-3 rounded-sm focus:outline-none focus:border-gold/50 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold tracking-widest uppercase text-platinum/40 mb-2">Phone</label>
              <input
                name="phone" value={form.phone} onChange={handleChange}
                placeholder="+61 000 000 000"
                className="w-full bg-graphene border border-gold/15 text-platinum placeholder-platinum/25 text-sm px-4 py-3 rounded-sm focus:outline-none focus:border-gold/50 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold tracking-widest uppercase text-platinum/40 mb-2">Message *</label>
              <textarea
                name="message" required value={form.message} onChange={handleChange}
                rows={5} placeholder="Tell us about your goals and current visibility..."
                className="w-full bg-graphene border border-gold/15 text-platinum placeholder-platinum/25 text-sm px-4 py-3 rounded-sm focus:outline-none focus:border-gold/50 transition-colors resize-none"
              />
            </div>

            {/* Captcha */}
            <div className="flex items-center gap-4">
              <label className="text-xs font-semibold tracking-widest uppercase text-platinum/40 shrink-0">
                {captcha.a} + {captcha.b} = ?
              </label>
              <input
                type="number" required value={captchaInput} onChange={e => setCaptchaInput(e.target.value)}
                placeholder="Answer"
                className="w-28 bg-graphene border border-gold/15 text-platinum placeholder-platinum/25 text-sm px-4 py-3 rounded-sm focus:outline-none focus:border-gold/50 transition-colors"
              />
            </div>

            {status === 'error' && (
              <p className="text-xs text-red-400">Something went wrong. Please try again or email us directly.</p>
            )}

            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full py-4 text-xs font-bold tracking-widest uppercase bg-gold text-obsidian rounded-sm hover:bg-gold-light transition-all duration-300 disabled:opacity-50"
            >
              {status === 'sending' ? 'Sending…' : 'Submit Enquiry'}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}