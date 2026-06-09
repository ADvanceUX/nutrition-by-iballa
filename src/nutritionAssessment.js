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
          { label: "18-24", value: "18-24" },
          { label: "25-34", value: "25-34" },
          { label: "35-44", value: "35-44" },
          { label: "45-54", value: "45-54" },
          { label: "55-64", value: "55-64" },
          { label: "65+", value: "65-plus" }
        ]
      },
      {
        id: "gender",
        label: "Gender",
        helper: "Optional",
        type: "single",
        optional: true,
        options: [
          { label: "Female", value: "female" },
          { label: "Male", value: "male" },
          { label: "Non-binary", value: "non-binary" },
          { label: "Prefer not to say", value: "prefer-not" }
        ]
      },
      {
        id: "mainGoal",
        label: "What is your main nutrition goal?",
        type: "single",
        options: [
          { label: "Improve health", value: "improve-health" },
          { label: "Weight management", value: "weight-management" },
          { label: "Sports performance", value: "sports-performance" },
          { label: "Improve energy levels", value: "energy" },
          { label: "General wellbeing", value: "wellbeing" }
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
          { label: "None", value: "none", score: 0 },
          { label: "1 portion", value: "one", score: 35 },
          { label: "2 portions", value: "two", score: 80 },
          { label: "3 or more portions", value: "three-plus", score: 100 }
        ]
      },
      {
        id: "vegetablePortions",
        label: "How many portions of vegetables or salad do you eat on a typical day?",
        category: "fruitVegetables",
        type: "single",
        options: [
          { label: "None", value: "none", score: 0 },
          { label: "1 portion", value: "one", score: 35 },
          { label: "2 portions", value: "two", score: 70 },
          { label: "3 or more portions", value: "three-plus", score: 100 }
        ]
      }
    ]
  },
  {
    id: "fibre-wholegrains",
    title: "Fibre and wholegrains",
    intro: "Wholegrains and legumes can support fibre intake and help make meals more satisfying.",
    questions: [
      {
        id: "wholegrains",
        label: "How often do you eat wholegrain bread, oats, brown rice, or wholegrain pasta?",
        category: "fibre",
        type: "single",
        options: [
          { label: "Rarely or never", value: "rarely", score: 10 },
          { label: "1-2 times per week", value: "weekly", score: 40 },
          { label: "Most days", value: "most-days", score: 80 },
          { label: "Daily", value: "daily", score: 100 }
        ]
      },
      {
        id: "legumes",
        label: "How often do you eat beans, lentils, chickpeas, or other legumes?",
        category: "fibre",
        type: "single",
        options: [
          { label: "Rarely or never", value: "rarely", score: 10 },
          { label: "1-2 times per month", value: "monthly", score: 35 },
          { label: "1-2 times per week", value: "weekly", score: 70 },
          { label: "3 or more times per week", value: "often", score: 100 }
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
          { label: "Less than once daily", value: "low", score: 25 },
          { label: "Once daily", value: "once", score: 60 },
          { label: "Twice daily", value: "twice", score: 85 },
          { label: "With most meals", value: "most-meals", score: 100 }
        ]
      },
      {
        id: "proteinMeals",
        label: "Do most of your meals contain a source of protein?",
        category: "protein",
        type: "single",
        options: [
          { label: "Rarely", value: "rarely", score: 15 },
          { label: "Sometimes", value: "sometimes", score: 50 },
          { label: "Often", value: "often", score: 80 },
          { label: "Almost always", value: "always", score: 100 }
        ]
      }
    ]
  },
  {
    id: "hydration",
    title: "Hydration",
    intro: "Fluid intake and drink choices both contribute to everyday nutrition habits.",
    questions: [
      {
        id: "fluidIntake",
        label: "How much fluid do you drink daily?",
        category: "hydration",
        type: "single",
        options: [
          { label: "Less than 1 litre", value: "under-one", score: 25 },
          { label: "1-1.5 litres", value: "one-to-one-half", score: 65 },
          { label: "1.5-2 litres", value: "one-half-to-two", score: 100 },
          { label: "More than 2 litres", value: "over-two", score: 90 }
        ]
      },
      {
        id: "sugaryDrinks",
        label: "How often do you consume sugary drinks?",
        category: "hydration",
        type: "single",
        options: [
          { label: "Daily", value: "daily", score: 20 },
          { label: "Several times per week", value: "weekly", score: 50 },
          { label: "Occasionally", value: "occasionally", score: 80 },
          { label: "Rarely or never", value: "rarely", score: 100 }
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
          { label: "Rarely", value: "rarely", score: 30 },
          { label: "A few days per week", value: "few-days", score: 55 },
          { label: "Most days", value: "most-days", score: 85 },
          { label: "Daily", value: "daily", score: 100 }
        ]
      },
      {
        id: "skippingMeals",
        label: "How often do you skip meals?",
        category: "mealPatterns",
        type: "single",
        options: [
          { label: "Most days", value: "most-days", score: 25 },
          { label: "A few times per week", value: "few-times", score: 55 },
          { label: "Occasionally", value: "occasionally", score: 80 },
          { label: "Rarely or never", value: "rarely", score: 100 }
        ]
      },
      {
        id: "regularTimes",
        label: "Do you tend to eat at regular times?",
        category: "mealPatterns",
        type: "single",
        options: [
          { label: "Rarely", value: "rarely", score: 35 },
          { label: "Sometimes", value: "sometimes", score: 60 },
          { label: "Often", value: "often", score: 85 },
          { label: "Almost always", value: "always", score: 100 }
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
          { label: "0 days", value: "zero", score: 15 },
          { label: "1-2 days", value: "one-two", score: 50 },
          { label: "3-4 days", value: "three-four", score: 85 },
          { label: "5 or more days", value: "five-plus", score: 100 }
        ]
      },
      {
        id: "sleepQuality",
        label: "How would you rate your sleep quality?",
        category: "lifestyle",
        type: "single",
        options: [
          { label: "Poor", value: "poor", score: 25 },
          { label: "Fair", value: "fair", score: 55 },
          { label: "Good", value: "good", score: 85 },
          { label: "Very good", value: "very-good", score: 100 }
        ]
      }
    ]
  }
];

export const scoreLabels = {
  overall: "Overall Nutrition Score",
  fibre: "Fibre Habits",
  protein: "Protein Habits",
  fruitVegetables: "Fruit & Vegetable Intake",
  hydration: "Hydration Habits",
  lifestyle: "Lifestyle Habits",
  mealPatterns: "Meal Regularity"
};

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

function ratingForScore(score) {
  if (score >= 80) return "Strong";
  if (score >= 60) return "Developing well";
  if (score >= 40) return "Could improve";
  return "Needs attention";
}

function categorySummary(category, score) {
  const summaries = {
    fibre: score >= 70
      ? "Your fibre habits appear positive. Continuing to include wholegrains, legumes, fruit, and vegetables can support a balanced diet."
      : "Your fibre intake appears lower than ideal. Increasing wholegrains, legumes, fruit, and vegetables may help support digestive health.",
    protein: score >= 70
      ? "Your protein habits appear strong and are likely supporting satiety and muscle maintenance."
      : "Your protein intake could be more consistent. Adding a protein source to more meals may help meals feel more balanced.",
    fruitVegetables: score >= 70
      ? "Your fruit and vegetable intake appears supportive of good overall diet quality."
      : "Your fruit and vegetable intake could be increased. Small additions across the day can make this easier to sustain.",
    hydration: score >= 70
      ? "Your hydration habits appear supportive. Keeping water available during the day can help maintain this routine."
      : "Your hydration habits could be improved by increasing daily fluid intake and choosing unsweetened drinks more often.",
    lifestyle: score >= 70
      ? "Your activity and sleep habits appear to be supporting your general wellbeing."
      : "Your lifestyle habits may benefit from more regular movement and attention to sleep quality.",
    mealPatterns: score >= 70
      ? "Your meal routine appears steady, which can make balanced nutrition easier to maintain."
      : "Your meal routine could be more regular. Planning simple meals or snacks may help reduce skipped meals."
  };

  return summaries[category];
}

export function calculateAssessmentResults(answers) {
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
      return [
        category,
        {
          label: scoreLabels[category],
          score,
          rating: ratingForScore(score),
          summary: categorySummary(category, score)
        }
      ];
    })
  );

  const visibleCategories = ["fibre", "protein", "fruitVegetables", "hydration", "lifestyle"];
  const overallBase = visibleCategories
    .map((category) => categoryResults[category]?.score)
    .filter((score) => typeof score === "number");
  const overall = Math.round(overallBase.reduce((sum, value) => sum + value, 0) / overallBase.length);

  return {
    overall: {
      label: scoreLabels.overall,
      score: overall,
      rating: ratingForScore(overall),
      summary: overall >= 70
        ? "Your answers suggest a generally supportive nutrition pattern with some useful habits already in place."
        : "Your answers suggest there are several realistic opportunities to strengthen your everyday nutrition habits."
    },
    categories: categoryResults,
    recommendations: buildRecommendations(categoryResults)
  };
}

function buildRecommendations(categoryResults) {
  const recommendations = [];

  if ((categoryResults.fruitVegetables?.score ?? 100) < 75) {
    recommendations.push("Add an extra serving of vegetables to lunch or dinner.");
  }

  if ((categoryResults.fibre?.score ?? 100) < 75) {
    recommendations.push("Choose wholegrain options more often, such as oats, wholegrain bread, brown rice, or wholegrain pasta.");
  }

  if ((categoryResults.protein?.score ?? 100) < 75) {
    recommendations.push("Include a protein source with breakfast or your least balanced meal of the day.");
  }

  if ((categoryResults.hydration?.score ?? 100) < 75) {
    recommendations.push("Carry a reusable water bottle to make regular fluid intake easier.");
  }

  if ((categoryResults.lifestyle?.score ?? 100) < 75) {
    recommendations.push("Plan short, realistic activity sessions during the week and keep a consistent wind-down routine when possible.");
  }

  if ((categoryResults.mealPatterns?.score ?? 100) < 75) {
    recommendations.push("Keep one simple backup meal or snack available for busier days.");
  }

  if (recommendations.length < 3) {
    recommendations.push("Keep building meals around vegetables, protein-rich foods, wholegrains, and regular fluids.");
  }

  return recommendations.slice(0, 5);
}
