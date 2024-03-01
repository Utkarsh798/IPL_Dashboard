import {Link} from "react-router-dom";
import './YearSelector.css';

export const YearSelector = ({total_years,teamName}) => {

    return (
        <ol className="YearSelector">
            { total_years.map(year => (
                <li key={year}>
                    <Link to={`/teams/${teamName}/matches/${year}`}
                          className="each-year">
                        {year}
                    </Link>
                </li>
            )) }
        </ol>
    )

}