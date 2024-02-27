import {React, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {MatchDetailCard} from "../component/MatchDetailCard";

export const MatchPage = () => {

    const [matches, setMatch] = useState([]);
    const {teamName, year} = useParams();
    useEffect(
        () => {
            const fetchTeam = async () => {
                const response = await fetch(`http://localhost:8080/team/${teamName}/matches?year=${year}`);
                const data = await response.json();
                setMatch(data);
            };
            fetchTeam();
        }, []
    );

    return (
        <div className="MatchPage">
           <h1>Match Page</h1>
            {
                matches.map(match => <MatchDetailCard teamName = {teamName} match={match} />)
            }
        </div>
    );
}
