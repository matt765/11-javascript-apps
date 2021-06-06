
    const cat_result = document.getElementById('cat');
    const dog_result = document.getElementById('dog');

    const cat_btn = document.getElementById('cat-btn');
    const dog_btn = document.getElementById('dog-btn');

    cat_btn.addEventListener('click', getRandomCat);
    dog_btn.addEventListener('click', getRandomDog);
    getRandomCat();
    getRandomDog();
        function getRandomCat() {
        fetch('https://aws.random.cat/meow')
            .then(res => res.json())
            .then(data => {
                cat_result.innerHTML = `<img src="${data.file}" />`;
            });
        }

        function getRandomDog() {
        fetch('https://random.dog/woof.json')
            .then(res => res.json())
            .then(data => {
                if (data.url.includes('.mp4')) {
                    getRandomDog();
                } else {
                    dog_result.innerHTML = `<img src="${data.url}" />`;
                }
            });
        }
       