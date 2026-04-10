/**
 * LyCampus Case Study Modal Logic
 * Specialized for the high-fidelity UI gallery with navigation.
 */
(function() {
    'use strict';

    function initLyceumModal() {
        const modal = document.getElementById('cs-modal');
        const modalImg = document.getElementById('cs-modal-img');
        const modalTitle = document.getElementById('cs-modal-title');
        const modalCounter = document.getElementById('cs-modal-counter');
        const closeBtn = document.getElementById('cs-modal-close');
        const prevBtn = document.getElementById('cs-modal-prev');
        const nextBtn = document.getElementById('cs-modal-next');

        if (!modal || !modalImg) return;

        // Collect unique images from the gallery
        const galleryItems = [];
        const seenUrls = new Set();
        
        const uiCards = document.querySelectorAll('.ui-card');
        uiCards.forEach(card => {
            const fullUrl = card.getAttribute('data-full');
            const title = card.querySelector('.ui-card-label')?.textContent || '';
            
            if (fullUrl && !seenUrls.has(fullUrl)) {
                seenUrls.add(fullUrl);
                galleryItems.push({
                    url: fullUrl,
                    title: title
                });
            }
        });

        let currentIndex = 0;
        let isZoomed = false;
        let currentScrollY = 0; // Track scroll position when zoomed
        let isDragging = false;
        let startY = 0;
        let startScrollY = 0;
        let hasDragged = false; // Prevent zoom toggle if user was dragging
        
        const zoomBtn = document.getElementById('cs-modal-zoom');
        const container = modal.querySelector('.cs-modal-container');

        /**
         * Update Modal Content
         */
        function updateModal() {
            const item = galleryItems[currentIndex];
            if (!item) return;

            resetZoom();

            // Subtle out-in transition for the image
            modalImg.style.opacity = '0';
            modalImg.style.transform = 'translateY(0) scale(0.98)';
            
            // Set values
            modalTitle.textContent = item.title;
            modalCounter.textContent = `${currentIndex + 1} / ${galleryItems.length}`;
            
            // Setup load trigger BEFORE setting src
            modalImg.onload = () => {
                modalImg.style.opacity = '1';
                modalImg.style.transform = 'translateY(0) scale(1)';
            };
            modalImg.src = item.url;

            // Handle already cached images
            if (modalImg.complete) {
                modalImg.style.opacity = '1';
                modalImg.style.transform = 'translateY(0) scale(1)';
            }
        }

        /**
         * Zoom Logic
         */
        function toggleZoom() {
            if (window.innerWidth <= 900) return; // Strictly PC only
            
            isZoomed = !isZoomed;
            if (isZoomed) {
                resetZoom(); // Clear any previous state before activating
                isZoomed = true; // Re-enable after reset
                modalImg.classList.add('zoomed');
                container.classList.add('is-zoomed');
                container.style.cursor = 'grab';
                console.log('Lyceum Zoom Activated - Starting at top');
            } else {
                resetZoom();
            }
        }

        function resetZoom() {
            isZoomed = false;
            currentScrollY = 0;
            isDragging = false;
            modalImg.classList.remove('zoomed');
            if (container) {
                container.classList.remove('is-zoomed');
                container.style.cursor = '';
            }
            modalImg.style.transform = 'translateY(0)';
        }

        /** ── NAVIGATION: SCROLL & DRAG ── **/

        // 1. Wheel (Scroll) Logic
        container?.addEventListener('wheel', (e) => {
            if (!isZoomed || window.innerWidth <= 900) return;
            e.preventDefault();

            const imageHeight = modalImg.offsetHeight;
            const containerHeight = container.offsetHeight;
            const overflow = imageHeight - containerHeight;
            if (overflow <= 0) return;

            currentScrollY = Math.max(0, Math.min(currentScrollY + e.deltaY, overflow));
            modalImg.style.transform = `translateY(-${currentScrollY}px)`;
        }, { passive: false });

        // 2. Grab-to-Scroll (Drag) Logic
        container?.addEventListener('mousedown', (e) => {
            if (!isZoomed || window.innerWidth <= 900) return;
            isDragging = true;
            hasDragged = false;
            startY = e.pageY;
            startScrollY = currentScrollY;
            container.style.cursor = 'grabbing';
            e.preventDefault();
        });

        window.addEventListener('mousemove', (e) => {
            if (!isDragging || !isZoomed) return;
            
            const deltaY = startY - e.pageY;
            // Threshold to distinguish between drag and click
            if (Math.abs(deltaY) > 5) hasDragged = true;

            const imageHeight = modalImg.offsetHeight;
            const containerHeight = container.offsetHeight;
            const overflow = imageHeight - containerHeight;
            if (overflow <= 0) return;

            currentScrollY = Math.max(0, Math.min(startScrollY + deltaY, overflow));
            modalImg.style.transform = `translateY(-${currentScrollY}px)`;
        });

        window.addEventListener('mouseup', () => {
            if (!isDragging) return;
            isDragging = false;
            if (container) container.style.cursor = 'grab';
        });

        window.addEventListener('mouseleave', () => {
             if (isDragging) {
                 isDragging = false;
                 if (container) container.style.cursor = 'grab';
             }
        });

        /** ── OPEN / CLOSE ── **/
        function openModal(index) {
            currentIndex = index;
            resetZoom();
            updateModal();
            
            modal.classList.add('open');
            modal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
            console.log('Lyceum Modal Opened at index:', index);
        }

        /**
         * Close Modal
         */
        function closeModal() {
            modal.classList.remove('open');
            modal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
            resetZoom();
            
            // Reset src after transition
            setTimeout(() => {
                modalImg.src = '';
            }, 500);
        }

        /**
         * Navigation
         */
        function showNext() {
            currentIndex = (currentIndex + 1) % galleryItems.length;
            resetZoom();
            updateModal();
        }

        function showPrev() {
            currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
            resetZoom();
            updateModal();
        }

        // Attach listeners to cards
        uiCards.forEach(card => {
            card.style.cursor = 'pointer'; 
            card.addEventListener('click', (e) => {
                e.preventDefault();
                const url = card.getAttribute('data-full');
                const index = galleryItems.findIndex(item => item.url === url);
                if (index !== -1) openModal(index);
            });
        });

        // Control Listeners
        closeBtn?.addEventListener('click', closeModal);
        zoomBtn?.addEventListener('click', (e) => { e.stopPropagation(); toggleZoom(); });
        prevBtn?.addEventListener('click', (e) => { e.stopPropagation(); showPrev(); });
        nextBtn?.addEventListener('click', (e) => { e.stopPropagation(); showNext(); });

        // Click outside image area or on image to close/zoom
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });

        modalImg.addEventListener('click', (e) => {
            e.stopPropagation();
            if (hasDragged) return; // Don't toggle zoom if we just finished a drag
            if (window.innerWidth > 900) toggleZoom(); // Only PC
        });

        // Keyboard support
        document.addEventListener('keydown', (e) => {
            if (!modal.classList.contains('open')) return;
            
            if (e.key === 'Escape') closeModal();
            if (e.key === 'ArrowRight') showNext();
            if (e.key === 'ArrowLeft') showPrev();
            if (e.key === ' ' || e.key === 'z') toggleZoom(); // Support space or 'z' for zoom
        });
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLyceumModal);
    } else {
        initLyceumModal();
    }

})();

