// Slide.js
import React, { useRef, useState, useEffect } from 'react';
import { Image, Dimensions, StyleSheet, FlatList } from 'react-native';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const renderItem = ({ item }) => (
  <Image
    resizeMode='stretch'
    style={{ width: WIDTH, height: HEIGHT * 0.25 }}
    source={item.image}
  />
);

const Slide = ({ data }) => {
  const [imgActive, setImgActive] = useState(0);
  const flatListRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextSlide = (imgActive + 1) % data.length;
      setImgActive(nextSlide);
      flatListRef.current.scrollToIndex({ index: nextSlide, animated: true });
    }, 3000);

    return () => clearInterval(interval);
  }, [imgActive, data]);

  return (
    <FlatList
      ref={flatListRef}
      data={data}
      keyExtractor={(item) => item.key.toString()}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      pagingEnabled
      horizontal
      style={styles.wrap}
    />
  );
};

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    height: '100%',
  },
});

export default Slide;
