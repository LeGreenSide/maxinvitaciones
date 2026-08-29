import { execFileSync, execSync } from 'node:child_process';
import { existsSync, mkdirSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import ffmpeg from 'ffmpeg-static';
import { FPS, PIEZAS } from '../remotion/muestras.js';

const SALIDA = 'public/videos';
const TEMP = join(tmpdir(), 'maxinvitaciones-frames');

const render = (id, destino) => {
    execSync(
        `npx remotion render remotion/index.jsx ${id} "${destino}" --sequence --image-format=png --log=error`,
        { stdio: 'inherit' }
    );
};

const codificar = (frames, destino) => {
    execFileSync(
        ffmpeg,
        [
            '-y',
            '-framerate', String(FPS),
            '-i', join(frames, 'element-%03d.png'),
            '-c:v', 'libx264',
            '-pix_fmt', 'yuv420p',
            '-crf', '24',
            '-preset', 'medium',
            '-movflags', '+faststart',
            destino,
        ],
        { stdio: 'inherit' }
    );
};

const poster = (video, destino, segundo) => {
    execFileSync(
        ffmpeg,
        ['-y', '-ss', String(segundo), '-i', video, '-frames:v', '1', '-q:v', '3', destino],
        { stdio: 'inherit' }
    );
};

if (existsSync(TEMP)) rmSync(TEMP, { recursive: true, force: true });
mkdirSync(TEMP, { recursive: true });

const soloId = process.argv[2];
const cola = soloId ? PIEZAS.filter((p) => p.id === soloId) : PIEZAS;

for (const pieza of cola) {
    const frames = join(TEMP, pieza.id);
    const video = join(SALIDA, `${pieza.id}.mp4`);

    console.log(`\n▶ ${pieza.id} (${pieza.segundos}s)`);
    render(pieza.id, frames);
    codificar(frames, video);
    poster(video, join(SALIDA, `${pieza.id}.jpg`), pieza.posterSegundo ?? 4);
    rmSync(frames, { recursive: true, force: true });
}

rmSync(TEMP, { recursive: true, force: true });
console.log('\n✓ Listo');
