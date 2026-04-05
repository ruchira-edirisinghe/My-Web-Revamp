/**
 * Artworks Gallery Modal Logic
 * Handles immersive full-screen viewing of artworks.
 */
(function() {
    'use strict';

    const modal = document.getElementById('artwork-modal');
    const modalImg = document.getElementById('modal-img');
    const closeBtn = document.getElementById('modal-close');
    const masonryItems = document.querySelectorAll('.masonry-item');

    if (!modal || !modalImg || !closeBtn) return;

    /**
     * Open Modal
     * @param {string} src - Source of the high-res image
     * @param {string} title - Title text
     * @param {string} desc - Description text
     */
    function openModal(src) {
        modalImg.src = src;
        
        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden'; // Lock scroll
    }

    /**
     * Close Modal
     */
    function closeModal() {
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = ''; // Restore scroll
        
        // Clear src after transition to prevent "flash" of previous image next time
        setTimeout(() => {
            modalImg.src = '';
        }, 400);
    }

    // Attach listeners to masonry items
    masonryItems.forEach(item => {
        const img = item.querySelector('.artwork-img');
        const viewBtn = item.querySelector('.view-btn');
        const highResUrl = viewBtn ? viewBtn.getAttribute('href') : img.src;

        // Click on the card/image
        item.addEventListener('click', (e) => {
            // If the viewBtn was clicked, the viewBtn listener handles it
            if (e.target.closest('.view-btn')) return;
            
            openModal(highResUrl);
        });

        // Click on the View Button specifically
        if (viewBtn) {
            viewBtn.addEventListener('click', (e) => {
                e.preventDefault(); // Stop from opening in new tab
                e.stopPropagation();
                openModal(highResUrl);
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
