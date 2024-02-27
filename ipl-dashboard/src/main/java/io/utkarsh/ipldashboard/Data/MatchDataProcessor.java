
package io.utkarsh.ipldashboard.Data;

import io.utkarsh.ipldashboard.model.Match;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.batch.item.ItemProcessor;

import java.time.LocalDate;

public class MatchDataProcessor implements ItemProcessor<MatchInput, Match> {

        private static final Logger log = LoggerFactory.getLogger(MatchDataProcessor.class);

        @Override
        public Match process(final MatchInput matchInput) throws Exception {

            Match match = new Match();

            match.setId(Long.parseLong(matchInput.getId()));
            match.setCity(matchInput.getCity());
            match.setDate(LocalDate.parse(matchInput.getDate()));
            match.setPlayerOfMatch(matchInput.getPlayer_of_match());
            match.setVenue(matchInput.getVenue());


            //to set Team 1 and Team 2 as first or second inning team
            String firstInning, secondInning;

            if("bat".equals(matchInput.getToss_decision())) {
                firstInning = matchInput.getToss_winner();
                secondInning = matchInput.getToss_winner().equals(matchInput.getTeam1())
                        ? matchInput.getTeam2() : matchInput.getTeam1();

            }else{
                secondInning = matchInput.getToss_winner();
                firstInning = matchInput.getToss_winner().equals(matchInput.getTeam1())
                        ? matchInput.getTeam2() : matchInput.getTeam1();
            }

            match.setTeam1(firstInning);
            match.setTeam2(secondInning);

            match.setTossDecision(matchInput.getToss_decision());
            match.setTossWinner(matchInput.getToss_winner());
            match.setMatchWinner(matchInput.getWinner());
            match.setResult(matchInput.getResult());
            match.setResult_margin(matchInput.getResult_margin());
            match.setUmpire1(matchInput.getUmpire1());
            match.setUmpire2(matchInput.getUmpire2());

            return  match;
        }
}
