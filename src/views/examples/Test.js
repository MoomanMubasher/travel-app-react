import React, { useState } from 'react';
import axios from 'axios';

function AddLandmark() {
  const [formData, setFormData] = useState({
    name: '',
    longitude: '',
    latitude: '',
    pictures: [],
    ratings: [],
    comments: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    console.log(e.target.files,"file")
    const files = Array.from(e.target.files).map(file => file );
    console.log(files,'files')
    setFormData({
      ...formData,
      pictures: files
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the name is provided
    if (!formData.name.trim()) {
      setError('Name is required');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('longitude', formData.longitude);
      formDataToSend.append('latitude', formData.latitude);
    //   formDataToSend.append('pictures', formData.pictures);
      for (let i = 0; i < formData.pictures.length; i++) {
        formDataToSend.append('pictures', formData.pictures[i]);
      }
      formDataToSend.append('ratings', JSON.stringify([{user:'65f5e8ddf70eb5dcfbd6172a',rating:formData.ratings}]));
      formDataToSend.append('comments', JSON.stringify([{user:'65f5e8ddf70eb5dcfbd6172a',comment:formData.comments}]));

    const response = await axios.post('http://localhost:8080/api/landmarks',formDataToSend,{
        headers: {
          "Content-Type": "multipart/form-data",
          "x-rapidapi-host": "file-upload8.p.rapidapi.com",
          "x-rapidapi-key": "your-rapidapi-key-here",
        },
      });

      console.log('New landmark created:', response.data);  
      // Optionally, redirect to the page displaying the newly created landmark or show a success message
    } catch (error) {
      console.error('Error creating landmark:', error);
      setError('Error creating landmark');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Add Landmark</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Longitude:</label>
          <input type="text" name="longitude" value={formData.longitude} onChange={handleChange} required />
        </div>
        <div>
          <label>Latitude:</label>
          <input type="text" name="latitude" value={formData.latitude} onChange={handleChange} required />
        </div>
        <div>
          <label>Pictures:</label>
          <input type="file" name="pictures" accept='' onChange={handleFileChange} multiple />
        </div>
        <div>
          <label>Ratings:</label>
          <input type="number" name="ratings" value={formData.ratings} onChange={handleChange} min="1" max="5" />
        </div>
        <div>
          <label>Comments:</label>
          <textarea name="comments" value={formData.comments} onChange={handleChange}></textarea>
        </div>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <button type="submit" disabled={loading}>Add Landmark</button>
      </form>
    </div>
  );
}

export default AddLandmark;



// TEST 2

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const LandmarksByLocation = ({ latitude, longitude }) => {
//   const [landmarks, setLandmarks] = useState([]);
//   const user = JSON.parse(localStorage.getItem('user'));

//   useEffect(() => {
//     const config = {
//       headers: {
//         Authorization: `Bearer ${user?.token}`
//       }
//     };

//     const fetchLandmarks = async () => {
//       try {
//         const response = await axios.get('http://localhost:8080/api/landmarks', {
//           params: {
//             latitude,
//             longitude
//           }, 
//           headers: config.headers 
//         });
//         setLandmarks(response.data);
//       } catch (error) {
//         console.error('Error fetching landmarks:', error);
//       }
//     };

//     fetchLandmarks();
//   }, [latitude, longitude]);

//   return (
//     <div>
//       <h2>Landmarks at Latitude {latitude} and Longitude {longitude}</h2>
//       <ul>
//         {landmarks.map((landmark, index) => (
//           <li key={index}>
//             <h3>{landmark.name}</h3>
//             <p>Latitude: {landmark.latitude}</p>
//             <p>Longitude: {landmark.longitude}</p>
//             {/* Display other landmark details as needed */}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default LandmarksByLocation;



// TEST 3

// import React, { useState } from 'react';
// import axios from 'axios';

// const AddCommentForm = ({ landmarkId, userId }) => {
//   const [comment, setComment] = useState('');

//   const handleCommentChange = (event) => {
//     setComment(event.target.value);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       await axios.post(`http://localhost:8080/api/landmarks/${landmarkId}/comments`, {
//         user: userId,
//         comment: comment
//       });
//       // Optionally, you can handle success by displaying a message or updating state
//       alert('Comment added successfully!');
//       setComment('');
//     } catch (error) {
//       console.error('Error adding comment:', error);
//       // Optionally, you can handle errors by displaying an error message
//       alert('Error adding comment. Please try again.');
//     }
//   };

//   return (
//     <div>
//       <h3>Add Comment</h3>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="comment">Comment:</label>
//           <textarea
//             id="comment"
//             name="comment"
//             value={comment}
//             onChange={handleCommentChange}
//             required
//           />
//         </div>
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default AddCommentForm;



// TEST 4   

// import React, { useState } from 'react';
// import axios from 'axios';

// const AddRatingForm = ({ landmarkId, userId }) => {
//   const [rating, setRating] = useState('');

//   const handleRatingChange = (event) => {
//     setRating(event.target.value);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       await axios.post(`http://localhost:8080/api/landmarks/${landmarkId}/ratings`, {
//         user: userId,
//         rating: rating
//       });
//       // Optionally, you can handle success by displaying a message or updating state
//       alert('Rating added successfully!');
//       setRating('');
//     } catch (error) {
//       console.error('Error adding rating:', error);
//       // Optionally, you can handle errors by displaying an error message
//       alert('Error adding rating. Please try again.');
//     }
//   };

//   return (
//     <div>
//       <h3>Add Rating</h3>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="rating">Rating:</label>
//           <input
//             type="number"
//             id="rating"
//             name="rating"
//             min="1"
//             max="5"
//             value={rating}
//             onChange={handleRatingChange}
//             required
//           />
//         </div>
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default AddRatingForm;
