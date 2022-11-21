import React from "react";
import "./Location.css";

import * as data from "./data";

type LocationProps = {
  location: data.Location;
};

function Location(props: LocationProps) {
  const { location } = props;

  const anyLocation: any = location;

  return (
    <div className="Location">
      <div className="header">
        <div className="idContainer">
          <div className="id">L{location.id}</div>
          <div className="pageNumber">p. {location.page}</div>
        </div>
        <div className="name">{location.name}</div>
        <div className="idContainer">
          <div className="pageNumber">p. {location.page}</div>
          <div className="id">L{location.id}</div>
        </div>
      </div>
      <img
        className="splash"
        src={process.env.PUBLIC_URL + `/img/locations/${location.code}.png`}
      />

      <div className="descriptions">
        <table className="brownBlock">
          <thead>
            <th colSpan={2}>Descriptions</th>
          </thead>
          <tbody>
            {[
              // "distance",
              "exterior",
              "interior",
              "crowd",
              "detailOne",
              "detailTwo",
              // "detailThree",
              "dmNotes",
            ].map((stat) => {
              return (
                <tr>
                  <td className={`storyTitle storyStat-${stat}`}>
                    <span>{data.toTitle(stat)}</span>
                  </td>
                  <td className={`storyValue storyValue-${stat}`}>
                    <span>{anyLocation[stat]}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ==== Middle page ==== */}

      <table className="blueBlock">
        <thead>
          <th colSpan={2}>Connections</th>
        </thead>
        <tbody>
          {/* ==== Events ==== */}
          {location.events.map((evDesc, i) => {
            return (
              <tr>
                <td>{i == 0 ? "Events" : ""}</td>
                <td className="eventId">
                  <span>{i + 1}.</span>
                </td>
                <td colSpan={2}>{evDesc}</td>
              </tr>
            );
          })}

          {/* ==== Named NPCs ==== */}
          {location.namedNpcs.map((code: data.CC, i) => {
            const char = data.c(code);
            return (
              <tr>
                <td>{i == 0 ? "NPC" : ""}</td>
                <td className="greenText boldText">C{char.id}</td>
                <td>
                  {char.name}, {char.title}
                </td>
                <td className="namedNpcDescription">
                  {char.visualDescription}
                </td>
              </tr>
            );
          })}

          {/* ==== Connected Locations ==== */}
          {location.connectedAreas.map((locationId, i) => {
            const loc = data.l(locationId);
            return (
              <tr>
                <td>{i == 0 ? "Location" : ""}</td>
                <td className="connectedLocationId">L{loc.id}</td>
                <td>{loc.name}</td>
                <td className="connectedDescription">{loc.exterior}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* ==== Random NPC ==== */}
      <table className="greyBlock">
        <thead>
          <th colSpan={2}>Random NPCs</th>
        </thead>
        <tbody>
          {location.randomNpcs.map((npc) => {
            return (
              <tr>
                <td>{npc.name}</td>
                <td>{npc.race}</td>
                <td>{npc.job}</td>
                <td>{npc.description}</td>
                <td className="randomNpcDialogue">"{npc.dialogue}"</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Location;
