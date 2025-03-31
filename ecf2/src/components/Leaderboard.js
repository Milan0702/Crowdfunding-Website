import React, { useEffect, useState } from 'react';
import './Leaderboard.css';
import transitionhill from '../assets/transition-hill.png';
import axios from 'axios';
import apiEndpoints from "../config/api";

function Leaderboard() {
    const [leaderboardData, setLeaderboardData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await axios.get(apiEndpoints.leaderboard);
            setLeaderboardData(response.data);
            setError(null);
        } catch (error) {
            console.error('Error fetching leaderboard data:', error);
            setError('Unable to load leaderboard data. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div id="scroll2">
            <div className="leaderboard">
                <h1 className="leaderboard-h1">LEADERBOARD</h1>
                {loading ? (
                    <div className="loading-message">Loading leaderboard data...</div>
                ) : error ? (
                    <div className="error-message">{error}</div>
                ) : (
                    <ul>
                        {leaderboardData.length === 0 ? (
                            <div className="no-data-message">No donations yet. Be the first to donate!</div>
                        ) : (
                            leaderboardData.map((entry, index) => (
                                <li key={index}>
                                    <div className="leaderboard-entry-details">
                                        <div className="leaderboard-entry-logo">🌳</div>
                                        <div className="leaderboard-entry-user">
                                            <span className="leaderboard-entry-name">
                                                {entry.name || 'Anonymous'}
                                            </span>
                                            <br />
                                            <span className="leaderboard-entry-comment">
                                                "{entry.message || 'No message'}"
                                            </span>
                                        </div>
                                        <span className="leaderboard-entry-amount">
                                            {entry.amount/100} Trees
                                        </span>
                                    </div>
                                </li>
                            ))
                        )}
                    </ul>
                )}
            </div>
            <img
                src={transitionhill}
                style={{ width: '100%', marginBottom: '-150px' }}
                alt="Decorative Hill"
            />
        </div>
    );
}

export default Leaderboard;
