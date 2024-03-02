import {React, useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import {MatchDetailCard} from "../component/MatchDetailCard";

import './MatchPage.css';
import {teams_array} from "../TeamLogoImages/TeamLogo";
import {YearSelector} from "../component/YearSelector";
import {motion} from "framer-motion";

export const MatchPage = () => {

    const [matches, setMatch] = useState([]);
    const [total_years, setYears] = useState([]);
    const {teamName, year} = useParams();
    const selectedTeam = teams_array.find((teamData) => teamData.teamName === teamName);

    useEffect(
        () => {
            const fetchMatches = async () => {
                const response = await fetch(`${process.env.REACT_APP_API_ROOT_URL}/team/${teamName}/matches?year=${year}`);
                const response_year = await fetch(`${process.env.REACT_APP_API_ROOT_URL}/team/${teamName}/years`);

                const data = await response.json();
                const year_data = await response_year.json();

                setMatch(data);
                setYears(year_data)
            };
            fetchMatches();

        },
        [teamName, year]
    );

    return (
        <div className="MatchPage">
            <div className="back-button">
                <h2 className="back-text">
                    <Link to={`/teams/${teamName}`}>
                        &lt;&lt; Back
                    </Link>

                </h2>
            </div>

            <motion.div className="teamName-matchpage"
                 initial={{y:"10px", opacity:0}}
                 animate={{y:0, opacity:1}}
                 exit={{y:"50%", opacity:0}}
                 transition={{duration: 0.7, delay: 0.2}}
            >
                <h1>{teamName}</h1>
            </motion.div>


            <motion.div className="year-selector"
                 initial={{y:"10px", opacity:0}}
                 animate={{y:0, opacity:1}}
                 exit={{y:"50%", opacity:0}}
                 transition={{duration: 0.7, delay: 0.3}}
            >
                <YearSelector total_years={total_years} teamName={teamName}/>
            </motion.div>
            <motion.div className="match-detail"
                 initial={{y:"10px", opacity:0}}
                 animate={{y:0, opacity:1}}
                 exit={{y:"50%", opacity:0}}
                 transition={{duration: 0.7, delay: 0.4}}
            >
                {matches.map(match =>
                    <MatchDetailCard
                        key={match.id}
                        teamName={teamName}
                        match={match}
                        teamColor={selectedTeam.teamColour}
                    />
                )}
            </motion.div>

        </div>
    );
}
