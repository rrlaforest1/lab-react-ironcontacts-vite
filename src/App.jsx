import "./App.css";
import { useState } from "react";
import jsonData from "./contacts.json";

function App() {
  const [contacts, setContacts] = useState(jsonData.slice(0, 5));

  const handleAddContact = () => {
    const contactsLeft = jsonData.filter(
      (contact) => !contacts.includes(contact)
    );
    const randomContact =
      contactsLeft[
        Math.floor(Math.random() * (jsonData.length - contacts.length))
      ];

    setContacts([...contacts, randomContact]);
  };

  const handleSortByPopularity = () => {
    const copy = [...contacts];

    copy.sort((a, b) => {
      return b.popularity - a.popularity;
    });

    setContacts(copy);
  };

  const handleSortByName = () => {
    const copy = [...contacts];

    copy.sort((a, b) => {
      return a.name.localeCompare(b.name, undefined, { sensivity: "base" });
    });
    setContacts(copy);
  };

  const handleRemoveContact = (id) => {
    const afterRemovedContact = contacts.filter((contact) => contact.id !== id);

    setContacts(afterRemovedContact);
  };

  return (
    <>
      <div className="App">
        <h1>LAB | React IronContacts</h1>
      </div>

      <nav>
        <button onClick={handleAddContact}>Add Random Contact</button>
        <button onClick={handleSortByPopularity}>Sort by Popularity</button>
        <button onClick={handleSortByName}>Sort by Name</button>
      </nav>

      <table>
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>
              Won an
              <br />
              Oscar
            </th>
            <th>
              Won an
              <br />
              Emmy
            </th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => {
            return (
              <tr key={contact.id}>
                <td>
                  <img
                    style={{
                      width: "4rem",
                    }}
                    src={contact.pictureUrl}
                    alt={contact.name}
                  />
                </td>
                <td>
                  <h2>{contact.name}</h2>
                </td>
                <td>
                  <p>{contact.popularity}</p>
                </td>
                <td>{contact.wonOscar && <p>🏆</p>}</td>
                <td>{contact.wonEmmy && <p>🌟</p>}</td>
                <td>
                  <button onClick={() => handleRemoveContact(contact.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default App;
