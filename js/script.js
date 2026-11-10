const envelopeStage = document.getElementById("envelopeStage");
const weddingMusic = new Audio("assets/good_b_music-romantic-violin-waltz-real-violin-497682.mp3.mpeg");
weddingMusic.preload = "auto";
weddingMusic.volume = 0.3;
const weddingSite = document.getElementById("weddingSite");
const rsvpDialog = document.getElementById("rsvpDialog");
const rsvpForm = document.getElementById("rsvpForm");
const rsvpSubmit = document.getElementById("rsvpSubmit");
const rsvpStatus = document.getElementById("rsvpStatus");
const rsvpResponseFrame = document.querySelector(".rsvp-response-frame");

const RSVP_WEB_APP_URL = "https://script.google.com/macros/s/AKfycbySVHcf78RH002ltfDlGjFjP-9m8k9TsLzSGL5bDLYdntnr_YPDfUVAoWzcq_mt2cvz/exec";

document.getElementById("openRsvpForm")?.addEventListener("click", () => {
    rsvpDialog?.showModal();
});

document.getElementById("closeRsvpForm")?.addEventListener("click", () => {
    rsvpDialog?.close();
});

rsvpDialog?.addEventListener("click", (event) => {
    if (event.target === rsvpDialog) {
        rsvpDialog.close();
    }
});

if (RSVP_WEB_APP_URL && rsvpForm && rsvpSubmit && rsvpStatus && rsvpResponseFrame) {
    let awaitingResponse = false;

    rsvpForm.action = RSVP_WEB_APP_URL;
    rsvpSubmit.disabled = false;
    rsvpStatus.textContent = "Eure Rückmeldung wird sicher in unserer Gästeliste erfasst.";

    rsvpForm.addEventListener("submit", () => {
        awaitingResponse = true;
        rsvpSubmit.disabled = true;
        rsvpStatus.textContent = "Eure Rückmeldung wird übermittelt …";
    });

    rsvpResponseFrame.addEventListener("load", () => {
        if (!awaitingResponse) return;

        awaitingResponse = false;
        rsvpForm.reset();
        rsvpSubmit.disabled = false;
        rsvpStatus.textContent = "Vielen Dank! Eure Rückmeldung wurde übermittelt.";
    });
}

function openEnvelope() {
    if (envelopeStage.classList.contains("is-open")) {
        return;
    }

    weddingMusic.play().catch(() => {});
    envelopeStage.classList.add("is-open");
    weddingSite.setAttribute("aria-hidden", "false");

    window.setTimeout(() => {
        document.body.classList.add("site-visible");
        weddingSite.focus({ preventScroll: true });
    }, 900);
}

envelopeStage.addEventListener("click", openEnvelope);

const travelSection = document.getElementById("anreise");
const travelPlane = travelSection?.querySelector(".travel-plane");

if (travelPlane) {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion || !("IntersectionObserver" in window)) {
        travelPlane.classList.add("is-visible");
    } else {
        const planeObserver = new IntersectionObserver((entries, observer) => {
            for (const entry of entries) {
                if (entry.isIntersecting) {
                    travelPlane.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            }
        }, {
            root: weddingSite,
            threshold: 0.2
        });

        planeObserver.observe(travelPlane);
    }
}
