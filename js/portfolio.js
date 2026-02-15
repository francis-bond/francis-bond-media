// ===== PORTFOLIO HOVER BACKGROUND EFFECT =====
const rows = document.querySelectorAll('.portfolio-row');
const bgLayers = document.querySelectorAll('.portfolio-bg');
const bgOverlay = document.querySelector('.portfolio-bg-overlay');
const portfolioList = document.querySelector('.portfolio-list');

let activeProject = null;

rows.forEach(row => {
  row.addEventListener('mouseenter', () => {
    const project = row.dataset.project;
    if (project === activeProject) return;

    activeProject = project;
    bgOverlay.classList.add('active');

    bgLayers.forEach(layer => {
      if (layer.dataset.project === project) {
        layer.classList.add('active');
      } else {
        layer.classList.remove('active');
      }
    });
  });
});

if (portfolioList) {
  portfolioList.addEventListener('mouseleave', () => {
    activeProject = null;
    bgOverlay.classList.remove('active');
    bgLayers.forEach(layer => layer.classList.remove('active'));
  });
}
