    const images = document.querySelectorAll('img');

    const loadImage = (image) => {
        const imageUrl = image.dataset.src

        fetchImage(imageUrl)
            .then(() => {
                image.src = imageUrl
                delete image.dataset.src // https://developer.mozilla.org/es/docs/Web/API/HTMLElement/dataset#Setting_values
                observer.unobserve(image)
            })
            .catch(() => {
                image.src = 'assets/placeholder-error.webp'
            })

    }

    const fetchImage = (url) => {
        return new Promise ((resolve, reject) => {
            const image = new Image();

            image.src = url
            image.onload = resolve
            image.onerror = reject
        })
    }

    const handleIntersection = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.intersectionRatio > 0) {
                loadImage(entry.target)
            }
        })
    }

    const options = {
        rootMargin: '0px',
        threshold: 0.1
     };

    const observer = new IntersectionObserver(handleIntersection, options);

    images.forEach(image => {
        observer.observe(image)        
    })

   
