import { Linking, Text, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { IconButton } from './IconButton';
import { styles } from '../styles/appStyles';

export function Footer({ t, theme }) {
  const open = (url) => Linking.openURL(url);

  return (
    <View style={[styles.footer, { backgroundColor: theme.footer }]}>
      <View>
        {t.footerContact.map((line) => (
          <Text key={line} style={[styles.footerText, { color: theme.footerText }]}>
            {line}
          </Text>
        ))}
      </View>
      <View style={styles.socialRow}>
        <IconButton label="Facebook" theme={theme} onPress={() => open('https://www.facebook.com/teerius')}>
          <FontAwesome name="facebook" size={18} color={theme.footerText} />
        </IconButton>
        <IconButton label="LinkedIn" theme={theme} onPress={() => open('https://www.linkedin.com/in/nguyenphutrieu2004')}>
          <FontAwesome name="linkedin" size={18} color={theme.footerText} />
        </IconButton>
        <IconButton label="GitHub" theme={theme} onPress={() => open('https://github.com/trieu22676191')}>
          <FontAwesome name="github" size={18} color={theme.footerText} />
        </IconButton>
        <IconButton label="Instagram" theme={theme} onPress={() => open('https://www.instagram.com/_teerius_/')}>
          <FontAwesome name="instagram" size={18} color={theme.footerText} />
        </IconButton>
      </View>
      <View style={styles.policyRow}>
        <Text style={[styles.policyText, { color: theme.footerText }]}>{t.privacy}</Text>
        <Text style={[styles.policyText, { color: theme.footerText }]}>|</Text>
        <Text style={[styles.policyText, { color: theme.footerText }]}>{t.terms}</Text>
      </View>
    </View>
  );
}
