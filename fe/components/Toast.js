import { CheckCircle, XCircle } from 'lucide-react-native';
import { Text, View } from 'react-native';
import { styles } from '../styles/appStyles';

export function Toast({ notice, theme }) {
  if (!notice) return null;

  const isSuccess = notice.type === 'success';
  const color = isSuccess ? theme.success : theme.danger;

  return (
    <View style={[styles.toast, { backgroundColor: theme.surface, borderColor: color }]}>
      {isSuccess ? <CheckCircle size={18} color={color} /> : <XCircle size={18} color={color} />}
      <Text style={[styles.toastText, { color: theme.text }]}>{notice.text}</Text>
    </View>
  );
}
