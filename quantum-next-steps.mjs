export function renderQuantumNextSteps() {
  return `<section class="quantum-next-steps wrap" id="agent-tools" aria-label="Quantum agent tools and personal Trumark link">
    <div class="quantum-calculator-banner">
      <div class="quantum-calculator-symbol" aria-hidden="true"><svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 55h46M14 48V36h8v12m7 0V26h8v22m7 0V16h8v32M11 27 29 15l9 3L54 5M43 5h11v11"/></svg></div>
      <div class="quantum-calculator-copy"><p class="eyebrow">EXPLORE YOUR NEXT MILESTONE</p><h2>Dreams Income &amp;<br><em>Promotion Calculator</em></h2><p>Explore the Group Health calculator and map out your next promotion.</p></div>
      <a class="button quantum-calculator-button" href="https://dbrincomecalc.com/#group-health" target="_blank" rel="noopener noreferrer">Open the calculator <span aria-hidden="true">↗</span></a>
    </div>
    <section class="quantum-client-panel" aria-labelledby="quantum-client-title">
      <div class="quantum-client-intro"><p class="eyebrow">YOUR NEXT EMPLOYER CONVERSATION</p><h2 id="quantum-client-title">Start with one employer conversation.</h2><p>Make your next introduction personal. Add your Dreams agent ID to create a Trumark Health link you can open, copy, and share.</p><a class="button button-gold" id="quantum-client-link" href="https://trumarkhealth.com/?refid=AA0233" target="_blank" rel="noopener noreferrer">Open Trumark Health page <span aria-hidden="true">↗</span></a></div>
      <div class="quantum-personalizer">
        <p class="eyebrow">PERSONALIZE YOUR LINK</p><h3>Your code. Your Trumark page.</h3>
        <form id="quantum-agent-form" novalidate hidden>
          <label for="quantum-agent-id">Dreams agent ID</label><div class="quantum-agent-input-row"><input id="quantum-agent-id" name="agentId" type="text" placeholder="AA1234" maxlength="12" autocomplete="off" autocapitalize="characters" spellcheck="false" aria-describedby="quantum-agent-help quantum-agent-status"><button class="button quantum-save-id" type="submit">Save ID</button></div>
          <p id="quantum-agent-help">Enter AA followed by four digits, or just the four digits. We’ll remember it on this device.</p>
        </form>
        <p class="quantum-agent-status" id="quantum-agent-status" role="status" aria-live="polite">Using the default AA0233 link.</p>
        <label class="quantum-url-label" for="quantum-personal-url">Your Trumark Health link</label><input class="quantum-personal-url" id="quantum-personal-url" type="url" value="https://trumarkhealth.com/?refid=AA0233" readonly>
        <div class="quantum-link-actions"><button class="quantum-copy-link" id="quantum-copy-link" type="button" hidden><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><rect x="8" y="8" width="12" height="13" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/></svg><span>Copy my link</span></button><button class="quantum-clear-id" id="quantum-clear-id" type="button" hidden>Clear saved ID</button></div>
        <noscript><p>Enable JavaScript to personalize your link. The default Trumark Health page is available above.</p></noscript>
      </div>
    </section>
  </section>`;
}
