(function () {
  /**
   * Phase A: Stripe Payment Links (set per region). Phase B+: Appwrite Function → Checkout Session.
   * @see docs/stripe-appwrite-phase-b.md
   */
  var PUREBIO = {
    checkoutCartUrl: "",
    /** Stripe Payment Link — Australia / default (e.g. https://buy.stripe.com/...) */
    stripePaymentLinkAu: "",
    /** Stripe Payment Link — international */
    stripePaymentLinkIntl: "",
    regionStorageKey: "purebio-region",
    geoChoiceKey: "purebio-geo-country",
  };

  var header = document.querySelector("[data-header]");
  var toggle = document.querySelector("[data-nav-toggle]");
  var mobileNav = document.querySelector("[data-mobile-nav]");
  var yearEl = document.querySelector("[data-year]");

  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  function onScroll() {
    if (!header) return;
    if (window.scrollY > 12) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (toggle && mobileNav) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      if (open) {
        mobileNav.setAttribute("hidden", "");
      } else {
        mobileNav.removeAttribute("hidden");
      }
    });
  }

  function getQueryParam(name) {
    var params = new URLSearchParams(window.location.search);
    return params.get(name);
  }

  function captureCampaignParams() {
    var keys = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];
    var out = {};
    var has = false;
    keys.forEach(function (k) {
      var v = getQueryParam(k);
      if (v) {
        out[k] = v;
        has = true;
      }
    });
    if (has) {
      try {
        sessionStorage.setItem("purebio-campaign", JSON.stringify(out));
      } catch (e) {
        /* ignore */
      }
    }
  }

  function getStoredRegion() {
    try {
      return localStorage.getItem(PUREBIO.regionStorageKey);
    } catch (e) {
      return null;
    }
  }

  function setStoredRegion(region) {
    try {
      localStorage.setItem(PUREBIO.regionStorageKey, region);
    } catch (e) {
      /* ignore */
    }
  }

  function normalizeRegion(raw) {
    if (!raw) return "au";
    var v = String(raw).toLowerCase();
    if (v === "intl" || v === "international" || v === "int") return "intl";
    return "au";
  }

  function getInitialRegion() {
    var q = getQueryParam("region");
    if (q) return normalizeRegion(q);
    return normalizeRegion(getStoredRegion());
  }

  function getActiveRegion() {
    return normalizeRegion(document.documentElement.getAttribute("data-region") || "au");
  }

  function setRegion(region) {
    var r = normalizeRegion(region);
    setStoredRegion(r);
    document.documentElement.setAttribute("data-region", r);
    applyRegionToDom(r);
    syncRegionButtons(r);
    syncCheckoutLinks();
    updateModalPrice();
  }

  function syncRegionButtons(active) {
    var buttons = document.querySelectorAll("[data-region]");
    buttons.forEach(function (btn) {
      var r = btn.getAttribute("data-region");
      var isActive = r === active;
      btn.classList.toggle("is-active", isActive);
      btn.setAttribute("aria-pressed", isActive ? "true" : "false");
    });
  }

  function applyRegionToDom(region) {
    var auNote = document.querySelector("[data-shipping-note-au]");
    var intlNote = document.querySelector("[data-shipping-note-intl]");
    if (auNote) auNote.hidden = region !== "au";
    if (intlNote) intlNote.hidden = region !== "intl";

    var labels = document.querySelectorAll("[data-region-label]");
    labels.forEach(function (el) {
      el.textContent = region === "intl" ? "International" : "Australia";
    });

    var footer = document.querySelector("[data-footer-region]");
    if (footer) {
      footer.textContent =
        region === "intl" ? "Shipping: International (duties may apply)" : "Shipping: Australia";
    }

    var subCopy = document.querySelector("[data-sub-copy]");
    if (subCopy) {
      subCopy.textContent =
        region === "intl"
          ? "Global shipping — subscribe options vary by region"
          : "Subscribe & save available in Australia";
    }

    var offerFrom = document.querySelector("[data-offer-from]");
    if (offerFrom) {
      offerFrom.textContent = region === "intl" ? "From $52 USD*" : "From $79 AUD*";
    }

    var footnote = document.querySelector("[data-offer-footnote]");
    if (footnote) {
      footnote.textContent =
        region === "intl"
          ? "* Illustrative USD; currency and duties confirmed at checkout."
          : "* Launch pricing and currency confirmed at checkout. International orders may display in local currency.";
    }
  }

  function getStripePaymentLink() {
    var r = getActiveRegion();
    var au = PUREBIO.stripePaymentLinkAu && String(PUREBIO.stripePaymentLinkAu).trim();
    var intl = PUREBIO.stripePaymentLinkIntl && String(PUREBIO.stripePaymentLinkIntl).trim();
    var base = r === "intl" ? intl || au : au || intl;
    if (!base) return "";
    return appendCampaignToUrl(base);
  }

  function appendCampaignToUrl(url) {
    var raw = "";
    try {
      raw = sessionStorage.getItem("purebio-campaign") || "";
    } catch (e) {
      return url;
    }
    if (!raw) return url;
    var data;
    try {
      data = JSON.parse(raw);
    } catch (e) {
      return url;
    }
    var u;
    try {
      u = new URL(url, window.location.origin);
    } catch (e) {
      return url;
    }
    Object.keys(data).forEach(function (k) {
      if (!u.searchParams.has(k)) {
        u.searchParams.set(k, data[k]);
      }
    });
    return u.toString();
  }

  function syncCheckoutLinks() {
    var url = PUREBIO.checkoutCartUrl && String(PUREBIO.checkoutCartUrl).trim();
    var stripeUrl = getStripePaymentLink();
    var target = stripeUrl || url;
    var ctas = document.querySelectorAll("[data-checkout-cta]");
    ctas.forEach(function (a) {
      if (target && a.tagName === "A") {
        a.setAttribute("href", target);
        a.setAttribute("rel", "noopener noreferrer");
      } else if (!target && a.tagName === "A") {
        a.setAttribute("href", "#offer");
        a.removeAttribute("rel");
      }
    });
  }

  function bindRegionControls() {
    var buttons = document.querySelectorAll("[data-region]");
    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var r = btn.getAttribute("data-region");
        setRegion(r);
        var params = new URLSearchParams(window.location.search);
        params.set("region", r === "intl" ? "intl" : "au");
        var next =
          window.location.pathname +
          (params.toString() ? "?" + params.toString() : "") +
          window.location.hash;
        window.history.replaceState({}, "", next);
      });
    });
  }

  /* —— Checkout modal —— */
  var modal = document.getElementById("checkout-modal");
  var modalCloseEls = modal ? modal.querySelectorAll("[data-checkout-modal-close]") : [];
  var openEls = document.querySelectorAll("[data-open-checkout]");
  var lastFocus = null;

  function updateModalPrice() {
    var el = document.querySelector("[data-modal-price]");
    if (!el) return;
    el.textContent = getActiveRegion() === "intl" ? "From $52 USD*" : "From $79 AUD*";
  }

  function openCheckoutModal() {
    if (!modal) return;
    lastFocus = document.activeElement;
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    var dialog = modal.querySelector(".checkout-modal__dialog");
    var focusTarget = modal.querySelector("[data-checkout-modal-close]");
    if (focusTarget) focusTarget.focus();

    function onKey(ev) {
      if (ev.key === "Escape") {
        ev.preventDefault();
        closeCheckoutModal();
      }
      if (ev.key !== "Tab" || !dialog) return;
      var focusables = dialog.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      var list = Array.prototype.slice.call(focusables).filter(function (n) {
        return !n.hasAttribute("disabled") && n.offsetParent !== null;
      });
      if (list.length === 0) return;
      var first = list[0];
      var last = list[list.length - 1];
      if (ev.shiftKey && document.activeElement === first) {
        ev.preventDefault();
        last.focus();
      } else if (!ev.shiftKey && document.activeElement === last) {
        ev.preventDefault();
        first.focus();
      }
    }

    modal._onKey = onKey;
    document.addEventListener("keydown", onKey);
    updateModalPrice();
    var cont = document.getElementById("checkout-continue");
    var link = getStripePaymentLink();
    var missing = modal.querySelector("[data-stripe-missing]");
    if (missing) missing.hidden = !!link;
    if (cont) {
      if (link) {
        cont.setAttribute("href", link);
        cont.removeAttribute("aria-disabled");
      } else {
        cont.setAttribute("href", "#");
        cont.setAttribute("aria-disabled", "true");
      }
    }
  }

  function closeCheckoutModal() {
    if (!modal) return;
    modal.hidden = true;
    document.body.style.overflow = "";
    if (modal._onKey) {
      document.removeEventListener("keydown", modal._onKey);
      modal._onKey = null;
    }
    if (lastFocus && typeof lastFocus.focus === "function") {
      lastFocus.focus();
    }
  }

  openEls.forEach(function (el) {
    el.addEventListener("click", function (e) {
      e.preventDefault();
      openCheckoutModal();
    });
  });

  modalCloseEls.forEach(function (el) {
    el.addEventListener("click", function () {
      closeCheckoutModal();
    });
  });

  if (modal) {
    modal.addEventListener("click", function (e) {
      if (e.target === modal) {
        closeCheckoutModal();
      }
    });
  }

  var continueBtn = document.getElementById("checkout-continue");
  if (continueBtn) {
    continueBtn.addEventListener("click", function (e) {
      if (!getStripePaymentLink()) {
        e.preventDefault();
      }
    });
  }

  /* —— Hero style selector (A / C) —— */
  function initHeroModeSelector() {
    var select = document.querySelector("[data-hero-mode-select]");
    var heroImg = document.getElementById("hero-media-image");
    var proofLabel = document.getElementById("hero-proof-label");
    var proofTitle = document.getElementById("hero-proof-title");
    var proofMeta = document.getElementById("hero-proof-meta");

    if (!select || !heroImg) return;

    var variants = {
      a: {
        src: "images/hero-essential-studio.png",
        fallback: "images/range-essential-card.png",
        alt: "PureBiome Essential prebiotic fibre range staged in a clean studio setting",
        label: "Built for results and consistency",
        title: "One daily ritual. Cleaner digestion. Better routine adherence.",
        meta: "Essential tubs and sachets, with Pro options for targeted support.",
      },
      c: {
        src: "images/photo-tub-clean.png",
        fallback: "images/range-pro-card.png",
        alt: "PureBiome product concept with clean motion-style visual treatment",
        label: "Product motion concept",
        title: "A dynamic visual option for testing engagement above the fold.",
        meta: "Use this mode for A/B testing while retaining premium, clinical styling.",
      },
    };

    function applyVariant(key) {
      var id = variants[key] ? key : "a";
      var variant = variants[id];
      heroImg.onerror = function () {
        this.onerror = null;
        this.src = variant.fallback;
      };
      heroImg.src = variant.src;
      heroImg.alt = variant.alt;
      if (proofLabel) proofLabel.textContent = variant.label;
      if (proofTitle) proofTitle.textContent = variant.title;
      if (proofMeta) proofMeta.textContent = variant.meta;
    }

    select.addEventListener("change", function () {
      applyVariant(select.value);
    });

    applyVariant(select.value || "a");
  }

  /* —— GEO bar —— */
  var GEO_ALT = {
    IE: { code: "GB", name: "United Kingdom" },
    GB: { code: "IE", name: "Ireland" },
    AU: { code: "NZ", name: "New Zealand" },
    NZ: { code: "AU", name: "Australia" },
    US: { code: "CA", name: "Canada" },
    CA: { code: "US", name: "United States" },
  };

  function geoStorageGet(key) {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      return null;
    }
  }

  function geoStorageSet(key, val) {
    try {
      localStorage.setItem(key, val);
    } catch (e) {
      /* ignore */
    }
  }

  function initGeoBar() {
    var bar = document.querySelector("[data-geo-bar]");
    if (!bar) return;
    var primaryBtn = bar.querySelector("[data-geo-primary]");
    var altBtn = bar.querySelector("[data-geo-alt]");
    var msg = bar.querySelector("[data-geo-detected]");

    function pick(countryCode) {
      geoStorageSet(PUREBIO.geoChoiceKey, countryCode);
      bar.hidden = true;
      document.body.classList.remove("has-geo-bar");
      if (countryCode === "AU") setRegion("au");
      else setRegion("intl");
    }

    function showBar(code, name) {
      var c = (code || "AU").toUpperCase();
      var n = name || (c === "AU" ? "Australia" : "International");
      var alt = GEO_ALT[c] || { code: c === "AU" ? "NZ" : "AU", name: c === "AU" ? "New Zealand" : "Australia" };

      if (msg) msg.textContent = n;
      if (primaryBtn) {
        primaryBtn.textContent = n;
        primaryBtn.onclick = function () {
          pick(c);
        };
      }
      if (altBtn) {
        altBtn.hidden = false;
        altBtn.textContent = alt.name;
        altBtn.onclick = function () {
          pick(alt.code);
        };
      }
      bar.hidden = false;
      document.body.classList.add("has-geo-bar");
    }

    // Always render a usable bar first; geolocation refines labels afterwards.
    showBar(getActiveRegion() === "au" ? "AU" : "NZ", getActiveRegion() === "au" ? "Australia" : "International");

    fetch("https://ipapi.co/json/", { credentials: "omit" })
      .then(function (r) {
        if (!r.ok) throw new Error("geo");
        return r.json();
      })
      .then(function (data) {
        var code = (data.country_code || "").toUpperCase();
        var name = data.country_name || code;
        if (!code) throw new Error("nocode");
        showBar(code, name);
      })
      .catch(function () {
        /* keep fallback bar visible */
      });

    var dismiss = bar.querySelector("[data-geo-dismiss]");
    if (dismiss) {
      dismiss.addEventListener("click", function () {
        bar.hidden = true;
        document.body.classList.remove("has-geo-bar");
      });
    }
  }

  PUREBIO.applyCheckout = function () {
    syncCheckoutLinks();
  };

  PUREBIO.getStripePaymentLink = getStripePaymentLink;

  captureCampaignParams();
  bindRegionControls();
  setRegion(getInitialRegion());
  initHeroModeSelector();
  initGeoBar();

  window.PUREBIO = PUREBIO;
})();
