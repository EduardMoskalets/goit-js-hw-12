// // // ================= Импорт с JS файлов ==============================
// import { getPhotos } from './js/pixabay-api.js';
// import {
//     clearResults,
//     renderImages,
//     showToast,
//     showLoadMoreButton,
//     hideLoadMoreButton,
//     showLoader,
//     hideLoader,
//     scrollToNextGroup
// } from './js/render-functions.js'

// //  ======== все элементы =========
// const searchForm = document.getElementById('searchForm');
// const searchQueryInput = document.getElementById('searchQuery');
// const resultsContainer = document.getElementById('results');
// // const loadMoreBtn = document.querySelector('.load-more');

// // ============значения ======================================
// let query = '';
// let page = 1;
// let totalHits = 0;
// const PER_PAGE = 15;

// // ============== слушатель ========================
// searchForm.addEventListener('submit', async (event) => {
//     event.preventDefault();
// // =============== если нет значения =================
//     const query = searchQueryInput.value.trim();
//     if (!query) {
//         showToast('error', 'Search query cannot be empty');
//         return;
//     }

//     clearResults(resultsContainer);
//     showLoadingIndicator();
// // ================= фото ==================
//     try {
//         const images = await getPhotos(query);
//         hideLoadingIndicator();

//         if (images.length > 0) {
//             renderImages(images, resultsContainer);
//         } else {
//             showToast('info', 'Sorry, there are no images matching your search query. Please try again!');
//         }
//     } catch (error) {
//         hideLoadingIndicator();
//         showToast('error', 'Something went wrong. Please try again later.');
//     }
// });

// // =====================================================================

// // =============== добавление в разметку лоадер =========================
// function showLoadingIndicator() {
//     resultsContainer.innerHTML = '<div class="loader"></div>';
// }

// // ================ откл лоадера ===============================================
// function hideLoadingIndicator() {
//     const loader = document.querySelector('.loader');
//     if (loader) {
//         loader.remove();
//     }
// }

// =========================================================================================
// ======================================вариант 2=======================================

import { getPhotos } from './js/pixabay-api.js';
import { clearResults, renderImages, showToast, toggleLoadMoreButton, scrollPage } from './js/render-functions.js';

const searchForm = document.getElementById('searchForm');
const searchQueryInput = document.getElementById('searchQuery');
const resultsContainer = document.getElementById('results');
const loadMoreButton = document.querySelector('.load-more');

let currentPage = 1;
let currentQuery = '';

searchForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const query = searchQueryInput.value.trim();
    if (!query) {
        showToast('error', 'Search query cannot be empty');
        return;
    }

    currentQuery = query;
    currentPage = 1;
    clearResults(resultsContainer);
    toggleLoadMoreButton(false);
    showLoadingIndicator();
    
    try {
        const { hits, totalHits } = await getPhotos(query, currentPage);
        hideLoadingIndicator();

        if (hits.length > 0) {
            renderImages(hits, resultsContainer);
            toggleLoadMoreButton(currentPage * 15 < totalHits);
        } else {
            showToast('info', 'Sorry, there are no images matching your search query. Please try again!');
        }
    } catch (error) {
        hideLoadingIndicator();
        showToast('error', 'Something went wrong. Please try again later.');
    }
});

loadMoreButton.addEventListener('click', async () => {
    currentPage++;
    showLoadingIndicator();
    
    try {
        const { hits, totalHits } = await getPhotos(currentQuery, currentPage);
        hideLoadingIndicator();

        if (hits.length > 0) {
            renderImages(hits, resultsContainer);
            scrollPage();
            toggleLoadMoreButton(currentPage * 15 < totalHits);
        }

        if (currentPage * 15 >= totalHits) {
            showToast('info', "We're sorry, but you've reached the end of search results.");
        }
    } catch (error) {
        hideLoadingIndicator();
        showToast('error', 'Something went wrong. Please try again later.');
    }
});

function showLoadingIndicator() {
    resultsContainer.insertAdjacentHTML('beforeend', '<div class="loader"></div>');
}

function hideLoadingIndicator() {
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.remove();
    }
}
