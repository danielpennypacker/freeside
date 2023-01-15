import React from "react";

import * as data from "./data";

type StatBlockProps = {
  item: data.Monster | data.Character;
};

function StackBlock(props: StatBlockProps) {
  const { item } = props;

  const anyItem: any = item;

  const isCharacter = !!anyItem.dialogue;

  let avatarUrl = process.env.PUBLIC_URL + `/img/`;
  if (isCharacter) {
    avatarUrl += "characters";
  } else {
    avatarUrl += "monsters";
  }
  avatarUrl += `/${item.code}.png`;

  return (
    <div className="StatBlock flex">
      {/* === Image ===   */}
      <div>
        <img className="portrait portraitSmall" src={avatarUrl} />
      </div>

      {/* ==== Combat ==== */}
      <table className="combatStatstats combatStatstats1">
        <thead>
          <tr>
            <th colSpan={2}>Combat</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>Armor Class</strong>
            </td>
            <td className="right">
              <strong>{item.armorClass}</strong>
            </td>
          </tr>
          <tr>
            <td>Hit Points</td>
            <td className="right">{item.hitPoints}</td>
          </tr>
          <tr>
            <td>Move</td>
            <td className="right">{item.speed}</td>
          </tr>
          <tr>
            <td>Initiative</td>
            <td className="right">{data.getAttrBonus(item.dexterity)}</td>
          </tr>

          <tr>
            <td
              className={`combatStatTitle combatStatTitle-${"passivePerception"}`}
            >
              Pass. Pers.
            </td>
            <td
              className={`combatStatValue right combatStatValue-${"passivePerception"}`}
            >
              {item.passivePerception}
            </td>
          </tr>
          <tr>
            <td>Chal. Rating</td>
            <td className="right">{item.challengeRating}</td>
          </tr>
        </tbody>
      </table>

      <table className="basicStats">
        <thead>
          <tr>
            <th>Stat</th>
            <th className="right"></th>
            <th className="right"></th>
            <th className="right">Sv</th>
          </tr>
        </thead>
        <tbody>
          {(
            [
              "strength",
              "dexterity",
              "constitution",
              "intelligence",
              "wisdom",
              "charisma",
            ] as string[]
          ).map((attr) => {
            const typedAttr = attr;
            return (
              <tr>
                <td className={`p-r-5 attrTitle attrTitle-${attr}`}>{attr}</td>
                <td className="attrValue right p-r-10">{anyItem[attr]}</td>
                <td className="attrBonus right p-r-10">
                  {data.getAttrBonus(anyItem[typedAttr])}
                </td>
                <td className="attrSave right">
                  {data.getAttrBonus(
                    anyItem[typedAttr] + anyItem.proficiencyBonus
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* ==== Skills ==== */}
      <table className="skills skills1">
        <thead>
          <tr>
            <th>Skill</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td className="skillTitle">Prof. Bonus</td>
            <td className="attrBonus right">+{item.proficiencyBonus}</td>
          </tr>
          {item.skills.sort().map((skill: string) => {
            return (
              <tr>
                <td className="skillTitle">{skill}</td>
                <td className="attrBonus right">+6</td>
              </tr>
            );
          })}

          {Array(5 - item.skills.length)
            .fill("x")
            .map(() => {
              return (
                <tr>
                  <td className="skillTitle">-</td>
                  <td className="attrBonus right"></td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default StackBlock;
