import React, { useEffect, useState } from "react";
import Button from "../components/Button";

export default function NotificationView({ theme }) {
  const [notifs, setNotifs] = useState([]);

  function handleDelete() {
    fetch("http://localhost:5000/notifications/" + this.id, {
      method: "DELETE",
    }).then(
      (response) =>
        response.status === 200 &&
        setNotifs(notifs.filter((notif) => notif.id !== this.id))
    );
  }

  useEffect(() => {
    fetch("http://localhost:5000/notifications")
      .then((response) => response.json())
      .then(setNotifs);
    /*.then((data) => setNotifs(data));*/
  }, []);
  //useEffect(() => {
  //  async () => {
  //    const response = await fetch("http://localhost:5000/notifications");
  //    const data = await response.json();
  //    setNotifs(data);
  //  };
  //}, []);

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    //const data = Array.from(formData.keys()).reduce((acc, key) => {
    //  acc[key] = formData.get(key);
    //  return acc;
    //}, {});
    // convert formData to object
    const data = Object.fromEntries(formData);

    fetch("http://localhost:5000/notifications", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((newNotif) => setNotifs([...notifs, newNotif]));
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input name="title" />
        <input name="date" type="date" />
        <input type="submit" value="Add" />
      </form>
      <ul>
        {notifs.length > 0 &&
          notifs.map((notif) => (
            <li key={notif.id}>
              <span>{notif.title}</span>
              <span>{notif.date}</span>
              <span>
                {/*<Button theme={theme} title="Delete" onClick={() => handleDelete(notif)} />*/}
                <Button
                  theme={theme}
                  title="Delete"
                  onClick={handleDelete.bind(notif)}
                />
              </span>
            </li>
          ))}
        {notifs.length === 0 && <p>No notifications</p>}
      </ul>
    </>
  );
}
