import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Formik } from 'formik';
import * as yup from 'yup';
import {
  Wrap,
  FormContact,
  Label,
  Input,
  Button,
  ErrorText,
} from './App.styled';
import { Section } from './Section/Section';
import { Filter } from './Filter/Filter';
import { ContactsList } from './ContactsList/ContactsList';

const nameValidate =
  "^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$";
const phoneValidate = RegExp(
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{1,3}\\)[ \\-]*)|([0-9]{1,4})[ \\-]*)*?[0-9]{1,4}?[ \\-]*[0-9]{1,9}?$/
);

const schema = yup.object().shape({
  name: yup
    .string()
    .required()
    .matches(
      nameValidate,
      "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
    ),
  number: yup
    .string()
    .required()
    .matches(
      phoneValidate,
      'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
    ),
});

const initialValues = {
  name: '',
  number: '',
};

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    name: '',
    filter: '',
  };

  addContact = name => {
    this.setState(prevState => ({
      contacts: [name, ...prevState.contacts],
    }));
  };

  filterContact = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  onFiltredContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  render() {
    const handleSubmit = (values, { resetForm }) => {
      values.id = nanoid();
      this.addContact(values);
      resetForm();
    };
    return (
      <Wrap>
        <Section title={`Phonebook`}>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={schema}
          >
            <FormContact autoComplete="off">
              <Label>
                Name
                <Input type="text" name="name"></Input>
                <ErrorText component="div" name="name" />
              </Label>
              <Label>
                Number
                <Input type="tel" name="number"></Input>
                <ErrorText component="div" name="number" />
              </Label>
              <Button type="submit">Add contact</Button>
            </FormContact>
          </Formik>
        </Section>
        <Section title={`Contacts`}>
          <Filter filter={this.filter} filterContact={this.filterContact} />
          <ContactsList contacts={this.onFiltredContacts()} />
        </Section>
      </Wrap>
    );
  }
}
