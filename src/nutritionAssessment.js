import { assessmentSpanish } from "./assessmentContent";

const makeOption = (label, value, score = undefined) => ({ label, value, score });

export const assessmentSteps = [
  {
    id: "basics",
    title: "Basic information",
    intro: "A little context helps tailor your general nutrition insights.",
    questions: [
      {
        id: "ageRange",
        label: "What is your age range?",
        type: "single",
        options: [
          makeOption("18-24", "18-24"),
          makeOption("25-34", "25-34"),
          makeOption("35-44", "35-44"),
          makeOption("45-54", "45-54"),
          makeOption("55-64", "55-64"),
          makeOption("65+", "65-plus")
        ]
      },
      {
        id: "gender",
        label: "Gender",
        helper: "Optional",
        type: "single",
        optional: true,
        options: [
          makeOption("Female", "female"),
          makeOption("Male", "male"),
          makeOption("Non-binary", "non-binary"),
          makeOption("Prefer not to say", "prefer-not")
        ]
      },
      {
        id: "mainGoal",
        label: "What is your main nutrition goal?",
        type: "single",
        options: [
          makeOption("Support hormone health (PCOS, endometriosis, perimenopause and menopause)", "hormone-health"),
          makeOption("Improve overall health", "improve-overall-health"),
          makeOption("Weight management", "weight-management"),
          makeOption("Sports performance", "sports-performance"),
          makeOption("Manage a chronic condition (diabetes, cholesterol, osteoporosis, etc.)", "chronic-condition"),
          makeOption("Digestive and gut health and manage symptoms", "digestive-gut-health")
        ]
      }
    ]
  },
  {
    id: "fruit-vegetables",
    title: "Fruit and vegetable intake",
    intro: "Fruit and vegetables provide fibre, vitamins, minerals, and protective plant compounds.",
    questions: [
      {
        id: "fruitPortions",
        label: "How many portions of fruit do you eat on a typical day?",
        category: "fruitVegetables",
        type: "single",
        options: [
          makeOption("None", "none", 0),
          makeOption("1 portion", "one", 35),
          makeOption("2 portions", "two", 75),
          makeOption("3 or more portions", "three-plus", 100)
        ]
      },
      {
        id: "vegetablePortions",
        label: "How many portions of vegetables do you eat on a typical day?",
        category: "fruitVegetables",
        type: "single",
        options: [
          makeOption("None", "none", 0),
          makeOption("1 portion", "one", 35),
          makeOption("2 portions", "two", 75),
          makeOption("3 or more portions", "three-plus", 100)
        ]
      }
    ]
  },
  {
    id: "fibre-wholegrains",
    title: "Fibre, wholegrains, and carbohydrates",
    intro: "Wholegrains, legumes, nuts, seeds, and balanced carbohydrate portions can support fibre intake and energy.",
    questions: [
      {
        id: "wholegrains",
        label: "How often do you eat wholegrain bread or bread products, oats or wholegrain cereal, brown rice or pasta, quinoa or other grains?",
        category: "fibre",
        type: "single",
        options: [
          makeOption("Rarely or never", "rarely", 0),
          makeOption("1-2 times per week", "weekly", 20),
          makeOption("Most days", "most-days", 40),
          makeOption("Daily, but not with all meals", "daily", 80),
          makeOption("Daily with all my meals", "daily-most-meals", 100)
        ]
      },
      {
        id: "legumes",
        label: "How often do you eat beans, lentils, chickpeas, or other legumes?",
        category: "fibre",
        type: "single",
        options: [
          makeOption("Rarely or never", "rarely", 0),
          makeOption("1-2 times per month", "monthly", 35),
          makeOption("1-2 times per week", "weekly", 70),
          makeOption("3 or more times per week", "often", 100)
        ]
      },
      {
        id: "nutsSeeds",
        label: "How often do you include nuts and seeds in your meals?",
        category: "fibre",
        type: "single",
        options: [
          makeOption("Never", "never", 0),
          makeOption("Rarely", "rarely", 20),
          makeOption("Sometimes", "sometimes", 50),
          makeOption("Most of the time", "most-of-the-time", 100)
        ]
      },
      {
        id: "carbohydratePlate",
        label: "At meal times, how much of your plate is taken up by carbohydrate-rich foods such as pasta, rice, bread, potato, sweet potato, quinoa, couscous, etc.?",
        category: "carbohydrates",
        type: "single",
        options: [
          makeOption("I do not include carbs in most of my meals", "none", 10),
          makeOption("About a quarter to a third of my plate", "quarter-third", 100),
          makeOption("Half of my plate", "half-most", 10)
        ]
      }
    ]
  },
  {
    id: "protein",
    title: "Protein habits",
    intro: "Regular protein-rich foods can support satiety, muscle maintenance, and balanced meals.",
    questions: [
      {
        id: "proteinFrequency",
        label: "How often do you consume protein-rich foods such as fish, eggs, dairy, tofu, beans, pulses, poultry, or lean meat?",
        category: "protein",
        type: "single",
        options: [
          makeOption("Less than once daily", "low", 0),
          makeOption("Once daily", "once", 35),
          makeOption("Twice daily", "twice", 70),
          makeOption("With all meals", "all-meals", 100)
        ]
      }
    ]
  },
  {
    id: "calcium",
    title: "Calcium habits",
    intro: "Dairy foods and fortified plant-based alternatives can contribute to calcium intake.",
    questions: [
      {
        id: "calciumServings",
        label: "How many servings of dairy or calcium-fortified plant-based dairy alternatives do you have per day?",
        category: "calcium",
        type: "single",
        options: [
          makeOption("Never", "zero", 0),
          makeOption("Rarely", "one", 20),
          makeOption("Sometimes", "two", 50),
          makeOption("Most of the time", "three", 100)
        ]
      }
    ]
  },
  {
    id: "hydration",
    title: "Hydration",
    intro: "Fluid intake contributes to everyday nutrition habits, energy, and concentration.",
    questions: [
      {
        id: "fluidIntake",
        label: "How much fluid do you drink daily?",
        category: "hydration",
        type: "single",
        options: [
          makeOption("Less than 1 litre", "under-one", 0),
          makeOption("1-1.5 litres", "one-to-one-half", 60),
          makeOption("1.5-2 litres", "one-half-to-two", 80),
          makeOption("More than 2 litres", "over-two", 100)
        ]
      }
    ]
  },
  {
    id: "meal-patterns",
    title: "Meal patterns",
    intro: "Regular meals can make it easier to meet your nutrition needs across the day.",
    questions: [
      {
        id: "breakfast",
        label: "Do you eat breakfast regularly?",
        category: "mealPatterns",
        type: "single",
        options: [
          makeOption("Rarely or never", "rarely", 0),
          makeOption("A few days per week", "few-days", 25),
          makeOption("Most days", "most-days", 80),
          makeOption("Daily", "daily", 100)
        ]
      },
      {
        id: "mealsPerDay",
        label: "On average, how many meals do you have per day?",
        category: "mealPatterns",
        type: "single",
        options: [
          makeOption("1 meal", "one", 0),
          makeOption("2 meals", "two", 50),
          makeOption("3 meals", "three", 100)
        ]
      },
      {
        id: "regularTimes",
        label: "Do you tend to eat at regular times?",
        category: "mealPatterns",
        type: "single",
        options: [
          makeOption("Rarely", "rarely", 25),
          makeOption("Sometimes", "sometimes", 50),
          makeOption("Often", "often", 75),
          makeOption("Almost always", "always", 100)
        ]
      }
    ]
  },
  {
    id: "lifestyle",
    title: "Lifestyle",
    intro: "Movement, sleep, and day-to-day routines can influence nutrition habits and energy.",
    questions: [
      {
        id: "activityDays",
        label: "How many days per week are you physically active?",
        category: "lifestyle",
        type: "single",
        options: [
          makeOption("0 days", "zero", 0),
          makeOption("1-2 days", "one-two", 30),
          makeOption("3-4 days", "three-four", 80),
          makeOption("5 or more days", "five-plus", 100)
        ]
      },
      {
        id: "stepsAverage",
        label: "How many steps do you get on average per day?",
        category: "lifestyle",
        type: "single",
        options: [
          makeOption("Less than 5,000", "under-5000", 0),
          makeOption("Between 5,000 and 8,000", "5000-8000", 30),
          makeOption("8,000-10,000", "8000-10000", 75),
          makeOption("10,000 plus", "10000-plus", 100)
        ]
      },
      {
        id: "sleepQuality",
        label: "How would you rate your sleep quality?",
        category: "lifestyle",
        type: "single",
        options: [
          makeOption("Poor", "poor", 25),
          makeOption("Fair", "fair", 50),
          makeOption("Good", "good", 75),
          makeOption("Very good", "very-good", 100)
        ]
      }
    ]
  }
];

export const categoryRules = {
  fibre: {
    label: "Fibre Habits",
    includedInOverall: true,
    displayed: true,
    positive: "Well done! You are likely meeting your daily fibre requirements.\n\nGetting enough fibre supports digestive health, helps maintain healthy cholesterol and blood sugar levels, and can keep you feeling fuller for longer. Continue including a variety of fibre-rich foods such as vegetables, fruits, legumes, nuts, seeds, and whole grains throughout the day to support your overall health and wellbeing.\n\nKeep up the great work, and remember that small, consistent habits can make a big difference to your long-term health.",
    improvement: "Your fibre intake appears to be lower than recommended. You're not alone, around 90% of people don't get enough fibre in their diet.\n\nFibre plays an important role in digestive health, blood sugar control, cholesterol management, weight management, and keeping you feeling fuller for longer. Increasing your intake of vegetables, fruits, whole grains, legumes, nuts, and seeds can have a significant impact on your overall health and wellbeing.\n\nWould you like personalised advice on simple ways to increase your fibre intake and learn more about the health benefits? Book an appointment below to receive tailored recommendations that fit your lifestyle and goals.",
    advice: "Choose wholegrain options more often and add fibre-rich foods such as beans, lentils, chickpeas, nuts, seeds, vegetables, and fruit."
  },
  carbohydrates: {
    label: "Carbohydrate Balance",
    includedInOverall: true,
    displayed: true,
    positive: "Your carbohydrate balance looks supportive. Including a sensible portion of carbohydrate-rich foods, especially wholegrain or higher-fibre choices, can help fuel training, concentration, mood, and everyday energy.",
    improvement: "Your carbohydrate pattern may need more balance. Very low carbohydrate intake can affect energy, while very large portions may crowd out protein and vegetables. Aim for a steady portion that fits your goals and activity level.",
    advice: "At meals, aim for carbohydrate-rich foods to take up around a quarter to a third of the plate, choosing oats, wholegrain bread, brown rice, potatoes, quinoa, couscous, or wholegrain pasta more often."
  },
  protein: {
    label: "Protein Habits",
    includedInOverall: true,
    displayed: true,
    positive: "Well done! Your protein habits appear strong and are likely supporting satiety, muscle maintenance, and overall health.\n\nIncluding protein-rich foods regularly throughout the day can help maintain muscle mass, support recovery, and keep you feeling fuller for longer. Continue choosing a variety of high-quality protein sources such as lean meats, fish, eggs, dairy, legumes, tofu, tempeh, nuts, and seeds to meet your nutritional needs.\n\nKeep up the great work and continue building balanced meals that support your health and wellbeing goals.",
    improvement: "Your protein intake could be more consistent. Including a source of protein at each meal and snack can help create more balanced meals and support overall health.\n\nProtein plays an important role in maintaining muscle mass, supporting recovery, managing appetite, and helping you feel fuller for longer. Simple ways to increase your protein intake include adding eggs, Greek yogurt, lean meats, fish, dairy products, tofu, legumes, nuts, or seeds to your meals and snacks.\n\nWould you like personalised advice on how to optimise your protein intake? Book an appointment below to receive tailored recommendations that suit your lifestyle, preferences, and health goals.",
    advice: "Include a protein source with breakfast or your least balanced meal, such as eggs, Greek yoghurt, fish, dairy, tofu, beans, pulses, poultry, lean meat, nuts, or seeds."
  },
  fruitVegetables: {
    label: "Fruit & Vegetable Intake",
    includedInOverall: true,
    displayed: true,
    positive: "Well done! Your fruit and vegetable intake appears supportive of good overall diet quality.\n\nRegularly eating a variety of fruits and vegetables provides essential vitamins, minerals, fibre, and antioxidants that support overall health, digestion, immunity, and long-term disease prevention. Continuing to include a range of colourful fruits and vegetables throughout the day will help ensure you receive a broad spectrum of nutrients.\n\nKeep up the great work and aim to maintain this healthy habit as part of a balanced and nutritious eating pattern.",
    improvement: "Your fruit and vegetable intake could be increased. Making small additions throughout the day can be an easy and sustainable way to improve your intake.\n\nFruits and vegetables provide essential vitamins, minerals, fibre, and antioxidants that support overall health, digestion, immunity, and long-term wellbeing. Simple strategies include adding fruit to breakfast, including a side salad or extra vegetables with lunch and dinner, or choosing fruit and vegetable-based snacks between meals.\n\nWould you like personalised support to increase your fruit and vegetable intake? Book an appointment below for practical, tailored advice that fits your lifestyle and health goals.",
    advice: "Add an extra serving of vegetables to lunch or dinner, or add fruit to breakfast or snacks."
  },
  calcium: {
    label: "Calcium Habits",
    includedInOverall: true,
    displayed: true,
    positive: "Your calcium habits look supportive. Regular dairy or fortified plant-based alternatives can contribute to calcium intake for bone health and overall nutrition.",
    improvement: "Your calcium intake may be worth strengthening. Dairy or fortified plant-based alternatives can help support calcium intake, especially when included consistently.",
    advice: "Consider adding a serving of dairy or a fortified plant-based alternative, such as yoghurt, milk, fortified soy drink, or calcium-fortified alternatives."
  },
  hydration: {
    label: "Hydration Habits",
    includedInOverall: true,
    displayed: true,
    positive: "Well done! Your hydration habits appear supportive of good health and wellbeing.\n\nStaying well hydrated helps support energy levels, concentration, physical performance, digestion, and overall body function. Keeping water readily available throughout the day can make it easier to maintain this positive habit and meet your fluid needs consistently.\n\nKeep up the great work and continue prioritising hydration as part of your daily routine.",
    improvement: "Your hydration habits could be improved by increasing your daily fluid intake and choosing unsweetened drinks more often.\n\nGood hydration supports energy levels, concentration, physical performance, digestion, and overall health. Simple strategies include carrying a water bottle, drinking water regularly throughout the day, and choosing water, sparkling water, or other unsweetened beverages more often.\n\nWould you like personalised guidance on improving your hydration habits? Book an appointment below for practical, tailored advice to help you meet your hydration and health goals.",
    advice: "Carry a reusable water bottle and drink fluids regularly across the day."
  },
  lifestyle: {
    label: "Lifestyle Habits",
    includedInOverall: true,
    displayed: true,
    positive: "Well done! Your activity and sleep habits appear to be supporting your general wellbeing.\n\nRegular physical activity and good-quality sleep are important for maintaining energy levels, supporting physical and mental health, improving recovery, and promoting long-term wellbeing. Continuing to prioritise movement throughout the week and maintaining consistent sleep habits can help you sustain these benefits.\n\nKeep up the great work and continue building on these positive lifestyle habits to support your overall health.",
    improvement: "Your lifestyle habits may benefit from more regular movement and greater attention to sleep quality.\n\nRegular physical activity and adequate sleep play an important role in supporting energy levels, mood, recovery, heart health, and overall wellbeing. Small, sustainable changes such as incorporating more movement into your daily routine, establishing a consistent sleep schedule, and creating a relaxing bedtime routine can have a meaningful impact over time.\n\nWould you like personalised support to improve your activity and sleep habits? Book an appointment below for tailored strategies to help you achieve your health and wellbeing goals.",
    advice: "Plan short, realistic movement sessions during the week and keep a consistent wind-down routine when possible."
  },
  mealPatterns: {
    label: "Meal Regularity",
    includedInOverall: false,
    displayed: false,
    positive: "Well done! Your meal routine appears steady, which can make balanced nutrition easier to maintain.\n\nEating regular meals can help support consistent energy levels, appetite regulation, and overall diet quality. A structured meal pattern also makes it easier to include a balance of nutrients throughout the day and establish sustainable healthy eating habits.\n\nKeep up the great work and continue focusing on balanced meals that support your health, wellbeing, and lifestyle goals.",
    improvement: "Your meal routine could be more regular. Establishing a consistent eating pattern and planning simple meals or snacks may help reduce skipped meals and support better nutrition throughout the day.\n\nRegular meals can help maintain energy levels, support concentration, manage hunger, and make it easier to meet your nutritional needs. Simple strategies such as meal planning, preparing snacks in advance, or setting reminders to eat can help build a more consistent routine.\n\nWould you like personalised support to develop a meal pattern that works for your lifestyle? Book an appointment below for practical, tailored advice to help you build sustainable eating habits.",
    advice: "Keep one simple backup meal or snack available for busier days."
  }
};

const categoryOrder = Object.keys(categoryRules);

export const scoreLabels = Object.fromEntries(
  Object.entries(categoryRules).map(([id, rule]) => [id, rule.label])
);
scoreLabels.overall = "Overall Nutrition Score";

export function getQuestionCount() {
  return assessmentSteps.reduce(
    (total, step) => total + step.questions.filter((question) => !question.optional).length,
    0
  );
}

export function getCompletedQuestionCount(answers) {
  return assessmentSteps.reduce(
    (total, step) =>
      total + step.questions.filter((question) => !question.optional && answers[question.id]).length,
    0
  );
}

function getQuestionScore(question, answer) {
  const selected = question.options.find((option) => option.value === answer);
  return selected?.score;
}

function ratingForScore(score, language) {
  const ratings = language?.startsWith("es") ? assessmentSpanish.results.ratings : {
    strong: "Strong",
    developing: "Developing well",
    improve: "Could improve",
    attention: "Needs attention"
  };
  if (score >= 80) return ratings.strong;
  if (score >= 60) return ratings.developing;
  if (score >= 40) return ratings.improve;
  return ratings.attention;
}

function translateRule(rule, language) {
  if (!language?.startsWith("es")) return rule;
  return {
    ...rule,
    label: assessmentSpanish.results.scoreLabels[rule.id] || rule.label,
    positive: assessmentSpanish.results.positive?.[rule.id] || rule.positive,
    improvement: assessmentSpanish.results.improvement?.[rule.id] || rule.improvement,
    advice: assessmentSpanish.results.recommendations[rule.id] || rule.advice
  };
}

function sortBestCategory(a, b) {
  if (b.score !== a.score) return b.score - a.score;
  return categoryOrder.indexOf(a.id) - categoryOrder.indexOf(b.id);
}

function sortWorstCategory(a, b) {
  if (a.score !== b.score) return a.score - b.score;
  return categoryOrder.indexOf(a.id) - categoryOrder.indexOf(b.id);
}

function buildRecommendations(categoryResults, language) {
  const copy = language?.startsWith("es") ? assessmentSpanish.results.recommendations : {};
  const recommendations = Object.values(categoryResults)
    .filter((category) => category.score < 75)
    .map((category) => category.advice);

  if (recommendations.length < 3) {
    recommendations.push(
      copy.general ||
        "Keep building meals around vegetables, protein-rich foods, higher-fibre carbohydrates, and regular fluids."
    );
  }

  return [...new Set(recommendations)].slice(0, 5);
}

function buildPositiveItems(displayedCategories) {
  return [...displayedCategories]
    .filter((category) => category.score >= 70)
    .sort(sortBestCategory)
    .slice(0, 2)
    .map((category) => ({
      category: category.label,
      score: category.score,
      message: category.positive
    }));
}

function getImprovementMessage(category, language) {
  const translatedAdvice = language?.startsWith("es")
    ? assessmentSpanish.results.recommendations[category.id] || category.advice
    : category.advice;

  if (category.score >= 80) {
    return language?.startsWith("es")
      ? `Es tu área con menor puntuación, pero aun así está en un nivel sólido. Mantén este hábito como foco de continuidad. ${translatedAdvice}`
      : `This is your lowest scoring area, but it is still rated Strong. Keep this habit consistent and use it as a maintenance focus rather than a concern. ${translatedAdvice}`;
  }

  if (category.score >= 70) {
    return language?.startsWith("es")
      ? `Es tu área con menor puntuación, aunque evoluciona bien. Un pequeño ajuste aquí podría mejorar tu patrón general. ${translatedAdvice}`
      : `This is your lowest scoring area, although it is already developing well. A small refinement here could lift your overall pattern. ${translatedAdvice}`;
  }

  return category.improvement;
}

function buildImprovementItems(displayedCategories, language) {
  const lowerScoringCategories = [...displayedCategories]
    .filter((category) => category.score < 70)
    .sort(sortWorstCategory)
    .slice(0, 3);

  const categoriesToShow = lowerScoringCategories.length > 0
    ? lowerScoringCategories
    : [...displayedCategories].sort(sortWorstCategory).slice(0, 1);

  return categoriesToShow.map((category) => ({
    category: category.label,
    score: category.score,
    message: getImprovementMessage(category, language)
  }));
}

export function calculateAssessmentResults(answers, language = "en") {
  const categoryScores = {};

  assessmentSteps.forEach((step) => {
    step.questions.forEach((question) => {
      if (!question.category) return;
      const score = getQuestionScore(question, answers[question.id]);
      if (typeof score !== "number") return;

      if (!categoryScores[question.category]) {
        categoryScores[question.category] = [];
      }
      categoryScores[question.category].push(score);
    });
  });

  const categoryResults = Object.fromEntries(
    Object.entries(categoryScores).map(([category, scores]) => {
      const score = Math.round(scores.reduce((sum, value) => sum + value, 0) / scores.length);
      const rule = translateRule({ id: category, ...categoryRules[category] }, language);
      return [
        category,
        {
          ...rule,
          score,
          rating: ratingForScore(score, language),
          summary: score >= 70 ? rule.positive : rule.improvement
        }
      ];
    })
  );

  const displayedCategories = Object.values(categoryResults).filter((category) => category.displayed);
  const overallBase = displayedCategories
    .filter((category) => category.includedInOverall)
    .map((category) => category.score);
  const overall = Math.round(overallBase.reduce((sum, value) => sum + value, 0) / overallBase.length);
  const positiveItems = buildPositiveItems(displayedCategories);
  const improvementItems = buildImprovementItems(displayedCategories, language);

  return {
    overall: {
      label: language.startsWith("es") ? assessmentSpanish.results.scoreLabels.overall : scoreLabels.overall,
      score: overall,
      rating: ratingForScore(overall, language),
      summary: language.startsWith("es")
        ? assessmentSpanish.results.summaries[overall >= 70 ? "overallHigh" : "overallLow"]
        : overall >= 70
        ? "Your answers suggest a generally supportive nutrition pattern with some useful habits already in place."
        : "Your answers suggest there are several realistic opportunities to strengthen your everyday nutrition habits."
    },
    categories: categoryResults,
    displayedCategoryIds: categoryOrder.filter((category) => categoryResults[category]?.displayed),
    positiveItems,
    improvementItems,
    positive: positiveItems[0] || { category: "", message: "" },
    improvement: improvementItems[0] || { category: "", message: "" },
    recommendations: buildRecommendations(categoryResults, language)
  };
}
