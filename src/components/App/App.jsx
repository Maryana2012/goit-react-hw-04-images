import { useState } from "react";
import axios from "axios";
import Button from "components/Button/Button";
import Searchbar from "components/Searchbar/Searchbar";
import ImageGallery from "components/ImageGallery/ImageGallery";
import Modal from "components/Modal/Modal";
import { RotatingLines } from "react-loader-spinner";
import Notiflix from 'notiflix';
import css from '../App/App.module.css'
import { useEffect } from "react";

export default function App() {
    const [hits, setHits] = useState([]);
    const [name, setName] = useState('');
    const [page, setPage] = useState();
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [modalImage, setModalImage] = useState('');
    const [loadMore, setLoadMore] = useState(false);
    const [error, setError] = useState(null)

    useEffect(() => {
  console.log('prevHits:', hits);
        setHits([])
          console.log('after:', hits);
},[name])

    
 const getValue = (name, page) => {
        setName(name);
     setPage(page);
     console.log('prevHits:', hits);

     
     console.log('after:', hits);
    const response = imageRequest(name, page);
    return response;
}   
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
            setError(error);
        }
  }

    
    
const openModal = largeImageURL => {
     setShowModal(true);
     setModalImage(largeImageURL);
    }

const toggleModal = () => {
     setShowModal(!showModal)
    }

return (<div>
    <Searchbar onSubmit={getValue}
        // onSubmitInput={createInput}
    />
              {loading && <RotatingLines />}
              {hits && (<ImageGallery articles={hits}
                      onImgClick={openModal} />)}
              {showModal && (
                <Modal onClose={ toggleModal }>
                <img src={modalImage} alt="largeImage" className={css.Image} />
                </Modal> )}
              { loadMore && (<Button onButtonClick={ () => imageRequest(name, page) } />)}
              </div>
             )   
}
// export default class App extends Component{
//     state = {
//         hits: [],
//         name: '',
//         page: 1,
//         showModal: false,
//         loading: false,
//         modalImage: '',
//         loadMore: false
//     }
    // componentDidMount() {
    //     if (this.state.name === "") {
    //         this.setState({hits: []})
    //     }
    //    }
       
//     async imageRequest(name, page) {        
//         this.setState({ loading: true });
//         const BASE_KEY = '34725568-3bb6c7550daf8cb631b41e469';
//         try {
//             const response = await axios(`https://pixabay.com/api/?q=${name}&page=${page}&key=${BASE_KEY}&image_type=photo&orientation=horizontal&per_page=12`);
//                 if (response.data.hits.length < 1) {
//                 this.setState({
//                     loading: false,
//                     loadMore: false})
//                 Notiflix.Notify.info('There are no images for your request')
//                 return;
//             }
//             this.setState(({ loading, hits, page, }) => {
//                 return {
//                 loading: !loading,
//                 hits: [...hits,...response.data.hits],
//                 page: page + 1,
//                 }
//             });
//             this.setState({ loadMore: true });
//             if (response.data.hits.length < 12){
//                 this.setState({ loading: false, loadMore: false })
//              }
//             return response.data.hits;
//         }
//         catch (error) {
//             this.setState({ error });
//         }
//   }
  
//     getValue = data => {
//         this.setState({ name: data.name, page: data.page, hits: []});
//         const { name, page } = data;
//         const response = this.imageRequest(name, page);
//         return response;
//     }

//     openModal = largeImageURL => {
//         this.setState({
//           showModal: true,
//           modalImage: largeImageURL,
//         });
//     }

//     toggleModal = () => {
//         this.setState(({ showModal }) => ({
//             showModal: !showModal
//         }));
//     }

//     render() {
//        const { hits, showModal, name, page, loading, modalImage, loadMore } = this.state;
   
    //    return (<div>
    //           <Searchbar onSubmitHandler={ this.getValue } />
    //           {loading && <RotatingLines />}
    //           {hits && (<ImageGallery articles={hits}
    //                   onImgClick={this.openModal} />)}
    //           {showModal && (
    //             <Modal onClose={ this.toggleModal }>
    //             <img src={modalImage} alt="largeImage" className={css.Image} />
    //             </Modal> )}
    //           { loadMore && (<Button onButtonClick={ () => this.imageRequest(name, page) } />)}
    //           </div>
    //          )
//     }
// }
