from pathlib import Path

p = Path(r"C:\main\real_projects\bitcraftly\bitcraftly-platform\src\features\homepage\HomeStory\home-story.css")
text = p.read_text(encoding="utf-8")
start = text.index("/* —— Integrations mesh (premium) —— */")
end = text.index(".hs-compare-wrap {")

new = """/* —— Integrations sync panel (premium) —— */
.hs-section--mesh {
  padding: 0;
  background: transparent;
}

.hs-mesh-stage {
  position: relative;
  isolation: isolate;
  overflow: clip;
  padding: 88px 0;
  background:
    radial-gradient(
      ellipse 55% 50% at 50% 18%,
      color-mix(in srgb, var(--primary) 14%, transparent) 0%,
      transparent 58%
    ),
    radial-gradient(
      ellipse 42% 40% at 8% 88%,
      color-mix(in srgb, var(--primary-end) 9%, transparent) 0%,
      transparent 55%
    ),
    linear-gradient(
      180deg,
      color-mix(in srgb, var(--canvas) 68%, white) 0%,
      var(--canvas) 46%,
      color-mix(in srgb, var(--canvas) 94%, var(--border)) 100%
    );
}

.hs-mesh-stage__glow {
  position: absolute;
  inset: 12% 20% auto;
  height: 42%;
  pointer-events: none;
  background: radial-gradient(
    ellipse at center,
    color-mix(in srgb, var(--primary) 18%, transparent) 0%,
    transparent 70%
  );
  filter: blur(28px);
  opacity: 0.85;
}

.hs-mesh-stage__grid {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.35;
  background-image:
    linear-gradient(color-mix(in srgb, var(--primary) 8%, transparent) 1px, transparent 1px),
    linear-gradient(90deg, color-mix(in srgb, var(--primary) 8%, transparent) 1px, transparent 1px);
  background-size: 48px 48px;
  mask-image: radial-gradient(ellipse 70% 60% at 50% 40%, black 20%, transparent 75%);
}

.hs-mesh-stage::after {
  content: '';
  position: absolute;
  inset: 0;
  opacity: 0.26;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='0.45'/%3E%3C/svg%3E");
  mix-blend-mode: soft-light;
}

.hs-mesh-stage__inner {
  position: relative;
  z-index: 1;
}

.hs-mesh-head {
  max-width: 42rem;
  margin-bottom: 40px;
}

.hs-mesh-head__meta {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 18px;
  max-width: 24rem;
}

.hs-mesh-kicker {
  margin: 0;
  flex-shrink: 0;
  color: var(--hs-primary);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.hs-mesh-head__rule {
  display: block;
  flex: 1 1 auto;
  height: 1px;
  min-width: 40px;
  background: linear-gradient(
    90deg,
    color-mix(in srgb, var(--primary) 55%, transparent),
    color-mix(in srgb, var(--border) 80%, transparent)
  );
}

.hs-mesh-count {
  margin: 0;
  flex-shrink: 0;
  color: var(--hs-muted);
  font-family: var(--font-family-mono), ui-monospace, monospace;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.06em;
}

.hs-mesh-title {
  margin: 0 0 12px;
  font-size: clamp(1.85rem, 3.4vw, 2.75rem);
  font-weight: 800;
  line-height: 1.08;
  letter-spacing: -0.04em;
  color: var(--hs-ink);
  text-wrap: balance;
}

.hs-mesh-title em {
  font-style: normal;
  background: linear-gradient(
    105deg,
    var(--primary) 0%,
    var(--primary-end) 70%,
    color-mix(in srgb, var(--primary) 70%, #7c3aed) 100%
  );
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.hs-mesh-lede {
  margin: 0;
  max-width: 36rem;
  color: var(--hs-muted);
  font-size: 16px;
  font-weight: 500;
  line-height: 1.6;
}

/* Sync panel visual */
.hs-sync {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  align-items: stretch;
  padding: 22px;
  border-radius: 24px;
  border: 1px solid color-mix(in srgb, var(--border) 85%, var(--primary));
  background:
    linear-gradient(
      165deg,
      color-mix(in srgb, white 92%, var(--primary)) 0%,
      color-mix(in srgb, var(--background) 96%, white) 48%,
      color-mix(in srgb, var(--canvas) 90%, white) 100%
    );
  box-shadow:
    0 1px 0 color-mix(in srgb, white 80%, transparent) inset,
    0 24px 48px -28px color-mix(in srgb, var(--primary) 22%, transparent);
}

@media (min-width: 900px) {
  .hs-sync {
    grid-template-columns: minmax(200px, 0.85fr) 56px minmax(0, 1.35fr);
    gap: 8px 12px;
    padding: 28px;
    align-items: center;
  }
}

.hs-sync__core {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 22px 20px 20px;
  border-radius: 20px;
  border: 1px solid color-mix(in srgb, var(--primary) 28%, transparent);
  background: linear-gradient(
    145deg,
    var(--primary) 0%,
    color-mix(in srgb, var(--primary-end) 55%, var(--primary)) 100%
  );
  color: var(--primary-foreground);
  box-shadow:
    0 16px 36px -16px color-mix(in srgb, var(--primary) 55%, transparent),
    0 0 0 1px color-mix(in srgb, white 16%, transparent) inset;
  overflow: hidden;
  min-height: 100%;
}

.hs-sync__core-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 6px;
}

.hs-sync__pulse {
  width: 9px;
  height: 9px;
  border-radius: 999px;
  background: #7dffb3;
  box-shadow: 0 0 0 0 color-mix(in srgb, #7dffb3 55%, transparent);
  animation: hs-sync-live 2s ease-out infinite;
}

.hs-sync__core-live {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  opacity: 0.85;
}

.hs-sync__core-label {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.15;
}

.hs-sync__core-sub {
  margin: 0 0 10px;
  font-size: 13px;
  font-weight: 500;
  opacity: 0.78;
}

.hs-sync__core-stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-top: auto;
}

.hs-sync__core-stats div {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 10px 12px;
  border-radius: 12px;
  background: color-mix(in srgb, white 14%, transparent);
  border: 1px solid color-mix(in srgb, white 18%, transparent);
}

.hs-sync__core-stats strong {
  font-size: 18px;
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.1;
}

.hs-sync__core-stats span {
  font-size: 11px;
  font-weight: 500;
  opacity: 0.75;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.hs-sync__core-bar {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 3px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    color-mix(in srgb, white 70%, transparent) 40%,
    transparent 100%
  );
  background-size: 200% 100%;
  animation: hs-sync-bar 2.8s linear infinite;
}

.hs-sync__bridge {
  display: none;
  position: relative;
  height: 100%;
  min-height: 120px;
  align-items: center;
  justify-content: center;
}

@media (min-width: 900px) {
  .hs-sync__bridge {
    display: flex;
  }
}

.hs-sync__bridge-line {
  position: absolute;
  left: 50%;
  top: 12%;
  bottom: 18%;
  width: 2px;
  margin-left: -1px;
  border-radius: 999px;
  background: linear-gradient(
    180deg,
    color-mix(in srgb, var(--primary) 55%, transparent),
    color-mix(in srgb, var(--primary) 18%, transparent)
  );
}

.hs-sync__bridge-packet {
  position: absolute;
  left: 50%;
  top: 18%;
  width: 8px;
  height: 8px;
  margin-left: -4px;
  border-radius: 999px;
  background: var(--primary);
  box-shadow: 0 0 12px color-mix(in srgb, var(--primary) 55%, transparent);
  animation: hs-sync-packet 2.2s ease-in-out infinite;
}

.hs-sync__bridge-packet--late {
  animation-delay: 1.1s;
}

.hs-sync__bridge-label {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  color: var(--hs-muted);
  font-family: var(--font-family-mono), ui-monospace, monospace;
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.hs-sync__channels {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.hs-sync__channel {
  display: grid;
  grid-template-columns: 10px minmax(0, 1fr) auto auto;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  border-radius: 14px;
  border: 1px solid color-mix(in srgb, var(--primary) 16%, var(--border));
  background:
    linear-gradient(
      180deg,
      color-mix(in srgb, white 90%, var(--primary)) 0%,
      color-mix(in srgb, var(--primary) 5%, white) 100%
    );
  box-shadow: 0 8px 20px -16px color-mix(in srgb, var(--primary) 30%, transparent);
  transition:
    transform var(--duration-fast) var(--ease-out),
    border-color var(--duration-fast) var(--ease-out);
}

.hs-sync__channel:hover {
  transform: translateX(3px);
  border-color: color-mix(in srgb, var(--primary) 40%, var(--border));
}

.hs-sync__channel-mark {
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: var(--primary);
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--primary) 14%, transparent);
}

.hs-sync__channel-copy {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.hs-sync__channel-copy strong {
  color: var(--hs-ink);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: -0.01em;
}

.hs-sync__channel-copy span {
  color: var(--hs-muted);
  font-size: 11px;
  line-height: 1.3;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.hs-sync__channel-lag {
  color: var(--hs-muted);
  font-family: var(--font-family-mono), ui-monospace, monospace;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.02em;
}

.hs-sync__channel-status {
  padding: 4px 9px;
  border-radius: 999px;
  background: color-mix(in srgb, #16a34a 12%, white);
  color: #15803d;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

@keyframes hs-sync-live {
  0% {
    box-shadow: 0 0 0 0 color-mix(in srgb, #7dffb3 50%, transparent);
  }
  70% {
    box-shadow: 0 0 0 8px transparent;
  }
  100% {
    box-shadow: 0 0 0 0 transparent;
  }
}

@keyframes hs-sync-bar {
  0% {
    background-position: 100% 0;
  }
  100% {
    background-position: -100% 0;
  }
}

@keyframes hs-sync-packet {
  0% {
    top: 14%;
    opacity: 0;
  }
  12% {
    opacity: 1;
  }
  88% {
    opacity: 1;
  }
  100% {
    top: 78%;
    opacity: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hs-sync__pulse,
  .hs-sync__core-bar,
  .hs-sync__bridge-packet {
    animation: none !important;
  }

  .hs-sync__bridge-packet {
    display: none;
  }

  .hs-sync__channel:hover {
    transform: none;
  }
}

"""

p.write_text(text[:start] + new + text[end:], encoding="utf-8")
print("ok", end - start)
