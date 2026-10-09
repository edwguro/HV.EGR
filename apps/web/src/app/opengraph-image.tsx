import { ImageResponse } from 'next/og';

export const alt =
  'Edwin Gustavo Rodríguez — Ingeniería de sistemas y desarrollo de software';
export const size = { height: 630, width: 1200 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        alignItems: 'flex-start',
        background: '#0e100f',
        color: '#f3f4ef',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'space-between',
        padding: '72px 80px',
        width: '100%',
      }}
    >
      <div style={{ color: '#5eead4', display: 'flex', fontSize: 28 }}>
        EGR.
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 970 }}>
        <div
          style={{
            display: 'flex',
            fontSize: 72,
            fontWeight: 700,
            letterSpacing: '-4px',
          }}
        >
          Edwin Gustavo Rodríguez
        </div>
        <div
          style={{
            color: '#a4aaa6',
            display: 'flex',
            fontSize: 34,
            marginTop: 22,
          }}
        >
          Ingeniería de sistemas · Desarrollo de software · Redes
        </div>
      </div>
      <div style={{ color: '#a4aaa6', display: 'flex', fontSize: 22 }}>
        Portafolio profesional
      </div>
    </div>,
    size,
  );
}
