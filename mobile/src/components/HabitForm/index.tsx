import CategorySelector from '../CategorySelector';
import Field from '../Field';
import FrequencySelector from '../FrequencySelector';
import { useState } from 'react';
import { ActivityIndicator, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { colors } from '../../theme';
import { IHabit, IHabitFormValues, Category } from '../../interfaces/Habits';
import { HabitFormErrors, validateHabit } from '../../utils/validation';
import { BackIcon } from '../../Icons';
import { BackButton, DeleteButton, DeleteText, ErrorText, Footer, Group, GroupLabel, Header, Heading, SaveButton, SaveText, Screen } from './styles';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../interfaces/Routes';

interface HabitFormProps {
  habit?: IHabit;
  submitting?: boolean;
  onSubmit: (values: IHabitFormValues) => void;
  onBack: () => void;
  onDelete?: () => void;
}

function HabitForm({ habit, submitting = false, onSubmit, onBack, onDelete }: HabitFormProps) {
  const route = useRoute<RouteProp<RootStackParamList, 'HabitForm'>>();
  const habitData = route.params?.habit;

  const isEditing = !!habitData?.id;

  const [values, setValues] = useState<IHabitFormValues>({
    title: habitData?.title ?? '',
    description: habitData?.description ?? '',
    frequency: habitData?.frequency ?? 'diario',
    category: habitData?.category as 'saúde' | 'exercício' | 'alimentação' | 'mental' ?? ''
  });

  const [errors, setErrors] = useState<HabitFormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  function update<K extends keyof IHabitFormValues>(key: K, value: IHabitFormValues[K]) {
    const next = { ...values, [key]: value };
    setValues(next);
    if (submitted) setErrors(validateHabit(next));
  }

  function handleSubmit() {
    const found = validateHabit(values);
    setSubmitted(true);
    setErrors(found);
    if (Object.keys(found).length === 0) onSubmit(values);
  }

  function handleDelete() {
    Alert.alert('Excluir hábito', 'Essa ação apaga o hábito e todos os check-ins. Deseja continuar?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Excluir', style: 'destructive', onPress: onDelete },
    ]);
  }

  return (
    <Screen edges={['top', 'bottom']}>
      <Header>
        <BackButton onPress={onBack} accessibilityRole="button" accessibilityLabel="Voltar">
          <BackIcon />
        </BackButton>
        <Heading>{isEditing ? 'Editar hábito' : 'Novo hábito'}</Heading>
      </Header>

      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 24 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Field
            label="Título (obrigatório)"
            value={values.title}
            onChangeText={(text: string) => update('title', text)}
            placeholder="Ex.: Meditar 10 minutos"
            maxLength={100}
            returnKeyType="next"
            error={errors.title} />

          <Field
            label="Descrição"
            value={values.description}
            onChangeText={(text: string) => update('description', text)}
            placeholder="Ex.: logo após acordar, sem celular"
            multiline />

          <Group>
            <GroupLabel>Frequência</GroupLabel>
            <FrequencySelector value={values.frequency ? values.frequency : 'diario'} onChange={(v: string) => update('frequency', v)} />
          </Group>

          <Group>
            <GroupLabel>Categoria (obrigatório)</GroupLabel>
            <CategorySelector value={values.category ? values.category as Category : 'saude'} onChange={(v: string) => update('category', v as 'saúde' | 'exercício' | 'alimentação' | 'mental')} />
            {!!errors.category && <ErrorText accessibilityRole="alert">{errors.category}</ErrorText>}
          </Group>

          {isEditing && (
            <DeleteButton onPress={handleDelete} accessibilityRole="button" style={{backgroundColor: colors.danger}}>
              <DeleteText style={{color: colors.white}}>Excluir hábito</DeleteText>
            </DeleteButton>
          )}
        </ScrollView>

        <Footer>
          <SaveButton onPress={handleSubmit} disabled={submitting} $disabled={submitting} accessibilityRole="button" accessibilityState={{ disabled: submitting }} >
            {submitting ? <ActivityIndicator color={colors.white} /> : <SaveText>Salvar hábito</SaveText>}
          </SaveButton>
        </Footer>
      </KeyboardAvoidingView>
    </Screen>
  );
}

export default HabitForm;