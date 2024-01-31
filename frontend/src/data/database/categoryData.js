import scifi from "../database/sci-fi.png";

import politics from "../database/news-politics.png";
import children from "../database/world-children-day.png";
import romance from "../database/kiss.png";
import history from "../database/black-history-month2.png";

const catData = [
  {
    id: 1,
    catImg: scifi,
    text: "'Science never solves a problem without creating ten more.'",
    url: "science",
  },
  {
    id: 2,
    catImg: politics,
    text: "'If voting changed anything, they'd make it illegal'",
    url: "politics",
  },
  {
    id: 3,
    catImg: children,
    text: "'Spreading happiness one cuddle at a time'",
    url: "kids",
  },
  {
    id: 4,
    catImg: romance,
    text: "'Love is like the wind, you cannot see it but you can feel it'",
    url: "fairy",
  },
  {
    id: 5,
    catImg: history,
    text: "'Those who do not remember the past are condemned to repeat it.'",
    url: "history",
  },
];

export default catData;
