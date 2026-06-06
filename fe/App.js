import { useEffect, useMemo, useRef, useState } from 'react';
import { Linking, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Toast } from './components/Toast';
import { articleImages, copy } from './data/content';
import { AboutPage } from './pages/AboutPage';
import { DetailPage } from './pages/DetailPage';
import { HomePage } from './pages/HomePage';
import { styles } from './styles/appStyles';
import { createTheme } from './theme/theme';

export default function App() {
  const [screen, setScreen] = useState('home');
  const [selectedPost, setSelectedPost] = useState(null);
  const [lang, setLang] = useState('vi');
  const [isDark, setIsDark] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [notice, setNotice] = useState(null);
  const [favoritePosts, setFavoritePosts] = useState([]);
  const [returnRoute, setReturnRoute] = useState({ screen: 'home', y: 0 });
  const [pendingScrollY, setPendingScrollY] = useState(null);
  const [playersSectionY, setPlayersSectionY] = useState(0);
  const scrollRef = useRef(null);
  const scrollYRef = useRef(0);

  const t = copy[lang];
  const theme = useMemo(() => createTheme(isDark), [isDark]);

  useEffect(() => {
    if (pendingScrollY === null) return;

    const timer = setTimeout(() => {
      scrollRef.current?.scrollTo({ y: pendingScrollY, animated: false });
      setPendingScrollY(null);
    }, 50);

    return () => clearTimeout(timer);
  }, [pendingScrollY, screen]);

  useEffect(() => {
    if (!notice) return;

    const timer = setTimeout(() => {
      setNotice(null);
    }, 3200);

    return () => clearTimeout(timer);
  }, [notice]);

  const goHome = () => {
    setSelectedPost(null);
    setScreen('home');
  };

  const goAbout = () => {
    setSelectedPost(null);
    setScreen('about');
  };

  const scrollToPlayers = () => {
    setNotice(null);
    if (screen !== 'home') {
      setSelectedPost(null);
      setScreen('home');
      setPendingScrollY(playersSectionY);
      return;
    }

    scrollRef.current?.scrollTo({ y: playersSectionY, animated: true });
  };

  const openPost = (post, index) => {
    if (screen !== 'detail') {
      setReturnRoute({ screen, y: scrollYRef.current });
    }
    setSelectedPost({ ...post, image: articleImages[index] });
    setScreen('detail');
  };

  const goBackFromDetail = () => {
    setSelectedPost(null);
    setScreen(returnRoute.screen);
    setPendingScrollY(returnRoute.y);
  };

  const toggleFavorite = (postTitle) => {
    setFavoritePosts((current) =>
      current.includes(postTitle) ? current.filter((title) => title !== postTitle) : [...current, postTitle]
    );
  };

  const submitContact = async () => {
    const validEmail = /\S+@\S+\.\S+/.test(form.email);
    if (!form.name.trim() || !validEmail || !form.message.trim()) {
      setNotice({ type: 'fail', text: t.fail });
      return;
    }

    const subject = encodeURIComponent(`Contact from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\nFrom: ${form.name}\nEmail: ${form.email}`);
    const url = `mailto:trieu22676191@gmail.com?subject=${subject}&body=${body}`;

    try {
      const canOpenEmail = await Linking.canOpenURL(url);
      if (!canOpenEmail) {
        setNotice({ type: 'fail', text: t.fail });
        return;
      }

      await Linking.openURL(url);
      setNotice({ type: 'success', text: t.success });
      setForm({ name: '', email: '', message: '' });
    } catch {
      setNotice({ type: 'fail', text: t.fail });
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={[styles.safe, { backgroundColor: theme.background }]}>
        <StatusBar style={isDark ? 'light' : 'dark'} />
        <ScrollView
          ref={scrollRef}
          style={{ backgroundColor: theme.background }}
          contentContainerStyle={styles.scroll}
          onScroll={(event) => {
            scrollYRef.current = event.nativeEvent.contentOffset.y;
          }}
          scrollEventThrottle={16}
        >
          <Header
            t={t}
            theme={theme}
            screen={screen}
            selectedPost={selectedPost}
            isDark={isDark}
            onHome={goHome}
            onAbout={goAbout}
            onOpenPost={openPost}
            onBack={screen === 'detail' ? goBackFromDetail : null}
            onToggleLang={() => setLang((value) => (value === 'vi' ? 'en' : 'vi'))}
            onToggleTheme={() => setIsDark((value) => !value)}
          />

          {screen === 'home' && (
            <HomePage
              t={t}
              theme={theme}
              form={form}
              onStart={scrollToPlayers}
              onPlayersLayout={setPlayersSectionY}
              onChangeForm={setForm}
              onSubmit={submitContact}
              onOpenPost={openPost}
              favoritePosts={favoritePosts}
              onToggleFavorite={toggleFavorite}
            />
          )}

          {screen === 'about' && <AboutPage t={t} theme={theme} />}
          {screen === 'detail' && (
            <DetailPage
              t={t}
              theme={theme}
              post={selectedPost}
              isFavorite={favoritePosts.includes(selectedPost?.title)}
              onToggleFavorite={toggleFavorite}
              onBack={goBackFromDetail}
            />
          )}

          <Footer t={t} theme={theme} />
        </ScrollView>
        <Toast notice={notice} theme={theme} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
