import React, { useState, useEffect } from 'react';
import LeaderboardData from './db-components/output.json';
import './leaderboard.css'; // Import your custom CSS file
import statimg from '../assets/brandtop.png';







interface MemberDataProps {
  username: string;
  xp: number;
  level: number;
}

function WLeaderboard() {
  const [visibleRows, setVisibleRows] = useState<number>(0);

  const customFontStyle: React.CSSProperties = {
    fontFamily: 'Press Start 2P, cursive',
  };

  const imageSizebox: React.CSSProperties = {
    width: '400px',
    display: 'flex',
  };

  const limitedLeaderboardData = LeaderboardData.slice(0, 8);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleRows((prevVisibleRows) => {
        const nextVisibleRows = prevVisibleRows + 1;
        return nextVisibleRows > limitedLeaderboardData.length
          ? limitedLeaderboardData.length
          : nextVisibleRows;
      });
    }, 100); // Adjust the interval as needed

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="leaderboard-wrapper">
      <div className="container mx-auto my-8">
        <h2 className="text-3xl font-semibold mb-4 text-purple-500" style={customFontStyle}>
          <img className="tableimage" src={statimg} style={imageSizebox} alt="Leaderboard Image" />
        </h2>
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
              </tr>
            </thead>
            <tbody>
              {limitedLeaderboardData.slice(0, visibleRows).map((row, index) => (
                <tr className="border-t hover:bg-gray-100" key={index}>
                  <td className="py-3 px-4" style={customFontStyle}>
                    {row.username}
                  </td>
                  <td className="py-3 px-4" style={customFontStyle}>
                    {row.xp}
                  </td>
                  <td className="py-3 px-4" style={customFontStyle}>
                    {row.level}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default WLeaderboard;