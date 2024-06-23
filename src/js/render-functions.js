import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

export function clearResults(container) {
    container.innerHTML = '';
}

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

    // Инсталяция библиотеки 
    const lightbox = new SimpleLightbox('.gallery a');
    lightbox.refresh();
}

//  библиотека ИзиТоаст 
export function showToast(type, message) {
    iziToast[type]({
        title: type.charAt(0).toUpperCase() + type.slice(1),
        message: message,
    });
}