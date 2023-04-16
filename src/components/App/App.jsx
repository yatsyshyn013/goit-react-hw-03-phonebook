import React, { Component } from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

    if (parsedContacts) {
       this.setState({ contacts: parsedContacts})
    // console.log(parsedContacts);
    }
   
  }

  // componentDidUpdate(prevProps, prevState) {
  //   const prevState = this.state.contacts;
  //   const nextState = this.state.contacts;

  //   if (prevState !== nextState) {
  //     localStorage.setItem('contact', JSON.stringify(nextState))
  //   }
  // }

  componentDidUpdate(prevProps, prevState) {
    const prevContacts = prevState.contacts;
    const nextContacts = this.state.contacts;

    if (prevContacts !== nextContacts) {
      localStorage.setItem('contact', JSON.stringify(nextContacts))
    }
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
        <ToastContainer
          autoClose={3000}
          position="top-center"
          theme="colored"
/>
      </PhoneBookContainer>
      
    );
  }
}
 
export default App; 
