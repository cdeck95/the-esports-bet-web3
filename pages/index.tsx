import { ConnectWallet } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import { useMemo, useState } from "react";
import styles from "../styles/Home.module.css";
import { Events, Article, Articles, Away, Home, OAway, OHome, League} from '../interfaces/model';


function HomePage (){


//const APIKEY = process.env.API_KEY;
const APIKEY = "119588-R5L48IwuRSWhmR";

console.log(APIKEY);

const [upcomingEvents, setUpcomingEvents] = useState<any>([]);
const [liveEvents, setLiveEvents] = useState<any>([]);

const getUpcomingMatches = useMemo(async () => {
  try {
    const url = `https://api.b365api.com/v3/events/upcoming?sport_id=151&token=${APIKEY}`
    console.log(url);
    const response = await fetch(url, {
      method: 'GET'
    });
    console.log(response.status);
    if(response.status != 200){
      console.log(`error fetching upcoming games`)
      return;
    } 
    const responseBody = JSON.stringify(response.body);
    //setUpcomingEvents(responseBody)
    console.log(responseBody);
  } catch (e: any){
    console.log(e.message)
  }
  
}, []);

// const getLiveMatches = useMemo(async () => {
//   const response = await fetch(`https://api.b365api.com/v3/events/inplay?sport_id=151&token=${APIKEY}`, {
//       method: 'GET'
//   });
//   console.log(response.status);
//   if(response.status != 200){
//     console.log(`error fetching live games`)
//   } else {
//     const responseBody = JSON.stringify(response.body);
//     console.log(responseBody);
//   }
// }, []);




  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="http://thirdweb.com/">thirdweb</a>!
        </h1>

       

        <div className={styles.connect}>
          <ConnectWallet />
        </div>

        {/* {upcomingEvents
        ? upcomingEvents.map((event: any, index: number) => (
            <div key={index}>
              <h3>{event.name}</h3>
              <p>{event.description}</p>
            </div>
          ))
        : <div>Loading...</div>
        } */}

        
      </main>
    </div>
  );
};

export default HomePage;
