import styled from 'styled-components/native';

export const Container = styled.View`
  border-radius: 20px;
  padding: 16px 18px;
`;

export const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Label = styled.Text`
  font-size: 15px;
  font-weight: 600;
`;

export const Track = styled.View`
  height: 10px;
  border-radius: 99px;
  margin-top: 12px;
  overflow: hidden;
`;

export const Fill = styled.View<{ $percent: number }>`
  width: ${({ $percent }) => $percent}%;
  height: 100%;
  border-radius: 99px;
`;