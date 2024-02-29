import {React, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {MatchDetailCard} from "../component/MatchDetailCard";

import './MatchPage.css';
import {teams} from "../TeamLogoImages/TeamLogo";
import {YearSelector} from "./YearSelector";

export const MatchPage = () => {

    const [matches, setMatch] = useState([]);
    const {teamName, year} = useParams();
    const selectedTeam = teams.find((teamData) => teamData.teamName === teamName);

    useEffect(
        () => {
            const fetchMatches = async () => {
                const response = await fetch(`http://localhost:8080/team/${teamName}/matches?year=${year}`);

                const data = await response.json();
                setMatch(data);
            };
            fetchMatches();

        },
        [teamName, year]
    );

    return (
        <div className="MatchPage" >
            <div className="teamName-and-logo">
                <h1>{teamName}</h1>
            </div>
            <div className="year-selector">
                <YearSelector teamName={teamName} />
            </div>
            <div className="match-detail"  >
                {matches.map(match =>
                    <MatchDetailCard
                        teamName={teamName}
                        match={match}
                        teamColor = {selectedTeam.teamColour}
                    />
                )}
            </div>

        </div>
    );
}
