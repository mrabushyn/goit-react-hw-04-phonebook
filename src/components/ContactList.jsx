import React from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import css from './Phonebook.module.css';

export const ContactList = ({ value, onDeleteContact }) => (
  <ul>
    {value.map(contact => (
      <li key={(contact.id = nanoid())} className={css.contactList}>
        {contact.name}: {contact.number}
        <button
          type="onClick"
          onClick={() => {
            onDeleteContact(contact.id);
          }}
          className={css.delBtnStyle}
        >
          Delete
        </button>
      </li>
    ))}
  </ul>
);

ContactList.propTypes = {
  onDeleteContact: PropTypes.func.isRequired,
  value: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};
