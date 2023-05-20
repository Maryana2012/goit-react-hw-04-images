import { Component } from 'react';
// import Notiflix from 'notiflix';
// import { RotatingLines } from "react-loader-spinner";
import css from '../ImageGallery/ImageGallery.module.css'
import ImageGalleryItem from "components/ImageGalleryItem/ImageGalleryItem"
import Button from 'components/Button/Button';
import { getImages } from 'components/galleryResponse';

export default class ImageGallery extends Component {
    state = {
        valueInput: '',
        gallery: [],
        // loading: false,
        page: 1,
        totalHits: 0,
        error: null
        
    }
 
    componentDidUpdate(prevProps, prevState) {
        console.log(this.state.valueInput);
        const { valueInput, page } = this.state;
        if (prevProps.valueInput !== this.props.valueInput || prevState.page!==this.state.page) {
            //  this.setState({loading: true, valueInput: ''})
            this.handleResponse(this.props.valueInput, page);
            }
    }
    
    handleResponse = async (query, page) => {
        try {
            console.log(query);
            const response = await getImages(query, page);
            // console.log(response);
            this.setState(prevState => ({
                gallery: [...prevState.gallery, ...response.hits],
                totalHits: response.totalHits
            }))
        }
        catch (error) {
            console.log(error);
            this.state({ error });
        }
   }

    handleLoadMore = ()  => {
        this.setState(prevState => ({page: prevState.page + 1}))
    }
   
    render() {
        const {gallery,loading,error}=this.state;
        // const { hits } = gallery;
        console.log(gallery);
        return (<>
             <ul className={css.ImageGallery}>
                {/* {loading && <RotatingLines />}  */}
                {gallery.map(image => <ImageGalleryItem
                    key={image.id}
                    image={image.webformatURL}
                    alt={image.tags} />)}
            </ul>
            {this.state.gallery.length < this.state.totalHits && 
            <Button handleLoadMore={this.handleLoadMore } /> }
             </>
       
            )
       
    
    }
}