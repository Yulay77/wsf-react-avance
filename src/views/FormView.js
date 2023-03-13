import React, { useEffect } from "react";
import { useRef } from "react";

export default function FormView({ initialValues, viaProps = false }) {
  const titleRef = useRef;
  const dateRef = useRef;
  const userIdRef = useRef;
  const avatarRef = useRef;

  useEffect(() => {
    if (
      initialValues &&
      titleRef.current &&
      dateRef.current &&
      userIdRef.current
    ) {
      titleRef.current.value = initialValues.title;
      dateRef.current.value = initialValues.date;
      userIdRef.current.value = initialValues.userId;
      avatarRef.current.addEventListener("change", (e) => {
        readFile(e.target).then((result) => {
          console.log(result);
        });
      });
    }
  }, [initialValues, titleRef.current, dateRef.current, userIdRef.current]);

  function handleSubmit(e) {
    e.preventDefault();
    console.log("title", titleRef.current.value);
    console.log("date", dateRef.current.value);
    console.log("userId", userIdRef.current.value);
    console.log("avatar", avatarRef.current.files[0]);
  }

  function readFile(inputFileElement) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        resolve(e.target.result);
      };
      reader.onerror = (e) => {
        reject(e);
      };
      reader.readAsDataURL(inputFileElement.files[0]);
    });
  }

  if (viaProps)
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <input ref={titleRef} name="title" />
          <input ref={dateRef} name="date" type="date" />
          <input
            ref={userIdRef}
            name="userId"
            type="hidden"
            value={viaProps.userId}
          />
          <input ref={avatarRef} name="avatar" type="file" />
          <input type="submit" value="Add" />
        </form>
      </div>
    );

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input ref={titleRef} name="title" />
        <input ref={dateRef} name="date" type="date" />
        <select ref={userIdRef} name="userId">
          <option value="1">User 1</option>
          <option value="2">User 2</option>
          <option value="3">User 3</option>
        </select>
        <input ref={avatarRef} name="avatar" type="file" />
        <input type="submit" value="Add" />
      </form>
    </div>
  );
}
