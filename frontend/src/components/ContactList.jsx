/* eslint-disable react/prop-types */
import "./ContactList.css";

export default function ContactList({
  contactList,
  isLoading,
  loadingText,
  onDelete,
}) {
  return (
    <>
      {isLoading && <p className="fallback-text">{loadingText}</p>}
      {!isLoading && (
        <table className="result">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>e-mail</th>
              <th>Phone</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {contactList.map((item, index) => (
              <tr key={index}>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>
                  <button>Update</button>
                </td>
                <td>
                  <button onClick={() => onDelete(item.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
