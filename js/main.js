// check the localStorage
let mainColor = localStorage.getItem('color');
let mainRandomBg = localStorage.getItem('randomBackground');
let mainShowBullets = localStorage.getItem('showBullets');

const colorSwitchers = Array.from(document.querySelectorAll('.colors-list li'));
const randomBgEl = document.querySelectorAll('.settings-box .yesorno.random-bg span');
const navBullets = document.querySelectorAll('.settings-box .yesorno.show-nav-bullets span');
const aboutImage = document.querySelector('.about-us .image-box img');

let backgroundOption = true,
    backgroundInterval;

if (mainColor !== null) {
    document.documentElement.style.setProperty('--main-color', mainColor);
    aboutImage.src = `./images/${mainColor.slice(1)}.png`;
    colorSwitchers.forEach(switcher => {
        if (mainColor === switcher.dataset.color) {
            switcher.className = 'active';
        }
    });
} else {
    colorSwitchers[0].className = 'active';
}

if (mainRandomBg !== null) {
    if (mainRandomBg === 'true') {
        backgroundOption = true;
        randomBgEl[0].className = 'active';
    } else {
        backgroundOption = false;
        randomBgEl[1].className = 'active';
    }
} else {
    randomBgEl[0].className = 'active';
}

if (mainShowBullets !== null) {
    if (mainShowBullets === 'true') {
        document.querySelector('.nav-bullets').style.display = 'block';
        navBullets[0].classList.add('active');
    } else {
        document.querySelector('.nav-bullets').style.display = 'none';
        navBullets[1].classList.add('active');
    }
} else {
    navBullets[0].classList.add('active');
}

// landing page background image
let landingPage = document.querySelector('.landing-page'),
    images = ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg'],
    currentBackground = 0;

createBullets();

let bullets = Array.from(document.querySelectorAll('.bullets span'));

randomBackgrounds();

// switch random background

randomBgEl.forEach(element => {
    element.addEventListener('click', (e) => {
        handleActive(e);
        backgroundOption = (e.target.dataset.randombg === 'true');
        setToLocalStorage('randomBackground', backgroundOption);
        if (backgroundOption) {
            randomBackgrounds();
        } else {
            clearInterval(backgroundInterval);
        }
    });
});

navBullets.forEach(element => {
    element.addEventListener('click', (e) => {
        handleActive(e);
        if (e.target.dataset.show === 'true') {
            document.querySelector('.nav-bullets').style.display = 'block';
            setToLocalStorage('showBullets', true);
        } else {
            document.querySelector('.nav-bullets').style.display = 'none';
            setToLocalStorage('showBullets', false);
        }
    });
});

function randomBackgrounds() {
    if (backgroundOption) {
        backgroundInterval = setInterval(() => {
            bullets.forEach(bullet => {
                bullet.classList.remove('active');
            });
            currentBackground++;
            if (currentBackground % images.length === 0)
                currentBackground = 0;
            landingPage.style.backgroundImage = `url(./images/${images[currentBackground]})`;
            bullets[currentBackground].classList.add('active');
        }, 10000);
    }
}

function createBullets() {
    for (let i = 0; i < images.length; i++) {
        let bullet = document.createElement('span');
        bullet.className = 'bullet';
        if (i == 0) {
            bullet.classList.add('active');
        }
        bullet.addEventListener('click', (e) => {
            landingPage.style.backgroundImage = `url(./images/${images[i]})`;
            handleActive(e);
        });
        document.querySelector('.bullets').appendChild(bullet);
    }
}

// Toggle rotation button

document.querySelector('.settings-box i').onclick = function() {
    document.querySelector('.settings-box').classList.toggle('open');
};

// switch colors
colorSwitchers.forEach(element => {
    element.addEventListener('click', (e) => {
        document.documentElement.style.setProperty('--main-color', e.target.dataset.color);
        handleActive(e);
        aboutImage.src = `./images/${e.target.dataset.color.slice(1)}.png`;
        setToLocalStorage('color', e.target.dataset.color);
    });
});

function setToLocalStorage(key, option) {

    localStorage.removeItem(key);
    localStorage.setItem(key, option);
}

// skills selector
let ourSkills = document.querySelector('.skills');

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {
        let spans = document.querySelectorAll('.skills .skill-box span');
        if (entry.isIntersecting) {
            spans.forEach(span => {
                span.style.width = span.dataset.progress;
            });
            return;
        }
        spans.forEach(span => {
            span.style.width = "0";
        });
    });

});

observer.observe(ourSkills);

// create our gallery images
for (let i = 1; i <= 10; i++) {
    let image = document.createElement('img');
    image.src = `./images/${i}.jpg`;
    image.alt = `image ${i}`;
    image.addEventListener('click', (e) => {
        let overlay = document.createElement('div');
        overlay.className = 'popup-overlay';

        document.body.appendChild(overlay);

        let popup = document.createElement('div');
        popup.className = 'popup-box';

        let image = document.createElement('img');
        image.src = e.target.src;
        image.alt = `${i}`;

        popup.appendChild(image);

        let closeButton = document.createElement('i');
        closeButton.className = 'close fas fa-times-circle';
        closeButton.addEventListener('click', (e) => {
            overlay.remove();
            popup.remove();
        });

        let arrowRight = document.createElement('i'),
            arrowLeft = document.createElement('i');
        arrowRight.className = 'arrow right fas fa-arrow-right';
        arrowLeft.className = 'arrow fas left fa-arrow-left';

        arrowLeft.onclick = function() {
            let img = document.querySelector('.popup-box img');
            let currentImg = parseInt(img.alt) - 1;
            if ((currentImg % 10) === 0)
                currentImg = 10;

            img.src = `./images/${currentImg}.jpg`;
            img.alt = currentImg;
        }
        arrowRight.onclick = function() {
            let img = document.querySelector('.popup-box img');
            let currentImg = parseInt(img.alt) + 1;
            if ((currentImg % 11) === 0)
                currentImg = 1;

            img.src = `./images/${currentImg}.jpg`;
            img.alt = currentImg;
        }

        popup.append(arrowLeft, arrowRight);
        popup.appendChild(closeButton);
        document.body.appendChild(popup);
    });
    document.querySelector('.gallery .images-box').appendChild(image);
}

// Select all bullets

const allBullets = document.querySelectorAll('.nav-bullets .bullet');
scrollToElement(allBullets);
const allLinks = document.querySelectorAll('.links a');
scrollToElement(allLinks);


function scrollToElement(elements) {
    elements.forEach(element => {
        element.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

function handleActive(event) {
    event.target.parentElement.querySelectorAll('.active').forEach(element => {
        element.classList.remove('active');
    });
    event.target.classList.add('active');
}

document.querySelector('.reset-option').onclick = reset;

function reset() {
    localStorage.removeItem('color');
    localStorage.removeItem('showBullets');
    localStorage.removeItem('randomBackground');
    window.location.reload();
}

let menuBtn = document.querySelector('.toggle-menu');
let tlinks = document.querySelector('.links');

menuBtn.onclick = function(e) {

    e.stopPropagation();

    menuBtn.classList.toggle('menu-active');
    tlinks.classList.toggle('open');
};

tlinks.onclick = function(e) {
    e.stopPropagation();
};

document.addEventListener('click', (e) => {
    if (e.target !== menuBtn && e.target !== tlinks) {
        if (tlinks.classList.contains('open')) {
            tlinks.classList.remove('open');
            menuBtn.classList.remove('menu-active');
        }
    }
});