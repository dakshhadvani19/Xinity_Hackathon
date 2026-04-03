import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 6,
          background: '#121317',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span
          style={{
            fontSize: 22,
            fontWeight: 800,
            color: '#00c4b4',
            lineHeight: 1,
          }}
        >
          X
        </span>
      </div>
    ),
    { ...size }
  );
}
