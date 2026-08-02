import type { AiMeal } from '@/modules/ai/shared/types';

export type DietGoal = 'balanced' | 'weight-loss' | 'diabetes-friendly' | 'heart-healthy';

export type DietPlanInput = {
  readonly condition: string;
  readonly age: number;
  readonly weightKg: number;
  readonly goal: DietGoal;
};

const PLANS: Record<DietGoal, readonly AiMeal[]> = {
  balanced: [
    {
      title: 'Breakfast',
      time: '8:00 AM',
      calories: 380,
      items: ['Vegetable oats porridge', '1 boiled egg', 'Green tea'],
    },
    {
      title: 'Lunch',
      time: '1:00 PM',
      calories: 520,
      items: ['2 multigrain rotis', 'Dal tadka', 'Mixed vegetable sabzi', 'Salad'],
    },
    {
      title: 'Evening',
      time: '5:00 PM',
      calories: 180,
      items: ['Handful of roasted chana', 'Buttermilk'],
    },
    {
      title: 'Dinner',
      time: '8:00 PM',
      calories: 450,
      items: ['Brown rice bowl', 'Grilled paneer / fish', 'Steamed greens'],
    },
  ],
  'weight-loss': [
    {
      title: 'Breakfast',
      time: '8:00 AM',
      calories: 300,
      items: ['Moong chilla', 'Mint chutney', 'Black coffee'],
    },
    {
      title: 'Lunch',
      time: '1:00 PM',
      calories: 420,
      items: ['1 millet roti', 'Palak dal', 'Cucumber salad'],
    },
    {
      title: 'Evening',
      time: '5:00 PM',
      calories: 120,
      items: ['Apple slices', 'Cinnamon tea'],
    },
    {
      title: 'Dinner',
      time: '8:00 PM',
      calories: 380,
      items: ['Grilled chicken / tofu', 'Sautéed vegetables', 'Clear soup'],
    },
  ],
  'diabetes-friendly': [
    {
      title: 'Breakfast',
      time: '8:00 AM',
      calories: 340,
      items: ['Besan cheela', 'Unsalted peanuts', 'Unsweetened tea'],
    },
    {
      title: 'Lunch',
      time: '1:00 PM',
      calories: 480,
      items: ['1 jowar roti', 'Lauki sabzi', 'Curd', 'Salad'],
    },
    {
      title: 'Evening',
      time: '5:00 PM',
      calories: 140,
      items: ['Sprouts chaat', 'Jeera water'],
    },
    {
      title: 'Dinner',
      time: '8:00 PM',
      calories: 400,
      items: ['Quinoa khichdi', 'Stir-fried beans', 'Buttermilk'],
    },
  ],
  'heart-healthy': [
    {
      title: 'Breakfast',
      time: '8:00 AM',
      calories: 360,
      items: ['Oats with berries', 'Walnuts', 'Green tea'],
    },
    {
      title: 'Lunch',
      time: '1:00 PM',
      calories: 500,
      items: ['Brown rice', 'Rajma (light oil)', 'Steamed broccoli'],
    },
    {
      title: 'Evening',
      time: '5:00 PM',
      calories: 150,
      items: ['Fruit bowl', 'Herbal infusion'],
    },
    {
      title: 'Dinner',
      time: '8:00 PM',
      calories: 420,
      items: ['Grilled fish / paneer', 'Quinoa salad', 'Olive oil drizzle'],
    },
  ],
};

export function generateDietPlan(input: DietPlanInput): {
  readonly meals: readonly AiMeal[];
  readonly dailyCalories: number;
  readonly note: string;
} {
  const meals = PLANS[input.goal];
  const dailyCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);
  return {
    meals,
    dailyCalories,
    note: `Plan tuned for ${input.goal.replace('-', ' ')} goals (age ${input.age}, ${input.weightKg} kg)${
      input.condition ? ` with attention to ${input.condition}` : ''
    }. Review with a clinical dietitian before lasting changes.`,
  };
}
