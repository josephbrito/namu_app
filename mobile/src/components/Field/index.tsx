import { TextInputProps } from 'react-native';
import { colors } from '../../theme';
import { Container, ErrorText, Input, Label } from './styles';

interface FieldProps extends TextInputProps {
  label: string;
  error?: string;
}

function Field({ label, error, multiline = false, ...inputProps }: FieldProps) {
  return (
    <Container>
      <Label>{label}</Label>
      <Input
        {...inputProps}
        multiline={multiline}
        $multiline={multiline}
        $error={!!error}
        placeholderTextColor={colors.muted}
        accessibilityLabel={label}
      />
      {!!error && <ErrorText accessibilityRole="alert">{error}</ErrorText>}
    </Container>
  );
}

export default Field;