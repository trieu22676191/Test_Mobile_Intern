import { Pressable } from 'react-native';
import { styles } from '../styles/appStyles';

export function IconButton({ children, label, theme, variant, onPress }) {
  return (
    <Pressable
      accessibilityLabel={label}
      style={[styles.iconButton, variant === 'language' && styles.languageButton, variant === 'square' && styles.squareButton, { borderColor: theme.border }]}
      onPress={onPress}
    >
      {children}
    </Pressable>
  );
}
