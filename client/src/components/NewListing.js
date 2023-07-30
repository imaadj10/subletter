export default function NewListing() {
  const uploadImage = (e) => {
    let reader = new FileReader();
    const file = document.getElementById('input').files[0];
    const output = document.getElementById('output');
    reader.readAsDataURL(file);
    reader.onload = () => {
      output.setAttribute('src', reader.result);
      output.style.width = '300px';
      output.style.maxHeight = '300px';
    };
  };

  const submit = (e) => {
    // do stuff
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
        ></input>

        <label htmlFor="price">Price</label>
        <input
          className="big-text-field"
          name="price"
          type="number"
          min="0"
          placeholder="0"
          step="50"
        ></input>

        <label for="name">Description</label>
        <textarea
          className="big-text-field"
          name="description"
          type="text"
          rows="10"
          placeholder="Write a detailed description of your listing..."
        ></textarea>

        <label for="type">Type</label>
        <select
          className="selector"
          name="type"
          type="text"
          defaultValue="items"
        >
          <option value="items">Items</option>
          <option value="sublets">Sublets</option>
        </select>

        <label for="image">Image</label>
        <input
          id="input"
          name="image"
          type="file"
          accept="image/png, image/jpeg image/jpg"
          onChange={uploadImage}
        ></input>
        <img id="output" alt="user-uploaded" />

        <div className="new-listing-buttons">
          <button className="submit cancel" onClick={closeModal}>
            Cancel
          </button>
          <button type="submit" className="submit">
            Submit
          </button>
        </div>
      </form>
    </>
  );
}
