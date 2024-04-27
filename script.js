function OpeningCeremony(Race100M) {
  setTimeout(() => {
    console.log("Let the games begin");
    let scores = { red: 0, blue: 0, green: 0, yellow: 0 };
    Race100M(LongJump, scores);
  }, 1000);
}

function Race100M(LongJump, scores) {
  setTimeout(() => {
    console.log("Race100M begins");
    console.log("Previous Score:", scores);
    let timing = { red: 0, blue: 0, green: 0, yellow: 0 };
    for (const key in timing) {
      // generate random number between 10 and 15
      timing[key] = Math.floor(Math.random() * 6) + 10;
    }

    // Find the two lowest times
    let leastTime = Math.min(...Object.values(timing));
    let secondLeastTime = Math.min(
      ...Object.values(timing).filter((time) => time !== leastTime)
    );

    let winner;

    // Assign scores based on position
    for (const key in timing) {
      if (timing[key] === leastTime) {
        scores[key] += 50;
        winner = key;
      } else if (timing[key] === secondLeastTime) {
        scores[key] += 25;
      }
    }
    console.log("Updated Score:", scores);
    console.log("Winner of Race100M is", winner);
    LongJump(HighJump, scores);
  }, 3000);
}

function LongJump(HighJump, scores) {
  setTimeout(() => {
    console.log("LongJump begins");
    console.log("Previous Score:", scores);
    let colorArray = ["red", "blue", "green", "yellow"];

    let idx = Math.floor(Math.random() * colorArray.length);
    scores[colorArray[idx]] += 150;
    console.log("Updated Score:", scores);
    console.log("Winner of LongJump is", colorArray[idx]);
    HighJump(AwardCeremony, scores);
  }, 2000);
}

function HighJump(AwardCeremony, scores) {
  console.log("High Jump begins");
  console.log("Previous Score:", scores);
  let userInput = prompt("What colour secured the highest jump?");
  if (userInput) {
    userInput = userInput.toLowerCase(); // Convert to lowercase for case-insensitive comparison
    if (Object.keys(scores).includes(userInput)) {
      scores[userInput] += 100;
      console.log("Updated Score:", scores);
      console.log("Winner of HighJump is", userInput);
    } else {
      console.log("Event was cancelled.");
      console.log("Updated Score:", scores);
    }
  } else {
    console.log("Event was cancelled.");
    console.log("Updated Score:", scores);
  }

  AwardCeremony(scores);
}

function AwardCeremony(scores) {
  let sortedScores = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const position = ["first", "second", "third", "fourth"];
  let currentPosition = 0; // Track current position

  // Iterate over sorted scores
  for (let i = 0; i < sortedScores.length; i++) {
    // Output color with the current position
    console.log(
      `${sortedScores[i][0]} came ${position[currentPosition]} with ${sortedScores[i][1]} points.`
    );

    // Increment current position only if the next score is different
    if (i < sortedScores.length - 1 && sortedScores[i][1] !== sortedScores[i + 1][1]) {
      currentPosition++;
    }
  }
}

OpeningCeremony(Race100M);
