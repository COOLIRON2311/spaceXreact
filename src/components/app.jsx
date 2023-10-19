import { LaunchList } from "./launchList";
import { Map as GeoMap} from "./map";
import { useEffect, useState } from "react";
import { SpaceX } from "../api/spacex";


function App() {
    const spaceX = new SpaceX();
    const [launches, setLaunches] = useState([]);
    const [launchpads, setLaunchpads] = useState([]);

    useEffect(() => {
        spaceX.launches().then(data => {
            setLaunches(data);
        });
    }, []);

    useEffect(() => {
        if (!launches.length)
            return;

        spaceX.launchpads().then(data => {
            const lp_map = new Map();
            const launchpads = [];
            data.forEach(lp => {
                lp_map.set(`L${lp.id}`, { hits: 0 });
                launchpads.push(
                    {
                        "id": `L${lp.id}`,
                        "full_name": lp.full_name,
                        "type": "Feature",
                        "geometry": {
                            "type": "Point",
                            "coordinates": [lp.longitude, lp.latitude]
                        }
                    }
                );
            });

            launches.forEach(l => {
                lp_map.get(`L${l.launchpad}`).hits++;
            });

            setLaunchpads(launchpads.filter(l => lp_map.get(l.id).hits > 0));
        });
    }, [launches]);

    return (
        <main className='main'>
            <LaunchList launches={launches} />
            <GeoMap launchpads={launchpads}/>
        </main>
    );
}

export { App };
