import { useEffect, useState, useRef, useCallback } from "react";
import { addContact, fetchContacts, deleteContact } from "../http";

import ContactList from "./ContactList";
import AddContact from "./AddContact";
import Error from "./Basic/Error";
import Modal from "./Basic/Modal";
import DeleteConfirmation from "./Basic/DeleteConfirmation";

export default function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [isFetching, setIsFetching] = useState();
  const [error, setError] = useState();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const selectedContact = useRef();

  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);
      try {
        const contactsData = await fetchContacts();
        setContacts(contactsData);
      } catch (error) {
        setError({
          message: error.message || "Failed to fetch user contacts.",
        });
      }
      setIsFetching(false);
    }

    fetchData();
  }, [selectedContact]);

  async function handleAddContact(newContact) {
    try {
      await addContact(newContact);
      setContacts([newContact, ...contacts]);
    } catch (error) {
      setError({
        message: error.message || "Failed to update places.",
      });
    }
  }

  function handleStartDeleteContact(id) {
    setModalIsOpen(true);
    selectedContact.current = id;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  const handleDeleteContact = useCallback(async function handleDeleteContact() {
    setContacts((prevContacts) =>
      prevContacts.filter((contact) => contact.id !== selectedContact.current)
    );

    try {
      await deleteContact(selectedContact.current);
    } catch (error) {
      setError({
        message: error.message || "Failed to delete places.",
      });
    }

    setModalIsOpen(false);
    selectedContact.current = "";
  }, []);

  function handleError() {
    setError(null);
  }

  return (
    <>
      <Modal open={error} onClose={handleError}>
        {error && (
          <Error
            title="An error occurred!"
            message={error.message}
            onConfirm={handleError}
          />
        )}
      </Modal>

      <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleDeleteContact}
        />
      </Modal>

      <div>
        <AddContact onAddContact={handleAddContact} />
        <ContactList
          contactList={contacts}
          isLoading={isFetching}
          loadingText="Fetching your contacts..."
          onDelete={handleStartDeleteContact}
        />
      </div>
    </>
  );
}
