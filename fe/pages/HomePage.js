import { useMemo, useState } from 'react';
import { Image, ImageBackground, Pressable, Text, TextInput, View } from 'react-native';
import { Bookmark, Search, Send } from 'lucide-react-native';
import { Field } from '../components/Field';
import { SectionTitle } from '../components/SectionTitle';
import { articleImages, heroImage } from '../data/content';
import { styles } from '../styles/appStyles';

export function HomePage({
  t,
  theme,
  form,
  favoritePosts,
  onStart,
  onPlayersLayout,
  onChangeForm,
  onSubmit,
  onOpenPost,
  onToggleFavorite,
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const searchResults = useMemo(() => {
    const keyword = searchQuery.trim().toLowerCase();
    if (!keyword) return [];

    return t.posts
      .map((post, index) => ({ post, index }))
      .filter(({ post }) => post.title.toLowerCase().includes(keyword));
  }, [searchQuery, t.posts]);

  const openSearchResult = (post, index) => {
    setSearchQuery('');
    onOpenPost(post, index);
  };

  return (
    <>
      <ImageBackground source={heroImage} style={styles.hero} imageStyle={styles.heroImage}>
        <View style={styles.heroOverlay}>
          <Text style={styles.heroTitle}>{t.heroTitle}</Text>
          <Text style={styles.heroDescription}>{t.heroDescription}</Text>
          <Pressable style={styles.primaryButton} onPress={onStart}>
            <Text style={styles.primaryButtonText}>{t.start}</Text>
          </Pressable>
        </View>
      </ImageBackground>

      <View style={styles.searchWrap}>
        <View style={[styles.searchBox, { backgroundColor: theme.surface, borderColor: theme.border }]}>
          <Search size={18} color={theme.muted} />
          <TextInput
            value={searchQuery}
            placeholder={t.searchPlaceholder}
            placeholderTextColor={theme.placeholder}
            autoCapitalize="none"
            style={[styles.searchInput, { color: theme.text }]}
            onChangeText={setSearchQuery}
          />
        </View>
        {searchQuery.trim().length > 0 && (
          <View style={[styles.searchDropdown, { backgroundColor: theme.surface, borderColor: theme.border }]}>
            {searchResults.length > 0 ? (
              searchResults.map(({ post, index }) => (
                <Pressable
                  key={post.title}
                  style={styles.searchResult}
                  onPress={() => openSearchResult(post, index)}
                >
                  <Text style={[styles.searchResultTitle, { color: theme.text }]}>{post.title}</Text>
                  <Text numberOfLines={1} style={[styles.searchResultExcerpt, { color: theme.muted }]}>
                    {post.excerpt}
                  </Text>
                </Pressable>
              ))
            ) : (
              <Text style={[styles.searchEmpty, { color: theme.muted }]}>{t.noSearchResults}</Text>
            )}
          </View>
        )}
      </View>

      <View
        onLayout={(event) => {
          onPlayersLayout(event.nativeEvent.layout.y);
        }}
      >
        <SectionTitle text={t.recentPosts} theme={theme} />
      </View>
      <View style={styles.cardGrid}>
        {t.posts.map((post, index) => (
          <Pressable
            key={post.title}
            style={[styles.postCard, { backgroundColor: theme.surface, borderColor: theme.border }]}
            onPress={() => onOpenPost(post, index)}
          >
            <Image source={articleImages[index]} style={styles.postImage} />
            <View style={styles.postContent}>
              <View style={styles.postTitleRow}>
                <Text style={[styles.postTitle, { color: theme.text }]}>{post.title}</Text>
                <Pressable
                  accessibilityLabel="Favorite post"
                  style={[styles.favoriteButton, { borderColor: theme.border }]}
                  onPress={(event) => {
                    event.stopPropagation();
                    onToggleFavorite(post.title);
                  }}
                >
                  <Bookmark
                    size={18}
                    color={favoritePosts.includes(post.title) ? theme.primary : theme.muted}
                    fill={favoritePosts.includes(post.title) ? theme.primary : 'transparent'}
                  />
                </Pressable>
              </View>
              <Text style={[styles.postExcerpt, { color: theme.muted }]}>{post.excerpt}</Text>
              <Text style={[styles.readMore, { color: theme.primary }]}>{t.readMore}</Text>
            </View>
          </Pressable>
        ))}
      </View>

      <SectionTitle text={t.contact} theme={theme} />
      <View style={[styles.form, { backgroundColor: theme.surface, borderColor: theme.border }]}>
        <Field placeholder={t.fullName} value={form.name} theme={theme} onChangeText={(name) => onChangeForm({ ...form, name })} />
        <Field
          placeholder={t.email}
          value={form.email}
          theme={theme}
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={(email) => onChangeForm({ ...form, email })}
        />
        <Field
          placeholder={t.message}
          value={form.message}
          theme={theme}
          multiline
          onChangeText={(message) => onChangeForm({ ...form, message })}
        />
        <Pressable style={[styles.submitButton, { backgroundColor: theme.primary }]} onPress={onSubmit}>
          <Send size={18} color="#fff" />
          <Text style={styles.submitText}>{t.submit}</Text>
        </Pressable>
      </View>
    </>
  );
}
