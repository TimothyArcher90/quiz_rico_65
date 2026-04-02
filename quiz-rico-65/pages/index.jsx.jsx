import React, { useState } from 'react';
import { Share2, ChevronRight, Copy, Check } from 'lucide-react';

export default function QuizRico() {
  const [step, setStep] = useState(0); // 0=currency, 1-5=questions, 6=result, 7=share
  const [currency, setCurrency] = useState(null);
  const [answers, setAnswers] = useState({});
  const [email, setEmail] = useState('');
  const [copied, setCopied] = useState(false);

  const currencyOptions = [
    { code: 'USD', label: 'USD', emoji: '🇺🇸', symbol: '$' },
    { code: 'COP', label: 'Colombia', emoji: '🇨🇴', symbol: '$' },
    { code: 'MXN', label: 'México', emoji: '🇲🇽', symbol: '$' }
  ];

  const questions = [
    {
      id: 1,
      title: '¿Cuál es tu mayor miedo con tu dinero ahora?',
      options: [
        { text: 'Que pierda valor por inflación', zone: 'dollarDigital' },
        { text: 'Que no crezca lo suficiente para los 65', zone: 'neutral' },
        { text: 'Que especule mal y pierda todo', zone: 'brics' },
        { text: 'Que otro gobierno imprima mi dinero', zone: 'dollarDigital' },
        { text: 'No sé, nunca lo pensé', zone: 'neutral' }
      ]
    },
    {
      id: 2,
      title: '¿Dónde está hoy la mayoría de tu capital?',
      options: [
        { text: 'En el banco / CDT / Treasuries', zone: 'dollarDigital' },
        { text: 'En oro / Materias primas', zone: 'brics' },
        { text: 'En Bitcoin / Crypto / Energía', zone: 'neutral' },
        { text: 'En acciones / Fondos / ETF', zone: 'hybrid' },
        { text: 'No tengo capital para invertir', zone: 'dollarDigital' }
      ]
    },
    {
      id: 3,
      title: 'Si tu inversión perdiera 80% mañana, ¿qué pasaría?',
      options: [
        { text: 'Vendo TODO y salgo corriendo', zone: 'dollarDigital' },
        { text: 'Me da pánico, pero espero', zone: 'brics' },
        { text: 'Sigo comprando cada mes sin importar', zone: 'neutral' },
        { text: 'Depende de si es corto plazo', zone: 'hybrid' },
        { text: 'Nunca tendría 80% en una sola cosa', zone: 'brics' }
      ]
    },
    {
      id: 4,
      title: '¿En cuántos años necesitas este dinero?',
      options: [
        { text: 'Menos de 1 año', zone: 'dollarDigital' },
        { text: '1-3 años', zone: 'brics' },
        { text: '3-7 años', zone: 'brics' },
        { text: '7-15 años', zone: 'neutral' },
        { text: '15+ años (hasta jubilación)', zone: 'neutral' }
      ]
    },
    {
      id: 5,
      title: '¿Cuál es el número que te asusta más?',
      options: [
        { text: 'Tener solo $1.2M a los 65', zone: 'dollarDigital' },
        { text: 'Perder el nervio cuando baje -80%', zone: 'neutral' },
        { text: 'No entender donde estoy invirtiendo', zone: 'brics' },
        { text: 'Que otros ganen 100x y yo 5x', zone: 'neutral' },
        { text: 'Que mi país devalúe mi dinero', zone: 'brics' }
      ]
    }
  ];

  const calculateZone = () => {
    const zones = { dollarDigital: 0, brics: 0, neutral: 0, hybrid: 0 };
    Object.values(answers).forEach(answer => {
      if (answer.zone) zones[answer.zone]++;
    });
    if (zones.neutral >= 3) return 'neutral';
    if (zones.brics >= 3) return 'brics';
    return 'dollarDigital';
  };

  const calculateScore = () => {
    const zone = calculateZone();
    const neutral_count = Object.values(answers).filter(a => a.zone === 'neutral').length;

    if (zone === 'neutral') return 75 + neutral_count * 5;
    if (zone === 'brics') return 50 + (Object.values(answers).filter(a => a.zone === 'brics').length * 8);
    return 30 + (Object.values(answers).filter(a => a.zone === 'dollarDigital').length * 2);
  };

  const results = {
    dollarDigital: {
      title: 'Zona Dólar Digital',
      score: calculateScore(),
      color: 'border-red-900 bg-red-950/20',
      amount: '$1,234,567',
      real: '$400,000',
      message: 'Tu poder adquisitivo se erosiona 2% anual',
      comparison: '975x menos rico que Plan ARCA'
    },
    brics: {
      title: 'Zona BRICS',
      score: calculateScore(),
      color: 'border-amber-900 bg-amber-950/20',
      amount: '$7,234,567',
      real: '$2,300,000',
      message: 'Preservas riqueza, pero no creces exponencialmente',
      comparison: '55x menos rico que Plan ARCA'
    },
    neutral: {
      title: 'Zona Neutral (Antifrágil)',
      score: calculateScore(),
      color: 'border-green-900 bg-green-950/20',
      amount: '$390,000,000',
      real: '$125,000,000',
      message: 'Crecimiento exponencial si aguantas caídas del -80%',
      comparison: '975x más rico'
    }
  };

  const zone = calculateZone();
  const result = results[zone];
  const score = calculateScore();

  const handleAnswer = (questionId, option) => {
    setAnswers({
      ...answers,
      [questionId]: option
    });
    if (step < 5) {
      setStep(step + 1);
    } else {
      setStep(6);
    }
  };

  const shareLink = `https://quiz-rico-65.vercel.app/?score=${score}&zone=${zone}`;
  const shareText = `Mi score: ${score}/100 en "¿Qué tan rico serás a los 65?" 🎯\n\nA los 65 tendría: ${result.amount} (${result.real} reales)\n\nDescubre el tuyo →`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Header */}
      <header className="border-b border-gray-800 sticky top-0 bg-black/95 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-lg font-bold">Arca Digital</h1>
          <p className="text-sm text-gray-400">¿Qué tan rico serás a los 65?</p>
        </div>
      </header>

      {/* Currency Selection */}
      {step === 0 && !currency && (
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-6">
          <div className="max-w-2xl w-full">
            <div className="mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Elige tu moneda
              </h2>
              <p className="text-xl text-gray-400">
                Los cálculos se ajustarán a tu país
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {currencyOptions.map((option) => (
                <button
                  key={option.code}
                  onClick={() => {
                    setCurrency(option.code);
                    setStep(1);
                  }}
                  className="p-6 border border-gray-700 rounded hover:border-blue-500 hover:bg-gray-950 transition text-lg font-semibold flex flex-col items-center gap-3"
                >
                  <span className="text-4xl">{option.emoji}</span>
                  <span>{option.label}</span>
                  <span className="text-sm text-gray-400">{option.code}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Questions */}
      {step >= 1 && step <= 5 && currency && (
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-6 py-12">
          <div className="max-w-2xl w-full">
            {/* Progress Bar */}
            <div className="mb-12">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm text-gray-400">Pregunta {step} de 5</span>
              </div>
              <div className="h-1 bg-gray-900 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 transition-all"
                  style={{ width: `${(step / 5) * 100}%` }}
                />
              </div>
            </div>

            {/* Question */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-8">
                {questions[step - 1].title}
              </h2>

              <div className="space-y-3">
                {questions[step - 1].options.map((option, i) => (
                  <button
                    key={i}
                    onClick={() => handleAnswer(step, option)}
                    className="w-full text-left p-4 border border-gray-700 rounded hover:border-blue-500 hover:bg-gray-950 transition text-lg"
                  >
                    {option.text}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Results */}
      {step === 6 && (
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-6 py-12">
          <div className="max-w-2xl w-full">
            {/* Score Card */}
            <div className={`border rounded-lg p-8 mb-8 ${result.color}`}>
              <div className="mb-6">
                <p className="text-gray-400 text-sm mb-2">TU ZONA</p>
                <h2 className="text-3xl font-bold mb-4">{result.title}</h2>
              </div>

              <div className="flex items-center justify-between mb-8">
                <div>
                  <p className="text-gray-400 text-sm mb-1">SCORE</p>
                  <p className="text-5xl font-bold">{score}/100</p>
                </div>
                <div className="w-32 h-32 rounded-full border-4 border-current flex items-center justify-center">
                  <p className="text-4xl font-bold">{score}%</p>
                </div>
              </div>

              <div className="border-t border-current/30 pt-6">
                <p className="text-gray-300 text-sm mb-2">A LOS 65 AÑOS TENDRÍAS:</p>
                <p className="text-3xl font-bold mb-2">{result.amount}</p>
                <p className="text-gray-400">Poder real: {result.real}</p>
              </div>
            </div>

            {/* Analysis */}
            <div className="bg-gray-950 border border-gray-800 rounded-lg p-6 mb-8">
              <p className="text-gray-300 mb-4">
                {result.message}
              </p>
              <p className="text-yellow-400 font-semibold">
                {result.comparison}
              </p>
            </div>

            {/* Share Buttons */}
            <div className="space-y-3 mb-8">
              <button
                onClick={() => setStep(7)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded font-semibold flex items-center justify-center gap-2 transition"
              >
                <Share2 size={20} />
                Compartir Score
              </button>

              <button
                onClick={copyToClipboard}
                className="w-full border border-gray-700 hover:border-gray-600 text-white px-8 py-4 rounded font-semibold flex items-center justify-center gap-2 transition"
              >
                {copied ? <Check size={20} /> : <Copy size={20} />}
                {copied ? 'Copiado' : 'Copiar Link'}
              </button>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-lg p-6 text-center">
              <p className="text-gray-200 mb-3">
                ¿Quieres aumentar tu score?
              </p>
              <a
                href="https://arcadigital.macrowise.co"
                className="inline-block bg-white text-black px-6 py-2 rounded font-semibold hover:bg-gray-100 transition"
              >
                Ingresa al Arca Digital
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Share Screen */}
      {step === 7 && (
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-6 py-12">
          <div className="max-w-2xl w-full">
            <div className="bg-gray-950 border border-gray-800 rounded-lg p-8 text-center">
              <h2 className="text-3xl font-bold mb-6">Comparte tu score</h2>

              {/* Social Preview */}
              <div className="bg-gray-900 rounded-lg p-6 mb-8 text-left">
                <p className="text-sm font-semibold text-gray-400 mb-2">Preview:</p>
                <div className="bg-gray-950 rounded p-4 border border-gray-800">
                  <p className="text-white font-semibold mb-3 whitespace-pre-line">{shareText}</p>
                  <p className="text-blue-400 text-sm">{shareLink}</p>
                </div>
              </div>

              {/* Share Options */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                <button
                  onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareLink)}`)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded font-semibold transition"
                >
                  Twitter / X
                </button>
                <button
                  onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareLink)}`)}
                  className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-3 rounded font-semibold transition"
                >
                  LinkedIn
                </button>
                <button
                  onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareLink)}`)}
                  className="bg-blue-800 hover:bg-blue-900 text-white px-4 py-3 rounded font-semibold transition"
                >
                  Facebook
                </button>
                <button
                  onClick={copyToClipboard}
                  className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-3 rounded font-semibold transition"
                >
                  {copied ? 'Copiado' : 'Copiar Link'}
                </button>
              </div>

              {/* CTA */}
              <div className="border-t border-gray-800 pt-6">
                <p className="text-gray-300 mb-4">
                  ¿Quieres aumentar tu score de {score}?
                </p>
                <a
                  href="https://arcadigital.macrowise.co"
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded font-semibold transition"
                >
                  Acceder a Arca Digital
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
