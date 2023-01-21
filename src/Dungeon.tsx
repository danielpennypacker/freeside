import React from "react";
import "./Character.css";
import StatBlock from "./StatBlock";

import * as data from "./data";
import CombatActions from "./CombatActions";

type DungeonProps = {
  dungeon: data.Dungeon;
};

function Character(props: DungeonProps) {
  const { dungeon
   } = props;

  if (!dungeon.rooms) {
    console.log("=========");
    console.log(dungeon);
  }

  const noneRow = (
    <tr>
      <td colSpan={2}>None.</td>
    </tr>
  );

  let anyDungeon: any = dungeon;

  return (
    <>
      {/* ==== Map Page ==== */}
      <div className="Dungeon" id={dungeon?.id?.toString() + "map"}>
        <div className="header">
          <div className="idContainer">
            <div className="id">D{dungeon.id}</div>
            <div className="pageNumber">p. {dungeon.page}</div>
          </div>
          <div className="name">{dungeon.title}</div>
          <div className="idContainer">
            <div className="pageNumber"></div>
            <div className="id"></div>
          </div>
        </div>
        <div className="notesCallout">{dungeon.dmNotes}</div>

        {/* ==== Map Image ==== */}
        <img
          className="mapImage"
          src={process.env.PUBLIC_URL + `/img/dungeons/${dungeon.code}.png`}
        />
      </div>

      {/* ==== Text Page ==== */}
      <div className="Dungeon" id={dungeon?.id?.toString()}>
        {/* ==== Rooms ==== */}
        <div className="rooms">
          {dungeon.rooms.map((room) => {
            return (
              <div className="roomItem">
                <div className="roomItemHeader">
                  <div>{room.num}.</div>
                  <div>{room.title}</div>
                </div>
                <div>{room.desc}</div>
              </div>
            );
          })}
        </div>

        {/* ==== Misc. ==== */}
        <table className="blueBlock">
          <thead>
            <th colSpan={2}>Misc.</th>
          </thead>
          <tbody>
            {anyDungeon.misc.map(([title, desc]: any) => {
              return (
                <tr>
                  <td className="plotInfoTitle">
                    <span>{data.toTitle(title)}</span>
                  </td>
                  <td>
                    <span>{desc}</span>
                  </td>
                </tr>
              );
            })}
            {anyDungeon.misc.length === 0 && noneRow}
          </tbody>
        </table>

        {/* ==== Monsters ==== */}
        <div className="monsters">
          {dungeon.monsters.map((monster: any) => {
            return (
              <div>
                <h3>{monster.name}</h3>
                <div className="monsterBlock">
                  {/* ==== Stats ==== */}

                  <StatBlock item={monster} />
                  <CombatActions item={monster} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Character;
