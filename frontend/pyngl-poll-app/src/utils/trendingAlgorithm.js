// // trendingAlgorithm.js
// export function preprocess(text) {
//   const stopWords = ["the", "is", "of", "a", "an", "and", "to", "for", "in"];
//   return text
//     .toLowerCase()
//     .replace(/[^\w\s]/gi, "")
//     .split(" ")
//     .filter(word => !stopWords.includes(word));
// }

// const keywordCategories = {
//   olympic: "Sports",
//   football: "Sports",
//   cricket: "Sports",
//   archery: "Sports",
//   dhoni: "Sports",
//   virat: "Sports",
//   programming: "Technology",
//   python: "Technology",
//   java: "Technology",
//   ncert: "Education",
//   movie: "Entertainment",
//   snack: "Food",
//   cuisine: "Food",
//   travel: "Travel",
//   mobile: "Tech Products",
//   weekend: "Leisure",
//   choice: "Miscellaneous"
// };

// export function assignCategory(question) {
//   const words = preprocess(question);
//   for (const word of words) {
//     if (keywordCategories[word]) return keywordCategories[word];
//   }
//   return "Miscellaneous";
// }

// export function categorizePolls(polls) {
//   return polls.map(poll => ({
//     ...poll,
//     category: assignCategory(poll.question)
//   }));
// }
// trendingAlgorithm.js
export function preprocess(text) {
    const stopWords = ["the", "is", "of", "a", "an", "and", "to", "for", "in"];
    
    // --- THIS IS THE FIX ---
    // If the question text is missing, return an empty array to prevent a crash.
    if (typeof text !== 'string' || !text) {
        return [];
    }

    return text
        .toLowerCase()
        .replace(/[^\w\s]/gi, "")
        .split(" ")
        .filter(word => !stopWords.includes(word));
}

const keywordCategories = {
    olympic: "Sports",
    football: "Sports",
    cricket: "Sports",
  archery: "Sports",
  dhoni: "Sports",
  virat: "Sports",
  programming: "Technology",
  python: "Technology",
  java: "Technology",
  ncert: "Education",
  movie: "Entertainment",
  snack: "Food",
  cuisine: "Food",
  travel: "Travel",
  mobile: "Tech Products",
  weekend: "Leisure",
  choice: "Miscellaneous"
};

export function assignCategory(question) {
    const words = preprocess(question);
    for (const word of words) {
        if (keywordCategories[word]) return keywordCategories[word];
    }
    return "Miscellaneous";
}

export function categorizePolls(polls) {
    return polls.map(poll => ({
        ...poll,
        category: assignCategory(poll.question)
    }));
}