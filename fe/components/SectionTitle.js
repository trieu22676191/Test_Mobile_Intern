import { Text } from 'react-native';
import { styles } from '../styles/appStyles';

export function SectionTitle({ text, theme }) {
  return <Text style={[styles.sectionTitle, { color: theme.text }]}>{text}</Text>;
}
