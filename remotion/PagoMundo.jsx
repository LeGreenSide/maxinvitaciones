import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';

const PAPEL_CALIDO = '#f3e6d2';
const TINTA = '#1f4a5c';
const OCEANO = '#6fc8ce';
const TIERRA = '#2f8f6b';

const CX = 240;
const CY = 240;
const R = 120;

const RX = 196;
const RY = 108;

const Continentes = ({ desplazamiento }) => (
    <g transform={`translate(${desplazamiento} 0)`}>
        {[0, 1].map((i) => (
            <g key={i} transform={`translate(${i * 320} 0)`}>
                <path
                    d="M96 152c22-20 52-12 68 8s44 16 60-4 44-8 48 20-26 40-52 32-36 12-60 4-40-16-48-32-4-20-16-28Z"
                    fill={TIERRA}
                />
                <path
                    d="M150 258c18-14 44-8 54 12s32 12 44 30-12 40-36 36-48-10-58-30-18-32-4-48Z"
                    fill={TIERRA}
                />
                <path
                    d="M262 118c14-10 34-4 40 12s-6 30-24 30-30-12-30-26 4-12 14-16Z"
                    fill={TIERRA}
                />
            </g>
        ))}
    </g>
);

const AvionDePapel = ({ x, y, giro, escala }) => (
    <g transform={`translate(${x} ${y}) rotate(${giro}) scale(${escala})`}>
        <path
            d="M-26 -14 30 4-8 26l-4-16-14-6Z"
            fill={PAPEL_CALIDO}
            stroke={TINTA}
            strokeWidth="3.4"
            strokeLinejoin="round"
        />
        <path
            d="m-12 10 14-8"
            stroke={TINTA}
            strokeWidth="3.4"
            strokeLinecap="round"
        />
    </g>
);

export const PagoMundo = () => {
    const frame = useCurrentFrame();
    const { durationInFrames } = useVideoConfig();

    const vuelta = frame / durationInFrames;
    const angulo = vuelta * Math.PI * 2;

    const x = CX + RX * Math.sin(angulo);
    const y = CY - RY * Math.cos(angulo);

    const atras = Math.cos(angulo) > 0;
    const escala = 0.78 + 0.22 * (1 - Math.cos(angulo)) / 2;
    const giro =(Math.atan2(RY * Math.sin(angulo), RX * Math.cos(angulo)) * 180) / Math.PI;

    const desplazamiento = -(vuelta * 320);

    const avion = <AvionDePapel x={x} y={y} giro={giro} escala={escala} />;

    return (
        <AbsoluteFill style={{ backgroundColor: PAPEL_CALIDO }}>
            <svg viewBox="0 0 480 480" width="480" height="480">
                <defs>
                    <clipPath id="globo">
                        <circle cx={CX} cy={CY} r={R} />
                    </clipPath>
                    <radialGradient id="volumen" cx="35%" cy="30%" r="75%">
                        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
                        <stop offset="55%" stopColor="#ffffff" stopOpacity="0" />
                        <stop offset="100%" stopColor="#0d3b4a" stopOpacity="0.35" />
                    </radialGradient>
                </defs>

                <ellipse
                    cx={CX}
                    cy={CY}
                    rx={RX}
                    ry={RY}
                    fill="none"
                    stroke={TINTA}
                    strokeWidth="3"
                    strokeDasharray="2 14"
                    strokeLinecap="round"
                    opacity="0.35"
                />

                {atras ? avion : null}

                <circle cx={CX} cy={CY} r={R} fill={OCEANO} />
                <g clipPath="url(#globo)">
                    <Continentes desplazamiento={desplazamiento} />
                </g>
                <g
                    clipPath="url(#globo)"
                    fill="none"
                    stroke={TINTA}
                    strokeWidth="2.4"
                    opacity="0.28"
                >
                    <ellipse cx={CX} cy={CY} rx={48} ry={R} />
                    <ellipse cx={CX} cy={CY} rx={96} ry={R} />
                    <path d={`M${CX - R} ${CY}h${R * 2}`} />
                    <path d={`M${CX - R} ${CY - 58}h${R * 2}`} />
                    <path d={`M${CX - R} ${CY + 58}h${R * 2}`} />
                </g>
                <circle cx={CX} cy={CY} r={R} fill="url(#volumen)" />
                <circle
                    cx={CX}
                    cy={CY}
                    r={R}
                    fill="none"
                    stroke={TINTA}
                    strokeWidth="6"
                />

                {atras ? null : avion}
            </svg>
        </AbsoluteFill>
    );
};
