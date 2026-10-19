import { IHabit } from "./Habits";

export type RootStackParamList = {
  HabitList: undefined;
  HabitDetail: { habitId: number };
  HabitForm: { habit?: IHabit } | undefined;
};