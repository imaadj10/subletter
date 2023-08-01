import { useState } from 'react'
import axios from 'axios';
import '../css/Listings.css';

export default function NewListing({ props }) {
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [description, setDescription] = useState();
  const [type, setType] = useState('sublet');
  const [quantity, setQuantity] = useState();
  const [unitType, setUnitType] = useState();
  const [residence, setResidence] = useState();
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
    formData.append("username", props.username);
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("type", type);
    formData.append("quantity", quantity);
    formData.append("unitType", unitType);
    formData.append("residence", residence);
    formData.append("image", file);

    axios.post('http://localhost:1234/listings', formData, { headers: {'Content-Type': 'multipart/form-data'}});
    closeModal(e);
  };

  const closeModal = (e) => {
    e.preventDefault();
    document.getElementById('create-new-listing-modal').close();
  };
  
  let inputSection;
  if (type === 'item') {
    inputSection = (
      /* JSX for the input section when type is "Items" */
      <div>
        <label htmlFor="quantity">Quantity</label>
        <input
          className="big-text-field"
          name="quantity"
          min="0"
          step="1"
          type="number"
          placeholder="Quantity"
          onChange={e => setQuantity(e.target.value)} 
        ></input>
      </div>
    );
  } else if (type === 'sublet') {
    inputSection = (
      /* JSX for the input section when type is "Sublets" */
      <div>
        <label htmlFor="unitType">Unit Type</label>
        <input
          className="big-text-field"
          name="unitType"
          type="text"
          placeholder="Unit Type"
          onChange={e => setUnitType(e.target.value)} 
        ></input>
        <label htmlFor="residence">Residence Name</label>
        <input
          className="big-text-field"
          name="residence"
          type="text"
          placeholder="Residence Name"
          onChange={e => setResidence(e.target.value)} 
        ></input>
      </div>
    );
  }

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
        {inputSection}
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
