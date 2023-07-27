import React from 'react';
import { useEffect } from 'react';
import Cookies from 'universal-cookie';
import { Link } from 'react-router-dom';

const Homepage = () => {
  const cookies = new Cookies();
  const token = cookies.get('TOKEN');

  console.log(token);


  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle('show', entry.isIntersecting);
      });
    });

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach(
      (element) => {
        observer.observe(element);
      },
      { threshold: 1 }
    );
  }, []);

  return (
    <div className="home-container">
      {!token ? (
        <div>
          <section className="hidden" style={{ marginTop: 50 }}>
            <h1 className="home-h1">
              The perfect place to sell your items and find the best sublets on
              campus.
            </h1>
            <h3>
              The cheapest, most affordable sublets that every student uses
            </h3>
            <div className="auth-links">
              <Link to="/signup" className="auth-button">
                Get Started
              </Link>
              <Link to="/" className="auth-button">
                Login
              </Link>
            </div>
          </section>

          <section className="hidden">
            <h1 className="home-h1">Create postings in the blink of an eye!</h1>
          </section>

          <section className="hidden">
            <h1 className="home-h1">
              Chat with friends and discover new listings!
            </h1>
          </section>
        </div>
      ) : (
        <h1> You are logged in</h1>
      )}
    </div>
  );
};

export default Homepage;
