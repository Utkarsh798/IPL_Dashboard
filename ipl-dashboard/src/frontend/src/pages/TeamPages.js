import {React, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {MatchDetailCard} from "../component/MatchDetailCard";
import {MatchSmallCard} from "../component/MatchSmallCard";

import './TeamPage.css';
import {teams} from "../TeamLogoImages/TeamLogo";

export const TeamPage = () => {

    const [team, setTeam] = useState({matches: []});
    const {teamName} = useParams();

    const selectedTeam = teams.find((teamData) => teamData.teamName === teamName);


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



    return (
        <div className="TeamPage" style={{ backgroundColor: selectedTeam.teamColour }}>
            <div className="Logo" style={{backgroundImage: `url(${selectedTeam?.logoUrl})`}} >

            </div>

            <div className="t-shirt" style={{backgroundImage: `url(${selectedTeam?.tshirtUrl})`}}>

            </div>

            <div className="team-name-section">
                <h1 className="team-name">{team.teamName}</h1>
            </div>

            <div className="win-loss-section">
                Win / loss
            </div>

            <div className="match-detail-section">

                <MatchDetailCard teamName={team.teamName} match={team.matches[0]}/>
            </div>

            {team.matches.slice(1).map(match => <MatchSmallCard teamName={team.teamName} match={match}/>)}

            <div className="more-link">
                <a href="#"> More ></a>
            </div>
        </div>
    );
}
