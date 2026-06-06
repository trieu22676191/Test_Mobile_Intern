import { Image, Text, View } from 'react-native';
import { aboutImage } from '../data/content';
import { styles } from '../styles/appStyles';

export function AboutPage({ t, theme }) {
  return (
    <View style={styles.aboutWrap}>
      <Image source={aboutImage} style={styles.aboutImage} />
      <View style={[styles.aboutPanel, { backgroundColor: theme.surface, borderColor: theme.border }]}>
        <Text style={[styles.aboutTitle, { color: theme.text }]}>{t.aboutTitle}</Text>
        <Text style={[styles.aboutText, { color: theme.muted }]}>{t.aboutDescription}</Text>
        <Text style={[styles.aboutSubtitle, { color: theme.text }]}>{t.teamTitle}</Text>
        <Text style={[styles.aboutText, { color: theme.muted }]}>{t.teamDescription}</Text>
      </View>
    </View>
  );
}
