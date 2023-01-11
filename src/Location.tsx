import React from "react";
import "./Location.css";

import * as data from "./data";

type LocationProps = {
  location: data.Location;
};

function Location(props: LocationProps) {
  const { location } = props;

  const anyLocation: any = location;

  const noneRow = (
    <tr>
      <td colSpan={2}>None.</td>
    </tr>
  );

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
      <div className="notesCallout">{location.dmNotes}</div>
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
            <tr>
              <td>Inspiration</td>
              <td className="boldText bigText flexEven">
                {location.inspiration
                  .split(",")
                  .slice(0, 2)
                  .map((name) => {
                    return <div>{name}</div>;
                  })}
              </td>
            </tr>

            {["exterior", "interior", "crowd", "detailOne", "detailTwo"].map(
              (stat) => {
                return (
                  <tr>
                    <td>
                      <span>{data.toTitle(stat)}</span>
                    </td>
                    <td>
                      <span>{anyLocation[stat]}</span>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </div>

      {/* ==== Events ==== */}
      <table className="greyBlock">
        <thead>
          <th colSpan={2}>Events</th>
        </thead>
        <tbody>
          {location.events.map((evDesc, i) => {
            return (
              <tr>
                <td className="eventId">
                  <span>{i + 1}.</span>
                </td>
                <td colSpan={2}>{evDesc}</td>
              </tr>
            );
          })}
        </tbody>

        {location.events.length === 0 && noneRow}
      </table>

      {/* ==== Named NPC's ==== */}
      <table className="greyBlock">
        <thead>
          <th colSpan={2}>Named NPC's</th>
        </thead>
        <tbody>
          {location.namedNpcs.map((code: [data.CC, string], i) => {
            const char = data.c(code[0]);
            return (
              <tr>
                <td className="greenText boldText">C{char.id}</td>
                <td>
                  {char.name},
                  <br /> {char.title}
                </td>
                <td className="namedNpcDescription">{code[1]}</td>
              </tr>
            );
          })}

          {location.namedNpcs.length === 0 && noneRow}
        </tbody>
      </table>

      {/* ==== Random NPC ==== */}
      <table className="greyBlock">
        <thead>
          <th colSpan={2}>Random NPCs</th>
        </thead>
        <tbody>
          {location.randomNpcs.slice(0, 2).map((npc) => {
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

      {/* ==== Connected Locations ==== */}
      <table className="blueBlock">
        <thead>
          <th colSpan={2}>Connected Locations</th>
        </thead>
        <tbody>
          {/* ==== Events ==== */}
          {location.connectedAreas.map((locationId, i) => {
            const loc = data.l(locationId);
            return (
              <tr>
                <td className="connectedLocationId">L{loc.id}</td>
                <td>{loc.name}</td>
                <td className="connectedDescription">{loc.exterior}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Location;
