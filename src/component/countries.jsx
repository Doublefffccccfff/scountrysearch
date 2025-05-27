import axios from 'axios';
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Flag = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCountries = async () => {
    try {
      const response = await axios.get(
        'https://countries-search-data-prod-812920491762.asia-south1.run.app/countries'
      );
      setCountries(response.data);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to fetch countries.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  const filteredCountries = countries.filter(country =>
    country.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="countryCard container mt-4">
      

      <input
        type="text"
        className="form-control mb-4"
        placeholder="🔍 Search for a country..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {loading ? (
        <div className="text-center text-muted">Loading countries...</div>
      ) : error ? (
        <div className="text-danger text-center">{error}</div>
      ) : filteredCountries.length === 0 ? (
        null
      ) : (
        <div className="row">
          {filteredCountries.map((country, index) => (
            <div className="col-6 col-sm-4 col-md-3 col-lg-2 mb-4" key={index}>
              <div className="card text-center h-100 shadow-sm">
                <div className="d-flex justify-content-center align-items-center" style={{ height: '120px' }}>
                  <img
                    src={country.png}
                    alt={country.common}
                    className="card-img-top"
                    style={{
                      width: '80px',
                      height: '80px',
                      objectFit: 'cover',
                      padding: '10px',
                    }}
                  />
                </div>
                <h2 className="card-body p-2">
                  <p className="card-text fw-bold small mb-0">{country.common}</p>
                </h2>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Flag;
