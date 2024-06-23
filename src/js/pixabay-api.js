// export function getPhotos(query) {
//     const BASE_URL = 'https://pixabay.com/api/';
//     const API_KEY = '44405907-01ac5a46b548f68b2a274235a'

//     const params = {
//         q: query,
//         image_type: 'photo',
//         orientation: 'horizontal',
//         safesearch: true,
//         key: API_KEY,
//     }

//     const options = new URLSearchParams(params);
//     return fetch(`${BASE_URL}?${options}`).then(res => {
//         if (!res.ok) {
//             throw new Error('Error!');
//         }
//         return res.json();
//     });
// }


// =================================================== var 2 ================================================================
// ===============доступ к API =============================
const API_KEY = '44405907-01ac5a46b548f68b2a274235a';
const BASE_URL = 'https://pixabay.com/api/';

// ========================= функция для HTTP запросов  ======================================
export async function getPhotos(query) {
    // необходим URL к нему добавить данные ключа + базовый + параметры 
    const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&safesearch=true`; 
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.hits;
    } catch (error) {
        console.error('Error fetching the images:', error);
        throw error;
    }
}