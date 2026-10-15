const replayUrl = 'https://us06web.zoom.us/rec/share/iO5larKYkaMxQmqgCVHN2oxxaAtSzZb7wowXVWgTKdrmU7OQHprH1KfyKDquyESY.9x-wlNl-Q42eeeU7?startTime=1771948203000';
const replayTitle = 'Quantum Fully Insured 125 Payroll Tax Update — With Jeff Kropholler, CEO of Quantum (02/24/26)';
const symbols = {
  start: '<path d="M13 3 4 14h7l-1 7 10-12h-7l1-6Z"/>',
  quiz: '<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V2h6v2M8 11l2 2 5-5M9 17h6"/>',
  voices: '<path d="M21 11a8 8 0 0 1-8 8H6l-4 3V11a9 9 0 0 1 18 0Z"/><path d="M7 10h.01M12 10h.01M17 10h.01"/>',
  copy: '<rect x="8" y="8" width="12" height="13" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/>',
};
const icon = name => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${symbols[name]}</svg>`;
const resources = [
  {
    icon: 'start', label: 'YOUR FIRST STEP', title: 'Get Started with Trumark Health',
    copy: 'Open the getting-started course and begin your Trumark Health training.',
    cta: 'Get started', url: 'https://training.dreamsresources.net/products/3e77e554-4459-4abb-b5b0-01da5d0d45d3?source=courses',
  },
  {
    icon: 'quiz', label: 'LEARN & CHECK YOUR KNOWLEDGE', title: 'Trumark Training & Quiz',
    copy: 'Continue your training and put your knowledge to the test.',
    cta: 'Open training & quiz', url: 'https://training.dreamsresources.net/products/aafcd83a-545c-4139-9868-87373361758e?source=courses',
  },
  {
    icon: 'voices', label: 'HEAR THEIR PERSPECTIVES', title: 'Quantum Testimonials',
    copy: 'Explore the experiences shared on Quantum’s official testimonials page.',
    cta: 'Explore testimonials', url: 'https://quantumhb.com/testimonials/',
  },
];

export function renderQuantumTraining() {
  return `<section class="section quantum-training" id="training" aria-labelledby="quantum-training-title">
    <div class="wrap">
      <div class="section-heading">
        <div><p class="eyebrow">THE QUANTUM TRAINING ROOM</p><h2 id="quantum-training-title">Get ready for<br><em>your next conversation.</em></h2></div>
        <p>Your replay, training courses, and testimonials in one place. Start here before your first employer presentation.</p>
      </div>
      <article class="quantum-replay" aria-labelledby="quantum-replay-title">
        <div class="quantum-replay-art" aria-hidden="true">
          <span class="quantum-replay-art-label">QUANTUM HEALTH BENEFITS</span>
          <div class="quantum-play-orbit"><span class="quantum-play-mark"><svg viewBox="0 0 48 48" fill="currentColor"><path d="M18 12a2 2 0 0 1 3-1.7l19 12a2 2 0 0 1 0 3.4l-19 12A2 2 0 0 1 18 36Z"/></svg></span></div>
          <div class="quantum-art-caption"><span>THE REPLAY</span><strong>Prepare.<br>Present with purpose.</strong></div>
          <div class="quantum-art-wave">${Array.from({ length: 23 }, (_, i) => `<i style="--bar:${18 + ((i * 19) % 47)}%"></i>`).join('')}</div>
        </div>
        <div class="quantum-replay-content">
          <div class="quantum-replay-meta"><span class="quantum-watch-badge"><span aria-hidden="true">▶</span> WATCH FIRST</span><span>ZOOM REPLAY <span aria-hidden="true">/</span> <time datetime="2026-02-24">02/24/26</time></span></div>
          <h3 id="quantum-replay-title">Quantum Fully Insured<br>125 Payroll Tax Update</h3>
          <p class="quantum-replay-speaker">With <strong>Jeff Kropholler</strong>, CEO of Quantum</p>
          <p class="quantum-replay-priority"><span aria-hidden="true">✦</span> Must-watch before your first employer presentation</p>
          <div class="quantum-passcode-row"><div><span class="quantum-passcode-label">REPLAY PASSCODE</span><code id="quantum-replay-passcode">@uAPzZ1F</code></div><button class="quantum-copy-passcode" id="quantum-copy-passcode" type="button" aria-label="Copy replay passcode" hidden>${icon('copy')}<span>Copy passcode</span></button></div>
          <p class="quantum-copy-status" id="quantum-copy-status" role="status" aria-live="polite"></p>
          <a class="button quantum-replay-cta" href="${replayUrl}" target="_blank" rel="noopener noreferrer" aria-label="Watch ${replayTitle}">Watch the replay <span aria-hidden="true">↗</span></a>
          <span class="quantum-replay-note">Opens in Zoom · Use the passcode above</span>
        </div>
      </article>
      <div class="quantum-training-resources">${resources.map((resource, i) => `
        <a class="quantum-training-card" href="${resource.url}" target="_blank" rel="noopener noreferrer">
          <div class="quantum-training-card-top"><span class="quantum-training-icon">${icon(resource.icon)}</span><span class="quantum-training-number">0${i + 1}</span></div>
          <p class="quantum-training-label">${resource.label}</p><h3>${resource.title}</h3><p class="quantum-training-description">${resource.copy}</p>
          <span class="quantum-training-card-link">${resource.cta}<span aria-hidden="true">↗</span></span>
        </a>`).join('')}
      </div>
    </div>
  </section>`;
}
