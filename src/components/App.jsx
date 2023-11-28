import { useState } from 'react';
import { useEffect } from 'react';

import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

export const App = () => {
  const [contacts, setContacts] = useState(
  JSON.parse(localStorage.getItem('contacts')) || []
  );
  
  // Początkowy stan contacts jest ustawiany przy użyciu JSON.parse(localStorage.getItem('contacts')) || []. tutaj próba pobrania danych z localStorage. Jeżeli dane istnieją = parsowane, jeśli nie = pusta tablica [] jako początkowy stan.
// przydatne gdy użytkownik odwiedza stronę ponownie, a my chcemy zachować wcześniejszy stan. konieczne uzycie || [] - gdy danych nie ma / są uszkodzone

  const [filter, setFilter] = useState('');

  
   // metoda cyklu życiowego komponentu wywoływana po tym, jak komponent został umieszczony(zamontowany) 
   // w drzewie komponentów React. próba pobrania danych z lokalnego magazynu (localStorage) pod kluczem 'contacts'.
  
    // useEffect do pobierania danych z localStorage przy montowaniu komponentu
  useEffect(() => {
    try {
      const json = localStorage.getItem('contacts');
      const savedContacts = JSON.parse(json);

      if (savedContacts) {
        setContacts(savedContacts);
      }
    } catch (error) {
      console.log(error);
    }
  }
  );

  // useEffect do zapisywania danych do localStorage po aktualizacji stanu contacts
  useEffect(() => {
    const json = JSON.stringify(contacts);
    localStorage.setItem('contacts', json);
  }, [contacts]); // useEffect zostanie uruchomiony tylko po zmianie stanu contacts


  const addContact = e => {
    const loweredCase = e.name.toLowerCase().trim();

    const exists = contacts.some(
      contact => contact.name.toLowerCase().trim() === loweredCase
    );

    if (exists) {
      alert(`${e.name} is already in contacts!`);
    } else {
      setContacts([...contacts, e]); // uzycie setContacts zamiast 
      // this.setState(({ contacts }) => ({
      // contacts: [...contacts, e],
    }
  };

  const addFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const filteredContacts = contacts.filter(contact => { // const { filter, contacts } = this.state;
    //   // logika filtrowania na podstawie stanu filter
    return contact.name.toLowerCase().includes(filter.toLowerCase());
  });

  const deleteContact = id => {
  const filtered = contacts.filter(contact => contact.id !== id);
  setContacts(filtered);
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



