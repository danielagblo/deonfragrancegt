import { useState } from 'react';

export const NewsletterForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'saving' | 'done' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus('saving');
    setMessage('');
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json().catch(() => null);
      if (!response.ok) {
        setStatus('error');
        setMessage(data?.error || 'Could not save your email. Please try again.');
        return;
      }
      setStatus('done');
      setMessage(data?.already ? 'This email is already on the list.' : 'You are on the list.');
      setEmail('');
    } catch {
      setStatus('error');
      setMessage('Could not save your email. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email address"
          aria-label="Email address"
          className="flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-[#1C140C] outline-none focus:border-[#D4AF37]"
        />
        <button
          type="submit"
          disabled={status === 'saving'}
          className="rounded-lg bg-[#D4AF37] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#1C140C] hover:bg-[#C49B2A] disabled:opacity-60 cursor-pointer"
        >
          {status === 'saving' ? 'Joining...' : 'Join'}
        </button>
      </div>
      {message && (
        <p className={`mt-2 text-xs ${status === 'error' ? 'text-red-600' : 'text-[#1C140C]'}`}>{message}</p>
      )}
    </form>
  );
};
