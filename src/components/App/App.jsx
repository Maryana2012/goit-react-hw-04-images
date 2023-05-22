import { useState } from "react";
import axios from "axios";
import Button from "components/Button/Button";
import Searchbar from "components/Searchbar/Searchbar";
import ImageGallery from "components/ImageGallery/ImageGallery";
import Modal from "components/Modal/Modal";
import { RotatingLines } from "react-loader-spinner";
import Notiflix from 'notiflix';
import css from '../App/App.module.css'
 
export default function App() {
    const [hits, setHits] = useState([]);
    const [name, setName] = useState('');
    const [page, setPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [modalImage, setModalImage] = useState('');
    const [loadMore, setLoadMore] = useState(false);
    
        
const imageRequest = async (name, page)=> {        
    setLoading(true);
  
        const BASE_KEY = '34725568-3bb6c7550daf8cb631b41e469';
        try {
            const response = await axios(`https://pixabay.com/api/?q=${name}&page=${page}&key=${BASE_KEY}&image_type=photo&orientation=horizontal&per_page=12`);
                if (response.data.hits.length < 1) {
                    setLoading(false);
                    setLoadMore(false)
                    Notiflix.Notify.info('There are no images for your request')
                    return;
            }
            setLoading(false);
            setHits([...hits, ...response.data.hits]);
            setPage(page + 1);
            setLoadMore(true);

            if (response.data.hits.length < 12) {
                setLoading(false);
                setLoadMore(false);
            }          
            return response.data.hits;
        }
        catch (error) {
           console.log(error);
        }
  }

const createInput=() => {
       setHits([]) 
    }  
    
const getValue = (name, page) => {
    setName(name);
    setPage(page);
    const response = imageRequest(name, page);
    return response;
    }       
    
const openModal = largeImageURL => {
     setShowModal(true);
     setModalImage(largeImageURL);
    }

const toggleModal = () => {
     setShowModal(!showModal)
    }

return (<>
    <Searchbar onSubmit={getValue}
        onSubmitInput={createInput}
    />
              {loading && <RotatingLines />}
              {hits && (<ImageGallery articles={hits}
                      onImgClick={openModal} />)}
              {showModal && (
                <Modal onClose={ toggleModal }>
                <img src={modalImage} alt="largeImage" className={css.Image} />
                </Modal> )}
              { (loadMore && hits.length !==0)  && (<Button onButtonClick={ () => imageRequest(name, page) } />)}
              </>
             )   
}
