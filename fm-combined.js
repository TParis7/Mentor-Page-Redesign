/**
 * fm-combined.js — For Mentors page builder
 * Pulse of Perseverance Project (P3)
 * v2.2.0 — 2026-04-04
 *
 * Pattern: Webflow-native nav/footer + JS content injection.
 * The /for-mentors page uses P3 Nav, P3 Mobile Overlay, and P3 Footer
 * Webflow components. This script only replaces the #fm-root div content.
 */
(function () {
  'use strict';

  /* ── image base URL (GitHub Pages CDN) ── */
  var B = 'https://tparis7.github.io/Mentor-Page-Redesign/';

  /* ── helper: url-encode filename ── */
  function u(path) { return B + encodeURIComponent(path).replace(/%2F/g, '/'); }

  /* ══════════════════════════════════════════════════════════════
     1.  CSS
     ══════════════════════════════════════════════════════════════ */
  var css = [
    "*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }",
    "html { scroll-behavior: smooth; }",
    "body.fm-active { background: #fff; margin:0; padding:0; }",
    "#fm-root { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; color: #1a1a1a; -webkit-font-smoothing: antialiased; line-height: 1.6; }",
    "#fm-root img { max-width: 100%; display: block; }",
    "#fm-root a { text-decoration: none; color: inherit; }",
    "#fm-root h1, #fm-root h2, #fm-root h3, #fm-root h4 { font-family: 'Space Grotesk', sans-serif; line-height: 1.2; color: inherit; }",
    "#fm-root a.fm-btn-primary, #fm-root a.fm-btn-white { color: #fff; }",
    "#fm-root a.fm-btn-white-outline { color: #fff; }",

    /* ── Utility classes ── */
    ".fm-section-label { display: inline-flex; align-items: center; padding: 4px 12px; border-radius: 100px; background: rgba(217,58,58,0.08); color: #D93A3A; font-family: 'Satoshi', 'Inter', sans-serif; font-size: 0.65rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 12px; }",
    ".fm-section-heading { font-size: 2.4rem; font-weight: 700; margin-bottom: 16px; color: #1a1a1a; }",
    ".fm-section-heading em { font-style: normal; color: #D93A3A; }",
    ".fm-section-sub { font-size: 1.05rem; color: #555; max-width: 640px; line-height: 1.7; }",
    ".fm-container { max-width: 1180px; margin: 0 auto; padding: 0 24px; }",
    ".fm-section { padding: 48px 0; }",
    ".fm-btn { display: inline-flex; align-items: center; gap: 8px; padding: 14px 32px; border-radius: 100px; font-weight: 600; font-size: 0.9rem; transition: all 0.25s ease; cursor: pointer; border: 2px solid transparent; font-family: 'Inter', sans-serif; }",
    ".fm-btn-primary { background: #D93A3A; color: #fff; border-color: #D93A3A; }",
    ".fm-btn-primary:hover { background: #b82e2e; border-color: #b82e2e; transform: translateY(-1px); }",
    ".fm-btn-white { background: #D93A3A; color: #fff; border-color: #D93A3A; }",
    ".fm-btn-white:hover { background: #b82e2e; border-color: #b82e2e; transform: translateY(-1px); }",
    /* Arrow modifier — matches partner page .ba pattern exactly (gap 6, ml 3) */
    ".fm-btn-arrow { gap: 6px !important; }",
    ".fm-btn-arrow::after { content: '\\2192'; margin-left: 3px; font-family: 'Satoshi', 'Inter', sans-serif; font-size: 14px; transition: transform .25s cubic-bezier(.25,.46,.45,.94); }",
    ".fm-btn-arrow:hover::after { transform: translateX(3px); }",
    ".fm-btn-white-outline { background: transparent; color: #fff; border: 2px solid rgba(255,255,255,0.3); }",
    ".fm-btn-white-outline:hover { background: rgba(255,255,255,0.1); border-color: rgba(255,255,255,0.6); }",

    /* ═══ HERO ═══ */
    ".fm-hero { padding: 100px 0 40px; background: linear-gradient(135deg, #3a0c18 0%, #4a1020 40%, #2a0e16 100%); color: #fff; position: relative; overflow: hidden; min-height: 550px; display: flex; align-items: flex-start; }",
    ".fm-hero-watermark { position: absolute; right: -5%; top: 50%; transform: translateY(-50%); width: 55%; height: 110%; object-fit: cover; opacity: 0.14; mask-image: linear-gradient(to left, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 100%); -webkit-mask-image: linear-gradient(to left, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 100%); filter: grayscale(30%); pointer-events: none; }",
    ".fm-hero::after { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse at 70% 50%, rgba(217,58,58,0.1) 0%, transparent 60%); pointer-events: none; }",
    ".fm-hero .fm-container { position: relative; z-index: 2; width: 100%; }",
    ".fm-hero-content { max-width: 500px; }",
    ".fm-hero h1 { font-size: 50px; font-weight: 700; margin-bottom: 16px; line-height: 1.15; }",
    ".fm-hero h1 em { font-style: normal; color: #D93A3A; }",
    ".fm-hero p { font-size: 1rem; color: rgba(255,255,255,0.65); margin-bottom: 28px; line-height: 1.7; }",
    ".fm-hero-buttons { display: flex; gap: 12px; flex-wrap: wrap; }",
    ".fm-hero-stats { display: flex; gap: 32px; margin-top: 32px; padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.12); }",
    ".fm-hero-stat-num { font-family: 'Space Grotesk', sans-serif; font-size: 1.4rem; font-weight: 700; color: #fff; }",
    ".fm-hero-stat-label { font-size: 0.72rem; color: rgba(255,255,255,0.5); margin-top: 2px; }",

    /* ═══ LOGO BAR ═══ */
    ".fm-logo-bar { background: #fff; padding: 28px 0; border-bottom: 1px solid #eee; overflow: hidden; }",
    ".fm-logo-label { font-size: 0.7rem; font-weight: 600; color: #999; letter-spacing: 1.12px; text-transform: uppercase; text-align: center; margin-bottom: 18px; }",
    ".fm-logo-track { display: flex; gap: 48px; animation: fmScrollLogos 30s linear infinite; width: max-content; align-items: center; }",
    ".fm-logo-track img { height: 36px; opacity: 0.7; filter: grayscale(100%); transition: all 0.3s; }",
    ".fm-logo-track img:hover { opacity: 1; filter: grayscale(0%); }",
    ".fm-logo-track img.fm-logo-sm { height: 32px; }",
    "@keyframes fmScrollLogos { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }",

    /* ═══ WHY MENTOR ═══ */
    ".fm-why-mentor { background: #fff; }",
    ".fm-why-mentor .fm-container > .fm-section-label { display: flex; width: fit-content; margin-left: auto; margin-right: auto; }",
    ".fm-why-mentor .fm-container > .fm-section-heading, .fm-why-mentor .fm-container > .fm-section-sub { text-align: center; }",
    ".fm-why-mentor .fm-container > .fm-section-sub { margin: 0 auto; }",
    ".fm-why-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 32px; }",
    ".fm-why-card { background: #fff; border-radius: 16px; overflow: hidden; border: 1px solid #eee; transition: all 0.3s ease; }",
    ".fm-why-card:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,0,0,0.08); border-color: #D93A3A; }",
    ".fm-why-card-img { height: 180px; overflow: hidden; position: relative; }",
    ".fm-why-card-img img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s; }",
    ".fm-why-card-img img.top-align { object-position: center top; }",
    ".fm-why-card:hover .fm-why-card-img img { transform: scale(1.05); }",
    ".fm-why-card-img .fm-why-card-overlay { position: absolute; bottom: 0; left: 0; right: 0; }",
    "#fm-root .fm-why-card-img .fm-why-card-overlay h3 { color: #fff; font-size: 1.1rem; font-weight: 700; background: rgba(0,0,0,0.55); padding: 10px 16px; backdrop-filter: blur(2px); }",
    ".fm-why-card-body { padding: 20px; }",
    ".fm-why-card-role { font-size: 0.78rem; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; color: #D93A3A; margin-bottom: 8px; }",
    ".fm-why-card-body p { font-size: 0.88rem; color: #555; line-height: 1.6; margin-bottom: 12px; }",

    /* ═══ GET STARTED ═══ */
    ".fm-get-started { background: #f8f6f3; position: relative; overflow: hidden; padding: 48px 0; }",
    ".fm-get-started .fm-container { position: relative; z-index: 2; }",
    ".fm-gs-header { text-align: center; margin-bottom: 32px; }",
    ".fm-gs-header h2 { font-size: 2.6rem; font-weight: 700; color: #1a1a1a; margin-bottom: 12px; }",
    ".fm-gs-header h2 em { font-style: normal; color: #D93A3A; }",
    ".fm-gs-header p { font-size: 1.05rem; color: #666; max-width: 520px; margin: 0 auto; }",
    ".fm-gs-bubbles { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }",
    ".fm-gs-bubble { position: absolute; border-radius: 50%; object-fit: cover; border: 3px solid #fff; box-shadow: 0 4px 16px rgba(0,0,0,0.12); animation: fmFloatBubble 6s ease-in-out infinite; }",
    ".fm-gs-bubble:nth-child(1)  { width: 64px; height: 64px; top: 6%;  left: 4%;  animation-delay: 0s; }",
    ".fm-gs-bubble:nth-child(2)  { width: 52px; height: 52px; top: 14%; right: 5%; animation-delay: 0.8s; }",
    ".fm-gs-bubble:nth-child(3)  { width: 48px; height: 48px; top: 35%; left: 2%;  animation-delay: 1.6s; }",
    ".fm-gs-bubble:nth-child(4)  { width: 56px; height: 56px; top: 55%; right: 3%; animation-delay: 2.4s; }",
    ".fm-gs-bubble:nth-child(5)  { width: 44px; height: 44px; bottom: 20%; left: 5%;  animation-delay: 3.2s; }",
    ".fm-gs-bubble:nth-child(6)  { width: 60px; height: 60px; bottom: 10%; right: 6%; animation-delay: 0.4s; }",
    ".fm-gs-bubble:nth-child(7)  { width: 40px; height: 40px; top: 8%;  left: 14%; animation-delay: 1.2s; }",
    ".fm-gs-bubble:nth-child(8)  { width: 50px; height: 50px; top: 70%; left: 6%;  animation-delay: 2s; }",
    ".fm-gs-bubble:nth-child(9)  { width: 46px; height: 46px; top: 25%; right: 12%; animation-delay: 2.8s; }",
    ".fm-gs-bubble:nth-child(10) { width: 42px; height: 42px; bottom: 5%; left: 12%; animation-delay: 3.6s; }",
    ".fm-gs-bubble:nth-child(11) { width: 54px; height: 54px; top: 45%; right: 8%;  animation-delay: 1s; }",
    ".fm-gs-bubble:nth-child(12) { width: 38px; height: 38px; bottom: 30%; right: 10%; animation-delay: 0.6s; }",
    "@keyframes fmFloatBubble { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }",
    ".fm-gs-steps { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; position: relative; z-index: 2; }",
    ".fm-gs-steps::before { content: ''; position: absolute; top: 80px; left: calc(12.5% + 10px); right: calc(12.5% + 10px); height: 3px; background: linear-gradient(90deg, #D93A3A, #6366f1, #22c55e, #f59e0b); border-radius: 2px; z-index: 0; opacity: 0.3; }",
    ".fm-gs-step { background: #fff; border-radius: 16px; overflow: visible; border: 1px solid #eee; transition: all 0.3s ease; position: relative; z-index: 1; }",
    ".fm-gs-step:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,0,0,0.08); }",
    ".fm-gs-step-img { height: 160px; overflow: hidden; position: relative; display: flex; align-items: center; justify-content: center; border-radius: 16px 16px 0 0; }",
    ".fm-gs-step-abstract { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; }",
    ".fm-gs-step-abstract svg { width: 80px; height: 80px; opacity: 0.95; }",
    ".fm-gs-step-abstract.bg-1 { background: linear-gradient(135deg, #f8e8e8, #f0d4d4); }",
    ".fm-gs-step-abstract.bg-2 { background: linear-gradient(135deg, #e8e8f8, #d4d4f0); }",
    ".fm-gs-step-abstract.bg-3 { background: linear-gradient(135deg, #e8f5e8, #d4ecd4); }",
    ".fm-gs-step-abstract.bg-4 { background: linear-gradient(135deg, #fef3e8, #fde4c8); }",
    ".fm-gs-step-body { padding: 20px; }",
    ".fm-gs-step-body h3 { font-size: 1rem; font-weight: 700; margin-bottom: 6px; }",
    ".fm-gs-step-body p { font-size: 0.85rem; color: #666; line-height: 1.55; }",

    /* ═══ FEATURES ═══ */
    ".fm-features { background: #fff; padding: 48px 0; }",
    ".fm-feature-row { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: center; margin-bottom: 40px; }",
    ".fm-feature-row:last-child { margin-bottom: 0; }",
    ".fm-feature-row.reverse { direction: rtl; }",
    ".fm-feature-row.reverse > * { direction: ltr; }",
    ".fm-feature-visual { border-radius: 16px; overflow: hidden; aspect-ratio: 21/9; position: relative; display: flex; align-items: center; justify-content: center; }",
    ".fm-feature-visual img { width: 100%; height: 100%; object-fit: cover; }",
    ".fm-feature-text .fm-section-label { margin-bottom: 8px; }",
    ".fm-feature-text h3 { font-size: 1.5rem; font-weight: 700; margin-bottom: 10px; }",
    ".fm-feature-text p { font-size: 0.9rem; color: #555; line-height: 1.6; margin-bottom: 14px; }",
    ".fm-feature-list { list-style: none; display: flex; flex-direction: column; gap: 6px; padding: 0; }",
    ".fm-feature-list li { display: flex; align-items: flex-start; gap: 10px; font-size: 0.86rem; color: #444; }",
    ".fm-feature-list li::before { content: '\\2713'; color: #D93A3A; font-weight: 700; flex-shrink: 0; margin-top: 1px; }",

    /* ═══ MILESTONES ═══ */
    ".fm-milestones { background: linear-gradient(135deg, #3a0c18 0%, #4a1020 40%, #2a0e16 100%); color: #fff; padding: 48px 0; }",
    ".fm-milestones .fm-section-label { color: #ff8a8a; }",
    ".fm-milestones .fm-section-heading { color: #fff; }",
    ".fm-milestones .fm-section-sub { color: rgba(255,255,255,0.7); }",
    ".fm-milestone-content { display: grid; grid-template-columns: 1fr 1fr; gap: 36px; align-items: center; margin-top: 28px; }",
    ".fm-milestone-visual { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; padding: 32px; }",
    ".fm-pathway-label { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 1.5px; color: rgba(255,255,255,0.5); margin-bottom: 12px; }",
    ".fm-pathway-title { font-family: 'Space Grotesk', sans-serif; font-size: 1.3rem; font-weight: 700; margin-bottom: 8px; }",
    ".fm-pathway-progress { display: flex; align-items: center; gap: 12px; margin-bottom: 24px; }",
    ".fm-progress-bar { flex: 1; height: 6px; border-radius: 3px; background: rgba(255,255,255,0.15); overflow: hidden; }",
    ".fm-progress-fill { height: 100%; width: 27%; background: linear-gradient(90deg, #D93A3A, #ff6b6b); border-radius: 3px; }",
    ".fm-progress-text { font-size: 0.8rem; color: rgba(255,255,255,0.5); white-space: nowrap; }",
    ".fm-milestone-items { display: flex; flex-direction: column; gap: 12px; }",
    ".fm-ms-item { display: flex; align-items: flex-start; gap: 14px; padding: 12px 14px; border-radius: 12px; }",
    ".fm-ms-item.completed { opacity: 0.6; }",
    ".fm-ms-item.active { background: rgba(217,58,58,0.15); border: 1px solid rgba(217,58,58,0.3); }",
    ".fm-ms-dot { width: 24px; height: 24px; border-radius: 50%; flex-shrink: 0; display: flex; align-items: center; justify-content: center; font-size: 0.7rem; margin-top: 2px; }",
    ".fm-ms-dot.done { background: #4CAF50; color: #fff; }",
    ".fm-ms-dot.current { background: #D93A3A; border: 3px solid #ff8a8a; }",
    ".fm-ms-dot.upcoming { background: rgba(255,255,255,0.15); border: 2px solid rgba(255,255,255,0.3); }",
    ".fm-ms-item-text { font-size: 0.88rem; color: rgba(255,255,255,0.85); }",
    ".fm-ms-item.active .fm-ms-item-text { color: #fff; font-weight: 500; }",
    ".fm-milestone-details { display: flex; flex-direction: column; gap: 20px; }",
    ".fm-ms-detail-card { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 14px; padding: 18px 22px 12px; display: flex; gap: 16px; align-items: flex-start; }",
    ".fm-ms-detail-icon { width: 40px; height: 40px; border-radius: 10px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; }",
    ".fm-ms-detail-icon.red { background: rgba(217,58,58,0.2); }",
    ".fm-ms-detail-icon.blue { background: rgba(59,130,246,0.2); }",
    ".fm-ms-detail-icon.green { background: rgba(34,197,94,0.2); }",
    ".fm-ms-detail-icon.amber { background: rgba(245,158,11,0.2); }",
    ".fm-ms-detail-icon svg { width: 20px; height: 20px; }",
    ".fm-ms-detail-text h4 { font-size: 1rem; font-weight: 700; margin-bottom: 4px; color: #fff; }",
    ".fm-ms-detail-text p { font-size: 0.85rem; color: rgba(255,255,255,0.6); line-height: 1.55; }",

    /* ═══ PORTAL ═══ */
    ".fm-portal { background: #fff; padding: 48px 0; }",
    ".fm-portal-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 36px; align-items: center; }",
    ".fm-portal-preview { background: linear-gradient(135deg, #f0f0f0, #e8e4e0); border-radius: 16px; overflow: hidden; }",
    ".fm-portal-browser-bar { background: #e0e0e0; padding: 12px 16px; display: flex; align-items: center; gap: 8px; }",
    ".fm-browser-dot { width: 10px; height: 10px; border-radius: 50%; }",
    ".fm-browser-dot.red { background: #ff5f56; } .fm-browser-dot.yellow { background: #ffbd2e; } .fm-browser-dot.green { background: #27c93f; }",
    ".fm-portal-url { background: #fff; border-radius: 6px; padding: 4px 14px; font-size: 0.78rem; color: #888; margin-left: 8px; flex: 1; }",
    ".fm-portal-screenshot { padding: 24px; background: #fff; }",
    ".fm-portal-screenshot-header { display: flex; align-items: center; gap: 16px; margin-bottom: 16px; padding-bottom: 12px; border-bottom: 2px solid #D93A3A; }",
    ".fm-portal-screenshot-header img { height: 36px; }",
    ".fm-portal-screenshot-header span { font-family: 'Space Grotesk', sans-serif; font-size: 1rem; font-weight: 600; color: #333; }",
    ".fm-portal-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }",
    ".fm-portal-card { background: #f9f9f9; border-radius: 10px; padding: 16px; text-align: center; border: 1px solid #eee; }",
    ".fm-portal-avatar { width: 48px; height: 48px; border-radius: 50%; background: linear-gradient(135deg, #D93A3A, #ff6b6b); margin: 0 auto 8px; display: flex; align-items: center; justify-content: center; color: #fff; font-weight: 700; font-size: 0.9rem; overflow: hidden; }",
    ".fm-portal-avatar img { width: 100%; height: 100%; object-fit: cover; }",
    ".fm-portal-card-name { font-size: 0.78rem; font-weight: 600; color: #333; }",
    ".fm-portal-card-role { font-size: 0.68rem; color: #888; margin-top: 2px; }",
    ".fm-portal-card-badge { display: inline-block; margin-top: 6px; padding: 2px 8px; border-radius: 4px; font-size: 0.62rem; font-weight: 600; background: rgba(217,58,58,0.1); color: #D93A3A; }",
    ".fm-portal-text h3 { font-size: 1.6rem; font-weight: 700; margin-bottom: 12px; }",
    ".fm-portal-text p { font-size: 0.92rem; color: #555; line-height: 1.65; margin-bottom: 20px; }",
    ".fm-portal-features { display: flex; flex-direction: column; gap: 14px; margin-bottom: 24px; }",
    ".fm-portal-feature { display: flex; align-items: flex-start; gap: 12px; }",
    ".fm-pf-icon { width: 36px; height: 36px; border-radius: 8px; background: #fef2f2; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }",
    ".fm-pf-text h4 { font-size: 0.88rem; font-weight: 600; margin-bottom: 2px; }",
    ".fm-pf-text p { font-size: 0.8rem; color: #777; margin-bottom: 0; }",

    /* ═══ COMMUNITY GALLERY ═══ */
    ".fm-community-gallery { padding: 48px 0; background: #fff; overflow: hidden; }",
    ".fm-community-gallery .fm-container { text-align: center; margin-bottom: 28px; }",
    ".fm-gallery-track { display: flex; gap: 12px; animation: fmScrollGallery 40s linear infinite; width: max-content; }",
    ".fm-gallery-track img { width: 240px; height: 180px; object-fit: cover; border-radius: 12px; }",
    "@keyframes fmScrollGallery { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }",

    /* ═══ CTA ═══ */
    ".fm-cta-section { background: linear-gradient(135deg, #3a0c18 0%, #4a1020 40%, #2a0e16 100%); color: #fff; text-align: center; padding: 48px 0; }",
    ".fm-cta-section h2 { font-size: 2.4rem; font-weight: 700; margin-bottom: 16px; }",
    ".fm-cta-section p { font-size: 1.05rem; color: rgba(255,255,255,0.7); max-width: 560px; margin: 0 auto 32px; line-height: 1.7; }",
    ".fm-cta-buttons { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }",

    /* ═══ HAMBURGER MENU + MOBILE OVERLAY ═══ */
    ".pp-mob-menu { z-index: 1001; cursor: pointer; flex-direction: column; gap: 5px; padding: 8px; display: none; }",
    ".pp-mob-menu span { background-color: #fff; border-radius: 2px; width: 22px; height: 2px; display: block; transition: all 0.3s ease; }",
    ".pp-mob-menu.open span:nth-child(1) { transform: rotate(45deg) translate(4px, 6px); }",
    ".pp-mob-menu.open span:nth-child(2) { opacity: 0; }",
    ".pp-mob-menu.open span:nth-child(3) { transform: rotate(-45deg) translate(4px, -6px); }",
    ".pp-mob-overlay { z-index: 999; background-color: rgba(26, 10, 16, 0.97); flex-direction: column; justify-content: center; align-items: center; gap: 28px; display: none; position: fixed; inset: 0; }",
    ".pp-mob-overlay.open { display: flex !important; }",
    ".pp-mob-overlay a { opacity: 0.85; color: #fff; font-family: Inter, sans-serif; font-size: 1.25rem; font-weight: 500; text-decoration: none; }",
    ".pp-mob-overlay a:last-child { color: #fff; background-color: #D93A3A; border-radius: 100px; margin-top: 8px; padding: 12px 32px; font-size: 1rem; font-weight: 600; }",

    /* ═══ RESPONSIVE ═══ */
    "@media (max-width: 991px) {",
    "  .pp-mob-menu { display: flex; }",
    "  .p3-nav-links, .p3-nav-cta { display: none !important; }",
    "  .p3-nav { padding: 16px !important; height: 64px !important; }",
    "  .p3-nav .p3-nav-logo img { max-height: 36px !important; height: 36px !important; }",
    "}",
    "@media (max-width: 1024px) {",
    "  .fm-hero h1 { font-size: 2.4rem; }",
    "  .fm-hero-watermark { width: 70%; opacity: 0.12; }",
    "  .fm-feature-row, .fm-feature-row.reverse { grid-template-columns: 1fr; direction: ltr; }",
    "  .fm-milestone-content { grid-template-columns: 1fr; }",
    "  .fm-portal-grid { grid-template-columns: 1fr; }",
    "  .fm-why-grid { grid-template-columns: repeat(2, 1fr); }",
    "  .fm-gs-steps { grid-template-columns: repeat(2, 1fr); }",
    "}",
    "@media (max-width: 768px) {",
    "  .fm-section { padding: 40px 0; }",
    "  .fm-hero { padding: 120px 0 48px; min-height: auto; }",
    "  .fm-hero .fm-container { padding: 0 28px; }",
    "  .fm-hero-content { max-width: 100%; text-align: center; }",
    "  .fm-hero h1 { font-size: 1.75rem; }",
    "  .fm-hero p { font-size: 1rem; margin-bottom: 28px; max-width: 100%; }",
    "  .fm-hero-watermark { display: none; }",
    "  .fm-hero-buttons { flex-direction: column; gap: 12px; }",
    "  .fm-hero-buttons .fm-btn { width: 100%; justify-content: center; padding: 14px 32px; font-size: 14px; }",
    "  .fm-hero-stats { gap: 20px; flex-wrap: wrap; margin-top: 28px; padding-top: 24px; justify-content: center; }",
    "  .fm-hero-stat-num { font-size: 1.6rem; }",
    "  .fm-section-heading { font-size: 1.6rem; }",
    "  .fm-section-sub { font-size: 0.92rem; }",
    "  .fm-gs-header { margin-bottom: 32px; }",
    "  .fm-gs-header h2 { font-size: 1.8rem; }",
    "  .fm-gs-steps { grid-template-columns: 1fr 1fr; gap: 12px; }",
    "  .fm-gs-step-img { height: 120px; }",
    "  .fm-gs-step-body { padding: 14px; }",
    "  .fm-gs-step-body h3 { font-size: 0.9rem; }",
    "  .fm-gs-step-body p { font-size: 0.8rem; }",
    "  .fm-gs-bubbles { display: none; }",
    "  .fm-why-grid { grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 32px; }",
    "  .fm-why-card-img { height: 140px; }",
    "  .fm-why-card-body { padding: 14px; }",
    "  .fm-why-card-body p { font-size: 0.82rem; margin-bottom: 8px; }",
    "  .fm-why-card-role { font-size: 0.72rem; margin-bottom: 6px; }",
    "  .fm-feature-row { gap: 24px; margin-bottom: 32px; }",
    "  .fm-feature-text h3 { font-size: 1.2rem; }",
    "  .fm-milestone-content { gap: 32px; }",
    "  .fm-portal-grid { gap: 32px; }",
    "  .fm-portal-text h3 { font-size: 1.3rem; }",
    "  .fm-community-gallery .fm-container { margin-bottom: 24px; }",
    "  .fm-cta-section h2 { font-size: 1.6rem; }",
    "  .fm-cta-section p { font-size: 0.92rem; }",
    "  .fm-portal-text .fm-btn { display: block; margin: 0 auto; width: fit-content; }",
    /* Center Pathway Milestones heading + label on mobile */
    "  .fm-milestones .fm-container > .fm-section-label { display: flex !important; width: fit-content; margin-left: auto !important; margin-right: auto !important; }",
    "  .fm-milestones .fm-container > .fm-section-heading,",
    "  .fm-milestones .fm-container > .fm-section-sub { text-align: center !important; }",
    /* Center Portal text block (Get discovered + National Mentor Portal) on mobile */
    "  .fm-portal-text { text-align: center !important; }",
    "  .fm-portal-text > .fm-section-label { white-space: nowrap; }",
    "  .fm-portal-text > h3 { text-align: center !important; }",
    "  .fm-portal-text > p { text-align: center !important; }",
    /* Restore left-alignment for the feature list items (Public Directory, Expand Access, Shareable Profile) */
    "  .fm-portal-features { text-align: left !important; }",
    "  .fm-portal-feature { text-align: left !important; }",
    "  .fm-pf-text, .fm-pf-text h4, .fm-pf-text p { text-align: left !important; }",
    "}",
    "@media (max-width: 480px) {",
    "  .fm-hero h1 { font-size: 1.75rem; }",
    "  .fm-hero-stats { gap: 16px; justify-content: center; }",
    "  .fm-hero-stat-num { font-size: 1.4rem; }",
    "  .fm-section-heading { font-size: 1.4rem; }",
    "  .fm-gs-steps { grid-template-columns: 1fr; max-width: 340px; margin: 0 auto; }",
    "  .fm-why-grid { grid-template-columns: 1fr; }",
    "  .fm-milestone-content { grid-template-columns: 1fr; }",
    "  .fm-portal-grid { grid-template-columns: 1fr; }",
    "}"
  ].join('\n');

  /* ══════════════════════════════════════════════════════════════
     2.  SVG icons (Get Started steps)
     ══════════════════════════════════════════════════════════════ */
  var svgStep1 = '<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="14" cy="14" r="13" fill="#D93A3A"/><circle cx="14" cy="14" r="13" stroke="#fff" stroke-width="2.5"/><text x="14" y="19" text-anchor="middle" fill="#fff" font-family="\'Space Grotesk\',sans-serif" font-size="16" font-weight="700">1</text><rect x="22" y="22" width="36" height="48" rx="7" stroke="#D93A3A" stroke-width="2.5"/><circle cx="40" cy="62" r="3" fill="#D93A3A"/><line x1="30" y1="34" x2="50" y2="34" stroke="#D93A3A" stroke-width="2" stroke-linecap="round"/><line x1="30" y1="42" x2="44" y2="42" stroke="#D93A3A" stroke-width="2" stroke-linecap="round" opacity="0.5"/><path d="M34 50l4 4 8-8" stroke="#D93A3A" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var svgStep2 = '<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="14" cy="14" r="13" fill="#6366f1"/><circle cx="14" cy="14" r="13" stroke="#fff" stroke-width="2.5"/><text x="14" y="19" text-anchor="middle" fill="#fff" font-family="\'Space Grotesk\',sans-serif" font-size="16" font-weight="700">2</text><circle cx="44" cy="32" r="12" stroke="#6366f1" stroke-width="2.5"/><circle cx="44" cy="32" r="5" fill="#6366f1" opacity="0.3"/><path d="M26 68v-4a18 18 0 0 1 36 0v4" stroke="#6366f1" stroke-width="2.5" stroke-linecap="round"/><line x1="50" y1="56" x2="60" y2="56" stroke="#6366f1" stroke-width="2" stroke-linecap="round"/><line x1="50" y1="62" x2="57" y2="62" stroke="#6366f1" stroke-width="2" stroke-linecap="round" opacity="0.5"/></svg>';
  var svgStep3 = '<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="14" cy="14" r="13" fill="#22c55e"/><circle cx="14" cy="14" r="13" stroke="#fff" stroke-width="2.5"/><text x="14" y="19" text-anchor="middle" fill="#fff" font-family="\'Space Grotesk\',sans-serif" font-size="16" font-weight="700">3</text><circle cx="44" cy="44" r="22" stroke="#22c55e" stroke-width="2.5"/><path d="M33 44l8 8 14-14" stroke="#22c55e" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><circle cx="44" cy="44" r="28" stroke="#22c55e" stroke-width="1" opacity="0.25" stroke-dasharray="4 4"/></svg>';
  var svgStep4 = '<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="14" cy="14" r="13" fill="#f59e0b"/><circle cx="14" cy="14" r="13" stroke="#fff" stroke-width="2.5"/><text x="14" y="19" text-anchor="middle" fill="#fff" font-family="\'Space Grotesk\',sans-serif" font-size="16" font-weight="700">4</text><rect x="14" y="26" width="28" height="20" rx="4" stroke="#f59e0b" stroke-width="2.5"/><polygon points="56,28 68,36 56,44" stroke="#f59e0b" stroke-width="2.5" fill="#f59e0b" fill-opacity="0.2" stroke-linejoin="round"/><circle cx="28" cy="62" r="9" stroke="#f59e0b" stroke-width="2" opacity="0.5"/><circle cx="56" cy="62" r="9" stroke="#f59e0b" stroke-width="2" opacity="0.5"/><line x1="37" y1="62" x2="47" y2="62" stroke="#f59e0b" stroke-width="2" stroke-linecap="round" stroke-dasharray="3 3"/></svg>';

  /* Milestone SVG icons */
  var svgCheck = '<svg viewBox="0 0 24 24" fill="none" stroke="#D93A3A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>';
  var svgInfo = '<svg viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>';
  var svgBar = '<svg viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>';
  var svgRefresh = '<svg viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>';

  /* Portal SVG icons */
  var svgGlobe = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D93A3A" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>';
  var svgChat = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D93A3A" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>';
  var svgShare = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D93A3A" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>';

  /* ══════════════════════════════════════════════════════════════
     3.  Image URLs
     ══════════════════════════════════════════════════════════════ */
  var img = {
    heroWatermark: u('Copy of Versus_P3_20260910-IMG9096_MollJeanNye.jpg'),
    newMentor: u('new-mentor.jpeg'),
    hospital: u('hospital.jpeg'),
    starterPack: u('VersusWoman.png'),
    groupPhoto: u('1760104448089.jpeg'),
    communityUplift: u('community-uplift.jpg'),
    dashboard: u('Dashboard mockup1.png'),
    connections: u('Connections.jpeg'),
    videoCollage: u('Video collage.jpeg'),
    iphoneMockup: u('iPhone Mockup hand.jpg'),
    p3LogoStacked: u('p3-logo-stacked.png'),
    artKil: u('Arthur Kenard Killingsworth.jpg'),
    /* Gallery */
    gal1: u('224A1273_Original.jpg'),
    gal2: u('Copy of Copy of P3_Gala2025_0193.jpg'),
    gal3: u('_P3_4718.jpg'),
    gal4: u('P3_Gala2025_0425.jpg'),
    gal5: u('IMG_7919.jpg'),
    gal6: u('Copy of Versus_P3_20260910-IMG9096_MollJeanNye.jpg'),
    gal7: u('IMG_6982.jpg'),
    gal8: u('Copy of P3_Gala2025_0065.jpg'),
    gal9: u('Doctors Park.jpg'),
    gal10: u('group.jpeg'),
    gal11: u('Copy of _P3_4641.jpg'),
    gal12: u('Copy of Versus_P3_20260910-IMG9479_MollJeanNye.jpg')
  };

  /* Logos */
  var logos = ['csu','xavier','langston','nyu','google','lsu','mbk','project-hood','cps','100bm','gilead','lurie'];
  var smLogos = ['csu','xavier','nyu','google','lsu'];
  function logoImg(name) {
    var cls = smLogos.indexOf(name) >= 0 ? ' class="fm-logo-sm"' : '';
    return '<img src="' + u('logos/' + name + '.png') + '" alt="' + name.toUpperCase() + '"' + cls + '>';
  }
  var logoHtml = logos.map(logoImg).join('');

  /* Mentor bubble photos */
  var bubbleMentors = [
    '01J9NVS90T9N1P16JT92N94QZB','01HXX2QF7XB3SCFQCZCB1CEY5N','01J6W5Z2CZC32ENFW8NXKCBA0W',
    '01JZERCH0G6S1KP2DCKZ1NAZ60','01JWX0RD5K7G6K49JMKXPN03Y2','01JPNCNQSNC6B5J3CMQX5N8PGA',
    '01HXADB1E3N9CF3XV7FXXDY25K','01JNB2J7ZGB8NZC7ZVQJYB0PHP','01K2GDQC2RV2AZB52PFFNA2SAW',
    '01HXJ7KP3DKKM0EEQWGPJNBNJ2','01JWKTEQZ6J1V88Y0ZWKWCWW9G','01JWM1DDK12KNBSXJPSER52BCH'
  ];
  var bubblesHtml = bubbleMentors.map(function(id) {
    return '<img class="fm-gs-bubble" src="' + u('mentors/' + id + '.jpg') + '" alt="">';
  }).join('');

  /* Gallery images (doubled for infinite scroll) */
  var galKeys = ['gal1','gal2','gal3','gal4','gal5','gal6','gal7','gal8','gal9','gal10','gal11','gal12'];
  var galImgs = galKeys.map(function(k){ return '<img src="' + img[k] + '" alt="P3">'; }).join('');
  var galleryHtml = galImgs + galImgs; // doubled for seamless loop

  /* ══════════════════════════════════════════════════════════════
     4.  HTML TEMPLATE
     ══════════════════════════════════════════════════════════════ */
  var html = [
    /* ── HERO ── */
    '<section class="fm-hero">',
    '  <img src="' + img.heroWatermark + '" alt="" class="fm-hero-watermark">',
    '  <div class="fm-container">',
    '    <div class="fm-hero-content">',
    '      <h1>Your experience is someone\'s <em>roadmap to success</em></h1>',
    '      <p>Join a community of industry professionals guiding ambitious students from underserved communities. Mentorship that fits your schedule \u2014 powered by AI smart matching, delivered through short videos.</p>',
    '      <div class="fm-hero-buttons">',
    '        <a href="/download" class="fm-btn fm-btn-white fm-btn-arrow">Become a Mentor</a>',
    '        <a href="#fm-get-started" class="fm-btn fm-btn-white-outline">How It Works</a>',
    '      </div>',
    '      <div class="fm-hero-stats">',
    '        <div><div class="fm-hero-stat-num">900+</div><div class="fm-hero-stat-label">Registered Users</div></div>',
    '        <div><div class="fm-hero-stat-num">99%</div><div class="fm-hero-stat-label">Match Retention</div></div>',
    '        <div><div class="fm-hero-stat-num">20+</div><div class="fm-hero-stat-label">Partner Organizations</div></div>',
    '      </div>',
    '    </div>',
    '  </div>',
    '</section>',

    /* ── LOGO BAR ── */
    '<div class="fm-logo-bar">',
    '  <div class="fm-logo-label">Trusted by leading institutions</div>',
    '  <div class="fm-logo-track">' + logoHtml + logoHtml + '</div>',
    '</div>',

    /* ── WHY MENTOR ── */
    '<section class="fm-why-mentor fm-section">',
    '  <div class="fm-container">',
    '    <div class="fm-section-label">Why Mentor with P3</div>',
    '    <h2 class="fm-section-heading">Make a measurable impact on <em>tomorrow\'s leaders</em></h2>',
    '    <p class="fm-section-sub">Mentoring with P3 isn\'t just volunteering \u2014 it\'s building a bridge between your experience and a student\'s potential.</p>',
    '    <div class="fm-why-grid">',

    '      <div class="fm-why-card"><div class="fm-why-card-img"><img src="' + img.newMentor + '" alt="AI Smart Matching"><div class="fm-why-card-overlay"><h3>AI Smart Matching</h3></div></div><div class="fm-why-card-body"><div class="fm-why-card-role">Personalized Connections</div><p>Get matched with students who choose you based on your industry, career journey, and mentoring strengths. Every connection is intentional.</p></div></div>',

    '      <div class="fm-why-card"><div class="fm-why-card-img"><img src="' + img.hospital + '" alt="Fits Your Schedule"><div class="fm-why-card-overlay"><h3>Fits Your Schedule</h3></div></div><div class="fm-why-card-body"><div class="fm-why-card-role">Asynchronous Mentorship</div><p>Mentees send text-based questions, and you respond with short videos when it works for you. No calendar conflicts \u2014 just genuine guidance.</p></div></div>',

    '      <div class="fm-why-card"><div class="fm-why-card-img"><img src="' + img.starterPack + '" alt="Guided Support"><div class="fm-why-card-overlay"><h3>Guided Support</h3></div></div><div class="fm-why-card-body"><div class="fm-why-card-role">Supported from Day One</div><p>Every mentor receives a Mentorship Guide \u2014 peer reviewed by 20+ industry experts from UT Austin, LSU, Michigan, and Google.</p></div></div>',

    '      <div class="fm-why-card"><div class="fm-why-card-img"><img src="' + img.groupPhoto + '" alt="National Visibility" class="top-align"><div class="fm-why-card-overlay"><h3>National Visibility</h3></div></div><div class="fm-why-card-body"><div class="fm-why-card-role">Mentor Portal</div><p>Once approved, your profile is featured on our National Mentor Portal \u2014 a public directory where students nationwide can discover you.</p></div></div>',

    '      <div class="fm-why-card"><div class="fm-why-card-img"><img src="' + img.communityUplift + '" alt="Community Uplift" class="top-align"><div class="fm-why-card-overlay"><h3>Community Uplift</h3></div></div><div class="fm-why-card-body"><div class="fm-why-card-role">Collaborate Together</div><p>A turnkey way to activate employee volunteerism, strengthen your CSR footprint, and build a direct talent pipeline to underserved communities.</p></div></div>',

    '      <div class="fm-why-card"><div class="fm-why-card-img"><img src="' + img.dashboard + '" alt="Track Your Impact"><div class="fm-why-card-overlay"><h3>Track Your Impact</h3></div></div><div class="fm-why-card-body"><div class="fm-why-card-role">Measurable Outcomes</div><p>See how your mentorship makes a difference with milestone tracking, engagement metrics, and student progress \u2014 all visible from the app.</p></div></div>',

    '    </div>',
    '  </div>',
    '</section>',

    /* ── GET STARTED ── */
    '<section class="fm-get-started" id="fm-get-started">',
    '  <div class="fm-gs-bubbles">' + bubblesHtml + '</div>',
    '  <div class="fm-container">',
    '    <div class="fm-gs-header">',
    '      <h2>Get started in <em>4 simple steps</em></h2>',
    '      <p>P3 guides you through every step of mentor onboarding.</p>',
    '    </div>',
    '    <div class="fm-gs-steps">',
    '      <div class="fm-gs-step"><div class="fm-gs-step-img"><div class="fm-gs-step-abstract bg-1">' + svgStep1 + '</div></div><div class="fm-gs-step-body"><h3>Download &amp; Register</h3><p>Get the P3 app on iOS or Android. Sign up with Google or email \u2014 it takes just 2 minutes.</p></div></div>',
    '      <div class="fm-gs-step"><div class="fm-gs-step-img"><div class="fm-gs-step-abstract bg-2">' + svgStep2 + '</div></div><div class="fm-gs-step-body"><h3>Build Your Profile</h3><p>Add your bio, LinkedIn, education, industry experience, coaching strengths, and a 60-second intro video.</p></div></div>',
    '      <div class="fm-gs-step"><div class="fm-gs-step-img"><div class="fm-gs-step-abstract bg-3">' + svgStep3 + '</div></div><div class="fm-gs-step-body"><h3>Get Approved</h3><p>P3 manually reviews every application within 5\u20137 business days. Once approved, you\'re matched and listed.</p></div></div>',
    '      <div class="fm-gs-step"><div class="fm-gs-step-img"><div class="fm-gs-step-abstract bg-4">' + svgStep4 + '</div></div><div class="fm-gs-step-body"><h3>Start Mentoring</h3><p>Receive questions from matched mentees, respond with video guidance, and track their milestones.</p></div></div>',
    '    </div>',
    '  </div>',
    '</section>',

    /* ── FEATURES ── */
    '<section class="fm-features" id="fm-features">',
    '  <div class="fm-container">',
    '    <div style="text-align:center; margin-bottom: 40px;">',
    '      <div class="fm-section-label">Mentor Features</div>',
    '      <h2 class="fm-section-heading">Built for mentors. <em>Designed for impact.</em></h2>',
    '      <p class="fm-section-sub" style="margin:0 auto">Everything you need to guide, connect, and support the next generation \u2014 right from your phone.</p>',
    '    </div>',

    '    <div class="fm-feature-row">',
    '      <div class="fm-feature-visual"><img src="' + img.connections + '" alt="Smart Matching"></div>',
    '      <div class="fm-feature-text"><div class="fm-section-label">Smart Matching</div><h3>Personalized connections, powered by AI</h3><p>Students personalize their profiles with education goals, career ambitions, and availability. Our AI matches them with you based on industry expertise and mentoring style.</p><ul class="fm-feature-list"><li>Matched by industry, career goals &amp; personal needs</li><li>Students choose you \u2014 every connection is intentional</li><li>View mentee profiles before accepting a connection</li></ul></div>',
    '    </div>',

    '    <div class="fm-feature-row reverse">',
    '      <div class="fm-feature-visual"><img src="' + img.videoCollage + '" alt="Video Guidance"></div>',
    '      <div class="fm-feature-text"><div class="fm-section-label">Video Guidance</div><h3>Answer questions with short videos</h3><p>Mentees submit text-based questions and you respond with authentic 90-second video answers. Your videos are automatically added to the Explore library for all students.</p><ul class="fm-feature-list"><li>Asynchronous \u2014 respond on your own schedule</li><li>Videos uploaded to the public Explore feed</li><li>+100 discussion topics with conversation starters</li></ul></div>',
    '    </div>',

    '    <div class="fm-feature-row">',
    '      <div class="fm-feature-visual"><img src="' + img.iphoneMockup + '" alt="Share & Connect"></div>',
    '      <div class="fm-feature-text"><div class="fm-section-label">Share &amp; Connect</div><h3>Grow your reach beyond the app</h3><p>Share your mentor profile via text, email, WhatsApp, or social media. Your profile includes your bio, intro video, and a link from the National Mentor Portal.</p><ul class="fm-feature-list"><li>One-tap sharing via AirDrop, Messages, Gmail, and more</li><li>Shareable link from mentors.pulseofp3.org</li><li>Track your followers, mentees, and video engagement</li></ul></div>',
    '    </div>',
    '  </div>',
    '</section>',

    /* ── MILESTONES ── */
    '<section class="fm-milestones" id="fm-milestones">',
    '  <div class="fm-container">',
    '    <div class="fm-section-label">New Feature - Coming April 2026</div>',
    '    <h2 class="fm-section-heading">Pathway Milestones</h2>',
    '    <p class="fm-section-sub">A new way to see your mentee\'s progress. Students check off real-life milestones over time, so your guidance can be tailored to exactly where they are.</p>',
    '    <div class="fm-milestone-content">',
    '      <div class="fm-milestone-visual">',
    '        <div class="fm-pathway-label">Your Mentee\'s Pathway</div>',
    '        <div class="fm-pathway-title">High School Pathway</div>',
    '        <div class="fm-pathway-progress"><div class="fm-progress-bar"><div class="fm-progress-fill"></div></div><div class="fm-progress-text">3 of 11</div></div>',
    '        <div class="fm-milestone-items">',
    '          <div class="fm-ms-item completed"><div class="fm-ms-dot done">&#10003;</div><div class="fm-ms-item-text">Started high school (9th grade)</div></div>',
    '          <div class="fm-ms-item completed"><div class="fm-ms-dot done">&#10003;</div><div class="fm-ms-item-text">Joined extracurricular activities (school clubs, sports teams, etc.)</div></div>',
    '          <div class="fm-ms-item completed"><div class="fm-ms-dot done">&#10003;</div><div class="fm-ms-item-text">Worked at a first part-time job or volunteer position</div></div>',
    '          <div class="fm-ms-item active"><div class="fm-ms-dot current"></div><div class="fm-ms-item-text">Started a leadership role at school (team captain, student council, etc.)</div></div>',
    '          <div class="fm-ms-item"><div class="fm-ms-dot upcoming"></div><div class="fm-ms-item-text">Completed standardized testing (SAT, ACT, etc.)</div></div>',
    '          <div class="fm-ms-item"><div class="fm-ms-dot upcoming"></div><div class="fm-ms-item-text">Visited colleges and researched options</div></div>',
    '        </div>',
    '      </div>',
    '      <div class="fm-milestone-details">',
    '        <div class="fm-ms-detail-card"><div class="fm-ms-detail-icon red">' + svgCheck + '</div><div class="fm-ms-detail-text"><h4>Celebrate Achievements</h4><p>See when your mentee completes milestones in real time. Celebrate their wins and acknowledge progress throughout the journey.</p></div></div>',
    '        <div class="fm-ms-detail-card"><div class="fm-ms-detail-icon blue">' + svgInfo + '</div><div class="fm-ms-detail-text"><h4>Customized Guidance</h4><p>Know exactly where your mentee stands \u2014 academically and personally. Tailor your video responses to their specific needs and next steps.</p></div></div>',
    '        <div class="fm-ms-detail-card"><div class="fm-ms-detail-icon green">' + svgBar + '</div><div class="fm-ms-detail-text"><h4>Aiming for Success</h4><p>Students focus on key targets with clear milestones mapped to their academic stage \u2014 High School, College, or Young Professional.</p></div></div>',
    '        <div class="fm-ms-detail-card"><div class="fm-ms-detail-icon amber">' + svgRefresh + '</div><div class="fm-ms-detail-text"><h4>Feedback Loop</h4><p>Milestones create a shared language between students, mentors, and partners \u2014 aligning everyone around measurable progress.</p></div></div>',
    '      </div>',
    '    </div>',
    '  </div>',
    '</section>',

    /* ── PORTAL ── */
    '<section class="fm-portal" id="fm-portal">',
    '  <div class="fm-container">',
    '    <div class="fm-portal-grid">',
    '      <div class="fm-portal-preview">',
    '        <div class="fm-portal-browser-bar"><div class="fm-browser-dot red"></div><div class="fm-browser-dot yellow"></div><div class="fm-browser-dot green"></div><div class="fm-portal-url">mentors.pulseofp3.org</div></div>',
    '        <div class="fm-portal-screenshot">',
    '          <div class="fm-portal-screenshot-header"><img src="' + img.p3LogoStacked + '" alt="P3" style="height:36px;"><span>National Mentor Portal</span></div>',
    '          <div class="fm-portal-cards">',
    '            <div class="fm-portal-card"><div class="fm-portal-avatar"><img src="' + u('mentors/01JVT9G1S3S9H3D3FFKF9M5K7N.jpg') + '" alt="Thomas Paris"></div><div class="fm-portal-card-name">Thomas Paris</div><div class="fm-portal-card-role">Chief Operating Officer</div><div class="fm-portal-card-badge">Operations</div></div>',
    '            <div class="fm-portal-card"><div class="fm-portal-avatar" style="background:linear-gradient(135deg,#2c5aa0,#4a90d9);"><img src="' + u('mentors/01J9NVS90T9N1P16JT92N94QZB.jpg') + '" alt="Alfred Edmond"></div><div class="fm-portal-card-name">Alfred Edmond</div><div class="fm-portal-card-role">S. Vice President</div><div class="fm-portal-card-badge">Business</div></div>',
    '            <div class="fm-portal-card"><div class="fm-portal-avatar" style="background:linear-gradient(135deg,#2d8659,#4CAF50);"><img src="' + img.artKil + '" alt="Arthur Kenard Killingsworth"></div><div class="fm-portal-card-name">Arthur Kenard Killingsworth</div><div class="fm-portal-card-role">Founder</div><div class="fm-portal-card-badge">Entertainment</div></div>',
    '          </div>',
    '        </div>',
    '      </div>',
    '      <div class="fm-portal-text">',
    '        <div class="fm-section-label">National Mentor Portal</div>',
    '        <h3>Get discovered by students <em style="font-style:normal;color:#D93A3A;">nationwide</em></h3>',
    '        <p>Every approved P3 mentor is featured on our public National Mentor Portal. Students can browse profiles, learn about your background, and submit questions directly.</p>',
    '        <div class="fm-portal-features">',
    '          <div class="fm-portal-feature"><div class="fm-pf-icon">' + svgGlobe + '</div><div class="fm-pf-text"><h4>Public Directory</h4><p>Accessible at mentors.pulseofp3.org \u2014 no login required</p></div></div>',
    '          <div class="fm-portal-feature"><div class="fm-pf-icon">' + svgChat + '</div><div class="fm-pf-text"><h4>Expand your Access</h4><p>Any student can submit a question and receive a video response</p></div></div>',
    '          <div class="fm-portal-feature"><div class="fm-pf-icon">' + svgShare + '</div><div class="fm-pf-text"><h4>Shareable Profile</h4><p>Share your portal link on LinkedIn, emails, or your org\'s website</p></div></div>',
    '        </div>',
    '        <a href="https://mentors.pulseofp3.org/" class="fm-btn fm-btn-primary" target="_blank">Visit the Mentor Portal</a>',
    '      </div>',
    '    </div>',
    '  </div>',
    '</section>',

    /* NOTE: Mentor Spotlight section intentionally removed */

    /* ── COMMUNITY GALLERY ── */
    '<section class="fm-community-gallery">',
    '  <div class="fm-container">',
    '    <div class="fm-section-label">Community</div>',
    '    <h2 class="fm-section-heading">The P3 mentorship <em>community in action</em></h2>',
    '    <p class="fm-section-sub" style="margin:0 auto">Mentorship moments, campus events, and career breakthroughs.</p>',
    '  </div>',
    '  <div class="fm-gallery-track">' + galleryHtml + '</div>',
    '</section>',

    /* ── CTA ── */
    '<section class="fm-cta-section">',
    '  <div class="fm-container">',
    '    <h2>Ready to open doors for the <em style="font-style:normal;background:linear-gradient(90deg,#ff6b6b,#ffa07a);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">next generation?</em></h2>',
    '    <p>Apply today to join our community of mentors. Through the P3 app, you\'ll connect directly with ambitious students who need your experience, guidance, and support.</p>',
    '    <div class="fm-cta-buttons">',
    '      <a href="/download" class="fm-btn fm-btn-white fm-btn-arrow">Become a Mentor</a>',
    '      <a href="https://calendar.app.google/HWHVSUkDqED55EXf7" target="_blank" class="fm-btn fm-btn-white-outline">Contact Us</a>',
    '    </div>',
    '  </div>',
    '</section>',

  ].join('\n');

  /* ══════════════════════════════════════════════════════════════
     5.  INIT
     ══════════════════════════════════════════════════════════════ */
  function init() {
    /* ── Load Google Fonts ── */
    var link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = 'https://fonts.googleapis.com';
    document.head.appendChild(link);

    var link2 = document.createElement('link');
    link2.rel = 'stylesheet';
    link2.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&family=Satoshi:wght@400;600;700&display=swap';
    document.head.appendChild(link2);

    /* ── Fix OG image to match homepage ── */
    var oldOg = document.querySelector('meta[property="og:image"]');
    if (oldOg) oldOg.remove();
    var ogImg = document.createElement('meta');
    ogImg.setAttribute('property', 'og:image');
    ogImg.setAttribute('content', 'https://cdn.prod.website-files.com/69b02f65f0068e9fb16f09f7/69b176b499f6fec2ebce26b7_1.png');
    document.head.appendChild(ogImg);

    /* ── Inject CSS ── */
    var style = document.createElement('style');
    style.id = 'fm-combined-styles';
    style.textContent = css;
    document.head.appendChild(style);

    /* ── Inject content into #fm-root (Webflow-native nav/footer stay untouched) ── */
    document.body.classList.add('fm-active');
    var root = document.getElementById('fm-root');
    if (root) root.innerHTML = html;

    /* Remove FOUC hider (if present from loader script) */
    var fouc = document.getElementById('fm-fouc-hide');
    if (fouc) fouc.remove();
    document.body.style.opacity = '1';

    /* ── Scroll-darken navbar (P3 Nav component uses .p3-nav class) ── */
    var navbar = document.querySelector('.p3-nav');
    window.addEventListener('scroll', function () {
      if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    /* ── Add mobile toggle button to P3 Nav (matches partner page .pp-mob-menu) ── */
    if (navbar && !navbar.querySelector('.pp-mob-menu')) {
      var mobBtn = document.createElement('div');
      mobBtn.className = 'pp-mob-menu';
      mobBtn.setAttribute('aria-label', 'Menu');
      mobBtn.innerHTML = '<span></span><span></span><span></span>';
      navbar.appendChild(mobBtn);
    }

    /* ── Wire up mobile toggle → P3 Mobile Overlay (matches partner page behavior) ── */
    var toggle = navbar && navbar.querySelector('.pp-mob-menu');
    var overlay = document.querySelector('.pp-mob-overlay');
    if (toggle && overlay) {
      toggle.addEventListener('click', function () {
        toggle.classList.toggle('open');
        overlay.classList.toggle('open');
        document.body.style.overflow = overlay.classList.contains('open') ? 'hidden' : '';
      });
      /* Close on link click */
      overlay.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () {
          toggle.classList.remove('open');
          overlay.classList.remove('open');
          document.body.style.overflow = '';
        });
      });
    }

    /* ── Patch P3 Footer to match partner/homepage footer content ── */
    (function patchFooter() {
      var footer = document.querySelector('.p3-footer, [class*="footer-v2"], footer');
      if (!footer) return;

      /* Fix tagline text */
      var tagline = footer.querySelector('p');
      if (tagline && tagline.textContent.indexOf('Unlocking') >= 0) {
        tagline.textContent = 'Unlocking life-changing opportunities for young visionaries. Free on iOS & Android.';
      }

      /* Fix location text */
      var allP = footer.querySelectorAll('p');
      allP.forEach(function(p) {
        if (p.textContent.trim() === 'Chicago, IL') {
          p.textContent = 'Chicago, IL \u00B7 Founded 2018';
        }
      });

      /* Add missing CONNECT links (YouTube, Donate) and remove email */
      var connectLinks = footer.querySelectorAll('a');
      connectLinks.forEach(function(a) {
        var txt = a.textContent.trim();
        if (txt === 'team@pulseofp3.org') {
          a.remove();
        }
      });

      /* Find CONNECT column and add YouTube + Donate */
      var headings = footer.querySelectorAll('h6, h5, h4, [class*="heading"], strong');
      headings.forEach(function(h) {
        if (h.textContent.trim().toUpperCase() === 'CONNECT') {
          var col = h.parentElement;
          if (col) {
            var links = col.querySelectorAll('a');
            var lastLink = links[links.length - 1];
            if (lastLink) {
              var yt = document.createElement('a');
              yt.href = 'https://www.youtube.com/@PulseofPerseverance';
              yt.target = '_blank';
              yt.textContent = 'YouTube';
              yt.style.cssText = lastLink.style.cssText;
              yt.className = lastLink.className;

              var don = document.createElement('a');
              don.href = '/donate';
              don.textContent = 'Donate';
              don.style.cssText = lastLink.style.cssText;
              don.className = lastLink.className;

              lastLink.parentElement.appendChild(yt);
              lastLink.parentElement.appendChild(don);
            }
          }
        }
      });

      /* Fix footer bottom bar — centered copyright + Terms & Conditions (match HP/PP) */
      var bottom = footer.querySelector('.p3-footer-bottom');
      if (bottom && bottom.textContent.indexOf('All rights') === -1) {
        bottom.innerHTML = '';
        bottom.style.cssText = 'display:flex;justify-content:center;align-items:center;gap:4px;padding-top:24px;flex-wrap:wrap;';
        var cp = document.createElement('p');
        cp.textContent = '\u00a9 2026 Pulse of Perseverance Project. All rights reserved.';
        cp.style.cssText = 'margin:0;color:rgba(255,255,255,0.4);font-size:12px;';
        bottom.appendChild(cp);
        var tc = document.createElement('a');
        tc.href = '/terms-conditions';
        tc.textContent = 'Terms & Conditions';
        tc.className = 'p3-footer-link';
        tc.style.cssText = 'font-size:12px;text-decoration:underline;color:rgba(255,255,255,0.4);';
        bottom.appendChild(tc);
      }

      /* Inject mobile footer compact layout CSS */
      var fmFtCss = document.createElement('style');
      fmFtCss.textContent = '@media(max-width:768px){' +
        '.p3-footer-grid{display:grid!important;grid-template-columns:1fr 1fr!important;gap:24px 16px!important;}' +
        '.p3-footer-brand{grid-column:1/-1;}' +
        '.p3-footer-bottom{flex-wrap:wrap;justify-content:center;text-align:center;}' +
        '}';
      document.head.appendChild(fmFtCss);
    })();
  }

  /* ── Run ── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
