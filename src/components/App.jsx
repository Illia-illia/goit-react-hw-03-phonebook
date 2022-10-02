import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Formik, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { Wrap, FormContact, Label, Input, Button } from './App.styled';
import { Section } from './Section/Section';
import { ContactsList } from './ContactsList/ContactsList';

const schema = yup.object().shape({
  name: yup.string().required(),
  number: yup.number().required(),
});

const initialValues = {
  name: '',
  number: '',
};

export class App extends Component {
  state = {
    contacts: [],
    name: '',
  };

  addContact = name => {
    this.setState(prevState => ({
      contacts: [name, ...prevState.contacts],
    }));
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
                <Input
                  type="text"
                  name="name"
                  pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                  title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                ></Input>
                <ErrorMessage component="div" name="name" />
              </Label>
              <Label>
                Number
                <Input
                  type="tel"
                  name="number"
                  pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                  title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                ></Input>
                <ErrorMessage component="div" name="number" />
              </Label>
              <Button type="submit">Add contact</Button>
            </FormContact>
          </Formik>
        </Section>
        <Section title={`Contacts`}>
          <ContactsList contacts={this.state.contacts} />
        </Section>
      </Wrap>
    );
  }
}
