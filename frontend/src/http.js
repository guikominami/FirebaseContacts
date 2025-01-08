export async function fetchContacts() {
  const response = await fetch("http://localhost:3000/contacts");
  const resData = await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch places");
  }

  return resData.contacts;
}

export async function addContact(contact) {
  const response = await fetch("http://localhost:3000/new-contact", {
    method: "POST",
    body: JSON.stringify(contact),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const resData = await response.json();

  if (!response.ok) {
    throw new Error("Failed to update user data.");
  }

  return resData.message;
}

export async function deleteContact(id) {
  const response = await fetch("http://localhost:3000/delete-contact/" + id, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const resData = await response.json();

  if (!response.ok) {
    throw new Error("Failed to delete user data.");
  }

  return resData.message;
}

export async function updateContact(id, contact) {
  const response = await fetch("http://localhost:3000/update-contact/" + id, {
    method: "UPDATE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contact),
  });

  const resData = await response.json();

  if (!response.ok) {
    throw new Error("Failed to update user data.");
  }

  return resData.message;
}
