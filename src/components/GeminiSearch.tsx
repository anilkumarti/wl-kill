import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import { Sparkles, Send, Loader2, AlertCircle, Copy, Check } from 'lucide-react';
import { sendToGemini, isFitnessQuery, sanitizePrompt, getRestrictedResponse } from '../services/geminiService';

const GeminiSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const submit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (loading) return;
    
    setResponse(null);
    setError(null);
    if (!query.trim()) return setError('Please enter a question or prompt.');

    const sanitized = sanitizePrompt(query.trim());
    if (!isFitnessQuery(sanitized)) {
      setResponse(getRestrictedResponse());
      return;
    }

    try {
      setLoading(true);
      const res = await sendToGemini(query.trim());
      const text = res?.reply || JSON.stringify(res?.raw || res);
      setResponse(text);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong while connecting to Gemini.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!response) return;
    navigator.clipboard.writeText(response);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <form onSubmit={submit} className="relative mb-6 group">
        <div className="relative">
          <input
            aria-label="Ask Gemini"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask about food, calories, recipes, workouts, or health tips..."
            className="w-full pl-4 pr-12 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600"
          />
          <button
            type="submit"
            disabled={loading}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/30 rounded-lg disabled:opacity-40 transition-colors"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>
      </form>

      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col items-center justify-center p-8 text-center space-y-3"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-purple-500 blur-xl opacity-20 animate-pulse rounded-full" />
              <Loader2 className="w-8 h-8 text-purple-600 animate-spin relative z-10" />
            </div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 animate-pulse">
              Consulting Gemini AI...
            </p>
          </motion.div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-4 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20 text-red-700 dark:text-red-400 rounded-xl flex items-start gap-3"
          >
            <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />
            <div className="text-sm font-medium">{error}</div>
          </motion.div>
        )}

        {response && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="bg-white dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/50 rounded-2xl shadow-xl shadow-purple-500/5 overflow-hidden backdrop-blur-sm"
          >
            <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700/50 flex items-center justify-between bg-gray-50/50 dark:bg-gray-900/20">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                  <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 uppercase tracking-tight">
                  Gemini Analysis
                </h3>
              </div>
              <button
                onClick={copyToClipboard}
                className="p-2 text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                title="Copy response"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            
            <div className="px-6 py-6 max-w-none text-gray-800 dark:text-gray-200">
              <ReactMarkdown
                components={{
                  h1: ({ children }) => <h1 className="text-xl font-bold mb-4 mt-6 first:mt-0">{children}</h1>,
                  h2: ({ children }) => <h2 className="text-lg font-bold mb-3 mt-5 first:mt-0">{children}</h2>,
                  h3: ({ children }) => <h3 className="text-md font-bold mb-2 mt-4 first:mt-0">{children}</h3>,
                  p: ({ children }) => <p className="mb-4 leading-relaxed last:mb-0">{children}</p>,
                  ul: ({ children }) => <ul className="list-disc pl-5 mb-4 space-y-1">{children}</ul>,
                  ol: ({ children }) => <ol className="list-decimal pl-5 mb-4 space-y-1">{children}</ol>,
                  li: ({ children }) => <li className="mb-1">{children}</li>,
                  strong: ({ children }) => <strong className="font-bold text-purple-700 dark:text-purple-400">{children}</strong>,
                  em: ({ children }) => <em className="italic">{children}</em>,
                  blockquote: ({ children }) => <blockquote className="border-l-4 border-purple-200 dark:border-purple-800 pl-4 italic my-4 text-gray-600 dark:text-gray-400">{children}</blockquote>,
                }}
              >
                {response}
              </ReactMarkdown>
            </div>
            
            <div className="px-6 py-3 bg-purple-50/30 dark:bg-purple-900/10 border-t border-purple-100/30 dark:border-purple-900/20">
              <p className="text-[10px] text-gray-400 dark:text-gray-500 italic text-center">
                AI information is for guidance only. Consult a professional for specific health advice.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GeminiSearch;
