// Flat illustrations of everyday faults. `fixed` renders the repaired state.
const A = '#FFB224', G = '#19A974', INK = '#0F1720', P = '#F6F4EF', W = '#5AA9E6', S = '#C9CFD6', R = '#E5484D'

function Drops() {
  return (
    <g fill={W}>
      <path d="M131 92 q4 7 0 10 q-4 -3 0 -10z" />
      <path d="M126 112 q4 7 0 10 q-4 -3 0 -10z" opacity=".8" />
      <ellipse cx="128" cy="140" rx="26" ry="4" opacity=".5" />
    </g>
  )
}

const draw = {
  pipe: (fixed) => (
    <>
      <rect x="40" y="30" width="160" height="14" rx="4" fill={S} />
      <path d="M90 44 h60 l-6 18 h-48z" fill="#AEB6BF" />
      <path d="M120 62 v20 a12 12 0 0 0 24 0 v-6" fill="none" stroke="#E8ECEF" strokeWidth="9" strokeLinecap="round" />
      <rect x="114" y="78" width="12" height="8" rx="2" fill={fixed ? G : A} />
      <path d="M144 76 h40" stroke="#E8ECEF" strokeWidth="9" strokeLinecap="round" />
      {!fixed && <Drops />}
    </>
  ),
  phone: (fixed) => (
    <>
      <rect x="88" y="22" width="64" height="118" rx="12" fill={INK} />
      <rect x="94" y="32" width="52" height="96" rx="5" fill={fixed ? '#2B4B63' : '#1E2B38'} />
      {fixed ? (
        <>
          <rect x="102" y="44" width="36" height="6" rx="3" fill={P} opacity=".7" />
          <rect x="102" y="56" width="24" height="6" rx="3" fill={P} opacity=".4" />
          <rect x="102" y="96" width="36" height="20" rx="5" fill={G} opacity=".9" />
        </>
      ) : (
        <path d="M100 40 l18 26 l-8 10 l22 22 M118 66 l16 -8 M110 76 l-10 18 M132 98 l8 24" fill="none" stroke={P} strokeWidth="1.6" opacity=".85" />
      )}
    </>
  ),
  fridge: (fixed) => (
    <>
      <rect x="84" y="16" width="72" height="128" rx="8" fill="#E8ECEF" />
      <line x1="84" y1="64" x2="156" y2="64" stroke={S} strokeWidth="2" />
      <rect x="142" y="30" width="4" height="22" rx="2" fill={S} />
      <rect x="142" y="76" width="4" height="30" rx="2" fill={S} />
      <rect x="96" y="28" width="34" height="18" rx="4" fill={INK} />
      <text x="113" y="41" textAnchor="middle" fontSize="11" fontWeight="700" fill={fixed ? G : R} fontFamily="Inter, sans-serif">{fixed ? '4°C' : '12°C'}</text>
      {!fixed && <path d="M170 40 q6 6 0 12 q-6 6 0 12" fill="none" stroke={A} strokeWidth="2.5" strokeLinecap="round" />}
      {!fixed && <path d="M180 34 q8 9 0 18 q-8 9 0 18" fill="none" stroke={A} strokeWidth="2.5" strokeLinecap="round" opacity=".6" />}
    </>
  ),
  car: (fixed) => (
    <>
      <rect x="30" y="40" width="180" height="90" rx="40" fill={INK} />
      <circle cx="90" cy="88" r="32" fill="#1E2B38" stroke="#2A3644" strokeWidth="3" />
      <path d="M90 88 l-20 -14" stroke={A} strokeWidth="3" strokeLinecap="round" />
      <circle cx="160" cy="86" r="22" fill="#1E2B38" />
      <g transform="translate(146 76)" fill={fixed ? '#3A4756' : A}>
        <path d="M2 6 h6 v-3 h8 v3 h4 l4 4 v6 h-4 v4 h-14 l-4 -4 h-2z" />
      </g>
      {!fixed && <circle cx="160" cy="86" r="22" fill="none" stroke={A} strokeWidth="2" opacity=".5" />}
      {fixed && <path d="M152 112 l5 5 l10 -11" fill="none" stroke={G} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />}
    </>
  ),
  socket: (fixed) => (
    <>
      <rect x="70" y="36" width="100" height="90" rx="12" fill="#E8ECEF" stroke={S} strokeWidth="2" />
      <rect x="84" y="54" width="30" height="54" rx="6" fill={P} stroke={S} />
      <rect x="126" y="54" width="30" height="54" rx="6" fill={P} stroke={S} />
      {[99, 141].map((x) => (
        <g key={x} fill={INK}><rect x={x - 7} y="64" width="4" height="10" rx="1" /><rect x={x + 3} y="64" width="4" height="10" rx="1" /><rect x={x - 2} y="86" width="4" height="9" rx="1" /></g>
      ))}
      {!fixed && (
        <>
          <ellipse cx="99" cy="76" rx="16" ry="12" fill="#3A2A1A" opacity=".35" />
          <path d="M100 46 l-8 14 h9 l-9 16" fill="none" stroke={A} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M76 52 l-10 -6 M70 70 h-12 M124 46 l6 -10" stroke={A} strokeWidth="2.5" strokeLinecap="round" />
        </>
      )}
    </>
  ),
  ac: (fixed) => (
    <>
      <rect x="40" y="34" width="160" height="48" rx="12" fill="#E8ECEF" stroke={S} strokeWidth="2" />
      <rect x="52" y="66" width="136" height="6" rx="3" fill={S} />
      <circle cx="180" cy="48" r="3" fill={fixed ? G : A} />
      {fixed ? (
        <g stroke="#8CC8EE" strokeWidth="3" strokeLinecap="round" fill="none" opacity=".9">
          <path d="M80 92 q10 12 0 24" /><path d="M120 92 q10 12 0 24" /><path d="M160 92 q10 12 0 24" />
        </g>
      ) : (
        <g fill={W}>
          <path d="M96 86 q4 7 0 10 q-4 -3 0 -10z" /><path d="M140 96 q4 7 0 10 q-4 -3 0 -10z" />
          <path d="M118 112 q4 7 0 10 q-4 -3 0 -10z" opacity=".8" />
          <rect x="70" y="84" width="100" height="56" fill={W} opacity=".08" />
        </g>
      )}
    </>
  ),
}

export default function FaultScene({ kind, fixed = false, className = '', title }) {
  return (
    <svg viewBox="0 0 240 160" className={className} role="img" aria-label={title}>
      <rect width="240" height="160" fill={fixed ? '#E6F4EE' : '#FBEFD9'} />
      <g opacity=".45">
        {[40, 80, 120].map((y) => <line key={y} x1="0" x2="240" y1={y} y2={y} stroke={fixed ? '#CBE7DA' : '#F3DDB4'} />)}
      </g>
      {draw[kind]?.(fixed)}
    </svg>
  )
}
