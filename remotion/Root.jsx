import { Composition } from 'remotion';
import { ComoFunciona } from './ComoFunciona.jsx';
import { PagoMundo } from './PagoMundo.jsx';
import { ALTO, ANCHO, FPS, PIEZAS } from './muestras.js';

const COMPONENTES = {
    'como-funciona': ComoFunciona,
    'pago-mundo': PagoMundo,
};

export const RemotionRoot = () => (
    <>
        {PIEZAS.map((pieza) => (
            <Composition
                key={pieza.id}
                id={pieza.id}
                component={COMPONENTES[pieza.id]}
                durationInFrames={pieza.segundos * FPS}
                fps={FPS}
                width={pieza.ancho ?? ANCHO}
                height={pieza.alto ?? ALTO}
            />
        ))}
    </>
);
