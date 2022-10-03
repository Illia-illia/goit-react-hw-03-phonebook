import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Formik, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { Wrap, FormContact, Label, Input, Button } from './App.styled';
import { Section } from './Section/Section';
import { ContactsList } from './ContactsList/ContactsList';

const nameValidate =
  "^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$";
const phoneValidate = RegExp(
  /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
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
                <Input type="text" name="name"></Input>
                <ErrorMessage component="div" name="name" />
              </Label>
              <Label>
                Number
                <Input type="tel" name="number"></Input>
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
