document.addEventListener("DOMContentLoaded", () => {

  /* =========================================
     ELEMENTS
  ========================================= */

  const menuToggle =
    document.querySelector("#menuToggle");

  const mobileMenu =
    document.querySelector("#mobileMenu");

  const mobileLinks =
    document.querySelectorAll(
      "#mobileMenu a"
    );

  const revealElements =
    document.querySelectorAll(".reveal, .slide-in");

  const hero =
    document.querySelector(".hero");

  const heroArt =
    document.querySelector(".hero-art");

  const sun =
    document.querySelector(".sun");

  const header =
    document.querySelector(".header");


  /* =========================================
     MOBILE MENU
  ========================================= */

  if (menuToggle && mobileMenu) {

    menuToggle.addEventListener(
      "click",
      () => {

        const isOpen =
          mobileMenu.classList.toggle("open");

        menuToggle.innerHTML =
          isOpen
            ? 'CLOSE <span>×</span>'
            : 'MENU <span>+</span>';

        menuToggle.setAttribute(
          "aria-expanded",
          String(isOpen)
        );

      }
    );


    mobileLinks.forEach((link) => {

      link.addEventListener(
        "click",
        () => {

          mobileMenu.classList.remove(
            "open"
          );

          menuToggle.innerHTML =
            'MENU <span>+</span>';

          menuToggle.setAttribute(
            "aria-expanded",
            "false"
          );

        }
      );

    });

  }


  /* =========================================
     SCROLL REVEAL
  ========================================= */

  if (
    revealElements.length &&
    "IntersectionObserver" in window
  ) {

    const observer =
      new IntersectionObserver(
        (entries) => {

          entries.forEach((entry) => {

            if (entry.isIntersecting) {

              entry.target.classList.add(
                "visible"
              );

              observer.unobserve(
                entry.target
              );

            }

          });

        },
        {
          threshold: 0.12
        }
      );


    revealElements.forEach(
      (element) => {

        observer.observe(element);

      }
    );

  } else {

    /*
      Fallback cho browser cũ
      hoặc trường hợp IntersectionObserver
      không khả dụng.
    */

    revealElements.forEach(
      (element) => {

        element.classList.add(
          "visible"
        );

      }
    );

  }


  /* =========================================
     HERO PARALLAX
  ========================================= */

  const supportsHover =
    window.matchMedia(
      "(hover: hover)"
    ).matches;


  if (
    hero &&
    heroArt &&
    sun &&
    supportsHover
  ) {

    hero.addEventListener(
      "mousemove",
      (event) => {

        const rect =
          hero.getBoundingClientRect();

        const x =
          (event.clientX - rect.left)
          / rect.width
          - 0.5;

        const y =
          (event.clientY - rect.top)
          / rect.height
          - 0.5;


        /*
          HERO ART

          Không có animation transform
          nên có thể dùng transform trực tiếp.
        */

        heroArt.style.transform =
          `translate(
            ${x * 16}px,
            ${y * 12}px
          )`;


        /*
          SUN

          KHÔNG dùng sun.style.transform.

          Lý do:
          .sun đang có animation sunPulse
          cũng sử dụng transform.

          Nếu JS dùng transform thì nó sẽ
          ghi đè animation pulse.

          Vì vậy dùng margin để tạo parallax.
        */

        sun.style.marginLeft =
          `${x * -20}px`;

        sun.style.marginTop =
          `${y * -15}px`;

      }
    );


    hero.addEventListener(
      "mouseleave",
      () => {

        heroArt.style.transform = "";

        sun.style.marginLeft = "";

        sun.style.marginTop = "";

      }
    );

  }


  /* =========================================
     HEADER SCROLL EFFECT
  ========================================= */

  if (header) {

    const updateHeader =
      () => {

        header.classList.toggle(
          "scrolled",
          window.scrollY > 50
        );

      };


    window.addEventListener(
      "scroll",
      updateHeader,
      {
        passive: true
      }
    );


    /*
      Chạy một lần ngay khi load
      để trạng thái header chính xác.
    */

    updateHeader();

  }


  /* =========================================
     AVATAR HUB + INFO PANEL
  ========================================= */

  /*
    ✏️ SỬA NỘI DUNG Ở ĐÂY
    Mỗi mục là một dòng trong danh sách.
    Thêm / bớt dòng thoải mái.
  */

  const TOPICS = {
    hobbies: {
      index: "01",
      tag: "HOBBIES",
      title: "SỞ THÍCH",
      lines: [
        "Mày mò thiết kế poster & typography",
        "Dựng 3D bằng Blender lúc rảnh",
        "Nghe nhạc, cày game, xem anime",
        "Sưu tầm giao diện web đẹp để ngắm"
      ]
    },
    strengths: {
      index: "02",
      tag: "STRENGTHS",
      title: "ƯU ĐIỂM",
      lines: [
        "Tò mò, thích thử cái mới",
        "Có gu thẩm mỹ riêng",
        "Chịu khó mày mò tới khi ra kết quả",
        "Vô hại (thật)"
      ]
    },
    weaknesses: {
      index: "03",
      tag: "WEAKNESSES",
      title: "NHƯỢC ĐIỂM",
      lines: [
        "Hay trì hoãn (tên web là LƯỜI mà)",
        "Mê chi tiết nhỏ nên làm hơi lâu",
        "Đôi khi bắt đầu nhiều hơn hoàn thành"
      ]
    },
    goals: {
      index: "04",
      tag: "GOALS",
      title: "MỤC TIÊU",
      lines: [
        "Hoàn thiện portfolio cá nhân",
        "Thành thạo Blender & Graphic Design",
        "Làm được ít nhất 10 dự án để khoe"
      ]
    },
    direction: {
      index: "05",
      tag: "DIRECTION",
      title: "ĐỊNH HƯỚNG",
      lines: [
        "Đi theo hướng thiết kế sáng tạo & tương tác",
        "Kết hợp design + code + motion",
        "Xây một phong cách riêng, nhận ra ngay"
      ]
    }
  };

  const TOPIC_ORDER = [
    "hobbies", "strengths", "weaknesses", "goals", "direction"
  ];


  const hub = document.querySelector("#avatarHub");
  const avatarBtn = document.querySelector("#avatarBtn");
  const hubItems = document.querySelectorAll(".hub-item");

  const panel = document.querySelector("#infoPanel");
  const panelIndex = document.querySelector("#panelIndex");
  const panelTag = document.querySelector("#panelTag");
  const panelTitle = document.querySelector("#panelTitle");
  const panelTabs = document.querySelector("#panelTabs");
  const panelBody = document.querySelector("#panelBody");
  const panelCloseEls = document.querySelectorAll("[data-close]");

  let lastTrigger = null;


  /* ---------- Hub open / close ---------- */

  const setHub = (open) => {

    hub.classList.toggle("open", open);

    avatarBtn.setAttribute(
      "aria-expanded",
      String(open)
    );

  };


  /* ---------- Panel ---------- */

  const renderPanel = (key) => {

    const topic = TOPICS[key];

    if (!topic) return;

    panelIndex.textContent = topic.index;
    panelTag.textContent = topic.tag;
    panelTitle.textContent = topic.title;

    panelTabs.innerHTML = "";

    TOPIC_ORDER.forEach((k) => {

      const tab = document.createElement("button");

      tab.type = "button";
      tab.textContent = TOPICS[k].index;
      tab.title = TOPICS[k].title;
      tab.className = k === key ? "active" : "";

      tab.setAttribute(
        "aria-label",
        TOPICS[k].title
      );

      tab.addEventListener("click", () => {
        renderPanel(k);
      });

      panelTabs.appendChild(tab);

    });

    panelBody.innerHTML = "";

    topic.lines.forEach((text, i) => {

      const li = document.createElement("li");

      li.style.setProperty("--d", `${i * 80}ms`);

      const num = document.createElement("span");
      num.textContent = String(i + 1).padStart(2, "0");

      const p = document.createElement("p");
      p.textContent = text;

      li.append(num, p);
      panelBody.appendChild(li);

    });

  };


  const openPanel = (key, trigger) => {

    lastTrigger = trigger || null;

    renderPanel(key);

    panel.classList.add("open");
    panel.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";

    panel.querySelector(".panel-close").focus();

  };


  const closePanel = () => {

    panel.classList.remove("open");
    panel.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";

    if (lastTrigger) lastTrigger.focus();

  };


  /* ---------- Events ---------- */

  if (hub && avatarBtn && panel) {

    avatarBtn.addEventListener("click", () => {

      setHub(!hub.classList.contains("open"));

    });


    hubItems.forEach((item) => {

      item.addEventListener("click", () => {

        openPanel(item.dataset.topic, item);

      });

    });


    panelCloseEls.forEach((el) => {

      el.addEventListener("click", closePanel);

    });


    document.addEventListener("keydown", (event) => {

      if (event.key !== "Escape") return;

      if (panel.classList.contains("open")) {

        closePanel();

      } else if (hub.classList.contains("open")) {

        setHub(false);

        avatarBtn.focus();

      }

    });


    /* Bấm ra ngoài thì thu menu lại */

    document.addEventListener("click", (event) => {

      if (
        hub.classList.contains("open") &&
        !panel.classList.contains("open") &&
        !hub.contains(event.target)
      ) {
        setHub(false);
      }

    });

  }


  /* =========================================
     MUSIC PLAYER
     Bỏ file vào thư mục music/ đúng tên bên dưới.
     Thiếu bài nào thì tự bỏ qua, hết danh sách thì lặp lại.
  ========================================= */

  const PLAYLIST = [
    { src: "music/track-01.mp3", title: "TRACK 01" },
    { src: "music/track-02.mp3", title: "TRACK 02" },
    { src: "music/track-03.mp3", title: "TRACK 03" },
    { src: "music/track-04.mp3", title: "TRACK 04" },
    { src: "music/track-05.mp3", title: "TRACK 05" }
  ];

  const audio = document.querySelector("#bgm");
  const music = document.querySelector("#music");
  const musicToggle = document.querySelector("#musicToggle");
  const musicNext = document.querySelector("#musicNext");
  const musicTitle = document.querySelector("#musicTitle");

  if (audio && music) {

    const missing = new Set();
    let cur = 0;
    let want = true;

    try { want = localStorage.getItem("bgm") !== "off"; } catch (e) {}

    audio.volume = 0.5;

    const setUI = (playing, text) => {
      music.classList.toggle("playing", playing);
      musicToggle.setAttribute("aria-pressed", String(playing));
      musicTitle.textContent = text ||
        (playing ? "♪ " + PLAYLIST[cur].title : "MUSIC OFF");
    };

    const nextIdx = (from) => {
      for (let k = 1; k <= PLAYLIST.length; k++) {
        const j = (from + k) % PLAYLIST.length;
        if (!missing.has(j)) return j;
      }
      return -1;
    };

    const load = (i) => { cur = i; audio.src = PLAYLIST[i].src; };

    const tryPlay = () => {
      audio.play().then(() => setUI(true)).catch(() => {
        setUI(false, want ? "CLICK ĐỂ BẬT NHẠC" : "MUSIC OFF");
      });
    };

    /* Trình duyệt chặn tự phát nhạc → phát ở lần chạm đầu tiên */
    const unlock = (e) => {
      if (e.target.closest && e.target.closest("#music")) return;
      ["pointerdown", "keydown", "touchstart"].forEach(
        (t) => document.removeEventListener(t, unlock, true)
      );
      if (want && audio.paused) tryPlay();
    };

    ["pointerdown", "keydown", "touchstart"].forEach(
      (t) => document.addEventListener(t, unlock, true)
    );

    audio.addEventListener("error", () => {
      missing.add(cur);
      const n = nextIdx(cur);
      if (n < 0) { setUI(false, "CHƯA CÓ NHẠC"); return; }
      load(n);
      if (want) tryPlay();
    });

    audio.addEventListener("ended", () => {
      const n = nextIdx(cur);
      load(n < 0 ? cur : n);
      tryPlay();
    });

    musicToggle.addEventListener("click", () => {
      if (audio.paused) {
        want = true;
        tryPlay();
      } else {
        want = false;
        audio.pause();
        setUI(false);
      }
      try { localStorage.setItem("bgm", want ? "on" : "off"); } catch (e) {}
    });

    musicNext.addEventListener("click", () => {
      const n = nextIdx(cur);
      if (n < 0) return;
      want = true;
      load(n);
      tryPlay();
    });

    load(0);
    if (want) tryPlay();

  }


  /* =========================================
     METER + SCROLL DRIFT (chữ mờ / nhân vật trượt)
  ========================================= */

  document.querySelectorAll(".meter").forEach((m) => {
    for (let k = 0; k < 10; k++) {
      const s = document.createElement("i");
      s.style.setProperty("--n", k);
      if (k < Number(m.dataset.level) * 2) s.className = "on";
      m.appendChild(s);
    }
  });

  const drifts = [...document.querySelectorAll("[data-drift]")];
  let ticking = false;

  const drift = () => {
    ticking = false;
    const vh = window.innerHeight;
    drifts.forEach((el) => {
      const r = el.parentElement.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) return;
      const p = (r.top + r.height / 2 - vh / 2) / vh;
      el.style.translate = `${p * parseFloat(el.dataset.drift)}px 0`;
    });
  };

  window.addEventListener("scroll", () => {
    if (!ticking) { ticking = true; requestAnimationFrame(drift); }
  }, { passive: true });

  drift();


});
