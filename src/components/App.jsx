import { useState } from 'react';
import { useEffect } from 'react';

import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

export const App = () => {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);

  const [filter, setFilter] = useState('');

  
   // metoda cyklu życiowego komponentu wywoływana po tym, jak komponent został umieszczony(zamontowany) 
   // w drzewie komponentów React. próba pobrania danych z lokalnego magazynu (localStorage) pod kluczem 'contacts'.
    useEffect(() => { // componentDidMount
    const json = JSON.stringify(contacts);
    localStorage.setItem('contacts', json);
  }, [contacts]);  
  
  useEffect(() => { // componentDidMount
    try {
      const json = localStorage.getItem('contacts');
      const parsedContacts = JSON.parse(json);

      if (parsedContacts) {
        setContacts(parsedContacts);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  const addContact = e => {
    const loweredCase = e.name.toLowerCase().trim();

    const exists = contacts.some(
      contact => contact.name.toLowerCase().trim() === loweredCase
    );

    if (exists) {
      alert(`${e.name} is already in contacts!`);
    } else {
      setContacts([...contacts, e]);
    }
  };

  const addFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const filteredContacts = contacts.filter(contact => {
    return contact.name.toLowerCase().includes(filter.toLowerCase());
  });

  const deleteContact = id => {
   setContacts(prevContacts => prevContacts.filter(contact => contact.id !== id));
};
// brak render przy hookach
    return (
        <div>
          <ContactForm addContact={addContact} />
          <ContactList
            contacts={filteredContacts}
            deleteContact={deleteContact}
          >
            <Filter filter={filter} addFilter={addFilter} />
          </ContactList>
        </div>
    );
  }



