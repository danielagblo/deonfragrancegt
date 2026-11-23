import { useState } from 'react';

const WHATSAPP_NUMBER = '233555181555';

export const ContactForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sent'>('idle');

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const text = [
      'Hello, Dion Fragrance.',
      '',
      `Name: ${name.trim()}`,
      `Email: ${email.trim()}`,
      '',
      message.trim(),
    ].join('\n');
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setStatus('sent');
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4 text-left">
      <label className="block">
        <span className="text-xs font-bold uppercase tracking-wider text-[#1C140C]">Name</span>
        <input
          required
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1.5 w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm text-[#1C140C] focus:outline-none focus:border-[#D4AF37]"
        />
      </label>
      <label className="block">
        <span className="text-xs font-bold uppercase tracking-wider text-[#1C140C]">Email</span>
        <input
          required
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1.5 w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm text-[#1C140C] focus:outline-none focus:border-[#D4AF37]"
        />
      </label>
      <label className="block">
        <span className="text-xs font-bold uppercase tracking-wider text-[#1C140C]">Message</span>
        <textarea
          required
          name="message"
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="mt-1.5 w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm text-[#1C140C] focus:outline-none focus:border-[#D4AF37] resize-y"
        />
      </label>
      <button
        type="submit"
        className="w-full sm:w-auto px-8 py-3 bg-[#D4AF37] hover:bg-[#C49B2A] text-[#1C140C] text-xs font-bold uppercase tracking-widest rounded-md cursor-pointer"
      >
        Send on WhatsApp
      </button>
      {status === 'sent' && (
        <p className="text-sm text-[#1C140C]">WhatsApp is open with your message. Tap send to reach us on 0555181555.</p>
      )}
    </form>
  );
};
