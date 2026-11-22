import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import Gira from '../assets/logogiraamarelo.svg'

// Se já tiver o logo em SVG ou PNG, importe aqui:
// import LogoGiraAmarelo from '../assets/logo-gira-amarelo.svg';

export function LoadingScreen() {
  const pulso = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const animacao = Animated.loop(
      Animated.sequence([
        Animated.timing(pulso, {
          toValue: 1.05,
          duration: 750,
          useNativeDriver: true,
        }),
        Animated.timing(pulso, {
          toValue: 1,
          duration: 750,
          useNativeDriver: true,
        }),
      ])
    );
    animacao.start();
    return () => animacao.stop();
  }, [pulso]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.logoBox, { transform: [{ scale: pulso }] }]}>
        <Gira width={180} height={160} />        
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.roxoPrincipal,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoBox: {
    alignItems: 'center',
  },
  logoTexto: {
    fontSize: 44,
    fontWeight: '900',
    color: colors.amareloFundo,
    lineHeight: 46,
  },
});