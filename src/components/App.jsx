import { Component } from 'react';
// import { nanoid } from 'nanoid';
import { Formik, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { Wrap, FormContact, Label, Input, Button } from './App.styled';

const schema = yup.object().shape({ name: yup.string().required() });

const initialValues = {
  name: '',
};

export class App extends Component {
  state = {
    contacts: [],
    name: '',
  };
  render() {
    const handleSubmit = (values, { resetForm }) => {
      console.log(values);
      this.setState(() => ({
        name: values,
      }));
      console.log('state', this.state);
      resetForm();
    };
    return (
      <Wrap>
        <h1>Phonebook</h1>
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
            <Button type="submit">Add contact</Button>
          </FormContact>
        </Formik>
        <ul></ul>
      </Wrap>
    );
  }
}
