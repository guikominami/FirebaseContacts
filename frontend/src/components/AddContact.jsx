/* eslint-disable react/prop-types */
import { useRef, useState } from "react";

import Input from "./Basic/Input";
import Button from "./Basic/Button";
import Modal from "./Basic/Modal";
import Error from "./Basic/Error";

import "./AddContact.css";

export default function Contacts({ onAddContact }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const firstName = useRef();
  const lastName = useRef();
  const email = useRef();
  const phone = useRef();

  function handleAddContact() {
    if (
      firstName.current.value.trim() === "" ||
      lastName.current.value.trim() === "" ||
      email.current.value.trim() === "" ||
      phone.current.value.trim() === ""
    ) {
      setModalIsOpen(true);
      return;
    }

    const newContact = {
      firstName: firstName.current.value,
      lastName: lastName.current.value,
      email: email.current.value,
      phone: phone.current.value,
    };

    onAddContact(newContact);

    handleClear();
  }

  function handleClear() {
    firstName.current.value = "";
    lastName.current.value = "";
    email.current.value = "";
    phone.current.value = "";
  }

  function handleError() {
    setModalIsOpen(false);
    handleClear();
  }

  return (
    <>
      <Modal open={modalIsOpen}>
        <Error
          title="Invalid Input"
          message={"Looks like you forgot to enter a value."}
          onConfirm={handleError}
        />
      </Modal>
      <div className="main-addcontact">
        <h2>Add Contact</h2>
        <Input
          type="text"
          ref={firstName}
          id="firstName"
          placeholder="first Name"
        />
        <Input
          type="text"
          ref={lastName}
          id="lastName"
          placeholder="last Name"
        />
        <Input type="text" ref={email} id="email" placeholder="email" />
        <Input type="text" ref={phone} id="phone" placeholder="phone" />
        <Button className="save" onClick={handleAddContact}>
          Add
        </Button>
        <Button className="cancel" onClick={handleClear}>
          Clear
        </Button>
      </div>
    </>
  );
}
