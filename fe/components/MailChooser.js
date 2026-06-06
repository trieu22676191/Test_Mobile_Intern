import { Mail, X } from 'lucide-react-native';
import { Modal, Pressable, Text, View } from 'react-native';
import { styles } from '../styles/appStyles';

export function MailChooser({ visible, t, theme, onDefaultEmail, onGmail, onClose }) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.mailChooserOverlay}>
        <View style={[styles.mailChooserPanel, { backgroundColor: theme.surface, borderColor: theme.border }]}>
          <View style={styles.mailChooserHeader}>
            <Text style={[styles.mailChooserTitle, { color: theme.text }]}>{t.mailChooserTitle}</Text>
            <Pressable accessibilityLabel={t.cancel} style={styles.mailChooserClose} onPress={onClose}>
              <X size={20} color={theme.text} />
            </Pressable>
          </View>

          <Pressable style={[styles.mailOption, { borderColor: theme.border }]} onPress={onDefaultEmail}>
            <Mail size={20} color={theme.primary} />
            <Text style={[styles.mailOptionText, { color: theme.text }]}>{t.defaultEmailApp}</Text>
          </Pressable>

          <Pressable style={[styles.mailOption, { borderColor: theme.border }]} onPress={onGmail}>
            <Text style={[styles.mailOptionBadge, { borderColor: theme.primary, color: theme.primary }]}>G</Text>
            <Text style={[styles.mailOptionText, { color: theme.text }]}>{t.gmailApp}</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
