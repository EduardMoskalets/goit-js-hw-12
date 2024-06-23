// import SimpleLightbox from "simplelightbox";
// import "simplelightbox/dist/simple-lightbox.min.css";
// import iziToast from "izitoast";
// import "izitoast/dist/css/iziToast.min.css";

// export function clearResults(container) {
//     container.innerHTML = '';
// }

// export function renderImages(images, container) {
//     const markup = images.map(image => `
//         <a href="${image.largeImageURL}" class="gallery__item">
//             <img src="${image.webformatURL}" alt="${image.tags}" class="gallery__image" />
//             <div class="info">
//                 <p class="info-item"><b>Likes:</b> ${image.likes}</p>
//                 <p class="info-item"><b>Views:</b> ${image.views}</p>
//                 <p class="info-item"><b>Comments:</b> ${image.comments}</p>
//                 <p class="info-item"><b>Downloads:</b> ${image.downloads}</p>
//             </div>
//         </a>
//     `).join('');
    
//     container.insertAdjacentHTML('beforeend', markup);

//     // Инсталяция библиотеки
//     const lightbox = new SimpleLightbox('.gallery a');
//     lightbox.refresh();
// }

// export function showLoadMoreButton(buttonElement) {
//     buttonElement.classList.remove('hidden');
// }

// export function hideLoadMoreButton(buttonElement) {
//     buttonElement.classList.add('hidden');
// }

// //  библиотека ИзиТоаст
// export function showToast(type, message) {
//     iziToast[type]({
//         title: type.charAt(0).toUpperCase() + type.slice(1),
//         message: message,
//     });
// }

// // =====================================Скролл ==============================================
// export function scrollToNextGroup() {
//     const galleryHeight = document.querySelector('.gallery').scrollHeight;
//     window.scrollBy({
//         top: galleryHeight,
//         behavior: 'smooth'
//     });
// }

// =============================Вариант 2====================================================================

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

export function clearResults(container) {
    container.innerHTML = '';
}
//  =========================== редер ======================================
export function renderImages(images, container) {
    const markup = images.map(image => `
        <a href="${image.largeImageURL}" class="gallery__item">
            <img src="${image.webformatURL}" alt="${image.tags}" class="gallery__image" />
            <div class="info">
                <p class="info-item"><b>Likes:</b> ${image.likes}</p>
                <p class="info-item"><b>Views:</b> ${image.views}</p>
                <p class="info-item"><b>Comments:</b> ${image.comments}</p>
                <p class="info-item"><b>Downloads:</b> ${image.downloads}</p>
            </div>
        </a>
    `).join('');
    
    container.insertAdjacentHTML('beforeend', markup);

    const lightbox = new SimpleLightbox('.gallery a');
    lightbox.refresh();
}

// ======================================= библиотека изи тоаст ==========================
export function showToast(type, message) {
    iziToast[type]({
        title: type.charAt(0).toUpperCase() + type.slice(1),
        message: message,
    });
}

//  ============================ переключение =======================================
export function toggleLoadMoreButton(show) {
    const loadMoreButton = document.querySelector('.load-more');
    loadMoreButton.classList.toggle('hidden', !show);
}


// ======================= функция скролл пейдж =======================================
export function scrollPage() {
    const { height: cardHeight } = document
        .querySelector('.gallery__item')
        .getBoundingClientRect();

    window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
    });
}
