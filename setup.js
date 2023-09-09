$(document).ready(function () {
  const breakpoint = 1024;
  // Hide the drag handle on small screens
  const dragHandle = document.getElementById('dragHandle');
  dragHandle.style.display = window.innerWidth < breakpoint ? 'none' : 'block';

  // Hide or show the top tabs based on screen size
  const topTabs = document.querySelector('.top-tabs'); // Select the top tabs container
  if (window.innerWidth < breakpoint) {
      topTabs.style.display = 'flex'; // Show top tabs on small screens
  }

  // Handle tab switching for small screens
  const tabs = document.querySelectorAll('.top-tab');
  const containers = document.querySelectorAll('.resizable-container');

  tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
          const containerId = tab.getAttribute('data-container');
          containers.forEach((container) => {
              if (container.id === containerId) {
                  container.style.display = 'block';
              } else {
                  container.style.display = 'none';
              }
          });

          // Activate the clicked tab
          tabs.forEach((t) => {
              t.classList.remove('active');
          });
          tab.classList.add('active');
      });
  });

  // Reference to container elements
  const container1 = document.getElementById('container1');
  const container2 = document.getElementById('container2');

  // Flag to track dragging state
  let isDragging = false;

  // Initial container widths (50% each)
  let initialWidth1 = window.innerWidth / 2;
  let initialWidth2 = window.innerWidth / 2;

  // Set initial container widths
  container1.style.width = initialWidth1 + 'px';
  container2.style.width = initialWidth2 + 'px';

  // Add mousedown event listener to the drag handle
  dragHandle.addEventListener('mousedown', (e) => {
      isDragging = true;
      initialWidth1 = container1.offsetWidth;
      initialWidth2 = container2.offsetWidth;
  });

  // Add mouseup event listener to stop dragging
  document.addEventListener('mouseup', () => {
      isDragging = false;
  });

  // Add mousemove event listener to handle dragging
  document.addEventListener('mousemove', (e) => {
      if (!isDragging) return;

      // Calculate new widths based on mouse position
      const mouseX = e.clientX;
      const newWidth1 = mouseX - container1.getBoundingClientRect().left;
      const newWidth2 = window.innerWidth - newWidth1;
      dragHandle.style.left = newWidth1 + 'px';

      // Set new container widths
      container1.style.width = newWidth1 + 'px';
      container2.style.width = newWidth2 + 'px';
  });
  const tab1 = document.querySelector('[data-container="container1"]');
  const tab2 = document.querySelector('[data-container="container2"]');
  // Update the drag handle visibility on window resize
  window.addEventListener('resize', () => {
    
      if (window.innerWidth < breakpoint) {
          topTabs.style.display = 'flex'; // Show top tabs on small screens
          dragHandle.style.display = 'none'; // Hide the drag handle
          container1.style.width = '100%';
          container2.style.width = '100%';
          container1.style.display = 'block';
          container2.style.display = 'none';
          tab1.classList.add('active');
          tab2.classList.add('remove');
      } else {
          topTabs.style.display = 'none'; // Hide top tabs on larger screens
          dragHandle.style.display = 'block'; // Show the drag handle
          container1.style.display = 'block';
          container2.style.display = 'block';
      }
  });
});