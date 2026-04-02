import React, { useState } from 'react';
import { ChevronRight, Mail } from 'lucide-react';

export default function QuizRico() {
  const [step, setStep] = useState(0); // 0=start, 1-5=questions, 6=result, 7=email
  const [answers, setAnswers] = useState({});
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Preguntas del quiz
  const questions = [
    {
      id: 1,
      title: '¿Cuál es tu mayor miedo con tu dinero ahora?',
      options: [
        { text: 'Que pierda valor por inflación', zone: 'dollarDigital', id: 'a' },
        { text: 'Que no crezca lo suficiente para los 65', zone: 'neutral', id: 'b' },
        { text: 'Que especule mal y pierda todo', zone: 'brics', id: 'c' },
        { text: 'Que otro gobierno imprima mi dinero', zone: 'dollarDigital', id: 'd' },
        { text: 'No sé, nunca lo pensé', zone: 'neutral', id: 'e' }
      ]
    },
    {
      id: 2,
      title: '¿Dónde está hoy la mayoría de tu capital?',
      options: [
        { text: 'En el banco / CDT / Treasuries (4-6% anual)', zone: 'dollarDigital', id: 'a' },
        { text: 'En oro / Materias primas (preservo valor)', zone: 'brics', id: 'b' },
        { text: 'En Bitcoin / Crypto / Energía (25%+ anual)', zone: 'neutral', id: 'c' },
        { text: 'En acciones / Fondos / ETF (10-12% anual)', zone: 'hybrid', id: 'd' },
        { text: 'No tengo capital para invertir', zone: 'dollarDigital', id: 'e' }
      ]
    },
    {
      id: 3,
      title: 'Si tu inversión perdiera 80% mañana, ¿qué pasaría?',
      options: [
        { text: 'Vendo TODO y salgo corriendo', zone: 'dollarDigital', id: 'a' },
        { text: 'Me da pánico, pero espero', zone: 'brics', id: 'b' },
        { text: 'Sigo comprando cada mes sin importar', zone: 'neutral', id: 'c' },
        { text: 'Depende de si es corto plazo', zone: 'hybrid', id: 'd' },
        { text: 'Nunca tendría 80% en una sola cosa', zone: 'brics', id: 'e' }
      ]
    },
    {
      id: 4,
      title: '¿En cuántos años necesitas este dinero?',
      options: [
        { text: 'Menos de 1 año', zone: 'dollarDigital', id: 'a' },
        { text: '1-3 años', zone: 'brics', id: 'b' },
        { text: '3-7 años', zone: 'brics', id: 'c' },
        { text: '7-15 años', zone: 'neutral', id: 'd' },
        { text: '15+ años (hasta jubilación)', zone: 'neutral', id: 'e' }
      ]
    },
    {
      id: 5,
      title: '¿Cuál es el número que te asusta más?',
      options: [
        { text: 'Que a los 65 tenga solo $1.2M', zone: 'dollarDigital', id: 'a' },
        { text: 'Que pudiera tener $390M pero pierda el nervio en 2027', zone: 'neutral', id: 'b' },
        { text: 'Que no entienda dónde estoy invirtiendo', zone: 'brics', id: 'c' },
        { text: 'Que otros ganen 100x y yo gane 5x', zone: 'neutral', id: 'd' },
        { text: 'Que mi país devalúe mi dinero', zone: 'brics', id: 'e' }
      ]
    }
  ];

  // Cálculo de zona dominante
  const calculateZone = () => {
    const zones = { dollarDigital: 0, brics: 0, neutral: 0, hybrid: 0 };
    Object.values(answers).forEach(answer => {
      if (answer.zone) zones[answer.zone]++;
    });

    if (zones.neutral >= 3) return 'neutral';
    if (zones.brics >= 3) return 'brics';
    return 'dollarDigital';
  };

  // Resultados
  const results = {
    dollarDigital: {
      title: 'ESTÁS EN LA ZONA DÓLAR DIGITAL',
      color: 'bg-red-950',
      amount: '$1,234,567',
      real: '$400,000',
      description: 'En pesos/euros reales (después de inflación)',
      analysis: [
        'Estás en la Zona Dólar Digital.',
        'Tu dinero está en CDT / Bank / Treasuries',
        'Ganas 4-6% anual (que es inflación -2%)',
        'El déficit de EEUU ($38 trillones) se financia con tu dinero',
        'Tu poder adquisitivo se erosiona 2% anual'
      ],
      comparison: {
        vs_brics: '6x menos rico',
        vs_neutral: '975x menos rico'
      },
      truth: '¿La pregunta correcta es: ¿Puedes permitirte NO aprender a invertir?',
      cta: 'Acceso gratuito al Manual ARCA'
    },
    brics: {
      title: 'ESTÁS EN LA ZONA BRICS',
      color: 'bg-amber-900',
      amount: '$7,234,567',
      real: '$2,300,000',
      description: 'En pesos/euros reales (mejor preservación)',
      analysis: [
        'Estás en la Zona BRICS.',
        'Tu dinero está en oro, plata, materias primas',
        'Preservas valor contra inflación',
        'Tu poder adquisitivo se mantiene',
        'Pero no creces exponencialmente'
      ],
      comparison: {
        vs_dollar: '6x más rico',
        vs_neutral: '55x menos rico'
      },
      truth: '¿Por qué preservar si no estoy creciendo?',
      cta: 'Descubre por qué Bitcoin no es especulación'
    },
    neutral: {
      title: 'ESTÁS EN LA ZONA NEUTRAL (ANTIFRÁGIL)',
      color: 'bg-green-950',
      amount: '$390,000,000',
      real: '$125,000,000',
      description: 'En pesos/euros reales (crecimiento exponencial)',
      analysis: [
        'Estás en la Zona Neutral (Bitcoin + Oro).',
        'Tu dinero está en activos inconfiscables',
        'Creces 25%+ anual (si aguantas caídas del -80%)',
        'Tu poder adquisitivo se multiplica',
        'Pero el viaje es aterrador'
      ],
      comparison: {
        vs_brics: '55x más rico',
        vs_dollar: '975x más rico'
      },
      truth: 'En 2027, 2029, tu inversión caerá -80%. ¿Podrás aguantar sin vender?',
      cta: 'Manual ARCA + Simulador DECODIFICAR'
    }
  };

  const zone = calculateZone();
  const result = results[zone];

  const handleAnswer = (questionId, option) => {
    setAnswers({
      ...answers,
      [questionId]: option
    });
    if (step < 5) {
      setStep(step + 1);
    } else {
      setStep(6); // Go to results
    }
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      // Here you would send email to your backend
      console.log('Email submitted:', email);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Start Screen */}
      {step === 0 && (
        <div className="min-h-screen flex items-center justify-center px-6 py-12">
          <div className="max-w-2xl text-center">
            <div className="mb-8">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                ¿Qué tan rico<br />serás a los<br /><span className="text-blue-400">65 años?</span>
              </h1>
              <p className="text-xl text-gray-400 mb-8">
                5 preguntas. 3 minutos. Una verdad que no querés escuchar.
              </p>
              <p className="text-sm text-gray-500 mb-12">
                Basado en el análisis de Macrowise sobre dónde está tu dinero y cómo crece.
              </p>
            </div>
            <button
              onClick={() => setStep(1)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded text-lg font-semibold flex items-center justify-center gap-2 mx-auto transition"
            >
              Empezar Quiz
              <ChevronRight size={20} />
            </button>
            <p className="text-xs text-gray-600 mt-8">
              No es asesoría financiera. Es educación.
            </p>
          </div>
        </div>
      )}

      {/* Questions */}
      {step >= 1 && step <= 5 && (
        <div className="min-h-screen flex items-center justify-center px-6 py-12">
          <div className="max-w-2xl w-full">
            {/* Progress */}
            <div className="mb-12">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm text-gray-400">Pregunta {step} de 5</span>
                <div className="w-24 h-1 bg-gray-800 rounded-full">
                  <div
                    className="h-full bg-blue-600 rounded-full transition-all"
                    style={{ width: `${(step / 5) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Question */}
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-8">
                {questions[step - 1].title}
              </h2>

              <div className="space-y-3">
                {questions[step - 1].options.map((option) => (
                  <button
                    key={option.id}
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
        <div className="min-h-screen flex items-center justify-center px-6 py-12">
          <div className="max-w-2xl w-full">
            {/* Main Result */}
            <div className={`${result.color} p-8 rounded mb-8`}>
              <h2 className="text-2xl font-bold mb-6">{result.title}</h2>
              <div className="mb-6">
                <p className="text-gray-300 text-sm mb-2">A LOS 65 AÑOS TENDRÁS:</p>
                <p className="text-5xl font-bold mb-2">{result.amount}</p>
                <p className="text-gray-300">En pesos/euros reales: <span className="font-semibold">{result.real}</span></p>
              </div>
            </div>

            {/* Analysis */}
            <div className="bg-gray-950 p-8 rounded mb-8">
              <h3 className="text-xl font-bold mb-6 text-red-400">🔴 LA VERDAD INCÓMODA:</h3>
              <ul className="space-y-3 mb-6">
                {result.analysis.map((point, i) => (
                  <li key={i} className="text-gray-300 flex gap-3">
                    <span className="text-blue-400">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <div className="border-t border-gray-700 pt-6">
                <p className="text-gray-300 italic">{result.truth}</p>
              </div>
            </div>

            {/* Comparisons */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-gray-900 p-6 rounded">
                <p className="text-sm text-gray-400 mb-2">Comparación</p>
                <p className="text-2xl font-bold text-yellow-400">{result.comparison.vs_brics}</p>
              </div>
              <div className="bg-gray-900 p-6 rounded">
                <p className="text-sm text-gray-400 mb-2">Comparación</p>
                <p className="text-2xl font-bold text-yellow-400">{result.comparison.vs_neutral}</p>
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={() => setStep(7)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded text-lg font-semibold flex items-center justify-center gap-2 transition mb-4"
            >
              <Mail size={20} />
              {result.cta}
            </button>

            <p className="text-xs text-gray-500 text-center">
              Recibe acceso a Manual ARCA + 1 mes gratis en Arca Digital
            </p>
          </div>
        </div>
      )}

      {/* Email Capture */}
      {step === 7 && !submitted && (
        <div className="min-h-screen flex items-center justify-center px-6 py-12">
          <div className="max-w-xl w-full">
            <div className="bg-gray-950 p-8 rounded">
              <h2 className="text-2xl font-bold mb-4">Acceso al Manual ARCA</h2>
              <p className="text-gray-300 mb-8">
                Te enviamos acceso inmediato al Manual completo + 1 mes gratuito en Arca Digital.
              </p>

              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <input
                  type="email"
                  placeholder="Tu email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
                />
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded text-lg font-semibold transition"
                >
                  Enviar Acceso
                </button>
              </form>

              <p className="text-xs text-gray-500 text-center mt-6">
                No compartiremos tu email. Promesa de Macrowise.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Success */}
      {step === 7 && submitted && (
        <div className="min-h-screen flex items-center justify-center px-6 py-12">
          <div className="max-w-xl w-full text-center">
            <div className="bg-green-950 p-8 rounded">
              <h2 className="text-3xl font-bold mb-4">✓ Listo</h2>
              <p className="text-gray-300 mb-6">
                Revisa tu email. Manual ARCA llega en 2 minutos.
              </p>
              <p className="text-sm text-gray-400">
                P.D: Prepárate. Los números son brutales.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
