/**
 * Artworks Gallery Modal Logic
 * Handles immersive full-screen viewing of artworks.
 */
(function() {
    'use strict';

    const modal = document.getElementById('artwork-modal');
    const modalImg = document.getElementById('modal-img');
    const modalTag = document.getElementById('modal-tag');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const closeBtn = document.getElementById('modal-close');
    const masonryItems = document.querySelectorAll('.masonry-item, .wallpaper-item');

    if (!modal || !modalImg || !closeBtn) return;

    /**
     * Open Modal
     * @param {string} src - Source of the high-res image
     * @param {string} title - Title text
     * @param {string} desc - Description text
     */
    function openModal(src, tag, title, desc) {
        modalImg.src = src;
        if (modalTag) modalTag.textContent = tag || '';
        if (modalTitle) modalTitle.textContent = title || '';
        if (modalDesc) modalDesc.textContent = desc || '';
        
        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden'; // Lock scroll
        document.body.classList.add('modal-active'); // For hiding other elements
    }

    /**
     * Close Modal
     */
    function closeModal() {
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = ''; // Restore scroll
        document.body.classList.remove('modal-active');
        
        // Clear src and text after transition to prevent "flash" of previous data next time
        setTimeout(() => {
            modalImg.src = '';
            if (modalTag) modalTag.textContent = '';
            if (modalTitle) modalTitle.textContent = '';
            if (modalDesc) modalDesc.textContent = '';
        }, 400);
    }

    // Attach listeners to masonry items
    masonryItems.forEach(item => {
        const img = item.querySelector('.artwork-img');
        const viewBtn = item.querySelector('.view-btn');
        const info = item.querySelector('.artwork-info');
        
        const highResUrl = viewBtn ? viewBtn.getAttribute('href') : (img.getAttribute('data-highres') || img.src);
        const tag = info ? info.querySelector('.info-tag')?.textContent : '';
        const title = info ? info.querySelector('.info-title')?.textContent : '';
        const desc = info ? info.querySelector('.info-sub')?.textContent : '';

        // Click on the card/image
        item.addEventListener('click', (e) => {
            // If the viewBtn was clicked, the viewBtn listener handles it
            if (e.target.closest('.view-btn')) return;
            
            openModal(highResUrl, tag, title, desc);
        });

        // Click on the View Button specifically
        if (viewBtn) {
            viewBtn.addEventListener('click', (e) => {
                e.preventDefault(); // Stop from opening in new tab
                e.stopPropagation();
                openModal(highResUrl, tag, title, desc);
            });
        }
    });

    // Close button click
    closeBtn.addEventListener('click', closeModal);

    // Click outside image to close
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Escape key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('open')) {
            closeModal();
        }
    });
})();
