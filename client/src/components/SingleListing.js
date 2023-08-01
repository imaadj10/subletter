import axios from 'axios';
import { useState } from 'react';

export default function SingleListing() {
  const [listing, setListing] = useState({});
  const lid = window.location.pathname.split('/')[2];
  console.log(lid);

  async function getListing(lid) {
    axios
      .get(`http://localhost:1234/listings/${lid}`)
      .then((res) => setListing({ ...res.data }))
      .catch((e) => console.log(e));
  }

  return (
    <>
      <h1>bruh</h1>
      <h2>Lmao</h2>
    </>
  );
}
