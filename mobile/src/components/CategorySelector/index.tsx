
import { Category } from '../../interfaces/Habits';
import { Chip, ChipText, Container } from './styles';


interface CategorySelectorProps {
  value: Category;
  onChange: (value: Category) => void;
}

const CATEGORIES: { key: Category; label: string }[] = [
  { key: 'saude', label: 'Saúde' },
  { key: 'exercicio', label: 'Exercício' },
  { key: 'alimentacao', label: 'Alimentação' },
  { key: 'mental', label: 'Mental' },
];

function CategorySelector({ value, onChange }: CategorySelectorProps) {
  return (
    <Container accessibilityRole="radiogroup">
      {CATEGORIES.map((category) => {
        const selected = category.key === value.normalize('NFD').replace(/[\u0300-\u036f]/g, "");

        return (
          <Chip
            key={category.key}
            $category={category.key}
            $selected={selected}
            onPress={() => onChange(category.key)}
            accessibilityRole="radio"
            accessibilityState={{ selected }}
          >
            <ChipText $category={category.key} $selected={selected}>
              {category.label}
            </ChipText>
          </Chip>
        );
      })}
    </Container>
  );
}

export default CategorySelector;