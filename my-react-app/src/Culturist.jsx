import React, { useState, useEffect, useMemo } from 'react';

const Culturist = () => {
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedSeason, setSelectedSeason] = useState('');
  const [likes, setLikes] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  
  useEffect(() => {
    const savedLikes = JSON.parse(localStorage.getItem('culturist-likes') || '{}');
    const savedComments = JSON.parse(localStorage.getItem('culturist-comments') || '[]');
    setLikes(savedLikes);
    setComments(savedComments);
  }, []);

  
  useEffect(() => {
    localStorage.setItem('culturist-likes', JSON.stringify(likes));
  }, [likes]);

  useEffect(() => {
    localStorage.setItem('culturist-comments', JSON.stringify(comments));
  }, [comments]);

  
  const travelData = {
   TamilNadu: {
  cities: {
    Chennai: {
      Winter: {
        festivals: ['Pongal', 'Music Season Festival', 'Christmas'],
        food: ['Sambar', 'Filter Coffee', 'Dosa', 'Murukku'],
        monuments: ['Marina Beach', 'Fort St. George', 'Kapaleeshwarar Temple', 'San Thome Church'],
        lifestyle: 'Modern city with strong roots in culture and tradition. Known for classical music and temples.',
        description: 'Pleasant weather makes winter the best time to explore Chennai’s cultural richness.'
      },
      Summer: {
        festivals: ['Chithirai Festival'],
        food: ['Buttermilk', 'Lemon Juice', 'Curd Rice'],
        monuments: ['Guindy National Park', 'Birla Planetarium', 'Valluvar Kottam'],
        lifestyle: 'Hot weather leads to early outings and preference for indoor activities and temples.',
        description: 'Hot but culturally active season, ideal for indoor and temple visits.'
      }
    },
    Madurai: {
      Winter: {
        festivals: ['Jallikattu', 'Float Festival', 'Pongal'],
        food: ['Idiyappam', 'Jigarthanda', 'Parotta with Kurma'],
        monuments: ['Meenakshi Temple', 'Thirumalai Nayakar Mahal', 'Gandhi Memorial Museum'],
        lifestyle: 'Spiritual city with a festive vibe and rich architectural history.',
        description: 'Ideal time to explore temples and heritage with comfortable weather.'
      }
    }
  }
},
HimachalPradesh: {
  cities: {
    Shimla: {
      Winter: {
        festivals: ['Christmas', 'Winter Carnival', 'Lohri'],
        food: ['Madra', 'Chana Madra', 'Siddu', 'Thukpa'],
        monuments: ['The Ridge', 'Jakhoo Temple', 'Viceregal Lodge'],
        lifestyle: 'Snow-covered charm with colonial buildings. Perfect for honeymooners and families.',
        description: 'Shimla turns into a snowy paradise during winters with festive cheer.'
      },
      Summer: {
        festivals: ['Baisakhi', 'Sipi Fair'],
        food: ['Chha Gosht', 'Fruit Wines'],
        monuments: ['Kufri', 'Chail Palace', 'Christ Church'],
        lifestyle: 'Cool escape from the plains. Popular for trekking, picnics, and sightseeing.',
        description: 'Summer is the peak tourist season with great weather and lush views.'
      }
    },
    Manali: {
      Winter: {
        festivals: ['Winter Carnival', 'Christmas', 'New Year'],
        food: ['Dham', 'Babru', 'Chana Madra'],
        monuments: ['Hadimba Temple', 'Solang Valley', 'Old Manali'],
        lifestyle: 'Adventure hub with snow sports and cozy cafes. Bustling with tourists.',
        description: 'Ideal for snow lovers and adventure seekers. Great for skiing and snowboarding.'
      },
      Summer: {
        festivals: ['Doongri Festival', 'Hadimba Devi Fair'],
        food: ['Local Trout Fish', 'Tudkiya Bhat'],
        monuments: ['Rohtang Pass', 'Jogini Waterfall', 'Beas River'],
        lifestyle: 'Vibrant with backpackers, bikers, and trekkers. Lush greenery and open skies.',
        description: 'Summer in Manali offers perfect weather for outdoor adventures and sightseeing.'
      }
    }
  }
},
WestBengal: {
  cities: {
    Kolkata: {
      Winter: {
        festivals: ['Durga Puja', 'Christmas', 'Kolkata International Film Festival'],
        food: ['Rosogolla', 'Macher Jhol', 'Shukto', 'Kathi Rolls'],
        monuments: ['Victoria Memorial', 'Howrah Bridge', 'Indian Museum', 'Dakshineswar Temple'],
        lifestyle: 'Blend of colonial charm and Bengali culture. Bustling markets, book fairs, and art shows.',
        description: 'Winter brings cultural vibrancy and is the best time to enjoy Kolkata’s spirit.'
      },
      Monsoon: {
        festivals: ['Rath Yatra', 'Jamai Shashti'],
        food: ['Khichuri', 'Beguni', 'Telebhaja'],
        monuments: ['Prinsep Ghat', 'Eco Park', 'Birla Planetarium'],
        lifestyle: 'Monsoon enhances the poetic charm of Kolkata. Rainy evenings with chai and adda.',
        description: 'Romantic and artistic mood sets in with Kolkata’s monsoon rhythm.'
      }
    },
    Darjeeling: {
      Winter: {
        festivals: ['Losar Festival', 'Christmas'],
        food: ['Momos', 'Thukpa', 'Darjeeling Tea'],
        monuments: ['Tiger Hill', 'Batasia Loop', 'Peace Pagoda'],
        lifestyle: 'Quiet hill town with colonial vibes and Buddhist influence. Cool and peaceful.',
        description: 'Winter offers clear skies and breathtaking views of snow-capped Kanchenjunga.'
      },
      Summer: {
        festivals: ['Buddha Jayanti'],
        food: ['Alu Dum', 'Sel Roti', 'Churpee Soup'],
        monuments: ['Tea Gardens', 'Himalayan Railway', 'Rock Garden'],
        lifestyle: 'Summer attracts tourists escaping heat. Pleasant days and scenic landscapes.',
        description: 'Perfect for leisurely walks and tea garden tours with cool weather.'
      }
    }
  }
}
  };

  const seasons = ['Winter', 'Summer', 'Monsoon'];

  // Get cities for selected state
  const availableCities = useMemo(() => {
    if (!selectedState || !travelData[selectedState]) return [];
    return Object.keys(travelData[selectedState].cities);
  }, [selectedState]);

  // Get current destination data
  const currentData = useMemo(() => {
    if (!selectedState || !selectedCity || !selectedSeason) return null;
    return travelData[selectedState]?.cities?.[selectedCity]?.[selectedSeason] || null;
  }, [selectedState, selectedCity, selectedSeason]);

  // Handle like button click
  const handleLike = (cardType) => {
    const key = `${selectedState}-${selectedCity}-${selectedSeason}-${cardType}`;
    setLikes(prev => ({
      ...prev,
      [key]: (prev[key] || 0) + 1
    }));
  };

  // Handle comment submission
  const handleCommentSubmit = () => {
    if (newComment.trim()) {
      const comment = {
        id: Date.now(),
        text: newComment.trim(),
        destination: `${selectedCity}, ${selectedState}`,
        season: selectedSeason,
        timestamp: new Date().toLocaleString()
      };
      setComments(prev => [comment, ...prev]);
      setNewComment('');
    }
  };

  // Reset selections when state changes
  const handleStateChange = (state) => {
    setSelectedState(state);
    setSelectedCity('');
    setSelectedSeason('');
  };

  const handleCityChange = (city) => {
    setSelectedCity(city);
    setSelectedSeason('');
  };

  return (
    <div className="container">
      <header className="header">
        <h1 className="title">
          🌏 Culturist
        </h1>
        <p className="subtitle">Explore India Seasonally - Discover the perfect time to visit Indian cities</p>
      </header>

      {/* Filter Section */}
      <div className="filter-section">
        <div className="filter-step">
          <h3 className="step-title">1. Select State</h3>
          <div className="button-grid">
            {Object.keys(travelData).map(state => (
              <button
                key={state}
                className={`filter-button ${selectedState === state ? 'selected' : ''}`}
                onClick={() => handleStateChange(state)}
              >
                {state}
              </button>
            ))}
          </div>
        </div>

        {selectedState && (
          <div className="filter-step">
            <h3 className="step-title">2. Select City</h3>
            <div className="button-grid">
              {availableCities.map(city => (
                <button
                  key={city}
                  className={`filter-button ${selectedCity === city ? 'selected' : ''}`}
                  onClick={() => handleCityChange(city)}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>
        )}

        {selectedCity && (
          <div className="filter-step">
            <h3 className="step-title">3. Select Season</h3>
            <div className="button-grid">
              {seasons.map(season => (
                <button
                  key={season}
                  className={`filter-button ${selectedSeason === season ? 'selected' : ''}`}
                  onClick={() => setSelectedSeason(season)}
                >
                  {season}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Results Section */}
      {selectedState && selectedCity && selectedSeason && (
        <div className="results-section">
          {currentData ? (
            <>
              <div className="destination-header">
                <h2 className="destination-title">
                  {selectedCity}, {selectedState} in {selectedSeason}
                </h2>
                <p className="destination-desc">{currentData.description}</p>
              </div>

              <div className="cards-grid">
                {/* Festivals Card */}
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">🎉 Festivals</h3>
                    <button
                      className="like-button"
                      onClick={() => handleLike('festivals')}
                    >
                      ❤️ {likes[`${selectedState}-${selectedCity}-${selectedSeason}-festivals`] || 0}
                    </button>
                  </div>
                  <div className="card-content">
                    {currentData.festivals.map((festival, index) => (
                      <span key={index} className="tag">{festival}</span>
                    ))}
                  </div>
                </div>

                {/* Food Card */}
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">🍽️ Local Cuisine</h3>
                    <button
                      className="like-button"
                      onClick={() => handleLike('food')}
                    >
                      ❤️ {likes[`${selectedState}-${selectedCity}-${selectedSeason}-food`] || 0}
                    </button>
                  </div>
                  <div className="card-content">
                    {currentData.food.map((item, index) => (
                      <span key={index} className="tag">{item}</span>
                    ))}
                  </div>
                </div>

                {/* Monuments Card */}
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">🏛️ Must Visit</h3>
                    <button
                      className="like-button"
                      onClick={() => handleLike('monuments')}
                    >
                      ❤️ {likes[`${selectedState}-${selectedCity}-${selectedSeason}-monuments`] || 0}
                    </button>
                  </div>
                  <div className="card-content">
                    {currentData.monuments.map((monument, index) => (
                      <span key={index} className="tag">{monument}</span>
                    ))}
                  </div>
                </div>

                {/* Lifestyle Card */}
                <div className="card full-width-card">
                  <div className="card-header">
                    <h3 className="card-title">🌟 Culture & Lifestyle</h3>
                    <button
                      className="like-button"
                      onClick={() => handleLike('lifestyle')}
                    >
                      ❤️ {likes[`${selectedState}-${selectedCity}-${selectedSeason}-lifestyle`] || 0}
                    </button>
                  </div>
                  <div className="card-content">
                    <p className="lifestyle-text">{currentData.lifestyle}</p>
                  </div>
                </div>
              </div>

              {/* Comments Section */}
              <div className="comments-section">
                <h3 className="comments-title">💬 Travel Tips & Comments</h3>
                
                <div className="comment-form">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder={`Share your experience or tips for ${selectedCity} in ${selectedSeason}...`}
                    className="comment-input"
                    rows="4"
                  />
                  <button onClick={handleCommentSubmit} className="submit-button">
                    Post Comment
                  </button>
                </div>

                <div className="comments-list">
                  {comments
                    .filter(comment => 
                      comment.destination === `${selectedCity}, ${selectedState}` && 
                      comment.season === selectedSeason
                    )
                    .map(comment => (
                      <div key={comment.id} className="comment-item">
                        <div className="comment-header">
                          <span className="comment-dest">{comment.destination} - {comment.season}</span>
                          <span className="comment-time">{comment.timestamp}</span>
                        </div>
                        <p className="comment-text">{comment.text}</p>
                      </div>
                    ))}
                  
                  {comments.filter(comment => 
                    comment.destination === `${selectedCity}, ${selectedState}` && 
                    comment.season === selectedSeason
                  ).length === 0 && (
                    <p className="no-comments">
                      Be the first to share your experience of {selectedCity} in {selectedSeason}!
                    </p>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="no-data-message">
              <h3 className="no-data-title">No seasonal data available</h3>
              <p>
                In {selectedCity}, {selectedState} during {selectedSeason}, there are no season-specific festivals or detailed cultural information available.
              </p>
              <p className="suggestion">
                Try visiting in <strong>Winter</strong> or <strong>Monsoon</strong> for the best cultural experiences!
              </p>
            </div>
          )}
        </div>
      )}

      {!selectedState && (
        <div className="welcome-section">
          <div className="welcome-card">
            <h2>🌟 Welcome to Culturist</h2>
            <p>Discover the perfect time to explore India's rich cultural heritage. Select a state above to begin your journey through festivals, food, monuments, and local lifestyles.</p>
            <div className="features">
              <div className="feature">
                <span>🎭</span>
                <span>Season-specific festivals</span>
              </div>
              <div className="feature">
                <span>🍛</span>
                <span>Local cuisine recommendations</span>
              </div>
              <div className="feature">
                <span>🏛️</span>
                <span>Must-visit monuments</span>
              </div>
              <div className="feature">
                <span>🏞️</span>
                <span>Cultural insights & lifestyle</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Culturist;

