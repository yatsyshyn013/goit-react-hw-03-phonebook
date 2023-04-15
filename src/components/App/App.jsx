import React, { Component } from 'react'

import { PhoneBookContainer } from './App.styled';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from 'components/Filter/Filter';




class App extends Component {
  state = {
  contacts: [],
  filter: '',
} 
  
  onAddContactBtn = (newContact) => {
      this.setState(prevState => ({
        contacts: [...prevState.contacts, newContact]
        }
      ))
      localStorage.setItem('contact', JSON.stringify(newContact))
    }
  
  
  getFilteredContacts = () => {
    const { filter, contacts } = this.state;
    const normalizeTarget = filter.toLowerCase();
    return contacts.filter(contact => contact.name.toLowerCase().includes(normalizeTarget));
    // console.log(filteredContacts);

  }

  deleteButton = id => {
    this.setState(prevState => ({
        contacts: prevState.contacts.filter(contact => contact.id !== id)
      }
    ))
  }

  componentDidMount() {
    const contacts = localStorage.getItem("contact");
    const parsedContacts = JSON.parse(contacts);
    this.setState({ contacts: [parsedContacts]})
    console.log(parsedContacts);
  }

  
  render() { 
    const { filter, contacts } = this.state;
    const visibleContacts = this.getFilteredContacts();

  
    return (
      <PhoneBookContainer>
        <h1>PhoneBook</h1>
        <ContactForm
          contacts={contacts}
          onAddContactBtn={this.onAddContactBtn}
        />

        <h2>Contacts</h2>
        <Filter
          onChange={e => {
            this.setState({ filter: e.target.value })}}
          value={filter}
        />
        <ContactList
          contacts={visibleContacts}
          deleteButton={this.deleteButton}
        />
    </PhoneBookContainer>
    );
  }
}
 
export default App; 
