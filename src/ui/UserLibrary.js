import { useState } from "react";

function UserLibrary() {
  const [books, setBooks] = useState([{ isbn: "111111" }]);

  const handleAddBook = (event) => {
      console.log(event)
    setBooks(function (books) {
        return [...books, { isbn: "123456789" }]
    });
  };

  return (
    <>
      <button onClick={handleAddBook}>Add book</button>
      <ul>
        {books.map((book, index) => (
          <li key={index}>{book.isbn}</li>
        ))}
      </ul>
    </>
  );
}

export default UserLibrary;
