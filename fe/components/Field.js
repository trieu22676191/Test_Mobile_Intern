import { TextInput } from 'react-native';
import { styles } from '../styles/appStyles';

export function Field({ theme, multiline, ...props }) {
  return (
    <TextInput
      {...props}
      placeholderTextColor={theme.placeholder}
      style={[
        styles.input,
        multiline && styles.messageInput,
        { color: theme.text, backgroundColor: theme.input, borderColor: theme.border },
      ]}
    />
  );
}
