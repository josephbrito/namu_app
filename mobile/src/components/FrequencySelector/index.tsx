import { Container, Option, OptionText } from './styles';

const OPTIONS: { value: string; label: string }[] = [
  { value: 'diario', label: 'Diário' },
  { value: 'semanal', label: 'Semanal' },
];

interface FrequencySelectorProps {
  value: string;
  onChange: (value: string) => void;
}

function FrequencySelector({ value, onChange }: FrequencySelectorProps) {
  return (
    <Container accessibilityRole="radiogroup">
      {OPTIONS.map((option) => {
        const selected = option.value === value.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
        return (
          <Option
            key={option.value}
            $selected={selected}
            onPress={() => onChange(option.value)}
            accessibilityRole="radio"
            accessibilityState={{ selected }}
          >
            <OptionText $selected={selected}>{option.label}</OptionText>
          </Option>
        );
      })}
    </Container>
  );
}

export default FrequencySelector;