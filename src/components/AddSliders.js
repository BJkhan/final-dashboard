import React, { useState } from 'react';
import { toast } from "react-toastify";
import Toast from './LoadingError/Toast';

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};

const Sliders = () => {
  const [slides, setSlides] = useState([{ imageUrl: '', caption: '' }]);
  
  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newSlides = [...slides];
    newSlides[index][name] = value;
    setSlides(newSlides);
  };

  const handleAddSlide = () => {
    if (slides.length < 5) {
      setSlides([...slides, { imageUrl: '', caption: '' }]);
    }
  };

  const handleRemoveSlide = (index) => {
    const newSlides = slides.filter((slide, i) => i !== index);
    setSlides(newSlides);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const slidesWithNumbers = slides.map((slide, index) => ({
        ...slide,
        slideNumber: index + 1 // Add slideNumber property to each slide object
      }));
      
      const requestBody = {
        slides: slides,
        slidesWithNumbers: slidesWithNumbers
      };
  
      const result = await fetch('/api/slides', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody) // Sending both slides data and slides with slide numbers
      });
  
      if (result.status === 201) {
        toast.success('Slides added successfully', ToastObjects);
      } else {
        toast.error('Failed to add slides', ToastObjects);
      }
    } catch (error) {
      toast.error('An error occurred while adding slides', ToastObjects);
    }
  };
  

  return (
    <>
    <Toast></Toast>
    <div className="container mt-5">
      <h1 className="mb-4">Add Slides</h1>
      <form onSubmit={handleSubmit}>
        {slides.map((slide, index) => (
          <div key={index} className="mb-3">
            <div className="row">
              <div className="row">
                <div className="col-2 mb-3">
                  <input
                    className="form-control"
                    type="text"
                    value={`Slide No ${index + 1}`}
                    aria-label="Disabled input example"
                    disabled
                    readOnly
                  />
                </div>
              </div>
              <div className="col-6">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    aria-describedby="passwordHelpInline"
                    name="imageUrl"
                    placeholder="Paste Image URL from cloudinary"
                    value={slide.imageUrl}
                    onChange={(e) => handleInputChange(index, e)}
                    required
                  />
                  {index !== 0 && ( // Conditionally render close button for all inputs except the first one
                    <button
                      type="button"
                      className="btn btn-outline-danger"
                      onClick={() => handleRemoveSlide(index)}
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-6">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    name="caption"
                    placeholder="Caption"
                    value={slide.caption}
                    onChange={(e) => handleInputChange(index, e)}
                    required
                  />
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleAddSlide}
                  >
                    <i className="fas fa-plus"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className=" mb-3"></div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
    </>
  );
};

export default Sliders;
