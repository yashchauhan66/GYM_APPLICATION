import React, { useState, useEffect } from 'react';
import { Star, Trash2, TrendingUp, Users, Award, Dumbbell, Target, Zap } from 'lucide-react';

const Reviews = () => {
  const [reviews, setReviews] = useState(() => {
    const savedReviews = localStorage.getItem('gymReviews');
    return savedReviews ? JSON.parse(savedReviews) : [
      {
        id: 1,
        name: "John Doe",
        rating: 5,
        comment: "Amazing gym with great equipment and friendly staff! Best decision ever for my fitness journey.",
        date: "2024-03-15"
      },
      {
        id: 2,
        name: "Jane Smith",
        rating: 4,
        comment: "Very clean facility and excellent trainers. The atmosphere is super motivating!",
        date: "2024-03-14"
      },
      {
        id: 3,
        name: "Mike Johnson",
        rating: 5,
        comment: "Best gym in town! Love the atmosphere and modern equipment. Personal trainers are top-notch.",
        date: "2024-03-13"
      }
    ];
  });

  const [newReview, setNewReview] = useState({
    name: "",
    rating: 5,
    comment: ""
  });

  const [hoveredRating, setHoveredRating] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    localStorage.setItem('gymReviews', JSON.stringify(reviews));
  }, [reviews]);

  const handleSubmit = () => {
    if (!newReview.name || !newReview.comment) {
      alert('Please fill in all fields');
      return;
    }

    const review = {
      id: Date.now(),
      ...newReview,
      date: new Date().toISOString().split('T')[0]
    };
    
    setReviews(prevReviews => [review, ...prevReviews]);
    setNewReview({ name: "", rating: 5, comment: "" });
    setShowSuccess(true);
    
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  const handleDeleteReview = (reviewId) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      setReviews(prevReviews => prevReviews.filter(review => review.id !== reviewId));
    }
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : 0;

  const ratingCounts = [5, 4, 3, 2, 1].map(rating => 
    reviews.filter(r => r.rating === rating).length
  );

  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <div style={styles.hero}>
        <div style={styles.heroOverlay}>
          <div style={styles.heroContent}>
            <Dumbbell size={64} color="#ff6b35" style={{marginBottom: '20px'}} />
            <h1 style={styles.heroTitle}>MEMBER REVIEWS</h1>
            <p style={styles.heroSubtitle}>What Our Champions Are Saying</p>
            <div style={styles.motivationalText}>
              <Zap size={20} color="#ff6b35" />
              <span>NO PAIN, NO GAIN • TRANSFORM YOUR LIFE</span>
              <Zap size={20} color="#ff6b35" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div style={styles.statsContainer}>
        <div style={styles.statCard}>
          <div style={styles.statIcon}>
            <Award size={40} color="#ff6b35" />
          </div>
          <h3 style={styles.statNumber}>{averageRating}</h3>
          <p style={styles.statLabel}>AVERAGE RATING</p>
          <div style={styles.statStars}>
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                fill={i < Math.round(averageRating) ? '#ff6b35' : 'none'}
                color={i < Math.round(averageRating) ? '#ff6b35' : '#555'}
              />
            ))}
          </div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statIcon}>
            <Users size={40} color="#ff6b35" />
          </div>
          <h3 style={styles.statNumber}>{reviews.length}</h3>
          <p style={styles.statLabel}>TOTAL REVIEWS</p>
          <p style={styles.statSubtext}>Active Members</p>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statIcon}>
            <Target size={40} color="#ff6b35" />
          </div>
          <h3 style={styles.statNumber}>
            {Math.round((reviews.filter(r => r.rating >= 4).length / reviews.length) * 100)}%
          </h3>
          <p style={styles.statLabel}>SATISFACTION</p>
          <p style={styles.statSubtext}>4+ Star Reviews</p>
        </div>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div style={styles.successMessage}>
          <Dumbbell size={24} color="white" />
          <div>
            <strong>REVIEW POSTED!</strong>
            <p style={{margin: '4px 0 0', fontSize: '14px'}}>Thank you for sharing your fitness journey with us!</p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div style={styles.mainContent}>
        {/* Review Form */}
        <div style={styles.formSection}>
          <div style={styles.formCard}>
            <div style={styles.formHeader}>
              <Target size={28} color="#ff6b35" />
              <h2 style={styles.formTitle}>SHARE YOUR EXPERIENCE</h2>
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.label}>YOUR NAME</label>
              <input
                type="text"
                placeholder="Enter your name"
                value={newReview.name}
                onChange={(e) => setNewReview({...newReview, name: e.target.value})}
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>RATE YOUR EXPERIENCE</label>
              <div style={styles.starRating}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={36}
                    fill={star <= (hoveredRating || newReview.rating) ? '#ff6b35' : 'none'}
                    color={star <= (hoveredRating || newReview.rating) ? '#ff6b35' : '#444'}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    onClick={() => setNewReview({...newReview, rating: star})}
                    style={styles.starIcon}
                  />
                ))}
              </div>
              <p style={styles.ratingText}>
                {newReview.rating === 5 && "OUTSTANDING! 💪"}
                {newReview.rating === 4 && "EXCELLENT! 🔥"}
                {newReview.rating === 3 && "GOOD! 👍"}
                {newReview.rating === 2 && "FAIR"}
                {newReview.rating === 1 && "NEEDS IMPROVEMENT"}
              </p>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>YOUR REVIEW</label>
              <textarea
                placeholder="Tell us about your fitness journey, trainers, equipment, or overall experience..."
                value={newReview.comment}
                onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                style={styles.textarea}
              />
            </div>

            <button onClick={handleSubmit} style={styles.submitButton}>
              <span>POST REVIEW</span>
              <Zap size={20} />
            </button>
          </div>

          {/* Rating Distribution */}
          <div style={styles.distributionCard}>
            <h3 style={styles.distributionTitle}>
              <TrendingUp size={24} color="#ff6b35" />
              RATING BREAKDOWN
            </h3>
            {[5, 4, 3, 2, 1].map((rating, index) => (
              <div key={rating} style={styles.distributionRow}>
                <span style={styles.distributionLabel}>{rating} ★</span>
                <div style={styles.distributionBar}>
                  <div 
                    style={{
                      ...styles.distributionFill,
                      width: reviews.length > 0 ? `${(ratingCounts[index] / reviews.length) * 100}%` : '0%'
                    }}
                  />
                </div>
                <span style={styles.distributionCount}>{ratingCounts[index]}</span>
              </div>
            ))}
            <div style={styles.distributionFooter}>
              <Dumbbell size={16} color="#ff6b35" />
              <span>Based on {reviews.length} reviews</span>
            </div>
          </div>
        </div>

        {/* Reviews List */}
        <div style={styles.reviewsList}>
          <div style={styles.reviewsHeader}>
            <h2 style={styles.reviewsTitle}>MEMBER TESTIMONIALS</h2>
            <p style={styles.reviewsSubtitle}>Real Results From Real People</p>
          </div>
          
          {reviews.map((review) => (
            <div 
              key={review.id}
              style={styles.reviewCard}
            >
              <div style={styles.reviewHeader}>
                <div style={styles.reviewerInfo}>
                  <div style={styles.avatar}>
                    <Dumbbell size={24} color="#ff6b35" />
                  </div>
                  <div>
                    <h3 style={styles.reviewerName}>{review.name}</h3>
                    <p style={styles.reviewDate}>
                      {new Date(review.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => handleDeleteReview(review.id)}
                  style={styles.deleteButton}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#ff6b35'}
                  onMouseLeave={(e) => e.currentTarget.style.background = '#2a2a2a'}
                >
                  <Trash2 size={18} />
                </button>
              </div>

              <div style={styles.reviewRating}>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    fill={i < review.rating ? '#ff6b35' : 'none'}
                    color={i < review.rating ? '#ff6b35' : '#444'}
                  />
                ))}
                <span style={styles.ratingBadge}>
                  {review.rating === 5 ? 'OUTSTANDING' : review.rating === 4 ? 'EXCELLENT' : 'GOOD'}
                </span>
              </div>

              <p style={styles.reviewComment}>{review.comment}</p>
              
              <div style={styles.reviewFooter}>
                <Zap size={14} color="#ff6b35" />
                <span>Verified Member</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
const styles = {
  container: {
    minHeight: '100vh',
    background: '#0a0a0a',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  hero: {
    background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)',
    position: 'relative',
    overflow: 'hidden',
  },
  heroOverlay: {
    background: 'linear-gradient(135deg, rgba(255, 107, 53, 0.1) 0%, rgba(10, 10, 10, 0.8) 100%)',
    padding: '100px 20px',
    textAlign: 'center',
    position: 'relative',
  },
  heroContent: {
    position: 'relative',
    zIndex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: '56px',
    fontWeight: '900',
    color: 'white',
    marginBottom: '16px',
    textShadow: '0 0 30px rgba(255, 107, 53, 0.5)',
    letterSpacing: '4px',
  },
  heroSubtitle: {
    fontSize: '22px',
    color: '#ff6b35',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    marginBottom: '24px',
  },
  motivationalText: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    color: '#ccc',
    fontSize: '14px',
    fontWeight: '600',
    letterSpacing: '2px',
  },
  statsContainer: {
    maxWidth: '1200px',
    margin: '-50px auto 60px',
    padding: '0 20px',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '24px',
    position: 'relative',
    zIndex: 2,
  },
  statCard: {
    background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)',
    borderRadius: '20px',
    padding: '40px 32px',
    textAlign: 'center',
    boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
    border: '2px solid rgba(255, 107, 53, 0.2)',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  },
  statIcon: {
    marginBottom: '16px',
  },
  statNumber: {
    fontSize: '48px',
    fontWeight: '900',
    color: 'white',
    margin: '16px 0 8px',
    textShadow: '0 0 20px rgba(255, 107, 53, 0.5)',
  },
  statLabel: {
    fontSize: '12px',
    color: '#ff6b35',
    fontWeight: '700',
    letterSpacing: '2px',
    marginBottom: '8px',
  },
  statSubtext: {
    fontSize: '13px',
    color: '#888',
    fontWeight: '500',
  },
  statStars: {
    display: 'flex',
    justifyContent: 'center',
    gap: '4px',
    marginTop: '8px',
  },
  successMessage: {
    maxWidth: '600px',
    margin: '0 auto 32px',
    padding: '20px 28px',
    background: 'linear-gradient(135deg, #ff6b35 0%, #ff8c42 100%)',
    color: 'white',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    fontSize: '16px',
    fontWeight: '600',
    boxShadow: '0 10px 30px rgba(255, 107, 53, 0.4)',
  },
  mainContent: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 20px 80px',
    display: 'grid',
    gridTemplateColumns: '420px 1fr',
    gap: '40px',
  },
  formSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  formCard: {
    background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)',
    borderRadius: '24px',
    padding: '36px',
    boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
    border: '2px solid rgba(255, 107, 53, 0.2)',
  },
  formHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '32px',
  },
  formTitle: {
    fontSize: '22px',
    fontWeight: '800',
    color: 'white',
    letterSpacing: '2px',
  },
  formGroup: {
    marginBottom: '28px',
  },
  label: {
    display: 'block',
    fontSize: '12px',
    fontWeight: '700',
    color: '#ff6b35',
    marginBottom: '10px',
    letterSpacing: '1.5px',
  },
  input: {
    width: '100%',
    padding: '16px 18px',
    fontSize: '16px',
    border: '2px solid #333',
    borderRadius: '12px',
    transition: 'all 0.3s ease',
    outline: 'none',
    background: '#0a0a0a',
    color: 'white',
  },
  starRating: {
    display: 'flex',
    gap: '10px',
    marginBottom: '12px',
  },
  starIcon: {
    cursor: 'pointer',
    transition: 'transform 0.2s ease',
  },
  ratingText: {
    fontSize: '14px',
    fontWeight: '700',
    color: '#ff6b35',
    letterSpacing: '1px',
    margin: 0,
  },
  textarea: {
    width: '100%',
    padding: '16px 18px',
    fontSize: '16px',
    border: '2px solid #333',
    borderRadius: '12px',
    minHeight: '140px',
    resize: 'vertical',
    fontFamily: 'inherit',
    transition: 'all 0.3s ease',
    outline: 'none',
    background: '#0a0a0a',
    color: 'white',
  },
  submitButton: {
    width: '100%',
    padding: '18px',
    background: 'linear-gradient(135deg, #ff6b35 0%, #ff8c42 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '14px',
    fontSize: '16px',
    fontWeight: '800',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 8px 24px rgba(255, 107, 53, 0.4)',
    letterSpacing: '2px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
  },
  distributionCard: {
    background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)',
    borderRadius: '24px',
    padding: '36px',
    boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
    border: '2px solid rgba(255, 107, 53, 0.2)',
  },
  distributionTitle: {
    fontSize: '18px',
    fontWeight: '800',
    color: 'white',
    marginBottom: '24px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    letterSpacing: '1.5px',
  },
  distributionRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '16px',
  },
  distributionLabel: {
    fontSize: '14px',
    fontWeight: '700',
    color: '#ff6b35',
    minWidth: '45px',
  },
  distributionBar: {
    flex: 1,
    height: '10px',
    background: '#0a0a0a',
    borderRadius: '6px',
    overflow: 'hidden',
    border: '1px solid #333',
  },
  distributionFill: {
    height: '100%',
    background: 'linear-gradient(90deg, #ff6b35 0%, #ff8c42 100%)',
    transition: 'width 0.5s ease',
  },
  distributionCount: {
    fontSize: '14px',
    fontWeight: '700',
    color: 'white',
    minWidth: '35px',
    textAlign: 'right',
  },
  distributionFooter: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginTop: '20px',
    paddingTop: '20px',
    borderTop: '1px solid #333',
    fontSize: '12px',
    color: '#888',
    fontWeight: '600',
  },
  reviewsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  reviewsHeader: {
    marginBottom: '16px',
  },
  reviewsTitle: {
    fontSize: '32px',
    fontWeight: '900',
    color: 'white',
    marginBottom: '8px',
    letterSpacing: '2px',
  },
  reviewsSubtitle: {
    fontSize: '16px',
    color: '#ff6b35',
    fontWeight: '600',
    letterSpacing: '1px',
  },
  reviewCard: {
    background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)',
    borderRadius: '20px',
    padding: '32px',
    boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
    border: '2px solid rgba(255, 107, 53, 0.2)',
    transition: 'all 0.3s ease',
  },
  reviewHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '20px',
  },
  reviewerInfo: {
    display: 'flex',
    gap: '16px',
    alignItems: 'center',
  },
  avatar: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)',
    border: '3px solid #ff6b35',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  reviewerName: {
    fontSize: '20px',
    fontWeight: '800',
    color: 'white',
    marginBottom: '4px',
    letterSpacing: '0.5px',
  },
  reviewDate: {
    fontSize: '13px',
    color: '#888',
    fontWeight: '500',
  },
  deleteButton: {
    background: '#2a2a2a',
    border: '2px solid #ff6b35',
    color: '#ff6b35',
    cursor: 'pointer',
    padding: '10px',
    borderRadius: '10px',
    transition: 'all 0.3s ease',
  },
  reviewRating: {
    display: 'flex',
    gap: '6px',
    marginBottom: '16px',
    alignItems: 'center',
  },
  ratingBadge: {
    marginLeft: '12px',
    fontSize: '11px',
    fontWeight: '700',
    color: '#ff6b35',
    background: 'rgba(255, 107, 53, 0.1)',
    padding: '4px 12px',
    borderRadius: '6px',
    letterSpacing: '1px',
  },
  reviewComment: {
    fontSize: '16px',
    lineHeight: '1.7',
    color: '#ccc',
    marginBottom: '16px',
  },
  reviewFooter: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '12px',
    color: '#888',
    fontWeight: '600',
    paddingTop: '16px',
    borderTop: '1px solid #333',
  },
};

export default Reviews;

