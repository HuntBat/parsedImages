const form = document.getElementById('search-form');
const queryInput = document.getElementById('query');
const gallery = document.querySelector('.gallery');

form.addEventListener('submit', e => {
    e.preventDefault();
    const query = queryInput.value;
    searchImages(query);
});

async function searchImages(query) {
    const unsplashAccessKey = 'Your Unsplash Access Key';
    const unsplashResponse = await fetch(`https://api.unsplash.com/search/photos?page=1&query=${query}&per_page=20`, {
        headers: {
            Authorization: `Client-ID ${unsplashAccessKey}`,
        },
    });
    const unsplashData = await unsplashResponse.json();
    const unsplashImages = unsplashData.results.map(result => {
        return {
            id: result.id,
            src: result.urls.regular,
            url: result.links.html,
            alt_description: result.alt_description || '',
        };
    });

    const pexelsApiKey = 'Your Pexels Access Key';
    const pexelsResponse = await fetch(`https://api.pexels.com/v1/search?query=${query}&per_page=20`, {
        headers: {
            Authorization: pexelsApiKey,
        },
    });
    const pexelsData = await pexelsResponse.json();
    const pexelsImages = pexelsData.photos.map(photo => {
        return {
            id: photo.id,
            src: photo.src.medium,
            url: photo.url,
            alt_description: photo.alt_description || '',
        };
    });

    const allImages = [...unsplashImages, ...pexelsImages];
    displayImages(allImages);
}

function displayImages(images) {
    gallery.innerHTML = '';
    images.forEach(image => {
        const img = document.createElement('img');
        img.src = image.src;
        img.alt = image.alt_description;
        const link = document.createElement('a');
        link.href = image.url;
        link.setAttribute("target", "_blank")
        link.appendChild(img);
        gallery.appendChild(link);
    });
}

