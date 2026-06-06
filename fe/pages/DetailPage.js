import { useState } from 'react';
import { Image, Modal, Pressable, ScrollView, Text, useWindowDimensions, View } from 'react-native';
import { ArrowLeft, Bookmark, X } from 'lucide-react-native';
import { playerImages } from '../data/playerImages';
import { styles } from '../styles/appStyles';

export function DetailPage({ t, theme, post, isFavorite, onToggleFavorite, onBack }) {
  const [activeImage, setActiveImage] = useState(0);
  const [previewImage, setPreviewImage] = useState(null);
  const { width } = useWindowDimensions();

  if (!post) return null;

  const images = playerImages[post.title] ?? [{ uri: post.image }];
  const carouselWidth = Math.max(width - 32, 280);

  return (
    <View style={styles.detailWrap}>
      <View>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(event) => {
            const index = Math.round(event.nativeEvent.contentOffset.x / carouselWidth);
            setActiveImage(index);
          }}
        >
          {images.map((image, index) => (
            <Pressable key={index} style={{ width: carouselWidth }} onPress={() => setPreviewImage(image)}>
              <Image source={image} style={styles.detailImage} />
            </Pressable>
          ))}
        </ScrollView>
        <View style={styles.carouselDots}>
          {images.map((_, index) => (
            <View
              key={index}
              style={[
                styles.carouselDot,
                { backgroundColor: index === activeImage ? theme.primary : theme.border },
              ]}
            />
          ))}
        </View>
      </View>

      <View style={[styles.detailPanel, { backgroundColor: theme.surface, borderColor: theme.border }]}>
        <View style={styles.detailTitleRow}>
          <Text style={[styles.detailTitle, { color: theme.text }]}>{post.title}</Text>
          <Pressable
            accessibilityLabel="Favorite post"
            style={[styles.favoriteButton, { borderColor: theme.border }]}
            onPress={() => onToggleFavorite(post.title)}
          >
            <Bookmark
              size={18}
              color={isFavorite ? theme.primary : theme.muted}
              fill={isFavorite ? theme.primary : 'transparent'}
            />
          </Pressable>
        </View>
        <Text style={[styles.detailBody, { color: theme.muted }]}>{post.body}</Text>
        <Pressable style={[styles.secondaryButton, { borderColor: theme.primary }]} onPress={onBack}>
          <ArrowLeft size={18} color={theme.primary} />
          <Text style={[styles.secondaryButtonText, { color: theme.primary }]}>{t.back}</Text>
        </Pressable>
      </View>

      <Modal visible={Boolean(previewImage)} transparent animationType="fade" onRequestClose={() => setPreviewImage(null)}>
        <View style={styles.imagePreviewOverlay}>
          <Pressable style={styles.imagePreviewClose} onPress={() => setPreviewImage(null)}>
            <X size={24} color="#fff" />
          </Pressable>
          {previewImage && <Image source={previewImage} style={styles.imagePreview} />}
        </View>
      </Modal>
    </View>
  );
}
