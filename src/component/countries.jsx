import axios from 'axios';
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Flag = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchCountries = async () => {
    try {
      const response = await axios.get('https://countries-search-data-prod-812920491762.asia-south1.run.app/countries');
      console.log(response.data);
      setCountries(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Country Flags</h2>

      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search for a country..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="row countryCard">
        {filteredCountries.map((country, index) => (
          <div className="col-6 col-sm-4 col-md-3 col-lg-2 mb-4" key={index}>
            <div className="card text-center h-100">
              <div className="d-flex justify-content-center align-items-center" style={{ height: '120px' }}>
                <img
                  src={country.flag}
                  alt={country.name}
                  className="card-img-top"
                  style={{
                    width: '100px',
                    height: '100px',
                    objectFit: 'cover',
                    padding: '10px'
                  }}
                />
              </div>

              <div className="card-body p-2">
                <p className="card-text fw-bold small">{country.name}</p>
              </div>
            </div>
          </div>
        ))}
        {filteredCountries.length === 0 && (
          <div className="text-center text-muted mt-4">No countries found.</div>
        )}
      </div>
    </div>
  );
};

export default Flag;
