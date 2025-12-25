const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

const animatedItems = document.querySelectorAll("[data-animate]");
animatedItems.forEach((item, index) => {
  item.style.transitionDelay = `${index * 80}ms`;
  observer.observe(item);
});

const stats = document.querySelectorAll(".stat");
const runCounter = (stat) => {
  const target = Number(stat.dataset.count || 0);
  const output = stat.querySelector("strong");
  let value = 0;
  const step = Math.max(1, Math.floor(target / 60));
  const tick = () => {
    value += step;
    if (value >= target) {
      output.textContent = target;
      return;
    }
    output.textContent = value;
    requestAnimationFrame(tick);
  };
  tick();
};

const statObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        runCounter(entry.target);
        statObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.6 }
);

stats.forEach((stat) => statObserver.observe(stat));
