import React from "react";

import * as data from "./data";

type StatBlockProps = {
  item: data.Monster | data.Character;
};

function StackBlock(props: StatBlockProps) {
  const { item } = props;

  const anyItem: any = item;

  return (
    <div className="StatBlock flex">
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
          {/* ==== Skills ==== */}
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
            <td>-</td>
          </tr>
          <tr>
            <td>-</td>
          </tr>
        </tbody>
      </table>
      {/* ==== Attack ==== */}
      <table className="combatStatstats combatStatstats2">
        <thead>
          <tr>
            <th colSpan={2}>Main Attack</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>Bonus</strong>
            </td>
            <td className="right">
              <strong>+{item.attack?.bonus}</strong>
            </td>
          </tr>
          <tr>
            <td>Damage</td>
            <td className="right">{item.attack?.damage}</td>
          </tr>
          <tr>
            <td>Range</td>
            <td className="right">{item.attack?.range}</td>
          </tr>
          <tr>
            <td>Num. Atk.</td>
            <td className="right">{item.attack?.multi}</td>
          </tr>
          <tr>
            <td>-</td>
          </tr>
          <tr>
            <td>-</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default StackBlock;
