import { galleryItems } from "./gallery-items.js";
// Change code below this line

const gallery = document.querySelector(".gallery");
let galleryMarkup = "";

galleryItems.forEach((galleryItem) => {
  galleryMarkup += `<div class="gallery__item">
  <a class="gallery__link" href="${galleryItem.original}">
    <img
      class="gallery__image"
      src="${galleryItem.preview}"
      data-source="${galleryItem.original}"
      alt="${galleryItem.description}"
    />
  </a>
</div>`;
});
gallery.insertAdjacentHTML("afterbegin", galleryMarkup);

gallery.addEventListener("click", onImageClick);
function onImageClick(event) {
  event.preventDefault();

  if (event.target.nodeName !== "IMG") {
    return;
  }

  const originalImgUrl = event.target.dataset.source;
  const instance = basicLightbox.create(`
    <img src="${originalImgUrl}" width="800" height="600">
`);
  instance.show();

  document.addEventListener("keydown", onEscPress);
  function onEscPress(event) {
    if (event.code === "Escape") {
      instance.close();
      console.log("onEscPress");
      document.removeEventListener("keydown", onEscPress);
    }
  }

  const lightboxGalleryClass = instance.element().classList[0];
  //   console.log(instanceClass);
  const lightboxGallery = document.querySelector(`.${lightboxGalleryClass}`);
  lightboxGallery.addEventListener("click", onGalleryClick);
  function onGalleryClick(event) {
    document.removeEventListener("keydown", onEscPress);
  }
}
