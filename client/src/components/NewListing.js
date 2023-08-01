import { useState } from 'react'
import axios from 'axios';
import '../css/Listings.css';

export default function NewListing({ props }) {
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [description, setDescription] = useState();
  const [type, setType] = useState('sublet');
  const [file, setFile] = useState();

  // const uploadImage = (e) => {
  //   let reader = new FileReader();
  //   const file = document.getElementById('input').files[0];
  //   const output = document.getElementById('output');
  //   reader.readAsDataURL(file);
  //   reader.onload = () => {
  //     output.setAttribute('src', reader.result);
  //     output.style.width = '300px';
  //     output.style.maxHeight = '300px';
  //   };
  // };

  const submit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("username", props.globalUsername);
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("type", type);
    formData.append("image", file);

    axios.post('http://localhost:1234/listings', formData, { headers: {'Content-Type': 'multipart/form-data'}});
    closeModal(e);
  };

  const closeModal = (e) => {
    e.preventDefault();
    document.getElementById('create-new-listing-modal').close();
  };

  return (
    <>
      <form onSubmit={submit}>
        <label htmlFor="name">Listing Name</label>
        <input
          className="big-text-field"
          name="name"
          type="text"
          placeholder="Name"
          onChange={e => setName(e.target.value)} 
        ></input>

        <label htmlFor="price">Price</label>
        <input
          className="big-text-field"
          name="price"
          type="number"
          min="0"
          placeholder="0"
          onChange={e => setPrice(e.target.value)} 
          step="50"
        ></input>

        <label for="name">Description</label>
        <textarea
          className="big-text-field"
          name="description"
          type="text"
          rows="10"
          onChange={e => setDescription(e.target.value)} 
          placeholder="Write a detailed description of your listing..."
        ></textarea>

        <label for="type">Type</label>
        <select
          className="selector"
          name="type"
          type="text"
          onChange={e => setType(e.target.value)} 
        >
          <option value="sublet">Sublet</option>
          <option value="item">Item</option>
        </select>

        <label for="image">Image</label>
        <input
          id = "input"
          filename={file} 
          onChange={e => setFile(e.target.files[0])} 
          type="file" 
          accept="image/*"
        ></input>
        <img id="output" alt="user-uploaded" />

        <div className="new-listing-buttons">
          <button className="red" onClick={closeModal}>
            Cancel
          </button>
          <button type="submit">Submit</button>
        </div>
      </form>
    </>
  );
}
