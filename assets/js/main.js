
(function() {
  "use strict";

  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

 
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

 
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

 
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

 
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        // Some projects include a custom pager initializer named
        // `initSwiperWithCustomPagination`. It isn't defined in this
        // codebase, so guard the call to avoid runtime errors.
        if (typeof initSwiperWithCustomPagination === 'function') {
          initSwiperWithCustomPagination(swiperElement, config);
        } else {
          // Fallback to a normal Swiper instance so the element still works
          // even if the custom initializer is missing.
          new Swiper(swiperElement, config);
        }
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init swiper tabs sliders
   */
  function initSwiperTabs() {
    document
      .querySelectorAll(".init-swiper-tabs")
      .forEach(function(swiperElement) {
        let config = JSON.parse(
          swiperElement.querySelector(".swiper-config").innerHTML.trim()
        );

        const dotsContainer = swiperElement
          .closest("section")
          .querySelector(".js-custom-dots");
        if (!dotsContainer) return;

        const customDots = dotsContainer.querySelectorAll("a");

        // Remove the default pagination setting
        delete config.pagination;

        const swiperInstance = new Swiper(swiperElement, config);

        swiperInstance.on("slideChange", function() {
          updateSwiperTabsPagination(swiperInstance, customDots);
        });

        customDots.forEach((dot, index) => {
          dot.addEventListener("click", function(e) {
            e.preventDefault();
            swiperInstance.slideToLoop(index);
            updateSwiperTabsPagination(swiperInstance, customDots);
          });
        });

        updateSwiperTabsPagination(swiperInstance, customDots);
      });
  }

  function updateSwiperTabsPagination(swiperInstance, customDots) {
    const activeIndex = swiperInstance.realIndex;
    customDots.forEach((dot, index) => {
      if (index === activeIndex) {
        dot.classList.add("active");
      } else {
        dot.classList.remove("active");
      }
    });
  }

  window.addEventListener("load", initSwiperTabs);

 
  function initStaticTabs() {
    document.querySelectorAll('.js-custom-dots').forEach(function(container) {
      const tabs = container.querySelectorAll('a.js-tab-item');
      const section = container.closest('section');
      if (!section) return;
      const panels = section.querySelectorAll('.tab-panel');
      const wrapper = section.querySelector('.tab-panels');
      if (!wrapper || panels.length === 0) return;

      // ensure wrapper has relative positioning and a height transition
      wrapper.style.position = wrapper.style.position || 'relative';
      wrapper.style.transition = wrapper.style.transition || 'height 360ms ease';

      // normalize panels: set ARIA and ensure only one active
      let activePanel = section.querySelector('.tab-panel.active') || panels[0];
      panels.forEach(function(p) {
        if (p === activePanel) {
          p.classList.add('active');
          p.setAttribute('aria-hidden', 'false');
        } else {
          p.classList.remove('active');
          p.setAttribute('aria-hidden', 'true');
        }
        // make panels stack on top of each other to enable cross-fade
        p.style.position = 'absolute';
        p.style.top = 0;
        p.style.left = 0;
        p.style.width = '100%';
      });

      // set initial wrapper height to active panel
      wrapper.style.height = activePanel.scrollHeight + 'px';

      tabs.forEach(function(tab) {
        // set initial active state on tabs
        if (tab.dataset.target === activePanel.id) tab.classList.add('active');

        tab.addEventListener('click', function(e) {
          e.preventDefault();
          if (this.classList.contains('active')) return;

          // update tab active classes
          tabs.forEach(function(t) { t.classList.remove('active'); });
          this.classList.add('active');

          const target = this.dataset.target;
          if (!target) return;
          const newPanel = section.querySelector('#' + target);
          const oldPanel = section.querySelector('.tab-panel.active');
          if (!newPanel || newPanel === oldPanel) return;

         
          wrapper.style.height = (oldPanel ? oldPanel.scrollHeight : wrapper.scrollHeight) + 'px';

      
          newPanel.classList.add('active');
          newPanel.setAttribute('aria-hidden', 'false');       
          newPanel.offsetHeight;
          wrapper.style.height = newPanel.scrollHeight + 'px';    
          const transitionDuration = 400; 
          setTimeout(function() {
            if (oldPanel && oldPanel !== newPanel) {
              oldPanel.classList.remove('active');
              oldPanel.setAttribute('aria-hidden', 'true');
            }

            wrapper.style.height = newPanel.scrollHeight + 'px';
          }, transitionDuration);
        });
      });
    });
  }

  window.addEventListener('load', initStaticTabs);


  function initCollapseToggles() {
    document.querySelectorAll('.collapse-toggle').forEach(function(btn) {
      const targetId = btn.getAttribute('aria-controls');
      const content = document.getElementById(targetId);
      if (!content) return;

      const panel = content.closest('.tab-panel');
      const wrapper = panel ? panel.closest('section').querySelector('.tab-panels') : null;

 
      if (!content.classList.contains('open')) {
        content.style.maxHeight = '0px';
        btn.setAttribute('aria-expanded', 'false');
      } else {
        content.style.maxHeight = content.scrollHeight + 'px';
        btn.setAttribute('aria-expanded', 'true');
      }

      btn.addEventListener('click', function(e) {
        e.preventDefault();
        const isOpen = btn.getAttribute('aria-expanded') === 'true';

        if (isOpen) {
          if (wrapper && panel) {
            const panelBefore = panel.scrollHeight;
            const contentH = content.scrollHeight;
            const target = Math.max(0, panelBefore - contentH);
            wrapper.style.height = target + 'px';
          }
          content.style.maxHeight = content.scrollHeight + 'px';
          content.offsetHeight;
          content.style.maxHeight = '0px';
          content.classList.remove('open');
          btn.setAttribute('aria-expanded', 'false');
        } else {
          content.classList.add('open');
          content.style.maxHeight = content.scrollHeight + 'px';
          btn.setAttribute('aria-expanded', 'true');
          content.offsetHeight;
          if (wrapper && panel) {
            wrapper.style.height = panel.scrollHeight + 'px';
          }
        }
      });

      content.addEventListener('transitionend', function(e) {
        if (e.propertyName !== 'max-height') return;
        if (content.classList.contains('open')) {
          content.style.maxHeight = content.scrollHeight + 'px';
          if (wrapper && panel) wrapper.style.height = panel.scrollHeight + 'px';
        } else {
          if (wrapper && panel) wrapper.style.height = panel.scrollHeight + 'px';
        }
      });
    });
  }

  window.addEventListener('load', initCollapseToggles);


  const glightbox = GLightbox({
    selector: '.glightbox'
  });


  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

})();
