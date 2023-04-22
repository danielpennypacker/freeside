import React from "react";
import "./Character.css";
import CombatActions from "./CombatActions";

import * as data from "./data";
import StatBlock from "./StatBlock";

type CharacterProps = {
  character: data.Character;
};

function Character(props: CharacterProps) {
  const { character } = props;

  if (!character.skills) {
    console.log("=========");
    console.log(character);
  }

  const noneRow = (
    <tr>
      <td colSpan={2}>None.</td>
    </tr>
  );

  let anyCharacter: any = character;

  return (
    <div className="Character" id={character?.id?.toString()}>
      <div className="header">
        <div className="idContainer">
          <div className="id">C{character.id}</div>
          <div className="pageNumber">p. {character.page}</div>
        </div>
        <div className="name">
          {character.name}, {character.title}
        </div>
        <div className="idContainer">
          <div className="pageNumber">p. {character.page}</div>
          <div className="id">C{character.id}</div>
        </div>
      </div>

      <StatBlock item={character} />

      {/* ==== Roleplaying Information ==== */}
      <table className="brownBlock">
        <thead>
          <th colSpan={2}>Descriptions</th>
        </thead>
        <tbody>
          <tr>
            <td>Inspiration</td>
            <td className="boldText bigText flexEven">
              {character.roleplayInspiration.split(",").map((name) => {
                return <div>{name}</div>;
              })}
            </td>
          </tr>

          <tr>
            <td>Description</td>
            <td>{character.visualDescription}</td>
          </tr>

          <tr>
            <td>Detail</td>
            <td>{character.detailOne}</td>
          </tr>
        </tbody>
      </table>

      {/* === Dialogue === */}
      <table className="greyBlock">
        <thead>
          <th colSpan={2}>Dialogue</th>
        </thead>
        <tbody>
          {character.dialogue.map((line, i) => {
            return (
              <tr>
                <td>{i + 1}.</td>
                <td>{data.toTitle(line[0])}</td>
                <td>"{line[1]}"</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* === Quests === */}
      <table className="greyBlock">
        <thead>
          <th colSpan={2}>Quests</th>
        </thead>
        <tbody>
          {character.quests.map((line, i) => {
            return (
              <tr>
                <td>{i + 1}.</td>
                <td>
                  {line[0]} <br />- {line[1]}
                </td>
              </tr>
            );
          })}

          {character.quests.length === 0 && noneRow}
        </tbody>
      </table>

      {/* ==== Plot + Misc ==== */}
      <table className="blueBlock">
        <thead>
          <th colSpan={2}>Plot and Utility</th>
        </thead>
        <tbody>
          {anyCharacter.misc.map(([title, desc]: any) => {
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
          {character.misc.length === 0 && noneRow}
        </tbody>
      </table>
    </div>
  );
}

export default Character;
