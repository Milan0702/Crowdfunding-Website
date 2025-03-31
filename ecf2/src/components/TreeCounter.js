import React, { useEffect, useState, useRef } from 'react';
import './TreeCounter.css'; 
import axios from 'axios';
import apiEndpoints from "../config/api";

// Base tree count (same as backend)
const BASE_TREE_COUNT = 245136420;

function TreeCounter() {
  // State for tree counter data
  const [treeCount, setTreeCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [treesFromDonations, setTreesFromDonations] = useState(0);
  const [totalDonations, setTotalDonations] = useState(0);
  
  // Refs for animation
  const animationRef = useRef(null);
  const startTimeRef = useRef(null);
  const targetCountRef = useRef(0);
  const animated = useRef(false); // Track if we've already animated once
  const observer = useRef(null);
  const counterRef = useRef(null);
  
  // Animation settings
  const ANIMATION_DURATION = 3000; // 3 seconds for animation

  // Function to animate the counter
  const animateCount = (timestamp) => {
    if (!startTimeRef.current) {
      startTimeRef.current = timestamp;
    }
    
    const elapsed = timestamp - startTimeRef.current;
    const progress = Math.min(elapsed / ANIMATION_DURATION, 1);
    
    // Easing function for smoother animation (ease-out)
    const easedProgress = 1 - Math.pow(1 - progress, 3);
    
    // Calculate current count with easing
    const currentCount = Math.floor(easedProgress * targetCountRef.current);
    setTreeCount(currentCount);
    
    if (progress < 1) {
      // Continue animation
      animationRef.current = requestAnimationFrame(animateCount);
    } else {
      // Animation complete
      setTreeCount(targetCountRef.current);
      startTimeRef.current = null;
      animated.current = true;
    }
  };

  // Function to start animation
  const startAnimation = (targetCount) => {
    // Set target count
    targetCountRef.current = targetCount;
    
    // Reset animation
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    
    // Start from 0 only if this is the first animation
    if (!animated.current) {
      setTreeCount(0);
    } else {
      // For subsequent animations (after donations), 
      // we already have a value so don't reset to 0
    }
    
    // Start animation
    animationRef.current = requestAnimationFrame(animateCount);
  };

  // Function to fetch tree count data
  const fetchTreeCount = async () => {
    try {
      setIsLoading(true);
      
      // Add cache-busting parameter
      const url = `${apiEndpoints.treeCount}?_t=${Date.now()}`;
      const response = await axios.get(url);
      
      if (response.data) {
        const { count, fromDonations, totalDonations: donationsAmount } = response.data;
        
        // Store values
        setTreesFromDonations(fromDonations);
        setTotalDonations(donationsAmount);
        
        // Start animation if not already animated
        if (!animated.current) {
          startAnimation(fromDonations);
        } else if (fromDonations !== treesFromDonations) {
          // If donation count changed, animate to new value
          startAnimation(fromDonations);
        } else {
          // No change, just update the value
          setTreeCount(fromDonations);
        }
        
        setError(null);
      } else {
        setError('Invalid response data');
      }
    } catch (err) {
      console.error('Error fetching tree count:', err);
      setError('Failed to load tree count');
    } finally {
      setIsLoading(false);
    }
  };

  // Set up Intersection Observer to trigger animation when counter is visible
  useEffect(() => {
    // Create observer to detect when counter is visible
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !animated.current) {
        // Element is now visible and not yet animated
        fetchTreeCount();
      }
    }, { threshold: 0.1 }); // Trigger when at least 10% visible
    
    // Start observing the counter element
    if (counterRef.current) {
      observer.current.observe(counterRef.current);
    }
    
    // Set up polling for changes (every 30 seconds)
    const intervalId = setInterval(() => {
      fetchTreeCount();
    }, 30000); // Check every 30 seconds
    
    // Set up event listener for when user returns to the page
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        fetchTreeCount();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Clean up
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (observer.current && counterRef.current) {
        observer.current.unobserve(counterRef.current);
      }
      clearInterval(intervalId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <div className="tree-counter-container" ref={counterRef}>
      {isLoading && !animated.current && (
        <div className="tree-counter-loading">Loading trees...</div>
      )}
      
      <div className="tree-counter-main">
        <span className="tree-counter-count" title="Trees planted from donations">
          {treeCount.toLocaleString()}
        </span>
        <span className="tree-counter-label">Trees Planted</span>
      </div>
      
      {treesFromDonations > 0 && (
        <div className="tree-counter-details">
          <div className="tree-counter-detail-item">
            <span className="detail-label">From Donations:</span>
            <span className="detail-value">{treesFromDonations.toLocaleString()} trees</span>
          </div>
          <div className="tree-counter-detail-item">
            <span className="detail-label">Donation Amount:</span>
            <span className="detail-value">{totalDonations.toLocaleString()} INR</span>
          </div>
        </div>
      )}
      
      {error && <span className="tree-counter-error">{error}</span>}
    </div>
  );
}

export default TreeCounter;
