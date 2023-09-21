import { Image, Item } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ images, onImageClick }) => {
  return images.map(({ id, webformatURL, largeImageURL, tags }) => {
    return (
      <Item key={id}>
        <Image
          src={webformatURL}
          alt={tags}
          onClick={() => onImageClick(largeImageURL, tags)}
        />
      </Item>
    );
  });
};

export default ImageGalleryItem;
