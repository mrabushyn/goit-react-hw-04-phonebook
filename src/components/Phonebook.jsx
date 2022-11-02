import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Filter } from './Filter';
import { ContactList } from './ContactList';
import  ContactForm  from './ContactForm';

export class Phonebook extends Component {
  state = {
    contacts: [
      // { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      // { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      // { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      // { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('CONTACTS', JSON.stringify(this.state.contacts));
    }
  };

  componentDidMount = () => {
    const savedContacts = localStorage.getItem('CONTACTS');
    const parsedContacts = JSON.parse(savedContacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts })
    }
  }

  formSubmitHandler = data => {
    const { name, number } = data;
    const normalizedSameName = name.toLowerCase();
    const findSameEl = this.state.contacts.find(
      contact => contact.name.toLowerCase() === normalizedSameName
    );
    findSameEl
      ? alert(`${name} is already in contacts`)
      : this.setState({ contacts: [...this.state.contacts, { name, number }] });
  };

  changeFilter = evt => {
    this.setState({ filter: evt.currentTarget.value });
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
    return (
      <div>
        <h2>Phonebook</h2>
        <ContactForm onSubmit={this.formSubmitHandler} />
        <h2>Contacts</h2>
        <Filter value={filter} onChange={this.changeFilter} />
        <ContactList
          value={filteredContacts}
          onDeleteContact={this.deleteContact}
        />
      </div>
    );
  }
}

Phonebook.propTypes = {
  onChange: PropTypes.func.isRequired,
};
