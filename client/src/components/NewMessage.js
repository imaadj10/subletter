import { useState } from 'react';
import axios from 'axios';
import '../css/Listings.css';

export default function NewMessage({ props }) {
    const [message, setMessage] = useState();

    const submit = async (e) => {
        e.preventDefault();
        try {
            axios.post(`http://localhost:1234/messages/${props.listing.username}`, { message: message }, {
            headers: {
                Authorization: `Bearer ${props.token}`,
            },
        });
        closeModal(e);
        } catch (error) {
            alert(e);
        }
        
      };
    
    const closeModal = (e) => {
        e.preventDefault();
        document.getElementById('create-new-message-modal').close();
    };

    return (
        <>
          <form onSubmit={submit}>
            <label htmlFor="message">Message</label>
            <textarea
              className="big-text-field"
              name="messaage"
              type="text"
              rows="10"
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write a message to the seller..."
            ></textarea>
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