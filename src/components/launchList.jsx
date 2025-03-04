import { highLightPoint, toneDownPoint } from "./map";

function LaunchList(props) {

    return (
        <aside className="aside" id="launchesContainer">
            <h3>Launches</h3>
            <div id="listContainer">
                <ul>
                    {props.launches.map(launch => {
                        return <li key={launch.id} lp={`L${launch.launchpad}`} onMouseOver={highLightPoint} onMouseLeave={toneDownPoint}>{launch.name}</li>;
                    })}
                </ul>
            </div>
        </aside>
    );
}

export { LaunchList };
