import { Form, useNavigation } from 'react-router-dom';
import { useState } from 'react';

import classes from './AuthForm.module.css';

function AddForm() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const [base64File, setBase64File] = useState(""); // <-- local state

  function fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        const base64 = reader.result;
        resolve(base64);
      };

      reader.onerror = (error) => {
        reject(error);
      };
    });
  }

  function handleFileInputChange(event) {
    const file = event.target.files[0];

    fileToBase64(file)
      .then((base64) => {
        setBase64File(base64); // <-- update local state
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <Form method="post" className={classes.form}>
      <div>
        <label htmlFor="title">Tytuł:</label>
        <input type="text" id="title" name="title" />
      </div>
      <div>
        <label htmlFor="file">Wybierz plik:</label>
        <input
          type="file"
          id="file"
          name="file" // <-- fix typo
          onChange={handleFileInputChange}
        />
      </div>
      <input
        type="hidden"
        name="base64File"
        value={base64File} // <-- set input's value
      />
      <button disabled={isSubmitting}>
        {isSubmitting ? "Adding..." : "Add"}
      </button>
    </Form>
  );
}
export default AddForm;
