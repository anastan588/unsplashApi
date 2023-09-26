const mainBlock = document.querySelector('.main_block');

console.log(mainBlock);

const unsplashKey = '16CYfG0BbuvnQaL10Vr0RVWxRc_0teGkUIGD6urT6U8';

function createImageBlock(url) {
  const imageItem = document.createElement('div');
  const imagePicture = document.createElement('img');
  imageItem.classList.add('image_item');
  imagePicture.classList.add('image_api');
  imagePicture.src = url;
  imageItem.append(imagePicture);
  mainBlock.append(imageItem);
}

function downLoadPicturesOnPage() {
  const unsplashURL = `https://api.unsplash.com/photos/?client_id=${unsplashKey}`;
  const reponse = fetch(unsplashURL).then((data) => {
    console.log(data);
    const pictures = data.json();
    console.log(pictures);
    pictures.then((response) => {
      const pictureArray = response;
      console.log(pictureArray);
      for (let i = 0; i < pictureArray.length - 1; i += 1) {
        const url = pictureArray[i].urls.full;
        console.log(url);
        createImageBlock(url);
      }
    });
  });
}

downLoadPicturesOnPage();
