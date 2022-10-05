import { List, Item } from './ContactsList.styled';

export const ContactsList = ({ contacts }) => {
  return (
    <List>
      {contacts.map(({ id, name, number }) => {
        return (
          <Item key={id}>
            {name}: {number}
          </Item>
        );
      })}
    </List>
  );
};
