import React from 'react';
import '../../styles/components/home/BraggingSection.css';

const BraggingSection = () => {
  return (
    <section className="bragging-section">
      <div className="bragging-content">
        <div className="bragging-text left">
          <h3>The Sauce You Brag About.</h3>
        </div>
        <div className="bragging-image">
          <img 
            src="https://res.cloudinary.com/daw3nco1o/image/upload/v1749680160/hipster-tears.png" 
            alt="Mule Sauce bottle with a habanero pepper" 
          />
        </div>
        <div className="bragging-text right">
          <p>Small batches. Big flavor. </p> 
          <p style={{fontStyle: 'italic', fontWeight: 'bold', color: '#aa3a36'}}>Limited regret.</p>
        </div>
      </div>
    </section>
  );
};

export default BraggingSection; 