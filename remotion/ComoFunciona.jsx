import {
    AbsoluteFill,
    Img,
    Sequence,
    interpolate,
    spring,
    staticFile,
    useCurrentFrame,
    useVideoConfig,
} from 'remotion';

const PAPEL = '#faf4ea';
const PAPEL_CALIDO = '#f3e6d2';
const TINTA = '#1a1533';
const WASAP = '#12b05a';
const ACENTO = '#f2a03c';

const DISPLAY = '"Arial Black", "Segoe UI", Impact, sans-serif';
const TEXTO = '"Segoe UI", system-ui, sans-serif';

const SEGURO = 76;

const IconoWhatsApp = ({ size = 32, color = PAPEL }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
        <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm0 18.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.15 8.15 0 01-1.25-4.38c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.83 2.42a8.19 8.19 0 012.41 5.83c0 4.54-3.7 8.23-8.24 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43-.14-.01-.31-.01-.48-.01-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.25 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.08.14-1.18-.06-.11-.23-.17-.48-.29z" />
    </svg>
);

const useFundido = (duracion) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    return interpolate(
        frame,
        [0, fps * 0.25, duracion - fps * 0.3, duracion],
        [0, 1, 1, 0],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
    );
};

const BarraChat = () => (
    <div
        style={{
            backgroundColor: WASAP,
            display: 'flex',
            alignItems: 'center',
            gap: 18,
            padding: `${SEGURO + 22}px 40px 26px`,
        }}
    >
        <IconoWhatsApp size={44} />
        <span
            style={{
                fontFamily: TEXTO,
                fontSize: 30,
                fontWeight: 600,
                color: PAPEL,
            }}
        >
            Max Invitaciones
        </span>
    </div>
);

const TARJETAS = [
    {
        poster: 'videos/coquimbo-unido.jpg',
        titulo: 'Coquimbo Unido',
        etiqueta: 'Completa',
        precio: '$10.000',
        duracion: '0:22',
    },
    {
        poster: 'videos/kpop-martina.jpg',
        titulo: 'KPop Demon Hunters',
        etiqueta: 'Simple',
        precio: '$5.000',
        duracion: '0:07',
    },
    {
        poster: 'videos/colo-colo.jpg',
        titulo: 'Colo-Colo',
        etiqueta: 'Completa',
        precio: '$10.000',
        duracion: '0:21',
    },
    {
        poster: 'videos/spiderman.jpg',
        titulo: 'Spider-Man',
        etiqueta: 'Completa',
        precio: '$10.000',
        duracion: '0:19',
    },
];
const ELEGIDA = 0;

const Tarjeta = ({ datos, elegida, toque, onda }) => {
    const escala = elegida ? 1 + 0.06 * toque : 1;
    const apagado = elegida ? 1 : 1 - 0.35 * toque;

    return (
        <div
            style={{
                position: 'relative',
                aspectRatio: '9 / 16',
                borderRadius: 24,
                overflow: 'hidden',
                backgroundColor: TINTA,
                transform: `scale(${escala})`,
                opacity: apagado,
                boxShadow: elegida ? `0 0 0 ${7 * toque}px ${ACENTO}` : 'none',
            }}
        >
            <Img
                src={staticFile(datos.poster)}
                style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                }}
            />

            <div
                style={{
                    position: 'absolute',
                    top: 14,
                    left: 14,
                    width: 52,
                    height: 52,
                    borderRadius: 999,
                    backgroundColor: 'rgba(0, 0, 0, 0.46)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <svg width="22" height="22" viewBox="0 0 24 24" fill={PAPEL}>
                    <path d="M8 5v14l11-7z" />
                </svg>
            </div>

            <div
                style={{
                    position: 'absolute',
                    top: 18,
                    right: 14,
                    backgroundColor: 'rgba(0, 0, 0, 0.46)',
                    borderRadius: 999,
                    padding: '6px 14px',
                    fontFamily: TEXTO,
                    fontSize: 18,
                    fontWeight: 600,
                    color: PAPEL,
                }}
            >
                {datos.duracion}
            </div>

            <div
                style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 8,
                    padding: '46px 16px 16px',
                    background:
                        'linear-gradient(to top, rgba(0,0,0,0.90), rgba(0,0,0,0.62) 58%, rgba(0,0,0,0))',
                }}
            >
                <span
                    style={{
                        fontFamily: TEXTO,
                        fontSize: 17,
                        fontWeight: 700,
                        letterSpacing: 1,
                        textTransform: 'uppercase',
                        color: ACENTO,
                    }}
                >
                    {datos.etiqueta}
                    <span style={{ color: PAPEL }}> · {datos.precio}</span>
                </span>
                <span
                    style={{
                        fontFamily: TEXTO,
                        fontSize: 21,
                        fontWeight: 600,
                        color: PAPEL,
                    }}
                >
                    {datos.titulo}
                </span>
                <div
                    style={{
                        marginTop: 4,
                        height: 52,
                        borderRadius: 999,
                        backgroundColor: WASAP,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 8,
                    }}
                >
                    <IconoWhatsApp size={20} />
                    <span
                        style={{
                            fontFamily: TEXTO,
                            fontSize: 19,
                            fontWeight: 600,
                            color: '#ffffff',
                        }}
                    >
                        Pedir
                    </span>
                </div>
            </div>

            {elegida ? (
                <AbsoluteFill
                    style={{ alignItems: 'center', justifyContent: 'center' }}
                >
                    <div
                        style={{
                            width: 130,
                            height: 130,
                            borderRadius: 999,
                            border: `6px solid ${ACENTO}`,
                            transform: `scale(${interpolate(onda, [0, 1], [0.2, 2])})`,
                            opacity: interpolate(onda, [0, 0.35, 1], [0, 0.9, 0]),
                        }}
                    />
                </AbsoluteFill>
            ) : null}
        </div>
    );
};

const EscenaGrilla = ({ duracion }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const fundido = useFundido(duracion);

    const toque = spring({
        frame: frame - fps * 2,
        fps,
        config: { damping: 13, mass: 0.6 },
    });
    const onda = interpolate(frame, [fps * 2, fps * 2.7], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    return (
        <AbsoluteFill style={{ backgroundColor: PAPEL, opacity: fundido }}>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: `${SEGURO + 14}px 34px 18px`,
                    borderBottom: '2px solid rgba(26, 21, 51, 0.10)',
                }}
            >
                <Img
                    src={staticFile('max_invi.png')}
                    style={{ height: 62, width: 'auto' }}
                />
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        backgroundColor: WASAP,
                        borderRadius: 999,
                        padding: '12px 22px',
                    }}
                >
                    <IconoWhatsApp size={22} />
                    <span
                        style={{
                            fontFamily: TEXTO,
                            fontSize: 20,
                            fontWeight: 600,
                            color: '#ffffff',
                        }}
                    >
                        Escríbenos
                    </span>
                </div>
            </div>

            <div style={{ padding: '30px 34px 0' }}>
                <div
                    style={{
                        fontFamily: DISPLAY,
                        fontSize: 46,
                        letterSpacing: -1.6,
                        color: TINTA,
                    }}
                >
                    Elige tu invitación
                </div>
                <div
                    style={{
                        marginTop: 10,
                        fontFamily: TEXTO,
                        fontSize: 23,
                        color: 'rgba(26, 21, 51, 0.65)',
                    }}
                >
                    Toca una invitación para verla en movimiento.
                </div>

                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                        gap: 18,
                        marginTop: 28,
                    }}
                >
                    {TARJETAS.map((datos, i) => (
                        <Tarjeta
                            key={datos.titulo}
                            datos={datos}
                            elegida={i === ELEGIDA}
                            toque={toque}
                            onda={onda}
                        />
                    ))}
                </div>
            </div>
        </AbsoluteFill>
    );
};

const MENSAJES = [
    { texto: 'Benja', delay: 0.9 },
    { texto: 'Cumple 12', delay: 1.7 },
    { texto: '18 de julio · 16:00', delay: 2.5 },
    { texto: 'Ontario 1234, La Florida', delay: 3.3 },
];

const Burbuja = ({ texto, delay, propia }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const entra = spring({
        frame: frame - delay * fps,
        fps,
        config: { damping: 15, mass: 0.5 },
    });

    return (
        <div
            style={{
                alignSelf: propia ? 'flex-end' : 'flex-start',
                maxWidth: '78%',
                backgroundColor: propia ? '#d8f4e3' : PAPEL,
                color: TINTA,
                fontFamily: TEXTO,
                fontSize: 30,
                fontWeight: 500,
                padding: '18px 24px',
                borderRadius: 22,
                borderBottomRightRadius: propia ? 6 : 22,
                borderBottomLeftRadius: propia ? 22 : 6,
                opacity: entra,
                transform: `translateY(${interpolate(entra, [0, 1], [26, 0])}px)`,
                boxShadow: '0 4px 14px rgba(26, 21, 51, 0.10)',
            }}
        >
            {texto}
        </div>
    );
};

const EscenaChat = ({ duracion }) => {
    const fundido = useFundido(duracion);

    return (
        <AbsoluteFill style={{ backgroundColor: PAPEL_CALIDO, opacity: fundido }}>
            <BarraChat />

            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 18,
                    padding: '40px 36px',
                }}
            >
                <Burbuja
                    texto="¡Hola! ¿Me pasas los datos de la fiesta?"
                    delay={0.2}
                    propia={false}
                />
                {MENSAJES.map((mensaje) => (
                    <Burbuja
                        key={mensaje.texto}
                        texto={mensaje.texto}
                        delay={mensaje.delay}
                        propia
                    />
                ))}
            </div>
        </AbsoluteFill>
    );
};

const EscenaEntrega = ({ duracion }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const fundido = useFundido(duracion);

    const llega = spring({
        frame: frame - fps * 0.4,
        fps,
        config: { damping: 14, mass: 0.8 },
    });
    const aviso = spring({
        frame: frame - fps * 1.6,
        fps,
        config: { damping: 15 },
    });

    return (
        <AbsoluteFill style={{ backgroundColor: PAPEL_CALIDO, opacity: fundido }}>
            <BarraChat />

            <div
                style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    gap: 22,
                    padding: '0 36px 60px',
                }}
            >
                <div
                    style={{
                        position: 'relative',
                        width: 340,
                        aspectRatio: '9 / 16',
                        borderRadius: 24,
                        overflow: 'hidden',
                        backgroundColor: TINTA,
                        opacity: llega,
                        transform: `translateY(${interpolate(llega, [0, 1], [50, 0])}px) scale(${interpolate(llega, [0, 1], [0.9, 1])})`,
                        boxShadow: '0 14px 34px rgba(26, 21, 51, 0.24)',
                    }}
                >
                    <Img
                        src={staticFile('videos/coquimbo-unido.jpg')}
                        style={{
                            position: 'absolute',
                            inset: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                        }}
                    />

                    <div
                        style={{
                            position: 'absolute',
                            left: '50%',
                            top: '50%',
                            width: 92,
                            height: 92,
                            marginLeft: -46,
                            marginTop: -46,
                            borderRadius: 999,
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <svg width="36" height="36" viewBox="0 0 24 24" fill={PAPEL}>
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    </div>

                    <div
                        style={{
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            bottom: 0,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: 4,
                            padding: '60px 16px 22px',
                            background:
                                'linear-gradient(to top, rgba(0,0,0,0.88), rgba(0,0,0,0))',
                        }}
                    >
                        <span
                            style={{
                                fontFamily: DISPLAY,
                                fontSize: 34,
                                color: PAPEL,
                                textTransform: 'uppercase',
                            }}
                        >
                            Benja
                        </span>
                        <span
                            style={{
                                fontFamily: TEXTO,
                                fontSize: 22,
                                color: 'rgba(250, 244, 234, 0.8)',
                            }}
                        >
                            cumple 12
                        </span>
                    </div>
                </div>

                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 16,
                        backgroundColor: PAPEL,
                        borderRadius: 22,
                        borderBottomLeftRadius: 6,
                        padding: '20px 28px',
                        opacity: aviso,
                        transform: `translateY(${interpolate(aviso, [0, 1], [24, 0])}px)`,
                        boxShadow: '0 4px 14px rgba(26, 21, 51, 0.10)',
                    }}
                >
                    <span
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 44,
                            height: 44,
                            borderRadius: 999,
                            backgroundColor: WASAP,
                        }}
                    >
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke={PAPEL}
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M5 12.5l4.5 4.5L19 7.5" />
                        </svg>
                    </span>
                    <span
                        style={{
                            fontFamily: TEXTO,
                            fontSize: 30,
                            fontWeight: 600,
                            color: TINTA,
                        }}
                    >
                        ¡Tu invitación está lista!
                    </span>
                </div>
            </div>
        </AbsoluteFill>
    );
};

export const ComoFunciona = () => {
    const { fps } = useVideoConfig();
    const grilla = Math.round(fps * 4.5);
    const chat = Math.round(fps * 5.5);
    const entrega = Math.round(fps * 5);

    return (
        <AbsoluteFill style={{ backgroundColor: PAPEL }}>
            <Sequence durationInFrames={grilla}>
                <EscenaGrilla duracion={grilla} />
            </Sequence>
            <Sequence from={grilla} durationInFrames={chat}>
                <EscenaChat duracion={chat} />
            </Sequence>
            <Sequence from={grilla + chat} durationInFrames={entrega}>
                <EscenaEntrega duracion={entrega} />
            </Sequence>
        </AbsoluteFill>
    );
};
