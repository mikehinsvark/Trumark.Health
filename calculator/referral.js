/* Carry the DREAMS rep from the shared calculator URL to both booking links. */
(() => {
  'use strict';
  const value = (new URLSearchParams(window.location.search).get('refid') || '').trim().toUpperCase();
  const candidate = /^\d{4}$/.test(value) ? 'AA' + value : value;
  const repCode = /^AA\d{4}$/.test(candidate) ? candidate : 'AA0233';
  document.querySelectorAll('[data-booking-referral]').forEach(link => {
    const booking = new URL(link.getAttribute('href'));
    booking.searchParams.set('refid', repCode);
    link.href = booking.toString();
  });
})();
