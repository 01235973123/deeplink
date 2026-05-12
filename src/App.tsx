import { useEffect } from 'react';

const ANDROID_STORE = 'https://play.google.com/store/apps/details?id=com.unitel.logistics';
const IOS_STORE = 'https://apps.apple.com/sg/app/unitel-logistic/id6751838785';
const APP_SCHEME = 'unitellogistics://';
const APP_PACKAGE = 'com.unitel.logistics';
const BRAND = '#E03C2D';

function isIOS() {
  const ua = navigator.userAgent;
  return /(iPhone|iPad|iPod)/i.test(ua) || (/Macintosh/i.test(ua) && 'ontouchend' in document);
}

function isAndroid() {
  return /Android/i.test(navigator.userAgent);
}

function getPath() {
  const params = new URLSearchParams(window.location.search);
  return params.get('path') ?? '';
}

function openDeepLink(storeUrl: string, path: string) {
  const query = path ? `?path=${encodeURIComponent(path)}` : '';
  if (isAndroid()) {
    const fallback = encodeURIComponent(storeUrl);
    window.location.href = `intent://ushop${query}#Intent;scheme=unitellogistics;package=${APP_PACKAGE};S.browser_fallback_url=${fallback};end`;
  } else {
    window.location.href = `${APP_SCHEME}ushop${query}`;
  }
}

function App() {
  const mobile = isIOS() || isAndroid();
  const ios = isIOS();
  const storeUrl = ios ? IOS_STORE : ANDROID_STORE;
  const path = getPath();

  useEffect(() => {
    if (!mobile) return;
    openDeepLink(storeUrl, path);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (mobile) {
    return (
      <div style={s.container}>
        <div style={s.card}>
          <div style={s.logo}><span style={s.logoText}>U</span></div>
          <h2 style={s.title}>Unitel Logistics</h2>
          <p style={s.sub}>Đang mở ứng dụng…</p>
          <div style={s.spinner} />
        </div>
      </div>
    );
  }

  return (
    <div style={s.container}>
      <div style={s.card}>
        <div style={s.logo}><span style={s.logoText}>U</span></div>
        <h2 style={s.title}>Unitel Logistics</h2>
        <p style={s.sub}>Mở trên điện thoại để xem nội dung này.</p>
        <div style={s.row}>
          <a href={IOS_STORE} style={s.btn}>App Store</a>
          <a href={ANDROID_STORE} style={s.btn}>Google Play</a>
        </div>
      </div>
    </div>
  );
}

const s: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex', minHeight: '100vh', alignItems: 'center',
    justifyContent: 'center', background: '#f5f5f5', padding: 16,
  },
  card: {
    background: '#fff', borderRadius: 16, padding: '40px 32px',
    maxWidth: 360, width: '100%', textAlign: 'center',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
  },
  logo: {
    width: 72, height: 72, borderRadius: 18, background: BRAND,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    margin: '0 auto 16px',
  },
  logoText: { color: '#fff', fontSize: 36, fontWeight: 700, fontFamily: 'sans-serif' },
  title: { margin: '0 0 8px', fontSize: 22, fontWeight: 700, color: '#111', fontFamily: 'sans-serif' },
  sub: { margin: '0 0 24px', fontSize: 14, color: '#666', lineHeight: 1.5, fontFamily: 'sans-serif' },
  spinner: {
    width: 32, height: 32, border: '3px solid #eee',
    borderTop: `3px solid ${BRAND}`, borderRadius: '50%',
    margin: '0 auto', animation: 'spin 0.8s linear infinite',
  },
  row: { display: 'flex', gap: 12, justifyContent: 'center' },
  btn: {
    padding: '12px 20px', background: '#111', color: '#fff',
    borderRadius: 10, fontSize: 14, fontWeight: 600,
    textDecoration: 'none', fontFamily: 'sans-serif',
  },
};

export default App;
