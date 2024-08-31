import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchContacts, removeContact } from '../../redux/AsyncRedux'
import { getContacts } from '../../redux/contactsSlice';
import { getFilter } from '../../redux/filterSlice';
import styles from "./ContactList.module.css";

export default function ContactList() {
    
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchContacts());
    }, [dispatch]);

    const {items, error, isLoading} = useSelector(getContacts);
    const filter = useSelector(getFilter);

    const getFilteredContacts = () => {
        if (!filter) {
            return items;
        }
        
        return items.filter(({name}) => name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()))
    }

    const contactsToRender = getFilteredContacts()

    return (
        <ul className={styles.list}>
            {error && <div>Something went wrong, please, try again</div>}
            {contactsToRender.map(item =>
            <li className={styles.item} key={item.id}>
                <p>{item.name}: {item.number}</p>
                <button type='button' className={styles.button} onClick={() => dispatch(removeContact(item.id))}>delete</button>
            </li>)
            }
            {isLoading && <div>Loading...</div>}
        </ul>
    );
}