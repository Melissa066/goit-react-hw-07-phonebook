import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, addContact, removeContact } from './AsyncRedux';
import Notiflix from 'notiflix';


const initialState = {
    items: [],
    isLoading: false,
    error: null,
}

export const contactsSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchContacts.pending](state) {
        state.isLoading = true;
        },
        [fetchContacts.fulfilled](state, { payload }) {
        state.isLoading = false;
        state.error = null;
        state.items = payload;
        },
        [fetchContacts.rejected](state, { payload }) {
        state.isLoading = false;
        state.error = payload;
        },
        [addContact.pending](state) {
        state.isLoading = true;
        },
        [addContact.fulfilled](state, { payload }) {
        state.isLoading = false;
        state.error = null;
        state.items.push(payload);
        Notiflix.Notify.success('CONTACT ADDED');
        },
        [addContact.rejected](state, { payload }) {
        state.addingLoader = false;
        state.error = payload;
        },
        [removeContact.fulfilled](state, { payload }) {
        state.error = null;
        state.items = state.items.filter(item => item.id !== payload);
        Notiflix.Notify.info('CONTACT DELETED');
        },
        [removeContact.rejected](state, { payload }) {
        state.error = payload;
        },
    },
});

export const getContacts = state => state.contacts;