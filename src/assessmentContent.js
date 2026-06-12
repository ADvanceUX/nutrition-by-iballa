export const assessmentSpanish = {
  steps: {
    basics: {
      title: "Información básica",
      intro: "Un poco de contexto ayuda a adaptar tus orientaciones generales de nutrición."
    },
    "fruit-vegetables": {
      title: "Consumo de fruta y verdura",
      intro: "La fruta y la verdura aportan fibra, vitaminas, minerales y compuestos vegetales protectores."
    },
    "fibre-wholegrains": {
      title: "Fibra y cereales integrales",
      intro: "Los cereales integrales y las legumbres pueden ayudarte a tomar más fibra y a sentir mayor saciedad."
    },
    protein: {
      title: "Hábitos relacionados con las proteínas",
      intro: "Consumir alimentos ricos en proteínas con regularidad favorece la saciedad, el mantenimiento muscular y unas comidas equilibradas."
    },
    hydration: {
      title: "Hidratación",
      intro: "La cantidad de líquido y las bebidas que eliges forman parte de tus hábitos nutricionales diarios."
    },
    "meal-patterns": {
      title: "Rutina de comidas",
      intro: "Mantener comidas regulares facilita cubrir las necesidades nutricionales a lo largo del día."
    },
    lifestyle: {
      title: "Estilo de vida",
      intro: "El movimiento, el sueño y las rutinas diarias pueden influir en los hábitos alimentarios y la energía."
    }
  },
  questions: {
    ageRange: { label: "¿Cuál es tu intervalo de edad?" },
    gender: { label: "Género", helper: "Opcional" },
    mainGoal: { label: "¿Cuál es tu principal objetivo nutricional?" },
    fruitPortions: { label: "¿Cuántas raciones de fruta tomas en un día habitual?" },
    vegetablePortions: { label: "¿Cuántas raciones de verdura o ensalada tomas en un día habitual?" },
    wholegrains: { label: "¿Con qué frecuencia tomas pan integral, avena, arroz integral o pasta integral?" },
    legumes: { label: "¿Con qué frecuencia tomas alubias, lentejas, garbanzos u otras legumbres?" },
    proteinFrequency: { label: "¿Con qué frecuencia consumes alimentos ricos en proteínas como pescado, huevos, lácteos, tofu, legumbres, aves o carne magra?" },
    proteinMeals: { label: "¿La mayoría de tus comidas incluye alguna fuente de proteínas?" },
    fluidIntake: { label: "¿Cuánto líquido bebes al día?" },
    sugaryDrinks: { label: "¿Con qué frecuencia tomas bebidas azucaradas?" },
    breakfast: { label: "¿Desayunas habitualmente?" },
    skippingMeals: { label: "¿Con qué frecuencia te saltas comidas?" },
    regularTimes: { label: "¿Sueles comer a horas regulares?" },
    activityDays: { label: "¿Cuántos días a la semana realizas actividad física?" },
    sleepQuality: { label: "¿Cómo valorarías la calidad de tu sueño?" }
  },
  options: {
    gender: {
      female: "Mujer",
      male: "Hombre",
      "non-binary": "No binario",
      "prefer-not": "Prefiero no decirlo"
    },
    mainGoal: {
      "improve-health": "Mejorar la salud",
      "weight-management": "Controlar el peso",
      "sports-performance": "Mejorar el rendimiento deportivo",
      energy: "Mejorar los niveles de energía",
      wellbeing: "Bienestar general"
    },
    fruitPortions: {
      none: "Ninguna",
      one: "1 ración",
      two: "2 raciones",
      "three-plus": "3 o más raciones"
    },
    vegetablePortions: {
      none: "Ninguna",
      one: "1 ración",
      two: "2 raciones",
      "three-plus": "3 o más raciones"
    },
    wholegrains: {
      rarely: "Casi nunca o nunca",
      weekly: "1-2 veces por semana",
      "most-days": "La mayoría de los días",
      daily: "A diario"
    },
    legumes: {
      rarely: "Casi nunca o nunca",
      monthly: "1-2 veces al mes",
      weekly: "1-2 veces por semana",
      often: "3 o más veces por semana"
    },
    proteinFrequency: {
      low: "Menos de una vez al día",
      once: "Una vez al día",
      twice: "Dos veces al día",
      "most-meals": "En la mayoría de las comidas"
    },
    proteinMeals: {
      rarely: "Casi nunca",
      sometimes: "A veces",
      often: "A menudo",
      always: "Casi siempre"
    },
    fluidIntake: {
      "under-one": "Menos de 1 litro",
      "one-to-one-half": "1-1,5 litros",
      "one-half-to-two": "1,5-2 litros",
      "over-two": "Más de 2 litros"
    },
    sugaryDrinks: {
      daily: "A diario",
      weekly: "Varias veces por semana",
      occasionally: "De vez en cuando",
      rarely: "Casi nunca o nunca"
    },
    breakfast: {
      rarely: "Casi nunca",
      "few-days": "Algunos días por semana",
      "most-days": "La mayoría de los días",
      daily: "A diario"
    },
    skippingMeals: {
      "most-days": "La mayoría de los días",
      "few-times": "Varias veces por semana",
      occasionally: "De vez en cuando",
      rarely: "Casi nunca o nunca"
    },
    regularTimes: {
      rarely: "Casi nunca",
      sometimes: "A veces",
      often: "A menudo",
      always: "Casi siempre"
    },
    activityDays: {
      zero: "0 días",
      "one-two": "1-2 días",
      "three-four": "3-4 días",
      "five-plus": "5 o más días"
    },
    sleepQuality: {
      poor: "Mala",
      fair: "Regular",
      good: "Buena",
      "very-good": "Muy buena"
    }
  },
  results: {
    scoreLabels: {
      overall: "Puntuación nutricional general",
      fibre: "Hábitos de fibra",
      protein: "Hábitos de proteínas",
      fruitVegetables: "Consumo de fruta y verdura",
      hydration: "Hábitos de hidratación",
      lifestyle: "Hábitos de estilo de vida",
      mealPatterns: "Regularidad de las comidas"
    },
    ratings: {
      strong: "Sólido",
      developing: "Evoluciona bien",
      improve: "Puede mejorar",
      attention: "Necesita atención"
    },
    summaries: {
      fibreHigh: "Tus hábitos de fibra parecen positivos. Seguir incluyendo cereales integrales, legumbres, fruta y verdura puede favorecer una alimentación equilibrada.",
      fibreLow: "Tu consumo de fibra parece inferior a lo ideal. Aumentar los cereales integrales, las legumbres, la fruta y la verdura puede favorecer la salud digestiva.",
      proteinHigh: "Tus hábitos de proteínas parecen sólidos y probablemente favorecen la saciedad y el mantenimiento muscular.",
      proteinLow: "Tu consumo de proteínas podría ser más constante. Añadir una fuente de proteínas a más comidas puede hacerlas más equilibradas.",
      fruitVegetablesHigh: "Tu consumo de fruta y verdura parece favorecer una buena calidad global de la dieta.",
      fruitVegetablesLow: "Podrías aumentar el consumo de fruta y verdura. Incorporar pequeñas cantidades a lo largo del día puede facilitar que mantengas este hábito.",
      hydrationHigh: "Tus hábitos de hidratación parecen adecuados. Tener agua disponible durante el día puede ayudarte a mantener esta rutina.",
      hydrationLow: "Podrías mejorar la hidratación aumentando el consumo diario de líquidos y eligiendo bebidas sin azúcar con más frecuencia.",
      lifestyleHigh: "Tus hábitos de actividad y sueño parecen favorecer tu bienestar general.",
      lifestyleLow: "Tu estilo de vida podría beneficiarse de un movimiento más regular y de prestar atención a la calidad del sueño.",
      mealPatternsHigh: "Tu rutina de comidas parece estable, lo que facilita mantener una alimentación equilibrada.",
      mealPatternsLow: "Tu rutina de comidas podría ser más regular. Planificar comidas o tentempiés sencillos puede ayudar a reducir las comidas que te saltas.",
      overallHigh: "Tus respuestas indican un patrón alimentario generalmente favorable, con varios hábitos útiles ya consolidados.",
      overallLow: "Tus respuestas indican que existen varias oportunidades realistas para reforzar tus hábitos nutricionales diarios."
    },
    recommendations: {
      fruitVegetables: "Añade una ración extra de verdura en la comida o la cena.",
      fibre: "Elige opciones integrales con más frecuencia, como avena, pan integral, arroz integral o pasta integral.",
      protein: "Incluye una fuente de proteínas en el desayuno o en la comida menos equilibrada del día.",
      hydration: "Lleva una botella de agua reutilizable para beber líquidos con regularidad.",
      lifestyle: "Planifica sesiones breves y realistas de actividad durante la semana y mantén una rutina de descanso constante cuando sea posible.",
      mealPatterns: "Ten disponible una comida o un tentempié sencillo para los días con más actividad.",
      general: "Sigue creando comidas basadas en verduras, alimentos ricos en proteínas, cereales integrales y líquidos con regularidad."
    }
  }
};

export function localizeAssessmentSteps(steps, language) {
  if (!language?.startsWith("es")) return steps;

  return steps.map((step) => ({
    ...step,
    ...assessmentSpanish.steps[step.id],
    questions: step.questions.map((question) => ({
      ...question,
      ...assessmentSpanish.questions[question.id],
      options: question.options.map((option) => ({
        ...option,
        label: assessmentSpanish.options[question.id]?.[option.value] || option.label
      }))
    }))
  }));
}
