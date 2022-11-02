import css from './Phonebook.module.css';
import { Phonebook } from './Phonebook';

export const App = () => {
  return (
    <div className={css.phonebookContainer}>
      <Phonebook onChange={values => console.log(values)} />
    </div>
  );
};
