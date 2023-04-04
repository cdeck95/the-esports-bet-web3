import { ConnectWallet } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import { useMemo, useState } from "react";
import styles from "../styles/Home.module.css";
import { Events, Article, Articles, Away, Home, OAway, OHome, League, Results } from '../interfaces/model';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardHeader,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBBtn
} from 'mdb-react-ui-kit';
import Head from "next/head";




function HomePage (){


//const APIKEY = process.env.API_KEY;
const APIKEY = "119588-R5L48IwuRSWhmR";

const [upcomingEvents, setUpcomingEvents] = useState<Events[]>([]);
const [liveEvents, setLiveEvents] = useState<Events[]>([]);
const [isLoading, setIsLoading] = useState<boolean>(true);

const getUpcomingMatches = useMemo(async () => {
  try {
    setIsLoading(true);
    const url = `https://api.b365api.com/v3/events/upcoming?sport_id=151&token=${APIKEY}`
    console.log(url);
    const response = await fetch(url, {
      method: 'GET',
      mode: 'cors',
    });
    console.log(response.status);
    if(response.status != 200){
      console.log(`error fetching upcoming games`)
      return;
    } 
    const responseBody: Results = JSON.parse(await response.text());
    const eventsBody: Events[] = responseBody["results"];
    console.log(eventsBody);
    setUpcomingEvents(eventsBody)
    setIsLoading(false);
  } catch (e: any){
    console.log(e.message)
    setIsLoading(false);
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

const formatDate = (dateString: string | number | Date) => {
  const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric", hour: 'numeric', hour12: true, minute: 'numeric'}
  return new Date(dateString).toLocaleDateString(undefined, options)
}

const options: Intl.DateTimeFormatOptions = { 
  year: 'numeric', 
  month: 'long', 
  day: 'numeric', 
  hour: 'numeric', 
  minute: 'numeric' 
};


  return (
    <>
    <Head>
      <title>The Esports Bet</title>
      <meta name="description" content="thirdweb" />  
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossOrigin="anonymous"></link>
    </Head>
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="http://thirdweb.com/">thirdweb</a>!
        </h1>

       

        <div className={styles.connect}>
          <ConnectWallet />
        </div>

        {isLoading
        ? <div>Loading...</div>
        : upcomingEvents.map((event: Events, index: number) => (
          <div key={index}>
            <MDBCard className='text-center' style={{ margin: 10, backgroundColor: "#fefefe", borderRadius: 8, boxShadow: "0 8px 8px -4px lightblue", color: "black"}}>
              <MDBCardHeader>
                <MDBTabs pills className='card-header-tabs' style={{ display: "flex", justifyContent: "space-evenly"}}>
                  <MDBTabsItem>
                    <MDBTabsLink active>
                      {event.away.name}
                    </MDBTabsLink>
                  </MDBTabsItem>
                  <MDBTabsItem>
                    <MDBTabsLink>
                      {event.time}
                    </MDBTabsLink>
                  </MDBTabsItem>
                  <MDBTabsItem>
                    <MDBTabsLink className='disabled'>
                      {event.home.name}
                    </MDBTabsLink>
                  </MDBTabsItem>
                </MDBTabs>
              </MDBCardHeader>
              <MDBCardBody>
                <MDBCardTitle>{event.league.name}</MDBCardTitle>
                <MDBCardText>
                 {event.away.name} @ {event.home.name}
                 <br/>
                 {new Date(parseInt(event.time) * 1000).toLocaleString(undefined, options)}
                </MDBCardText>
                <MDBBtn>Go somewhere</MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </div>
        ))
        }

        
      </main>
    </div>
    </>
  );
};

export default HomePage;
