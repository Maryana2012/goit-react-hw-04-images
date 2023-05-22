import { useState} from 'react';
import PropTypes from 'prop-types';
import Notiflix from 'notiflix';
import css from '../Searchbar/Searchbar.module.css'

export default function Searchbar(props) {
    const [name, setName] = useState('');
    const [page] = useState(1);
 
    const handleChange = e => {
        const { value } = e.currentTarget;
        setName(value);
    }
    const handleSubmit = e => {
        e.preventDefault();
        if (name.trim() === '') {
            Notiflix.Notify.info('Enter word for request');
            return
        }
        props.onSubmit(name, page);
        setName('');
        
}
 return (<header className={css.Searchbar }>
                <form className={css.SearchForm} onSubmit={ handleSubmit } name={name}>
                    <button type="submit" className={ css.SearchFormButton}></button>
                    <input
                        className={css.SearchFormInput}
                        type="text"
                        onChange={handleChange }
                        autoComplete="off"
                        autoFocus
                        value={name}
                        placeholder="Search images and photos"
                        onFocus={props.onSubmitInput} 
                    />
                </form>
            </header>
    )
}

Searchbar.propTypes = {
    name: PropTypes.string,
    onSubmit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
}
    