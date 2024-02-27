import React, { useState, useEffect } from 'react';
import './Profile.css';
import { FaUserCircle, FaStopwatch, FaEnvelope, FaGamepad, FaChartLine, FaComments, FaMicrophone, FaMusic, FaCode, FaUsers, FaImage } from 'react-icons/fa';
import Wlogout from './logout';

type VoiceDetails = {
  connections: number;
  time: number;
  unmutedTime: number;
  mutedTime: number;
};

type Commands = {
  prefix: number;
  slash: number;
};

type Contexts = {
  message: number;
  user: number;
};

type DiscordData = {
    guild_id: string;
    member_id: string;
    username: string;
    userimg: string;
    messages: number;
    voice: VoiceDetails;
    commands: Commands;
    contexts: Contexts;
    xp: number;
    level: number;
  };
  
  // Updated for clarity and type safety
  type ProfileData = {
    email: string;
    discordUsername: string;
    // Add the discordData property with the type DiscordData
    discordData: DiscordData;
  };
  
// Initial state can be null or a defined structure
const initialState: ProfileData | null = null;


const Profile = () => {
    const [profileData, setProfileData] = useState<ProfileData | null>(initialState);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
  


    
    useEffect(() => {
      const fetchProfileData = async () => {
        try {
          const token = localStorage.getItem('token');
          if (!token) throw new Error('No token found');
  
          const response = await fetch('http://localhost:3000/profile', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          });
  
          if (!response.ok) {
            const errorBody = await response.text(); // Attempt to read response body
            throw new Error(`Failed to fetch profile data: ${response.status} ${response.statusText} - ${errorBody}`);
          }
  
          const data: ProfileData = await response.json();
          setProfileData(data);
        } catch (error: any) {
          console.error('Error fetching profile data:', error.message);
          setError(`Failed to load profile data. Please try again later. Error: ${error.message}`);
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchProfileData();
    }, []);

// Converts camelCase text to Space Case for readability
const formatKey = (key: string): string => {
    return key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase()).trim();
  };
  
  // Formats numbers for better readability (e.g., adding commas)
  const formatNumber = (number: number): string => {
    return new Intl.NumberFormat().format(number);
  };
  
  
  if (isLoading) return <div className="profile-container">Loading profile data...</div>;
  if (error) return <div className="profile-container">{error}</div>;

  
  // A helper function to display each field dynamically
  const renderDetail = (detail: string | number, key: string) => {
    // Check if the detail is a number and format it if so
    const formattedDetail = typeof detail === 'number' ? formatNumber(detail) : detail;
    return (
      <p key={key}><strong>{formatKey(key)}:</strong> {formattedDetail}</p>
    );
  };

// Dynamically render details including nested objects
const renderDetails = (data: ProfileData | null) => {
    if (!data) return null;
  
    // Render properties of the discordData object
    const renderDiscordData = (discordData: typeof data.discordData) => {
      return Object.entries(discordData).map(([key, value]) => {
        if (typeof value === 'object' && value !== null) {
          // If the value is an object, recursively call renderDetail for each sub-property
          return (
            <div key={key}>
              <h3>{formatKey(key)}</h3>
              {Object.entries(value).map(([subKey, subValue]) =>
                renderDetail(subKey === 'time' ? subValue / 1000 : subValue, subKey)
              )}
            </div>
          );
        } else {
          // Directly render the property if it's not an object
          return renderDetail(value, key);
        }
      });
    };
  
    // Render the top-level properties of profileData
    return Object.entries(data).map(([key, value]) => {
      // Special handling for discordData to render its nested structure
      if (key === 'discordData' && typeof value === 'object') {
        return (
          <div key={key}>
            <h3>{formatKey(key)}</h3>
            {renderDiscordData(value)}
          </div>
        );
      } else if (typeof value !== 'object') {
        // Render directly if not an object (excluding discordData which was handled above)
        return renderDetail(key === 'xp' ? Number(value).toString().slice(0, 5) : value, key);
      }
      // For other potential objects, you might want to handle them similarly to discordData
    });
  };
  const overallTime = ((profileData?.discordData.voice.unmutedTime ?? 0) + (profileData?.discordData.voice.mutedTime ?? 0)) / 1000;
  

  return (
    <div className="profile-container">

<div className="stat-item">
    
    <div className="discord-image">
            <FaImage className="icon-large" />
            <span> <img src={profileData?.discordData.userimg} alt="User" style={{width: '50px', height: '50px', borderRadius: '50%'}} /></span>
        </div>
        </div>

        
       <h2>Discord Stats</h2>
    <div className="profile-details">
    <div className="stat-item">
  <FaMicrophone className="icon-large" />
  <ul className="details-list">
    <li>Active for: {(((profileData?.discordData.voice.unmutedTime ?? 0) / 1000).toFixed(2).toString().slice(0, 8))} Minutes</li>
    <li>Muted for: {(((profileData?.discordData.voice.mutedTime ?? 0) / 1000).toFixed(2)).toString().slice(0, 8)} Minutes</li>
    <li>Online for: {overallTime.toFixed(2).toString().slice(0, 8)} Minutes</li>
  </ul>
</div>
      
       {/* <div className="stat-item">
            <FaCode />
            <span>Commands Used (Prefix): {profileData?.discordData.commands.prefix}</span>
        </div>*/}


{/*all Unused components are here */}
<div className="stat-item">
  <FaComments className="icon-large" />
  <ul className="details-list">
    <li>Messages: {profileData?.discordData.messages}</li>
    <li>Slash Commands: {profileData?.discordData.commands.slash}</li>
  </ul>
</div>
        {/*<div className="stat-item">
            <FaUsers />
            <span>Contexts (User): {profileData?.discordData.contexts.user}</span>
        </div>*/}
       {/* } <div className="stat-item">
            <FaComments />
            <span>Contexts (Message): {profileData?.discordData.contexts.message}</span>
        </div> */}
     <div className="stat-item">
    <FaChartLine className="icon-large" />
    <ul className="details-list">
        <li>Voice Connections: {profileData?.discordData.voice.connections}</li>
        <li>Discord Level: {profileData?.discordData.level}</li>
        <li>Current XP: {formatNumber(Number((profileData?.discordData.xp ?? 0).toString().slice(0, 8)))}</li>
    </ul>
</div>
       
     
        </div>
    <h2>PowerClickers Account</h2>
    <div className="profile-details">
  
    
        <div className="stat-item">
            <FaUserCircle className="icon-large" />
            <span>Username: {profileData?.discordUsername}</span>
        </div>
        <div className="stat-item">
            <FaEnvelope className="icon-large" />
            <span>Email: {profileData?.email}</span>
        </div>
        
 
        
    </div>
    <div className='bottom-content'>
       
    <button className='logout-button'>Connect Twitter</button>
    <button className='logout-button'>Connect Youtube</button>
    <button className='logout-button'>Connect Tiktok</button>
    <Wlogout />
    </div>
</div>
);
};


export default Profile;
