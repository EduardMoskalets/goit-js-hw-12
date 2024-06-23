// ================= Импорт с JS файлов ==============================
import { getPhotos } from './js/pixabay-api.js';
import { clearResults, renderImages, showToast } from './js/render-function.js';

//  ======== все элементы =========
const searchForm = document.getElementById('searchForm');
const searchQueryInput = document.getElementById('searchQuery');
const resultsContainer = document.getElementById('results');


// ============== слушатель ========================
searchForm.addEventListener('submit', async (event) => {
    event.preventDefault();
// =============== если нет значения =================
    const query = searchQueryInput.value.trim();
    if (!query) {
        showToast('error', 'Search query cannot be empty');
        return;
    }

    clearResults(resultsContainer);
    showLoadingIndicator();
// ================= фото ==================
    try {
        const images = await getPhotos(query);
        hideLoadingIndicator();

        if (images.length > 0) {
            renderImages(images, resultsContainer);
        } else {
            showToast('info', 'Sorry, there are no images matching your search query. Please try again!');
        }
    } catch (error) {
        hideLoadingIndicator();
        showToast('error', 'Something went wrong. Please try again later.');
    }
});

// =====================================================================

// =============== добавление в разметку лоадер =========================
function showLoadingIndicator() {
    resultsContainer.innerHTML = '<div class="loader"></div>';
}

// ================ откл лоадера ===============================================
function hideLoadingIndicator() {
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.remove();
    }
}