import { Component } from 'react';

import Searchbar from 'components/Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Button from 'components/Button/Button';
import Loader from 'components/Loader/Loader';
import Modal from 'components/Modal/Modal';

import { getImage } from 'services/getImageAPI';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container, Image } from './App.styled';

class App extends Component {
  state = {
    searchValue: '',
    page: 1,
    hits: null,
    isLoader: false,
    isLoadBtn: false,
    modalData: null,
  };

  componentDidUpdate(_, prevState) {
    const { searchValue, page } = this.state;

    if (searchValue !== prevState.searchValue || page !== prevState.page)
      this.fetchImage();
  }

  fetchImage = async () => {
    const { searchValue, page } = this.state;

    try {
      this.setState({ isLoader: true });

      const data = await getImage(searchValue, page);

      if (!data.totalHits) {
        toast.warning(
          `"${searchValue}" not found. Please enter something else.`
        );
        return;
      }

      const lastPage = Math.ceil(data.totalHits / 12);
      if (page === lastPage) {
        this.setState({ isLoadBtn: true });
        toast.info('Thats all images');
      }

      this.setState(prev => ({ hits: [...prev.hits, ...data.hits] }));
    } catch (error) {
      toast.error('Something went wrong. Please try again later.');
    } finally {
      this.setState({ isLoader: false });
    }
  };

  handleSubmit = searchValue => {
    this.setState({ searchValue, page: 1, hits: [], isLoadBtn: false });
  };

  handleLoadMore = () => {
    this.setState(prev => ({ page: prev.page + 1 }));
  };

  // toggleModal = () => {
  //   this.setState(prev => ({ showModal: !prev.showModal }));
  // };

  handleImageClick = (largeImageURL, tags) => {
    this.setState({ modalData: { modalImage: largeImageURL, tags } });
    // this.toggleModal();
  };

  closeModal = () => {
    this.setState({ modalData: null });
    // this.toggleModal();
  };

  render() {
    const { hits, isLoader, isLoadBtn, modalData } = this.state;
    const showLoadBtn = hits && hits.length > 0 && !isLoadBtn;
    return (
      <Container>
        <Searchbar onSubmit={this.handleSubmit} />

        {isLoader && <Loader />}

        {hits && (
          <ImageGallery>
            <ImageGalleryItem
              images={hits}
              onImageClick={this.handleImageClick}
            />
          </ImageGallery>
        )}

        {showLoadBtn && <Button onBtnClick={() => this.handleLoadMore()} />}

        {modalData && (
          <Modal onClose={this.closeModal}>
            <Image src={modalData.modalImage} alt={modalData.tags} />
          </Modal>
        )}

        <ToastContainer autoClose={3000} theme="colored" />
      </Container>
    );
  }
}

export default App;
