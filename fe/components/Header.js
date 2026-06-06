import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { ArrowLeft, BookOpen, Languages, Menu, Moon, Sun } from 'lucide-react-native';
import { IconButton } from './IconButton';
import { styles } from '../styles/appStyles';

export function Header({
  t,
  theme,
  screen,
  selectedPost,
  isDark,
  onHome,
  onAbout,
  onOpenPost,
  onBack,
  onToggleLang,
  onToggleTheme,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const selectMenuItem = (action) => {
    action();
    setIsMenuOpen(false);
  };

  return (
    <View style={[styles.header, { backgroundColor: theme.surface, borderBottomColor: theme.border }]}>
      <View style={styles.brandRow}>
        {onBack ? (
          <IconButton label={t.back} theme={theme} onPress={onBack}>
            <ArrowLeft size={19} color={theme.text} />
          </IconButton>
        ) : (
          <View style={[styles.logoMark, { backgroundColor: theme.primary }]}>
            <BookOpen size={18} color="#fff" />
          </View>
        )}
        <Text style={[styles.brand, { color: theme.text }]} numberOfLines={1}>
          {t.appName}
        </Text>
      </View>

      <View style={styles.headerActions}>
        <IconButton label="Menu" theme={theme} variant="square" onPress={() => setIsMenuOpen((value) => !value)}>
          <Menu size={18} color={theme.text} />
        </IconButton>
        <Pressable
          style={[styles.navPill, screen === 'home' && { backgroundColor: theme.primarySoft }]}
          onPress={() => selectMenuItem(onHome)}
        >
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            style={[styles.navText, { color: screen === 'home' ? theme.primary : theme.muted }]}
          >
            {t.home}
          </Text>
        </Pressable>
        <Pressable
          style={[styles.navPill, screen === 'about' && { backgroundColor: theme.primarySoft }]}
          onPress={() => selectMenuItem(onAbout)}
        >
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            style={[styles.navText, { color: screen === 'about' ? theme.primary : theme.muted }]}
          >
            {t.about}
          </Text>
        </Pressable>
        <IconButton label="Language" theme={theme} variant="language" onPress={onToggleLang}>
          <Languages size={18} color={theme.text} />
          <Text style={[styles.iconButtonText, { color: theme.text }]}>{t.language}</Text>
        </IconButton>
        <IconButton label="Theme" theme={theme} variant="square" onPress={onToggleTheme}>
          {isDark ? <Sun size={18} color={theme.text} /> : <Moon size={18} color={theme.text} />}
        </IconButton>
      </View>

      {isMenuOpen && (
        <View style={[styles.menuPanel, { backgroundColor: theme.background, borderColor: theme.border }]}>
          <MenuItem label={t.home} theme={theme} active={screen === 'home'} onPress={() => selectMenuItem(onHome)} />
          <MenuItem label={t.about} theme={theme} active={screen === 'about'} onPress={() => selectMenuItem(onAbout)} />
          {t.posts.map((post, index) => (
            <MenuItem
              key={post.title}
              label={post.title}
              theme={theme}
              active={screen === 'detail' && selectedPost?.title === post.title}
              onPress={() => selectMenuItem(() => onOpenPost(post, index))}
            />
          ))}
        </View>
      )}
    </View>
  );
}

function MenuItem({ label, theme, active, onPress }) {
  return (
    <Pressable
      style={[styles.menuItem, active && { backgroundColor: theme.primarySoft }]}
      onPress={onPress}
    >
      <Text numberOfLines={1} style={[styles.menuItemText, { color: active ? theme.primary : theme.text }]}>
        {label}
      </Text>
    </Pressable>
  );
}
