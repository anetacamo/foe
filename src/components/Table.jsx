import { useState } from "react";
import items from "../data2.json";

const names = [
  // {
  //   title: "own",
  //   color: "blue",
  //   items: [{ key: "amount", name: "" }],
  // },
  {
    title: "size",
    color: "bluedark",
    items: [{ key: "size", name: "size" }],
  },
  {
    title: "FP",
    color: "purple",
    items: [
      { key: "fps", name: "total" },
      { key: "multiplier", count: ["fps"], name: "/size" },
    ],
  },
  {
    title: "name",
    color: "lavender",
    items: [{ key: "title", name: "name" }],
  },

  {
    title: "attack + defense",
    color: "red",
    items: [
      { key: "aA", name: "AA" },
      { key: "dA", name: "DA" },
      { key: "aD", name: "AD" },
      { key: "dD", name: "DD" },
      { key: "custom", count: ["dD", "aD", "dA", "aA"], name: "sum" },
      { key: "multiplier", count: ["dD", "aD", "dA", "aA"], name: "/size" },
    ],
  },

  {
    title: "GBG",
    color: "peach",
    items: [
      { key: "GBGaA", name: "AA" },
      { key: "GBGdA", name: "DA" },
      { key: "GBGaD", name: "AD" },
      { key: "GBGdD", name: "DD" },
      {
        key: "custom",
        count: ["GBGaA", "GBGdA", "GBGaD", "GBGdD"],
        name: "sum",
      },
      {
        key: "multiplier",
        count: ["GBGaA", "GBGdA", "GBGaD", "GBGdD"],
        name: "/size",
      },
      {
        key: "multiplier",
        count: ["GBGaA", "GBGdA", "GBGaD", "GBGdD", "dD", "aD", "dA", "aA"],
        name: "AD + GBG/size",
      },
    ],
  },
  {
    title: "GE",
    color: "beige",
    items: [
      { key: "GEaA", name: "AA" },
      { key: "GEdA", name: "DA" },
      { key: "GEaD", name: "AD" },
      { key: "GEdD", name: "DD" },
      {
        key: "custom",
        count: ["GEaA", "GEdA", "GEaD", "GEdD"],
        name: "sum",
      },
      {
        key: "multiplier",
        count: [
          "GEaA",
          "GEdA",
          "GEaD",
          "GEdD",
          "GBGaA",
          "GBGdA",
          "GBGaD",
          "GBGdD",
          "aA",
          "dA",
          "aD",
          "dD",
        ],
        name: "/size",
      },
    ],
  },
  // {
  //   title: "coins",
  //   color: "yellow",
  //   items: [
  //     { key: "coinsPercent", name: "%" },
  //     { key: "coins", name: "" },
  //   ],
  // },
  // {
  //   title: "supply",
  //   color: "peach",
  //   items: [
  //     { key: "supplyPercent", name: "%" },
  //     { key: "supply", name: "" },
  //   ],
  // },
  {
    title: "goods",
    color: "yellow",
    items: [
      { key: "goods", name: "" },
      { key: "goodsPrev", name: "prev" },
      { key: "goodsNext", name: "next" },
      { key: "goodsGuild", name: "guild" },
    ],
  },
  {
    title: "people",
    color: "mint",
    items: [{ key: "people", name: "poeple" }],
  },
  {
    title: "happiness",
    color: "teal",
    items: [{ key: "happiness", name: "happiness" }],
  },
  {
    title: "road",
    color: "sky",
    items: [{ key: "road", name: "road" }],
  },
  {
    title: "era",
    color: "sky",
    items: [{ key: "era", name: "era" }],
  },
];

function sumFields(array, key) {
  return array
    .map((countKey) => items[key][countKey] ?? 0)
    .reduce((acc, val) => acc + val, 0);
}

const Table = () => {
  const [sortBy, setSortBy] = useState("");
  const [filtered, setFiltered] = useState(items);
  const [list, setList] = useState([
    "name",
    "size",
    "FP",
    "attack + defense",
    "era",
  ]);
  const chosenNames = names.filter((item) => list.includes(item.title));
  console.log(chosenNames);

  const handleSort = (key, category) => {
    setSortBy(category.name);
    console.log(category.name);

    const sortedItems = Object.entries(items).sort(([, a], [, b]) => {
      if (key === "custom") {
        const sumA = category.count.reduce(
          (sum, countKey) => sum + (a[countKey] ?? 0),
          0
        );
        const sumB = category.count.reduce(
          (sum, countKey) => sum + (b[countKey] ?? 0),
          0
        );
        return sumB - sumA;
      } else if (key === "multiplier") {
        const sumA =
          category.count.reduce(
            (sum, countKey) => sum + (a[countKey] ?? 0),
            0
          ) / a.size;
        const sumB =
          category.count.reduce(
            (sum, countKey) => sum + (b[countKey] ?? 0),
            0
          ) / b.size;
        return sumB - sumA;
      } else if (typeof a[key] === "string") {
        return a[key].localeCompare(b[key]);
      }
      return (b[key] ?? 0) - (a[key] ?? 0);
    });

    const newItems = Object.fromEntries(sortedItems);
    setFiltered(newItems);
  };

  const total = (key) => {
    return Object.values(items).reduce((sum, item) => {
      if (typeof item[key] === "number") {
        return sum + (item[key] ?? 0) * (item.amount ?? 0);
      }
      return sum;
    }, 0);
  };

  return (
    <div>
      <p>
        <b>Fps</b> <br />
        first columns shows total forge points buildings gives based on the{" "}
        <b>age</b> in era column.
        <br />
        <b>Fps/size</b> calculates fps divided by buildings <b>size</b>
      </p>
      <p>
        <b>attack + defense</b> <br />
        <b>AA</b> shows attack for attacking army.
        <br />
        <b>DA</b> shows defense for attacking army.
        <br />
        <b>AD</b> shows attack for defending army.
        <br />
        <b>DD</b> shows defense for defending army.
        <br />
        <b>A+D sum</b> Shows sum of above listed four features: attack and
        defense for attacking army and attack and defense for defending army.
        <br />
        <b>A+D/size</b> shows this total sum divided by buildings <b>size</b>
      </p>

      <p>
        <b>goods</b>
        <br />
        <b>first column</b> shows current era (based on era in column) goods
        <br />
        <b>prev</b> shows previous era (based on era in column) goods
        <br />
        <b>next</b> shows next era (based on era in column) goods
        <br />
        <b>guild</b> shows how much goods this building contributes to guild's
        treasury.
      </p>
      <p>
        <b>era</b> shows what era is the statistic for given building based on
      </p>

      <div className="divider"></div>

      <p>
        currently sorted by <b className="blue-font">{sortBy || "title"}</b>
        <br />
        click second line in the form to sort by different property. (marked by
        blue color on mouse hover)
      </p>
      <p>showing stats for: </p>
      <p>
        {names.map((n) => (
          <button
            className={list.includes(n.title) && "chosen"}
            key={n.title}
            onClick={() =>
              setList(
                list.includes(n.title)
                  ? list.filter((item) => item !== n.title)
                  : [...list, n.title]
              )
            }
          >
            {n.title}
          </button>
        ))}
      </p>

      <table border="1">
        <thead>
          <tr>
            {chosenNames.map((header) => (
              <th
                key={header.title}
                colSpan={header.items ? header.items.length : 1}
                className={`${header.color}`}
              >
                {header.title}
              </th>
            ))}
          </tr>
          <tr>
            {chosenNames.map((header) =>
              header.items.map((subcat) => (
                <th
                  className={`sortByCell ${
                    subcat.name === sortBy ? "blue" : ""
                  }`}
                  onClick={() => handleSort(subcat.key, subcat)}
                  key={subcat.key}
                >
                  {subcat.name}
                </th>
              ))
            )}
          </tr>
        </thead>

        <tbody>
          {Object.keys(filtered).map((key) => (
            <tr key={key}>
              {chosenNames.map((header) =>
                header.items.map((subcat) => (
                  <td key={subcat.key}>
                    {subcat.key == "title"
                      ? key
                      : subcat.key == "road"
                      ? items[key][subcat.key]?.toString()
                      : subcat.key == "custom"
                      ? sumFields(subcat.count, key)
                      : subcat.key == "multiplier"
                      ? (
                          sumFields(subcat.count, key) / (items[key].size ?? 1)
                        ).toFixed(1)
                      : items[key][subcat.key]}
                  </td>
                ))
              )}
            </tr>
          ))}
          <tr>
            {chosenNames.map((header) =>
              header.items.map((subcat) => (
                <th key={subcat.key}>{total(subcat.key)}</th>
              ))
            )}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Table;
