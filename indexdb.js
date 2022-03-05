// console.log('hello')

// const request = indexedDB.open('translate');

// request.onupgradeneeded = (e) => {
//     console.log('upgrade')
//     const db = e.target.result;

//     // creating tables
//     const translateT = db.createObjectStore('phrases')
// }

// request.onsuccess = (e) => {
//     console.log('success')
// }

// request.onerror = (e) => {
//     console.log('error')
// }

// ------------------------------------
if('serviceWorker' in navigator){
    console.log('Service worker Supported')
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./serviceworker2.js')
        .then(res => res)
        .catch(error => console.log(error))
    })
}


// const observer = new MutationObserver((mutations, observer) => {
//     console.log(mutations);
//     console.log(observer);
// });

// observer.observe(document, {
//     subtree: true,
//     attributes: true
// });