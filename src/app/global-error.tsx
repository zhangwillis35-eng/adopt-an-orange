'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="zh-CN">
      <body>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            fontFamily: 'system-ui, sans-serif',
            gap: '16px',
            padding: '24px',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: '48px' }}>🍊</div>
          <h1 style={{ fontSize: '24px', fontWeight: 700, margin: 0 }}>
            出了点问题
          </h1>
          <p style={{ color: '#666', maxWidth: '400px', fontSize: '14px' }}>
            {error.message || '应用遇到了意外错误，请刷新页面重试。'}
          </p>
          <button
            onClick={reset}
            style={{
              padding: '8px 24px',
              fontSize: '14px',
              fontWeight: 500,
              backgroundColor: '#FF8C00',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          >
            重试
          </button>
        </div>
      </body>
    </html>
  )
}
