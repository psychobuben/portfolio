const categories = document.querySelectorAll('.category');
const subcategories = document.querySelectorAll('.subcategory-container');
const projectContainer = document.getElementById('projects');
const projectTitle = document.getElementById('project-title');
const projectList = document.getElementById('project-list');
const categorySection = document.getElementById('category-section');

const projectData = {
  'Modelování': [
    { title: 'Škoda 120', model: 'modely/skoda120.glb' },
    { title: 'Robot', image: 'img/robot.jpg' }
  ],
  'Render': [
    { title: 'Interiér', image: 'img/interier.jpg' }
  ],
  'Animace': [
    { title: 'Letící dron', image: 'img/drone.jpg' }
  ],
  'Portrét': [
    { title: 'Ateliérový portrét', image: 'img/portret1.jpg' },
    { title: 'Černobílý profil', image: 'img/portret2.jpg' }
  ],
  'Krajina': [
    { title: 'Západ slunce', image: 'img/krajina1.jpg' },
    { title: 'Lesní cesta', image: 'img/krajina2.jpg' }
  ],
  'Město': [
    { title: 'Noční Praha', image: 'img/mesto1.jpg' }
  ]
};

categories.forEach(category => {
  category.addEventListener('click', () => {
    const cat = category.getAttribute('data-category');
    const subcat = document.getElementById(`subcategory-${cat}`);

    subcategories.forEach(sc => sc.style.display = 'none');
    projectContainer.style.display = 'none';
    categorySection.style.display = 'none';
    categories.forEach(c => c.classList.remove('active'));

    subcat.style.display = 'flex';
    category.classList.add('active');
  });
});

document.querySelectorAll('.close').forEach(closeBtn => {
  closeBtn.addEventListener('click', () => {
    closeBtn.parentElement.parentElement.style.display = 'none';
    categories.forEach(c => c.classList.remove('active'));
    categorySection.style.display = 'flex';
  });
});

document.querySelectorAll('.subcategory').forEach(sub => {
  sub.addEventListener('click', () => {
    const subName = sub.getAttribute('data-sub');
    const items = projectData[subName] || [];

    projectTitle.textContent = subName;
    projectList.innerHTML = '';

    items.forEach(item => {
      const div = document.createElement('div');
      div.className = 'project-item';

      const title = document.createElement('div');
      title.textContent = item.title;
      div.appendChild(title);

      if (item.image) {
        const img = document.createElement('img');
        img.src = item.image;
        div.appendChild(img);
      } else if (item.model) {
        const wrapper = document.createElement('div');
        wrapper.style.position = 'relative';
      
        const modelViewer = document.createElement('model-viewer');
        modelViewer.setAttribute('src', item.model);
        modelViewer.setAttribute('alt', item.title);
        modelViewer.setAttribute('auto-rotate', '');
        modelViewer.setAttribute('camera-controls', '');
        modelViewer.setAttribute('ar', '');
        modelViewer.style.width = '200px';
        modelViewer.style.height = '200px';
        wrapper.appendChild(modelViewer);
      
        const zoomBtn = document.createElement('button');
        zoomBtn.textContent = '🔍';
        zoomBtn.style.position = 'absolute';
        zoomBtn.style.bottom = '10px';
        zoomBtn.style.right = '10px';
        zoomBtn.style.padding = '5px 10px';
        zoomBtn.style.backgroundColor = 'rgba(0,0,0,0.5)';
        zoomBtn.style.color = 'white';
        zoomBtn.style.border = 'none';
        zoomBtn.style.borderRadius = '5px';
        zoomBtn.style.cursor = 'pointer';
      
        zoomBtn.addEventListener('click', () => {
          document.querySelectorAll('.category-container, .subcategory-container, #projects').forEach(el => {
            el.style.maxWidth = 'none';
          });

          const fullscreenWrapper = document.createElement('div');
          fullscreenWrapper.style.position = 'absolute';
          fullscreenWrapper.style.top = '0';
          fullscreenWrapper.style.left = '0';
          fullscreenWrapper.style.width = '100%';
          fullscreenWrapper.style.height = '100%';
          fullscreenWrapper.style.zIndex = '999';
          fullscreenWrapper.style.backgroundColor = 'white';
          fullscreenWrapper.style.display = 'flex';
          fullscreenWrapper.style.justifyContent = 'center';
          fullscreenWrapper.style.alignItems = 'center';
      
          const fullscreenViewer = document.createElement('model-viewer');
          fullscreenViewer.setAttribute('src', item.model);
          fullscreenViewer.setAttribute('alt', item.title);
          fullscreenViewer.setAttribute('auto-rotate', '');
          fullscreenViewer.setAttribute('camera-controls', '');
          fullscreenViewer.setAttribute('ar', '');
          fullscreenViewer.style.width = '100%';
          fullscreenViewer.style.height = '100%';

          const closeBtn = document.createElement('button');
          closeBtn.textContent = '✖';
          closeBtn.style.position = 'absolute';
          closeBtn.style.top = '100px';
          closeBtn.style.right = '20px';
          closeBtn.style.zIndex = '1000';
          closeBtn.style.fontSize = '20px';
          closeBtn.style.padding = '10px';
          closeBtn.style.backgroundColor = 'rgba(0,0,0,0.5)';
          closeBtn.style.color = 'white';
          closeBtn.style.border = 'none';
          closeBtn.style.borderRadius = '5px';
          closeBtn.style.cursor = 'pointer';
      
          closeBtn.addEventListener('click', () => {
            fullscreenWrapper.remove();
            // Obnovení původních stylů po zavření fullscreen
            document.querySelectorAll('.category-container, .subcategory-container, #projects').forEach(el => {
              el.style.maxWidth = '900px'; // nebo původní hodnoty pro váš layout
            });
          });
      
          fullscreenWrapper.appendChild(fullscreenViewer);
          fullscreenWrapper.appendChild(closeBtn);
          projectContainer.appendChild(fullscreenWrapper);
        });

        wrapper.appendChild(zoomBtn);
        div.appendChild(wrapper);
      }

      projectList.appendChild(div);
    });

    sub.parentElement.style.display = 'none';
    projectContainer.style.display = 'flex';
  });
});

document.querySelector('.back').addEventListener('click', () => {
  projectContainer.style.display = 'none';
  categories.forEach(cat => {
    if (cat.classList.contains('active')) {
      const catName = cat.getAttribute('data-category');
      document.getElementById(`subcategory-${catName}`).style.display = 'flex';
    }
  });
});
