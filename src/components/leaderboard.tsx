import React, { useState, useEffect } from 'react';
import './leaderboard.css';
import statimg from '../assets/brandtop.png';

import axios from 'axios'; // Import Axios library


interface MemberDataProps {
  member_id: string;
  voice: { connections: number; unmutedTime?: number };
  xp: number;
  level: number;
  username?: string;
}


function WLeaderboard() {
  const [visibleRows, setVisibleRows] = useState<number>(0);
  const [leaderboardData, setleaderboardData] = useState<MemberDataProps[]>([]);

  const customFontStyle: React.CSSProperties = {
    fontFamily: 'Press Start 2P, cursive',
    fontSize: '10px',
  };


  const imageSizebox: React.CSSProperties = {
    width: '400px',
  };

  
      useEffect(() => {

        
        const fetchData = async () => {
          try {
            const response = await axios.get('https://77.68.117.58:8999/api/data'); // Use axios.get instead of fetch
            const data = response.data;
            
            // Ensure that each member has a valid username and voice.unmutedTime
            
        // Ensure that each member has a valid username and voice.unmutedTime
        const filteredData: MemberDataProps[] = data.filter(
          (member: MemberDataProps) =>
            member.username !== undefined &&
            member.voice.unmutedTime !== undefined
        );

        setleaderboardData(filteredData);
      } catch (error) {
        console.error('Error fetching leaderboard data:', error);
      }
    };

    fetchData(); // Initial fetch

    const interval = setInterval(fetchData, 300000); // Refresh every 5 minutes

    return () => clearInterval(interval);
  }, []);
  
  const limitedLeaderboardData = leaderboardData.slice(0, 7);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleRows((prevVisibleRows) => {
        const nextVisibleRows = prevVisibleRows + 1;
        return nextVisibleRows > limitedLeaderboardData.length
          ? limitedLeaderboardData.length
          : nextVisibleRows;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [visibleRows, limitedLeaderboardData]);

  return (
    <div>
    <img className="tableImage" src={statimg} style={imageSizebox} alt="Leaderboard Image" />
    <div className="leaderboard-wrapper">
      <div className="container mx-auto my-8">
       
        <div className="table-container">
          <table className="table">
            <thead>
              <tr className="bg-purple-700 text-white">
                <th className="py-3 px-4 border" style={customFontStyle}>
                  Name
                </th>
                <th className="py-3 px-4 border" style={customFontStyle}>
                  XP
                </th>
                <th className="py-3 px-4 border" style={customFontStyle}>
                  Level
                </th>
                <th className="py-3 px-4 border" style={customFontStyle}>
                  Joins
                </th>
                <th className="py-3 px-4 border" style={customFontStyle}>
                  Mins
                </th>
              </tr>
            </thead>
            <tbody>
              {limitedLeaderboardData.slice(0, visibleRows).map((row, index) => (
                <tr className="border-t hover:bg-gray-100" key={index}>
                  <td className="py-3 px-4" style={customFontStyle}>
                    {row.username}
                  </td>
                  <td className="py-3 px-4" style={customFontStyle}>
                    {Number(row.xp) .toFixed(0).slice(-4)}
                  </td>
                  <td className="py-3 px-4" style={customFontStyle}>
                    {row.level}
                    </td>
                  <td className="py-3 px-4" style={customFontStyle}>
                    {row.voice.connections}
                  </td>
                  <td className="py-3 px-4" style={customFontStyle}>
      {row.voice.unmutedTime !== undefined ? 
        Number(row.voice.unmutedTime / 1000).toFixed(0).slice(-6) 
        : 'N/A'}
    </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </div>
  );
}

export default WLeaderboard;
