import '../css/Homepage.css';
import React, { useEffect, useContext } from 'react';
import UserContext from '../UserContext';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
  const { globalUsername } = useContext(UserContext);
  const cookies = new Cookies();
  const token = cookies.get('TOKEN');
  let navigate = useNavigate();

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

  const redirectRegister = () => {
    navigate('/register', {});
  };

  const redirectLogin = () => {
    navigate('/', {});
  };

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
              <button onClick={redirectRegister}>Get Started</button>
              <button onClick={redirectLogin}>Login</button>
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
        <h1> You are logged in {globalUsername}!</h1>
      )}
    </div>
  );
};

export default Homepage;
