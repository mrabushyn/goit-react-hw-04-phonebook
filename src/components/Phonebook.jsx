import { useState } from 'react';
import PropTypes from 'prop-types';

import { Filter } from './Filter';
import { ContactList } from './ContactList';
import ContactForm from './ContactForm';
import useLocalStorage from '../hooks/useLocalStorage'

export default function Phonebook() {
  const [contacts, setContacts] = useLocalStorage('CONTACTS', '[]');
  const [filter, setFilter] = useState('');

  const formSubmitHandler = ({ name, number }) => {
    const normalizedSameName = name.toLowerCase();
    const findSameEl = contacts.find(
      contact => contact.name.toLowerCase() === normalizedSameName
    );
    findSameEl
      ? alert(`${name} is already in contacts`)
      : setContacts([...contacts, { name, number }]);
  };

  const changeFilter = evt => {
    setFilter(evt.currentTarget.value);
  };

  const deleteContact = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
  };

  const normalizedFilter = filter.toLowerCase();
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter)
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <ContactForm onSubmit={formSubmitHandler} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />
      <ContactList value={filteredContacts} onDeleteContact={deleteContact} />
    </div>
  );
}


Phonebook.propTypes = {
  onChange: PropTypes.func.isRequired,
};
