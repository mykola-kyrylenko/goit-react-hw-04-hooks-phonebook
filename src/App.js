import React, { useState, useEffect } from 'react';
import ContactForm from './ContactForm/ContactForm'
import ContactList from './ContactList/ContactList'
import Filter from './Filter/Filter'
import s from './index.module.css'
// import { v4 as uuidv4 } from 'uuid';
  
const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

   useEffect(() => {
    const storagedContacts = localStorage.getItem('userContacts');
    if (storagedContacts) {
      setContacts(JSON.parse(storagedContacts));
    }
  }, []);
    
  useEffect(() => {
    localStorage.setItem('userContacts', JSON.stringify(contacts));
  }, [contacts]);
  
  const deleteCoontact = (contactId) => {
    setContacts.filter(cont => cont.id !== contactId.id)
  };

  const handleAddContact = addContact => {
    setContacts(prevState => [...prevState, addContact]);
  };
  console.log(contacts)

  const handleCheckUniqueContact = (name, number) => {
    const isExistContact = !!contacts.find((contacts) => contacts.name === name);
    const isExistNumber = !!contacts.find((contacts) => contacts.number === number);
    isExistContact && alert('Contact is already exist');
    isExistNumber && alert('Number is already exist');

    return !isExistContact 
   };
  
  const handleChangeFilter = filter => {
    setFilter(filter);
  };

  const getVisibleContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()),
    );
  };

  const visibleContacts = getVisibleContacts();

  return (
        <div className={s.container}>
          <h1>Number Book</h1>
          <ContactForm
            contacts={contacts}
            addContact={handleAddContact}
            uniqueName={handleCheckUniqueContact}         
          />
          <h2>Contacts</h2>
          <Filter
            filter={filter}
            onChange={handleChangeFilter} />
          <ContactList
            contacts={visibleContacts}
            onDeleteContact={deleteCoontact}
          />
        </div>
  );
};
  
export default App;

