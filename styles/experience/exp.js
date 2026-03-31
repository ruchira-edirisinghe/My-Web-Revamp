        (function () {
          const universe = document.getElementById("skills-universe");
          if (!universe) return;

          const nodes = universe.querySelectorAll(".nebula-node-wrap");
          const data = [];
          const MIN_DIST = 260; // Increased to 260 for multiline labels
          const FRICTION = 0.95;

          let dragOffset = { x: 0, y: 0 };

          nodes.forEach((node) => {
            const d = {
              el: node,
              baseX: 15 + Math.random() * 70, // Randomized initial home
              baseY: 15 + Math.random() * 65, // Biased slightly higher
              x: Math.random() * 800,
              y: Math.random() * 400,
              vx: (Math.random() - 0.5) * 8,
              vy: (Math.random() - 0.5) * 8,
              phaseX: Math.random() * Math.PI * 2,
              phaseY: Math.random() * Math.PI * 2,
              speedX: 0.01 + Math.random() * 0.01,
              speedY: 0.01 + Math.random() * 0.01,
              amplitude: 30 + Math.random() * 30, // More wandering range
              depth: 0.5 + Math.random() * 1.5,
              isDragging: false
            };

            node.addEventListener("pointerdown", (e) => {
              e.preventDefault();
              d.isDragging = true;
              node.setPointerCapture(e.pointerId);
              const rect = universe.getBoundingClientRect();
              dragOffset.x = d.x - (e.clientX - rect.left);
              dragOffset.y = d.y - (e.clientY - rect.top);
            });

            node.addEventListener("pointermove", (e) => {
              if (d.isDragging) {
                const rect = universe.getBoundingClientRect();
                const targetX = (e.clientX - rect.left) + dragOffset.x;
                const targetY = (e.clientY - rect.top) + dragOffset.y;
                d.vx = (targetX - d.x) * 0.8;
                d.vy = (targetY - d.y) * 0.8;
                d.x = targetX;
                d.y = targetY;
              }
            });

            const onRelease = () => {
              if (d.isDragging) {
                d.isDragging = false;
                const rect = universe.getBoundingClientRect();
                d.baseX = (d.x / rect.width) * 100;
                d.baseY = (d.y / rect.height) * 100;
              }
            };
            node.addEventListener("pointerup", onRelease);
            node.addEventListener("pointercancel", onRelease);

            data.push(d);
          });

          let mouseX = 0, mouseY = 0, targetMouseX = 0, targetMouseY = 0;

          universe.addEventListener("mousemove", (e) => {
            const rect = universe.getBoundingClientRect();
            targetMouseX = ((e.clientX - rect.left) / rect.width) - 0.5;
            targetMouseY = ((e.clientY - rect.top) / rect.height) - 0.5;
          });

          universe.addEventListener("mouseleave", () => {
            targetMouseX = 0; targetMouseY = 0;
          });

          function resolveCollisions() {
            for (let i = 0; i < data.length; i++) {
              for (let j = i + 1; j < data.length; j++) {
                const a = data[i], b = data[j];
                const dx = b.x - a.x, dy = b.y - a.y;
                const distance = Math.hypot(dx, dy);

                if (distance < MIN_DIST && distance > 0) {
                  const overlap = MIN_DIST - distance;
                  const nx = dx / distance, ny = dy / distance;

                  // 1. SOFT RELAXATION (Position)
                  const relaxation = overlap * 0.08; // Even softer
                  const rx = nx * relaxation, ry = ny * relaxation;
                  if (!a.isDragging) { a.x -= rx * 0.5; a.y -= ry * 0.5; }
                  if (!b.isDragging) { b.x += rx * 0.5; b.y += ry * 0.5; }

                  // 2. SILK DEFLECTION (Force-based)
                  // Instead of snapping, we gently adjust velocities
                  const force = overlap * 0.04;
                  if (!a.isDragging) { a.vx -= nx * force; a.vy -= ny * force; }
                  if (!b.isDragging) { b.vx += nx * force; b.vy += ny * force; }

                  // 3. ENHANCED TANGENTIAL GLIDE (Beautiful sliding)
                  const tx = -ny, ty = nx;
                  const relativeVelocityT = (a.vx * tx + a.vy * ty) - (b.vx * tx + b.vy * ty);
                  const glide = relativeVelocityT * 0.15; // Increased for 'slide-off' feel
                  if (!a.isDragging) { a.vx -= tx * glide; a.vy -= ty * glide; }
                  if (!b.isDragging) { b.vx += tx * glide; b.vy += ty * glide; }

                  // Subtle friction during contact for calm feel
                  if (!a.isDragging) { a.vx *= 0.99; a.vy *= 0.99; }
                  if (!b.isDragging) { b.vx *= 0.99; b.vy *= 0.99; }
                }
              }
            }
          }

          function animate() {
            // NO ANIMATION ON MOBILE: Guard statement to save resources
            if (window.innerWidth <= 768) return;

            mouseX += (targetMouseX - mouseX) * 0.03;
            mouseY += (targetMouseY - mouseY) * 0.03;
            const rect = universe.getBoundingClientRect();
            const w = rect.width, h = rect.height;

            data.forEach((d) => {
              if (d.isDragging) return;

              // 1. SILK DRIFT: Oscillation + Mouse Parallax
              d.phaseX += d.speedX; d.phaseY += d.speedY;
              const ox = Math.sin(d.phaseX) * d.amplitude;
              const oy = Math.cos(d.phaseY) * d.amplitude;
              const px = mouseX * 60 * d.depth;
              const py = mouseY * 60 * d.depth;

              // 2. SOFT HOME-SEEKING: Low-stiffness spring to avoid wiggling
              const hx = (d.baseX / 100) * w, hy = (d.baseY / 100) * h;
              const homeForce = 0.025; // Gentler seeking
              d.vx += (hx + ox + px - d.x) * homeForce;
              d.vy += (hy + oy + py - d.y) * homeForce;

              // 3. MOTION GUARANTEE: Keep them moving moderately
              const minSpeed = 1.2;
              const speed = Math.hypot(d.vx, d.vy);
              if (speed < minSpeed) {
                d.vx += (Math.random() - 0.5) * 0.2;
                d.vy += (Math.random() - 0.5) * 0.2;
              }

              d.vx *= FRICTION; d.vy *= FRICTION;
              d.x += d.vx; d.y += d.vy;

              // 4. TEXT-SAFE SOFT BOUNDARY (Asymmetric)
              const padX = 140; // Labels are 140px wide
              const padYTop = 80;
              const padYBot = 160; // Labels hang below node
              const ef = 0.08;

              // Left Repulsion
              if (d.x < padX) d.vx += (padX - d.x) * ef;
              // Right Repulsion 
              if (d.x > w - padX) d.vx -= (d.x - (w - padX)) * ef;
              // Top Repulsion
              if (d.y < padYTop) d.vy += (padYTop - d.y) * ef;
              // Bottom Repulsion
              if (d.y > h - padYBot) d.vy -= (d.y - (h - padYBot)) * ef;

              // Final hard-wall safety (Large enough to keep text in)
              const safeX = 100;
              const safeYTop = 40;
              const safeYBot = 110;
              if (d.x < safeX) { d.x = safeX; d.vx *= 0.5; }
              if (d.x > w - safeX) { d.x = w - safeX; d.vx *= 0.5; }
              if (d.y < safeYTop) { d.y = safeYTop; d.vy *= 0.5; }
              if (d.y > h - safeYBot) { d.y = h - safeYBot; d.vy *= 0.5; }
            });

            resolveCollisions();
            data.forEach((d) => { d.el.style.transform = "translate3d(" + d.x + "px, " + d.y + "px, 0)"; });
            requestAnimationFrame(animate);
          }
          animate();
        })();

    /* â”€â”€ Preloader â”€â”€ */
    (function () {
      const preloader = document.getElementById("preloader");
      const fill = document.getElementById("progress-fill");
      const splitTop = document.getElementById("split-top");
      const splitBottom = document.getElementById("split-bottom");
      let progress = 0;
      const timer = setInterval(() => {
        progress = Math.min(progress + Math.random() * 18, 100);
        fill.style.width = progress + "%";
        if (progress >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            preloader.style.opacity = "0";
            preloader.style.transition = "opacity 0.4s ease";
            splitTop.classList.add("open");
            splitBottom.classList.add("open");
            setTimeout(() => {
              preloader.style.display = "none";
              splitTop.classList.add("gone");
              splitBottom.classList.add("gone");
            }, 900);
          }, 300);
        }
      }, 80);
    })();

    /* â”€â”€ Mobile menu â”€â”€ */
    (function () {
      const menuBtn = document.getElementById("menu-btn");
      const mobileMenu = document.getElementById("mobile-menu");
      const menuCloseMob = document.getElementById("menu-close-mobile");
      const menuLinks = document.querySelectorAll(".mobile-menu-link");
      let ignoreBackdropClickUntil = 0;
      let closeTimer = null;

      const currentPage = document.body.dataset.page || "experience";
      menuLinks.forEach((link) => {
        link.classList.toggle("active", link.dataset.page === currentPage);
      });

      // Ensure menu starts closed even if the browser restores a cached page state.
      mobileMenu.classList.remove("open");
      mobileMenu.setAttribute("aria-hidden", "true");
      menuBtn.classList.remove("is-open");
      menuBtn.setAttribute("aria-expanded", "false");
      menuCloseMob.classList.remove("visible");
      document.body.classList.remove("menu-open");
      menuLinks.forEach((link) => {
        link.style.animation = "";
        link.style.opacity = "";
        link.style.transform = "";
        link.style.filter = "";
      });

      if (!document.getElementById("mobile-menu-keyframes")) {
        const style = document.createElement("style");
        style.id = "mobile-menu-keyframes";
        style.textContent = `
        @keyframes mobileMenuPop {
          0%   { opacity:0; transform:scale(0.2); filter:blur(12px); }
          50%  { opacity:1; transform:scale(1.08); filter:blur(0px); }
          70%  { transform:scale(0.97); }
          85%  { transform:scale(1.02); }
          100% { opacity:1; transform:scale(1); filter:blur(0px); }
        }
        @keyframes mobileMenuShrink {
          0%   { opacity:1; transform:scale(1);   filter:blur(0px); }
          15%  { transform:scale(1.03); }
          30%  { transform:scale(0.96); }
          100% { opacity:0; transform:scale(0.2); filter:blur(12px); }
        }
      `;
        document.head.appendChild(style);
      }

      function openMobileMenu() {
        // Prevent the very first tap from immediately being treated as a backdrop click.
        // (Some mobile browsers fire a follow-up click after the overlay becomes clickable.)
        ignoreBackdropClickUntil = Date.now() + 450;
        if (closeTimer) {
          clearTimeout(closeTimer);
          closeTimer = null;
        }

        mobileMenu.classList.add("open");
        mobileMenu.setAttribute("aria-hidden", "false");
        // Delay making the overlay clickable for one frame.
        // CSS enables pointer-events when `.open` is present, so we override briefly.
        mobileMenu.style.pointerEvents = "none";
        requestAnimationFrame(() => {
          mobileMenu.style.pointerEvents = "";
        });
        menuBtn.classList.add("is-open");
        menuBtn.setAttribute("aria-expanded", "true");
        menuCloseMob.classList.add("visible");
        document.body.classList.add("menu-open");

        menuLinks.forEach((link, i) => {
          link.style.animation = "none";
          link.style.opacity = "0";
          link.style.transform = "scale(0.2)";
          link.style.filter = "blur(12px)";
          void link.offsetWidth;
          link.style.animation = `mobileMenuPop 0.6s cubic-bezier(0.34,1.56,0.64,1) ${i * 0.09 + 0.04}s forwards`;
        });
      }

      function closeMobileMenu() {
        if (!mobileMenu.classList.contains("open")) return;
        if (closeTimer) clearTimeout(closeTimer);

        const total = menuLinks.length;
        menuLinks.forEach((link, i) => {
          link.style.animation = "none";
          void link.offsetWidth;
          link.style.animation = `mobileMenuShrink 0.5s cubic-bezier(0.34,1.56,0.64,1) ${i * 0.07}s forwards`;
        });

        const closeDur = (total - 1) * 70 + 500;
        closeTimer = setTimeout(() => {
          mobileMenu.classList.remove("open");
          mobileMenu.setAttribute("aria-hidden", "true");
          menuBtn.classList.remove("is-open");
          menuBtn.setAttribute("aria-expanded", "false");
          menuCloseMob.classList.remove("visible");
          document.body.classList.remove("menu-open");
          closeTimer = null;
        }, closeDur - 150);
      }

      menuBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        mobileMenu.classList.contains("open")
          ? closeMobileMenu()
          : openMobileMenu();
      });

      menuCloseMob.addEventListener("click", (e) => {
        e.stopPropagation();
        closeMobileMenu();
      });

      mobileMenu.addEventListener("click", (e) => {
        if (e.target !== mobileMenu) return;
        if (Date.now() < ignoreBackdropClickUntil) return;
        closeMobileMenu();
      });

      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && mobileMenu.classList.contains("open"))
          closeMobileMenu();
      });
    })();

    /* â”€â”€ Scroll-reveal observer â”€â”€ */
    (function () {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add(e.target.dataset.visClass || "tl-vis");
              // Trigger skill bars
              if (e.target.classList.contains("skill-panel")) {
                e.target
                  .querySelectorAll(".sp-bar-fill")
                  .forEach((b) => b.classList.add("bar-animate"));
              }
              io.unobserve(e.target);
            }
          });
        },
        { threshold: 0.12 },
      );

      document.querySelectorAll(".exp-section-heading").forEach((el) => {
        el.dataset.visClass = "eh-vis";
        io.observe(el);
      });
      document.querySelectorAll(".skill-panel").forEach((el) => {
        el.dataset.visClass = "sk-vis";
        io.observe(el);
      });
      document.querySelectorAll(".edu-entry").forEach((el) => {
        el.dataset.visClass = "edu-vis";
        io.observe(el);
      });
      document.querySelectorAll(".cert-card").forEach((el) => {
        el.dataset.visClass = "cert-vis";
        io.observe(el);
      });
      document.querySelectorAll(".vol-card").forEach((el) => {
        el.dataset.visClass = "vol-vis";
        io.observe(el);
      });
    })();

    /* â”€â”€ Testimonials slider â”€â”€ */
    (function () {
      const DURATION = 7000;
      const N = document.querySelectorAll(".testi-slide").length;
      let current = 0;
      let timer = null;
      let wordTimers = [];

      const slides = document.querySelectorAll(".testi-slide");
      const avs = document.querySelectorAll(".testi-avatar-thumb");
      const curEl = document.getElementById("testi-cur");
      const prog = document.getElementById("testi-prog");
      const shell = document.getElementById("testi-shell");

      function pad(n) {
        return String(n + 1).padStart(2, "0");
      }

      /* Wrap each word in a span on first access */
      function prepareQuote(slide) {
        const p = slide.querySelector(".testi-quote");
        if (!p || p.dataset.wrapped) return;
        const tokens = p.innerText.split(/(\s+)/);
        p.innerHTML = tokens
          .map((token) => {
            if (/^\s+$/.test(token)) return token;
            return '<span class="tq-word">' + token + "</span>";
          })
          .join("");
        p.dataset.wrapped = "1";
      }

      /* Cancel any pending word-reveal timers */
      function cancelWordTimers() {
        wordTimers.forEach((t) => clearTimeout(t));
        wordTimers = [];
      }

      /* Hide all words in a slide instantly */
      function resetWords(slide) {
        slide.querySelectorAll(".tq-word").forEach((w) => {
          w.classList.remove("tq-vis");
        });
      }

      /* Staggered word reveal */
      function animateWords(slide) {
        cancelWordTimers();
        const words = slide.querySelectorAll(".tq-word");
        const stagger = Math.min(30, 2000 / Math.max(words.length, 1));
        words.forEach((w, i) => {
          const delay = 120 + i * stagger;
          w.style.setProperty("--wd", delay + "ms");
          wordTimers.push(
            setTimeout(() => {
              w.classList.add("tq-vis");
            }, delay),
          );
        });
      }

      /* Reset + restart progress bar visuals */
      function resetProgressBar() {
        prog.classList.remove("run-anim");
        void prog.offsetWidth; // Force reflow
        prog.classList.add("run-anim");
      }

      function showSlide(idx) {
        const prev = current;
        current = ((idx % N) + N) % N;

        prepareQuote(slides[current]);
        resetWords(slides[prev]);
        cancelWordTimers();

        // Slide exit
        slides[prev].classList.remove("active");
        slides[prev].classList.add("exit");
        setTimeout(() => {
          slides[prev].classList.remove("exit");
        }, 600);

        // Slide enter
        slides[current].classList.add("active");
        animateWords(slides[current]);

        // Counter
        curEl.style.opacity = "0";
        setTimeout(() => {
          curEl.textContent = pad(current);
          curEl.style.opacity = "1";
        }, 180);

        // Avatar highlights
        avs.forEach((a, i) => {
          a.classList.toggle("current-av", i === current);
        });

        resetProgressBar();
      }

      function startAuto() {
        clearInterval(timer);
        timer = setInterval(() => {
          showSlide(current + 1);
        }, DURATION);
      }

      // Prev / Next
      const pBtn = document.getElementById("testi-prev");
      const nBtn = document.getElementById("testi-next");
      if (pBtn) {
        pBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          showSlide(current - 1);
          startAuto();
        });
      }
      if (nBtn) {
        nBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          showSlide(current + 1);
          startAuto();
        });
      }

      // Avatar clicks
      avs.forEach((av, i) => {
        av.addEventListener("click", () => {
          showSlide(i);
          startAuto();
        });
      });

      // Boot
      prepareQuote(slides[0]);
      slides[0].classList.add("active");
      animateWords(slides[0]);
      startAuto();
      resetProgressBar();
    })();

    /* â”€â”€ Beautiful Wavy SVM Spine â”€â”€ */
    /* â”€â”€ Beautiful Animated Fluid SVM Spine â”€â”€ */
    function initTimelineAnimations() {
      const timelines = document.querySelectorAll('.timeline');

      timelines.forEach((timeline, index) => {
        let existingSvg = timeline.querySelector('.spine-svg');
        if (existingSvg) existingSvg.remove();
        if (timeline._animData && timeline._animData.animId) {
          cancelAnimationFrame(timeline._animData.animId);
        }
        if (timeline._animData && timeline._animData.observer) {
          timeline._animData.observer.disconnect();
        }

        const prevDrawY = timeline._animData ? timeline._animData.currentDrawY : 0;
        const prevTargetY = timeline._animData ? timeline._animData.targetDrawY : 0;
        const prevMap = timeline._animData ? timeline._animData.activatedMap : null;

        const clipId = `spine-clip-${index}`;
        let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.classList.add("spine-svg");
        svg.style.position = "absolute";
        svg.style.top = "0";
        svg.style.left = "0";
        svg.style.width = "100%";
        svg.style.height = "100%";
        svg.style.zIndex = "1";
        svg.style.pointerEvents = "none";

        svg.innerHTML = `
            <defs>
                <clipPath id="${clipId}">
                    <rect class="clip-rect" x="-50%" y="0" width="200%" height="0" />
                </clipPath>
                <linearGradient id="spine-grad-${index}" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="rgba(140, 80, 255, 0)" />
                    <stop offset="15%" stop-color="rgba(255, 60, 150, 0.7)" />
                    <stop offset="35%" stop-color="rgba(140, 80, 255, 0.7)" />
                    <stop offset="65%" stop-color="rgba(255, 140, 60, 0.7)" />
                    <stop offset="85%" stop-color="rgba(140, 80, 255, 0.7)" />
                    <stop offset="100%" stop-color="rgba(140, 80, 255, 0)" />
                </linearGradient>
                <filter id="spine-glow-${index}" x="-50%" y="-10%" width="200%" height="120%">
                    <feGaussianBlur stdDeviation="3.5" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
            </defs>
            <path class="spine-path" fill="none" stroke="url(#spine-grad-${index})" stroke-width="2.5" filter="url(#spine-glow-${index})" clip-path="url(#${clipId})" />
        `;
        timeline.insertBefore(svg, timeline.firstChild);

        const nodes = timeline.querySelectorAll('.tl-node');
        const items = timeline.querySelectorAll('.tl-item');
        if (nodes.length === 0) return;

        let pathStr = "";
        const timelineRect = timeline.getBoundingClientRect();
        const centerX = timelineRect.width / 2;

        let points = [];
        nodes.forEach((node) => {
          const nodeRect = node.getBoundingClientRect();
          const x = nodeRect.left - timelineRect.left + nodeRect.width / 2;
          const y = nodeRect.top - timelineRect.top + nodeRect.height / 2;
          points.push({ x, y });
        });

        if (points.length > 0) {
          const isMobile = window.innerWidth <= 900;
          const topAnchorX = isMobile ? points[0].x : centerX;
          const bottomAnchorX = isMobile ? points[points.length - 1].x : centerX;

          pathStr += `M ${topAnchorX}, 0 `;
          let cpY = points[0].y * 0.4;
          pathStr += `C ${topAnchorX}, ${cpY}, ${points[0].x}, ${cpY}, ${points[0].x}, ${points[0].y} `;

          for (let i = 0; i < points.length - 1; i++) {
            const current = points[i];
            const next = points[i + 1];
            const distY = next.y - current.y;
            pathStr += `C ${current.x}, ${current.y + distY / 2}, ${next.x}, ${next.y - distY / 2}, ${next.x}, ${next.y} `;
          }

          const lastPoint = points[points.length - 1];
          const remainingY = timelineRect.height - lastPoint.y;
          pathStr += `C ${lastPoint.x}, ${lastPoint.y + remainingY / 2}, ${bottomAnchorX}, ${lastPoint.y + remainingY / 2}, ${bottomAnchorX}, ${timelineRect.height} `;

          svg.querySelector('.spine-path').setAttribute('d', pathStr);
        }

        timeline._animData = {
          rect: timelineRect,
          points: points,
          clipRect: svg.querySelector('.clip-rect'),
          items: Array.from(items),
          currentDrawY: prevDrawY,
          targetDrawY: prevTargetY,
          activatedMap: prevMap || new Array(points.length).fill(false)
        };

        // Guarantee first two connected natively on desktop view initialization
        if (!prevMap) {
          if (points.length > 1 && window.innerWidth > 900) {
            timeline._animData.targetDrawY = points[1].y + 150;
          } else if (points.length > 0) {
            timeline._animData.targetDrawY = points[0].y + 150;
          }
        }

        // Dynamically increment target depth when user scrolls deeper
        const observer = new IntersectionObserver((entries) => {
          let maxTarget = timeline._animData.targetDrawY;
          let changed = false;
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const idx = timeline._animData.items.indexOf(entry.target);
              if (idx !== -1) {
                let proposed = timeline._animData.points[idx].y + 160;
                if (idx === timeline._animData.points.length - 1) {
                  proposed = timeline._animData.rect.height; // Complete to the bottom entirely
                }
                if (proposed > maxTarget) {
                  maxTarget = proposed;
                  changed = true;
                }
              }
            }
          });
          if (changed) timeline._animData.targetDrawY = maxTarget;
        }, { threshold: 0.05 });

        timeline._animData.items.forEach(item => observer.observe(item));
        timeline._animData.observer = observer;

        // Fluid render loop
        function animate() {
          const data = timeline._animData;
          const diff = data.targetDrawY - data.currentDrawY;

          // A much smaller multiplier gives a slower, magical ease-out filling animation
          data.currentDrawY += diff * 0.012;

          if (Math.abs(diff) < 0.5) data.currentDrawY = data.targetDrawY;
          if (data.clipRect) data.clipRect.setAttribute('height', Math.max(0, data.currentDrawY));

          data.points.forEach((point, i) => {
            if (!data.activatedMap[i] && data.currentDrawY >= point.y - 12) {
              data.activatedMap[i] = true;
              data.items[i].classList.add('tl-vis');
            }
          });

          data.animId = requestAnimationFrame(animate);
        }
        animate();
      });
    }

    window.addEventListener('resize', () => { setTimeout(initTimelineAnimations, 50); });
    window.addEventListener('load', initTimelineAnimations);
    setTimeout(initTimelineAnimations, 150);

    /* â”€â”€ Custom Cert Scrollbar â”€â”€ */
    (function () {
      const grid = document.getElementById('cert-grid');
      const thumb = document.getElementById('cert-sb-thumb');
      const track = document.getElementById('cert-sb-track');
      if (!grid || !thumb || !track) return;

      let isDragging = false, startY = 0, startScrollTop = 0;

      function updateThumb() {
        const trackH = track.clientHeight;
        const ratio = grid.clientHeight / grid.scrollHeight;
        const thumbH = Math.max(ratio * trackH, 40);
        const maxScroll = grid.scrollHeight - grid.clientHeight;
        const maxTop = trackH - thumbH;
        const top = maxScroll > 0 ? (grid.scrollTop / maxScroll) * maxTop : 0;
        thumb.style.height = thumbH + 'px';
        thumb.style.top = top + 'px';
      }

      grid.addEventListener('scroll', updateThumb);
      window.addEventListener('resize', updateThumb);
      updateThumb();

      /* â”€â”€ Drag the thumb â”€â”€ */
      thumb.addEventListener('mousedown', function (e) {
        isDragging = true;
        startY = e.clientY;
        startScrollTop = grid.scrollTop;
        thumb.classList.add('is-dragging');
        document.body.style.cursor = 'grabbing';
        document.body.style.userSelect = 'none';
        e.preventDefault();
      });

      document.addEventListener('mousemove', function (e) {
        if (!isDragging) return;
        const trackH = track.clientHeight;
        const thumbH = thumb.clientHeight;
        const maxTop = trackH - thumbH;
        const delta = e.clientY - startY;
        const scrollRatio = maxTop > 0
          ? (grid.scrollHeight - grid.clientHeight) / maxTop
          : 0;
        grid.scrollTop = startScrollTop + delta * scrollRatio;
      });

      document.addEventListener('mouseup', function () {
        if (!isDragging) return;
        isDragging = false;
        thumb.classList.remove('is-dragging');
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
      });

      /* â”€â”€ Click on track to jump â”€â”€ */
      track.addEventListener('click', function (e) {
        if (e.target === thumb || thumb.contains(e.target)) return;
        const rect = track.getBoundingClientRect();
        const clickY = e.clientY - rect.top;
        const ratio = clickY / track.clientHeight;
        grid.scrollTop = ratio * grid.scrollHeight;
      });
    })();
