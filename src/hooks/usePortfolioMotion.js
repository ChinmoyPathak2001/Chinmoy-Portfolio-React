import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

// GSAP owns scroll/intro motion; Framer Motion owns navigation gestures.
export default function usePortfolioMotion(rootRef) {
  useLayoutEffect(() => {
    const scope = rootRef.current;
    const abort = new AbortController();
    const { signal } = abort;
    let disposed = false;

    const $ = (s, root = scope) => root.querySelector(s);
    const $$ = (s, root = scope) => [...root.querySelectorAll(s)];
    const motionPreference = matchMedia("(prefers-reduced-motion: reduce)");
    const reduceMotion = motionPreference.matches;
    const navLinks = $$(".floating-nav a");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          navLinks.forEach((link) => {
            if (link.hash === "#" + entry.target.id)
              link.setAttribute("aria-current", "location");
            else link.removeAttribute("aria-current");
          });
        });
      },
      { rootMargin: "-20% 0px -55% 0px" },
    );
    $$("main>section[id]").forEach((el) => observer.observe(el));
    if (reduceMotion) {
      document.documentElement.classList.remove("is-loading");
      return () => observer.disconnect();
    }

    const previousScrollRestoration = history.scrollRestoration;
    const initialHash = location.hash;
    history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({ ignoreMobileResize: true });
    const lenis = new Lenis({
      lerp: 0.075,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      syncTouch: false,
    });
    lenis.stop();
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (seconds) => lenis.raf(seconds * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    const context = gsap.context(() => {}, scope);
    const responsive = gsap.matchMedia(scope);
    let intro;
    let settle;
    let bootComplete = false;
    let fatalTimer;

    function showPage(followInitialHash = true) {
      if (disposed || bootComplete) return;
      bootComplete = true;
      intro?.kill();
      document.documentElement.classList.remove("is-loading", "motion-ready");
      clearTimeout(fatalTimer);
      gsap.set(".loader", { display: "none" });
      gsap.set(
        ".header,.floating-nav,.hero-bottom,.hero-intro,.hero .info-tile,.down-link",
        { clearProps: "opacity,visibility,transform" },
      );
      gsap.set(".headline", { clearProps: "transform" });
      // Build scroll scenes only after the intro stops owning the hero transforms.
      try {
        context.add(() => {
          responsive.add(
            { desktop: "(min-width: 651px)", mobile: "(max-width: 650px)" },
            setupScrollScenes,
          );
          responsive.add(
            "(min-width: 651px) and (pointer: fine)",
            setupPointer,
          );
        });
        lenis.start();
        ScrollTrigger.refresh();
        const target =
          followInitialHash &&
          initialHash &&
          document.getElementById(initialHash.slice(1));
        if (target)
          lenis.scrollTo(target, {
            immediate: true,
            force: true,
            offset: target.id === "home" ? 0 : -45,
          });
      } catch (error) {
        console.error("Portfolio scroll fallback:", error);
        responsive.revert();
        gsap.set(
          ".reveal,.scroll-word,.headline,.section-heading,.featured-image,.featured-info>*",
          { clearProps: "all" },
        );
        lenis.start();
      }
    }
    // A failed image or animation must never leave the page behind a loading screen.
    fatalTimer = setTimeout(showPage, 7500);

    function splitCopy(el) {
      return $$(".scroll-word", el);
    }

    function setupScrollScenes() {
      const hero = $(".hero");
      gsap.to(".portrait-backdrop img", {
        y: () => innerHeight * 0.13,
        scale: 1.04,
        ease: "none",
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
      gsap.to(".hero-composition", {
        yPercent: -12,
        opacity: 0.05,
        ease: "none",
        scrollTrigger: {
          trigger: hero,
          start: "12% top",
          end: "bottom top",
          scrub: 0.8,
        },
      });

      const words = splitCopy($(".intro-section .scroll-copy"));
      gsap.fromTo(
        words,
        { opacity: 0.16 },
        {
          opacity: 1,
          stagger: 0.07,
          ease: "none",
          scrollTrigger: {
            trigger: ".intro-gallery",
            start: "top 65%",
            end: "top -10%",
            scrub: 0.7,
          },
        },
      );
      const gallery = gsap.timeline({
        scrollTrigger: {
          trigger: ".intro-gallery",
          start: "top top",
          end: () => "+=" + innerHeight * (innerWidth > 650 ? 3.3 : 1.4),
          pin: ".intro-stage",
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
      const panelStarts = [0, 0.12, 1.1, 2.1, 2.25];
      $$(".float-image").forEach((image, i) => {
        gsap.set(image, { top: 0 });
        gallery.fromTo(
          image,
          { y: () => innerHeight * 1.05 },
          {
            y: () => -image.offsetHeight - innerHeight * 0.1,
            duration: 1.5,
            ease: "none",
          },
          panelStarts[i],
        );
      });
      gallery.to(".intro-section .quiet", { opacity: 0.4, duration: 0.4 }, 0.6);

      $$(".scroll-copy")
        .filter((el) => !el.closest(".intro-stage"))
        .forEach((el) => {
          const spans = splitCopy(el);
          gsap.fromTo(
            spans,
            { opacity: 0.18 },
            {
              opacity: 1,
              stagger: 0.06,
              ease: "none",
              scrollTrigger: {
                trigger: el,
                start: "top 87%",
                end: "bottom 48%",
                scrub: 0.8,
              },
            },
          );
        });
      $$(".section-heading").forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: "inset(100% 0 0 0)", y: 40 },
          {
            clipPath: "inset(0% 0 0 0)",
            y: 0,
            duration: 1.2,
            ease: "power4.out",
            scrollTrigger: { trigger: el, start: "top 91%", once: true },
          },
        );
      });
      $$(".featured-project").forEach((project) => {
        const image = $(".featured-image", project);
        const photo = $(".project-media", project);
        gsap.fromTo(
          image,
          { clipPath: "inset(12% 0 0 0)", y: 65 },
          {
            clipPath: "inset(0% 0 0 0)",
            y: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: { trigger: project, start: "top 88%", once: true },
          },
        );
        gsap.fromTo(
          photo,
          { scale: 1.06, yPercent: 0 },
          {
            scale: 1,
            yPercent: 0,
            ease: "none",
            scrollTrigger: {
              trigger: image,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          },
        );
        gsap.from($(".featured-info", project).children, {
          y: 30,
          opacity: 0,
          stagger: 0.12,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: project, start: "top 80%", once: true },
        });
      });
      $$(".reveal")
        .filter(
          (el) =>
            !el.matches(".section-heading,.about-photo") &&
            !el.closest(".featured-project"),
        )
        .forEach((el) => {
          gsap.fromTo(
            el,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1.15,
              ease: "power3.out",
              scrollTrigger: { trigger: el, start: "top 91%", once: true },
            },
          );
        });
      if (innerWidth > 650) {
        const craft = gsap.timeline({
          scrollTrigger: {
            trigger: ".craft-section",
            start: "top top",
            end: () => "+=" + innerHeight * 3,
            pin: true,
            scrub: 0.85,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
        $$("#craft-title > span").forEach((line, i) => {
          craft.fromTo(
            line,
            { xPercent: i === 1 ? 4 : -3 },
            { xPercent: i === 1 ? -4 : 3, duration: 3.65, ease: "none" },
            0,
          );
        });
        $$(".craft-card").forEach((card, i) => {
          const at = i * 1.2;
          craft
            .fromTo(
              card,
              { y: () => innerHeight * 0.7, rotation: 4, opacity: 0 },
              {
                y: 0,
                rotation: 0,
                opacity: 1,
                duration: 0.45,
                ease: "power2.out",
              },
              at,
            )
            .to(card, { y: -15, duration: 0.35, ease: "none" }, at + 0.45)
            .to(
              card,
              {
                y: () => -innerHeight * 0.75,
                rotation: -3,
                opacity: 0,
                duration: 0.45,
                ease: "power2.in",
              },
              at + 0.8,
            );
        });
      } else {
        $$(".craft-card").forEach((card) =>
          gsap.fromTo(
            card,
            { y: 24, opacity: 0.45 },
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              ease: "power2.out",
              scrollTrigger: { trigger: card, start: "top 94%", once: true },
            },
          ),
        );
      }
      const rail = $(".personal-track");
      const railWindow = $(".personal-window");
      if (rail && innerWidth > 650) {
        railWindow.scrollLeft = 0;
        gsap.to(rail, {
          x: () => Math.min(0, railWindow.clientWidth - rail.scrollWidth),
          ease: "none",
          scrollTrigger: {
            trigger: ".personal-gallery",
            start: "center center",
            end: () => "+=" + innerHeight * 1.8,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
      }
      gsap.fromTo(
        ".about-photo",
        { y: 40 },
        {
          y: -25,
          ease: "none",
          scrollTrigger: {
            trigger: ".about-profile",
            start: "top 80%",
            end: "bottom 20%",
            scrub: 1,
          },
        },
      );
    }

    function setupPointer() {
      const pointerAbort = new AbortController();
      const signal = pointerAbort.signal;
      const cursor = $(".cursor");
      const preview = $(".project-preview");
      const previewImage = $("img", preview);
      gsap.set(cursor, { xPercent: -50, yPercent: -50 });
      gsap.set(preview, { xPercent: -50, yPercent: -50, scale: 0.4 });
      // Appearance tweens must use property-level overwrite ("auto").
      // overwrite:true kills the persistent x/y quickTo tweens and freezes movement.
      const cursorX = gsap.quickTo(cursor, "x", {
        duration: 0.4,
        ease: "power3.out",
      });
      const cursorY = gsap.quickTo(cursor, "y", {
        duration: 0.4,
        ease: "power3.out",
      });
      const previewX = gsap.quickTo(preview, "x", {
        duration: 0.65,
        ease: "power3.out",
      });
      const previewY = gsap.quickTo(preview, "y", {
        duration: 0.65,
        ease: "power3.out",
      });
      const previewRotation = gsap.quickTo(preview, "rotation", {
        duration: 0.7,
        ease: "power3.out",
      });
      let overProject = false;
      let lastX = 0;
      let hasPosition = false;
      settle = gsap.delayedCall(0.12, () => previewRotation(0)).pause();
      document.addEventListener(
        "pointermove",
        (e) => {
          if (!hasPosition) {
            gsap.set([cursor, preview], { x: e.clientX, y: e.clientY });
            lastX = e.clientX;
            hasPosition = true;
          }
          cursorX(e.clientX);
          cursorY(e.clientY);
          previewX(e.clientX);
          previewY(e.clientY);
          if (overProject) {
            previewRotation(
              gsap.utils.clamp(-7, 7, (e.clientX - lastX) * 0.16),
            );
            settle.restart(true);
          }
          lastX = e.clientX;
          gsap.to(cursor, {
            autoAlpha: overProject ? 0 : 1,
            scale: e.target.closest("a,button") ? 0.55 : 1,
            duration: 0.3,
            overwrite: "auto",
          });
        },
        { passive: true, signal },
      );
      document.documentElement.addEventListener(
        "pointerleave",
        () => {
          overProject = false;
          hasPosition = false;
          settle.pause();
          previewRotation(0);
          gsap.to([cursor, preview], {
            autoAlpha: 0,
            duration: 0.2,
            overwrite: "auto",
          });
        },
        { signal },
      );
      $$(".featured-project").forEach((project) => {
        project.addEventListener(
          "pointerenter",
          () => {
            overProject = true;
            previewImage.src =
              project.dataset.preview ||
              $(".featured-image img", project).getAttribute("src");
            gsap.to(preview, {
              autoAlpha: 1,
              scale: 1,
              duration: 0.55,
              ease: "power3.out",
              overwrite: "auto",
            });
            gsap.to(cursor, { autoAlpha: 0, duration: 0.2, overwrite: "auto" });
          },
          { signal },
        );
        project.addEventListener(
          "pointerleave",
          () => {
            overProject = false;
            settle.pause();
            previewRotation(0);
            gsap.to(cursor, { autoAlpha: 1, duration: 0.2, overwrite: "auto" });
            gsap.to(preview, {
              autoAlpha: 0,
              scale: 0.55,
              duration: 0.35,
              ease: "power2.out",
              overwrite: "auto",
            });
          },
          { signal },
        );
      });
      return () => {
        pointerAbort.abort();
        settle?.kill();
        gsap.killTweensOf([cursor, preview]);
      };
    }

    $$('a[href^="#"]').forEach((link) =>
      link.addEventListener(
        "click",
        (event) => {
          if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
            return;
          const target = document.getElementById(link.hash.slice(1));
          if (!target) return;
          event.preventDefault();
          showPage(false);
          lenis.scrollTo(target, {
            offset: target.id === "home" ? 0 : -45,
            duration: 1.65,
            lerp: undefined,
            easing: (t) => 1 - Math.pow(1 - t, 4),
            onComplete: () => {
              history.replaceState(null, "", link.hash);
              if (event.detail === 0) {
                target.setAttribute("tabindex", "-1");
                target.focus({ preventScroll: true });
              }
            },
          });
        },
        { signal },
      ),
    );

    async function boot() {
      try {
        const heroImage = $(".portrait-backdrop img");
        await Promise.race([
          Promise.all([
            document.fonts.ready,
            heroImage.decode().catch(() => {}),
            ...$$(".loader-stack img").map((image) =>
              image.decode().catch(() => {}),
            ),
          ]),
          new Promise((resolve) => setTimeout(resolve, 1200)),
        ]);
        // A skip link, timeout or StrictMode cleanup must not restart a finished intro.
        if (disposed || bootComplete) return;
        context.add(() => {
          lenis.scrollTo(0, { immediate: true, force: true });
          window.scrollTo(0, 0);
          document.documentElement.classList.add("motion-ready");
          gsap.set(".headline", { yPercent: 112 });
          gsap.set(
            ".header,.floating-nav,.hero-bottom,.hero-intro,.hero .info-tile,.down-link",
            { autoAlpha: 0 },
          );
          gsap.set(".portrait-backdrop img", { scale: 1.035 });
          const stack = $(".loader-stack");
          const logo = $(".header .logo-square");
          const logoRect = logo.getBoundingClientRect();
          intro = gsap.timeline({ onComplete: showPage });
          const slides = $$(".loader-stack img");
          slides.forEach((slide, i) => {
            intro
              .set(slide, { opacity: 1 }, i * 0.42)
              .set(slide, { opacity: 0 }, (i + 1) * 0.42);
          });
          intro
            .to(
              ".loader-veil",
              { opacity: 0, duration: 0.55, ease: "power2.inOut" },
              1.9,
            )
            .to(
              ".header,.floating-nav,.hero-bottom",
              { autoAlpha: 1, duration: 0.6, ease: "power2.out" },
              2.1,
            )
            .to(
              stack,
              {
                left: logoRect.left + logoRect.width / 2,
                top: logoRect.top + logoRect.height / 2,
                width: logoRect.width,
                height: logoRect.height,
                duration: 0.78,
                ease: "expo.inOut",
              },
              2.05,
            )
            .to(
              ".portrait-backdrop img",
              { scale: 1, duration: 1.4, ease: "power3.out" },
              2.1,
            )
            .set(stack, { autoAlpha: 0 }, 2.85)
            .to(
              ".row-one .headline",
              { yPercent: 0, duration: 1.2, ease: "power4.out", stagger: 0.06 },
              2.8,
            )
            .to(
              ".row-two .headline",
              { yPercent: 0, duration: 1.2, ease: "power4.out" },
              2.93,
            )
            .to(
              ".row-three .headline",
              { yPercent: 0, duration: 1.2, ease: "power4.out" },
              3.06,
            )
            .fromTo(
              ".hero-intro,.hero .info-tile,.down-link",
              { y: 15, autoAlpha: 0 },
              {
                y: 0,
                autoAlpha: 1,
                duration: 0.85,
                stagger: 0.07,
                ease: "power3.out",
              },
              3.35,
            );
        });
      } catch (error) {
        if (disposed) return;
        console.error("Portfolio intro fallback:", error);
        showPage();
      }
    }
    document.documentElement.classList.add("is-loading");
    context.add(() => {
      // Clear the previous run's display state during a development remount.
      gsap.set(".loader", { clearProps: "display" });
      gsap.set(".loader-veil", { opacity: 1 });
      gsap.set(".loader-stack", { clearProps: "all" });
      gsap.set(".loader-stack img", { opacity: 0 });
    });
    boot();
    window.addEventListener(
      "pageshow",
      (e) => {
        if (e.persisted) {
          showPage(false);
          ScrollTrigger.refresh();
        }
      },
      { signal },
    );
    // Font loading may finish after the bounded loader wait.
    document.fonts.ready.then(() => {
      if (!disposed && bootComplete) ScrollTrigger.refresh();
    });
    motionPreference.addEventListener("change", () => location.reload(), {
      signal,
    });

    return () => {
      disposed = true;
      history.scrollRestoration = previousScrollRestoration;
      abort.abort();
      observer.disconnect();
      clearTimeout(fatalTimer);
      intro?.kill();
      settle?.kill();
      gsap.ticker.remove(tick);
      lenis.destroy();
      responsive.revert();
      context.revert();
      gsap.killTweensOf(scope.querySelectorAll(".cursor,.project-preview"));
      document.documentElement.classList.remove("is-loading", "motion-ready");
    };
  }, [rootRef]);
}
