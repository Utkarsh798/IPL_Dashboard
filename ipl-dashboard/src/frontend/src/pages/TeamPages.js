import {React, useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import {MatchDetailCard} from "../component/MatchDetailCard";
import {MatchSmallCard} from "../component/MatchSmallCard";
import { PieChart } from 'react-minimal-pie-chart';

import './TeamPage.css';
import {teams_array} from "../TeamLogoImages/TeamLogo";
import {motion} from "framer-motion";

export const TeamPage = () => {

    const [team, setTeam] = useState({matches: []});
    const {teamName} = useParams();

    const selectedTeam = teams_array.find((teamData) => teamData.teamName === teamName);


    useEffect(
        () => {
            const fetchTeam = async () => {
                const response = await fetch(`http://localhost:8080/team/${teamName}`);
                const data = await response.json();
                setTeam(data);
            };
            fetchTeam();
        }, [teamName]
    );


    if (!team || !team.teamName) {
        return <h1>Team not found</h1>
    }

    const firstMatchYear = team.matches.length > 0 ? new Date(team.matches[0].date).getFullYear() : '';



    return (
        <motion.div className="TeamPage"
             style={{ backgroundColor: selectedTeam.teamColour }}
             initial={{y:"10px", opacity:0}}
             animate={{y:0, opacity:1}}
             exit={{y:"50%", opacity:0}}
             transition={{duration: 0.7, delay: 0.2}}
        >
            <div className="back-button">
                <h2 className="back-text">
                    <Link to={`/`}>
                        &lt;&lt; Back
                    </Link>

                </h2>
            </div>

            <motion.div className="Logo"
                 style={{backgroundImage: `url(${selectedTeam?.logoUrl})`}}
                 initial={{y:"10px", opacity:0}}
                 animate={{y:0, opacity:1}}
                 exit={{y:"50%", opacity:0}}
                 transition={{duration: 0.7, delay: 0.3}}
            />

            <motion.div className="t-shirt"
                 style={{backgroundImage: `url(${selectedTeam?.tshirtUrl})`}}
                 initial={{y:"10px", opacity:0}}
                 animate={{y:0, opacity:1}}
                 exit={{y:"50%", opacity:0}}
                 transition={{duration: 0.7, delay: 0.4}}
            />

            <div className="team-name-section">

                <h1 className="team-name">{team.teamName}</h1>

            </div>
            <div className="win-loss-section" style={{ padding: '20px' }}>
                <PieChart
                    data={[
                        { title: 'Wins', value: team.totalWins, color: 'green' },
                        { title: 'Losses', value: team.totalMatches - team.totalWins, color: 'red' },
                    ]}
                    radius={40}
                    paddingAngle={7}
                    startAngle={7}
                    lineWidth={70}
                    label={({ dataEntry }) => dataEntry.title + ': ' + dataEntry.value} // Assigning label based on dataEntry
                    labelStyle={{ fontSize: '5px', fontFamily: 'sans-serif', fill: '#000' }} // Customizing label style
                />
            </div>

            <div className="match-detail-section">

                <MatchDetailCard  teamName={team.teamName} match={team.matches[0]}/>
            </div>

            {team.matches.slice(1).map(
                match =>
                <MatchSmallCard key={match.id} teamName={team.teamName} match={match}/>)}

            <div className="more-link">
                <Link to={`/teams/${teamName}/matches/${firstMatchYear}`} className="each-year">More >></Link>
            </div>
        </motion.div>
    );
}
