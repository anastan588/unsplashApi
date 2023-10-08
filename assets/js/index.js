const mainBlock = document.querySelector('.main_block');
const searchButton = document.querySelector('.search_button');
const searchInput = document.querySelector('.search_field');
const overlay = document.querySelector('.overlay');

console.log(mainBlock);

const unsplashKey = '16CYfG0BbuvnQaL10Vr0RVWxRc_0teGkUIGD6urT6U8';

function searchInputFocus() {
  searchInput.placeholder = 'Enter theme';
  searchInput.autofocus = true;
}

function createImageBlock(url) {
  const imageItem = document.createElement('div');
  const imagePicture = document.createElement('img');
  imageItem.classList.add('image_item');
  imagePicture.classList.add('image_api');
  imagePicture.src = url;
  imageItem.append(imagePicture);
  imageItem.addEventListener('click', (event)=>makePictureOnFullScreen(event));
  mainBlock.append(imageItem);
}

function recieveRandomPage() {
  const randomNumber = Math.ceil(Math.random() * 100);
  return randomNumber;
}

function downLoadPicturesOnPage() {
  const numberOfPage = recieveRandomPage();
  console.log(numberOfPage);
  const unsplashURL = `https://api.unsplash.com/photos?page=${numberOfPage}&orientation=landscape&client_id=${unsplashKey}`;
  const reponse = fetch(unsplashURL).then((data) => {
    console.log(data);
    const pictures = data.json();
    console.log(pictures);
    pictures.then((response) => {
      const pictureArray = response;
      console.log(pictureArray);
      for (let i = 0; i < pictureArray.length - 1; i += 1) {
        const url = pictureArray[i].urls.small;
        createImageBlock(url);
      }
    });
  });
}
searchInputFocus();
downLoadPicturesOnPage();

function downLoadPicturesBySearch() {
  const query = searchInput.value;
  const numberOfPage = recieveRandomPage();
  const unsplashURL = `https://api.unsplash.com/search/photos?query=${query}&page=${numberOfPage}&orientation=landscape&client_id=${unsplashKey}`;
  const reponse = fetch(unsplashURL).then((data) => {
    console.log(data);
    const pictures = data.json();
    console.log(pictures);
    pictures.then((response) => {
      const pictureArray = response.results;
      console.log(pictureArray);
      mainBlock.innerHTML = '';
      for (let i = 0; i < pictureArray.length - 1; i += 1) {
        const url = pictureArray[i].urls.small;
        createImageBlock(url);
      }
    });
  });
}

function makePictureOnFullScreen(event) {
  const currentTarget = event.currentTarget;
  console.log(currentTarget);
  if(!currentTarget.classList.contains('image_item')) {
    return;
  }
  const pictureOnFullScreenWindow = document.createElement('div');
  pictureOnFullScreenWindow.classList.add('popup-container');
  const fullScreenItem = document.createElement('div');
  const fullScreenPicture = document.createElement('img');
  fullScreenItem.classList.add('fullscreen_item');
  fullScreenPicture.classList.add('fullscreen_api');
  console.log(currentTarget.children[0]);
  fullScreenPicture.src = currentTarget.children[0].src;
  fullScreenItem.append(fullScreenPicture);
  pictureOnFullScreenWindow.append(fullScreenItem);
  overlay.classList.add('display_block');
  document.body.prepend(pictureOnFullScreenWindow);

}

function removePictureOnFullScreen() {
  overlay.classList.remove('display_block');
  const pictureOnFullScreenWindow = document.querySelector('.popup-container');
  pictureOnFullScreenWindow.remove();
}

searchButton.addEventListener('click', downLoadPicturesBySearch);
searchInput.addEventListener('change', downLoadPicturesBySearch);

overlay.addEventListener('click', removePictureOnFullScreen);

document.addEventListener('keydown', function(event) {
  if (event.code ==='Enter') {
    downLoadPicturesBySearch();
  }
});