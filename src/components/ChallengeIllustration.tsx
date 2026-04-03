'use client';

export default function ChallengeIllustration() {
  return (
    <div style={{ position: 'relative' }}>
      {/* Ground shadow — stays static while illustration floats */}
      <svg
        viewBox="0 0 480 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          width: '100%',
          height: 'auto',
          position: 'absolute',
          bottom: 0,
          left: 0,
        }}
      >
        <ellipse cx="240" cy="15" rx="190" ry="14" fill="#e0f5f3" opacity="0.5" />
      </svg>

      {/* Main floating illustration */}
      <svg
        viewBox="0 0 480 420"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          width: '100%',
          height: 'auto',
          animation: 'challengeFloat 4s ease-in-out infinite',
        }}
      >
        <style>{`
          @keyframes challengeFloat {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          @keyframes wifiPulse {
            0%, 100% { opacity: 0.15; }
            50% { opacity: 0.35; }
          }
        `}</style>

        {/* ══════════════ BACKGROUND BUILDINGS ══════════════ */}
        {/* Building 1 — short left */}
        <rect x="85" y="110" width="55" height="130" rx="6" fill="#e8f8f7" />
        <rect x="95" y="126" width="10" height="10" rx="2" fill="#00c4b4" opacity="0.25" />
        <rect x="120" y="126" width="10" height="10" rx="2" fill="#00c4b4" opacity="0.15" />
        <rect x="95" y="148" width="10" height="10" rx="2" fill="#00c4b4" opacity="0.1" />
        <rect x="120" y="148" width="10" height="10" rx="2" fill="#00c4b4" opacity="0.25" />
        <rect x="95" y="170" width="10" height="10" rx="2" fill="#00c4b4" opacity="0.2" />
        <rect x="120" y="170" width="10" height="10" rx="2" fill="#00c4b4" opacity="0.1" />

        {/* Building 2 — tall left-center */}
        <rect x="155" y="70" width="50" height="170" rx="6" fill="#e0f5f3" />
        <rect x="165" y="88" width="9" height="9" rx="2" fill="#00c4b4" opacity="0.3" />
        <rect x="185" y="88" width="9" height="9" rx="2" fill="#00c4b4" opacity="0.15" />
        <rect x="165" y="110" width="9" height="9" rx="2" fill="#00c4b4" opacity="0.12" />
        <rect x="185" y="110" width="9" height="9" rx="2" fill="#00c4b4" opacity="0.28" />
        <rect x="165" y="132" width="9" height="9" rx="2" fill="#00c4b4" opacity="0.22" />
        <rect x="185" y="132" width="9" height="9" rx="2" fill="#00c4b4" opacity="0.1" />
        <rect x="165" y="154" width="9" height="9" rx="2" fill="#00c4b4" opacity="0.18" />
        <rect x="185" y="154" width="9" height="9" rx="2" fill="#00c4b4" opacity="0.3" />

        {/* Building 3 — tall right-center */}
        <rect x="220" y="80" width="58" height="160" rx="6" fill="#e8f8f7" />
        <rect x="232" y="98" width="10" height="10" rx="2" fill="#00c4b4" opacity="0.18" />
        <rect x="256" y="98" width="10" height="10" rx="2" fill="#00c4b4" opacity="0.3" />
        <rect x="232" y="120" width="10" height="10" rx="2" fill="#00c4b4" opacity="0.25" />
        <rect x="256" y="120" width="10" height="10" rx="2" fill="#00c4b4" opacity="0.12" />
        <rect x="232" y="142" width="10" height="10" rx="2" fill="#00c4b4" opacity="0.1" />
        <rect x="256" y="142" width="10" height="10" rx="2" fill="#00c4b4" opacity="0.22" />
        <rect x="232" y="164" width="10" height="10" rx="2" fill="#00c4b4" opacity="0.28" />
        <rect x="256" y="164" width="10" height="10" rx="2" fill="#00c4b4" opacity="0.15" />

        {/* Building 4 — short right */}
        <rect x="293" y="120" width="50" height="120" rx="6" fill="#e0f5f3" />
        <rect x="303" y="136" width="9" height="9" rx="2" fill="#00c4b4" opacity="0.2" />
        <rect x="323" y="136" width="9" height="9" rx="2" fill="#00c4b4" opacity="0.12" />
        <rect x="303" y="158" width="9" height="9" rx="2" fill="#00c4b4" opacity="0.28" />
        <rect x="323" y="158" width="9" height="9" rx="2" fill="#00c4b4" opacity="0.18" />

        {/* ══════════════ WIFI SIGNAL ══════════════ */}
        <g style={{ animation: 'wifiPulse 3s ease-in-out infinite' }}>
          <path d="M228 175 Q240 165 252 175" stroke="#9ca3af" strokeWidth="2" fill="none" opacity="0.35" />
          <path d="M220 165 Q240 150 260 165" stroke="#9ca3af" strokeWidth="2" fill="none" opacity="0.25" />
          <path d="M212 155 Q240 136 268 155" stroke="#9ca3af" strokeWidth="2" fill="none" opacity="0.18" />
        </g>

        {/* Dot trail below wifi */}
        <circle cx="240" cy="185" r="3.5" fill="#00c4b4" opacity="0.4" />
        <circle cx="240" cy="198" r="2.5" fill="#00c4b4" opacity="0.25" />
        <circle cx="240" cy="208" r="1.8" fill="#00c4b4" opacity="0.15" />

        {/* ══════════════ DASHED ARC connecting heads ══════════════ */}
        <path
          d="M175 260 Q240 210 305 260"
          stroke="#00c4b4"
          strokeWidth="1.8"
          strokeDasharray="7 5"
          fill="none"
          opacity="0.3"
        />

        {/* ══════════════ PERSON 1 (LEFT) ══════════════ */}
        {/* Head */}
        <circle cx="165" cy="262" r="26" fill="#121317" />
        {/* Headphone band */}
        <path d="M140 252 Q165 230 190 252" stroke="#1a1d24" strokeWidth="4" fill="none" />
        {/* Headphone ear cups */}
        <circle cx="139" cy="258" r="9" fill="#00c4b4" opacity="0.85" />
        <circle cx="191" cy="258" r="9" fill="#00c4b4" opacity="0.85" />
        <circle cx="139" cy="258" r="5.5" fill="#121317" />
        <circle cx="191" cy="258" r="5.5" fill="#121317" />
        {/* Glasses */}
        <rect x="151" y="259" width="11" height="8" rx="3" fill="none" stroke="#00c4b4" strokeWidth="1.5" opacity="0.7" />
        <rect x="166" y="259" width="11" height="8" rx="3" fill="none" stroke="#00c4b4" strokeWidth="1.5" opacity="0.7" />
        <line x1="162" y1="263" x2="166" y2="263" stroke="#00c4b4" strokeWidth="1" opacity="0.5" />

        {/* Neck */}
        <rect x="159" y="285" width="12" height="10" rx="4" fill="#121317" />
        {/* Body */}
        <ellipse cx="165" cy="312" rx="35" ry="25" fill="#121317" />
        {/* Left arm */}
        <path d="M135 305 Q115 318 120 338" stroke="#121317" strokeWidth="10" strokeLinecap="round" fill="none" />
        {/* Right arm */}
        <path d="M195 305 Q210 320 205 338" stroke="#121317" strokeWidth="10" strokeLinecap="round" fill="none" />
        {/* Left leg */}
        <path d="M142 332 Q132 355 125 365" stroke="#121317" strokeWidth="12" strokeLinecap="round" fill="none" />
        {/* Right leg */}
        <path d="M188 332 Q198 355 205 365" stroke="#121317" strokeWidth="12" strokeLinecap="round" fill="none" />

        {/* ══════════════ LAPTOP 1 (LEFT) ══════════════ */}
        <rect x="108" y="335" width="68" height="42" rx="4" fill="#1a1d24" />
        {/* Screen bezel */}
        <rect x="113" y="339" width="58" height="32" rx="2" fill="#121317" />
        {/* Code lines */}
        <rect x="118" y="344" width="24" height="2.5" rx="1" fill="#00c4b4" opacity="0.6" />
        <rect x="118" y="350" width="36" height="2.5" rx="1" fill="#00c4b4" opacity="0.4" />
        <rect x="118" y="356" width="18" height="2.5" rx="1" fill="#00c4b4" opacity="0.55" />
        <rect x="118" y="362" width="28" height="2.5" rx="1" fill="#00c4b4" opacity="0.3" />
        {/* Pink sticky note on screen edge */}
        <rect x="160" y="337" width="12" height="14" rx="1" fill="#f472b6" opacity="0.7" />
        {/* Laptop base */}
        <rect x="102" y="377" width="80" height="6" rx="3" fill="#1a1d24" />

        {/* ══════════════ PERSON 2 (RIGHT) ══════════════ */}
        {/* Head */}
        <circle cx="315" cy="256" r="28" fill="#121317" />
        {/* Headphone band */}
        <path d="M288 246 Q315 222 342 246" stroke="#1a1d24" strokeWidth="4" fill="none" />
        {/* Headphone ear cups */}
        <circle cx="287" cy="252" r="9.5" fill="#00c4b4" opacity="0.85" />
        <circle cx="343" cy="252" r="9.5" fill="#00c4b4" opacity="0.85" />
        <circle cx="287" cy="252" r="5.5" fill="#121317" />
        <circle cx="343" cy="252" r="5.5" fill="#121317" />
        {/* Glasses */}
        <rect x="300" y="254" width="12" height="8" rx="3" fill="none" stroke="#00c4b4" strokeWidth="1.5" opacity="0.7" />
        <rect x="317" y="254" width="12" height="8" rx="3" fill="none" stroke="#00c4b4" strokeWidth="1.5" opacity="0.7" />
        <line x1="312" y1="258" x2="317" y2="258" stroke="#00c4b4" strokeWidth="1" opacity="0.5" />

        {/* Neck */}
        <rect x="309" y="281" width="12" height="10" rx="4" fill="#121317" />
        {/* Body */}
        <ellipse cx="315" cy="308" rx="36" ry="26" fill="#121317" />
        {/* Left arm */}
        <path d="M284 302 Q265 318 270 340" stroke="#121317" strokeWidth="10" strokeLinecap="round" fill="none" />
        {/* Right arm */}
        <path d="M346 302 Q365 316 358 340" stroke="#121317" strokeWidth="10" strokeLinecap="round" fill="none" />
        {/* Left leg */}
        <path d="M293 330 Q280 355 275 368" stroke="#121317" strokeWidth="12" strokeLinecap="round" fill="none" />
        {/* Right leg */}
        <path d="M337 330 Q350 355 355 368" stroke="#121317" strokeWidth="12" strokeLinecap="round" fill="none" />

        {/* ══════════════ LAPTOP 2 (RIGHT) ══════════════ */}
        <rect x="260" y="338" width="70" height="42" rx="4" fill="#1a1d24" />
        {/* Screen bezel */}
        <rect x="265" y="342" width="60" height="32" rx="2" fill="#121317" />
        {/* Code lines */}
        <rect x="270" y="347" width="30" height="2.5" rx="1" fill="#00c4b4" opacity="0.5" />
        <rect x="270" y="353" width="20" height="2.5" rx="1" fill="#00c4b4" opacity="0.65" />
        <rect x="270" y="359" width="38" height="2.5" rx="1" fill="#00c4b4" opacity="0.35" />
        <rect x="270" y="365" width="15" height="2.5" rx="1" fill="#00c4b4" opacity="0.5" />
        {/* Teal sticky note on screen edge */}
        <rect x="314" y="340" width="12" height="14" rx="1" fill="#00c4b4" opacity="0.6" />
        {/* Laptop base */}
        <rect x="254" y="380" width="82" height="6" rx="3" fill="#1a1d24" />

        {/* ══════════════ CABLE between laptops ══════════════ */}
        <path
          d="M182 380 Q210 400 240 395 Q270 390 290 380"
          stroke="#1a1d24"
          strokeWidth="2.5"
          fill="none"
          opacity="0.5"
        />

        {/* ══════════════ PROPS ══════════════ */}

        {/* Energy drink can (left) */}
        <rect x="68" y="355" width="20" height="32" rx="4" fill="#1a1d24" />
        <rect x="68" y="365" width="20" height="10" rx="0" fill="#00c4b4" opacity="0.5" />
        {/* Can top */}
        <ellipse cx="78" cy="355" rx="10" ry="3" fill="#2a2d34" />

        {/* Crumpled paper 1 */}
        <circle cx="96" cy="392" r="7" fill="#d1d5db" opacity="0.6" />
        <path d="M91 389 L96 395 L101 388" stroke="#9ca3af" strokeWidth="0.8" fill="none" opacity="0.4" />

        {/* Crumpled paper 2 */}
        <circle cx="220" cy="398" r="6" fill="#d1d5db" opacity="0.5" />
        <path d="M216 396 L220 401 L224 395" stroke="#9ca3af" strokeWidth="0.8" fill="none" opacity="0.35" />

        {/* Coffee cup (right) */}
        <path d="M370 365 L375 395 L395 395 L400 365 Z" fill="#92400e" opacity="0.6" />
        <rect x="368" y="362" width="34" height="6" rx="2" fill="#78350f" opacity="0.7" />
        {/* Cup sleeve */}
        <rect x="372" y="375" width="26" height="8" rx="0" fill="#78350f" opacity="0.35" />
        {/* Steam */}
        <path d="M380 358 Q382 348 378 340" stroke="#9ca3af" strokeWidth="1.5" fill="none" opacity="0.25" />
        <path d="M388 356 Q391 344 386 336" stroke="#9ca3af" strokeWidth="1.5" fill="none" opacity="0.2" />

        {/* Phone (right side) */}
        <rect x="355" y="388" width="16" height="26" rx="3" fill="#1a1d24" opacity="0.7" />
        <rect x="357" y="391" width="12" height="18" rx="1" fill="#121317" opacity="0.5" />

        {/* USB dongle on cable */}
        <rect x="235" y="392" width="10" height="6" rx="2" fill="#1a1d24" opacity="0.6" />

        {/* Ground / floor surface */}
        <ellipse cx="240" cy="405" rx="200" ry="12" fill="#e0f5f3" opacity="0.4" />
      </svg>
    </div>
  );
}
