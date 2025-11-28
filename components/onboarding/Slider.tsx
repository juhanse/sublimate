import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  PanResponder,
  LayoutChangeEvent,
  GestureResponderEvent,
  PanResponderGestureState,
} from 'react-native';
import { PosX } from '@/constants/Responsive';

type SliderProps = {
  min: number;
  max: number;
  step?: number;
  value?: number;
  onValueChange?: (value: number) => void;
};

export default function Slider({
  min,
  max,
  step = 1,
  value: controlledValue,
  onValueChange,
}: SliderProps) {
  const [layoutWidth, setLayoutWidth] = useState<number>(0);
  const internalX = useRef(new Animated.Value(0)).current;
  const internalValue = useRef<number>(controlledValue ?? min);

  useEffect(() => {
    if (typeof controlledValue === 'number' && layoutWidth > 0) {
      const ratio = (controlledValue - min) / (max - min);
      internalX.setValue(ratio * layoutWidth);
      internalValue.current = controlledValue;
    }
  }, [controlledValue, layoutWidth]);

  const clamp = (v: number, a = 0, b = 1) => Math.max(a, Math.min(b, v));
  const snap = (v: number) => {
    const steps = Math.round((v - min) / step);
    return Math.min(max, Math.max(min, min + steps * step));
  };

  const onTrackLayout = (e: LayoutChangeEvent) => {
    setLayoutWidth(e.nativeEvent.layout.width);
  };

  const pan = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (_evt, _gs) => {
        internalX.setOffset((internalX as any)._value || 0);
        internalX.setValue(0);
      },
      onPanResponderMove: (evt: GestureResponderEvent, _gs: PanResponderGestureState) => {
        if (!layoutWidth) return;
        const x = evt.nativeEvent.locationX;
        const clamped = clamp(x, 0, layoutWidth);
        internalX.setValue(clamped);
        const ratio = clamped / layoutWidth;
        const rawValue = min + ratio * (max - min);
        const snapped = snap(rawValue);
        internalValue.current = snapped;
        onValueChange?.(snapped);
      },
      onPanResponderRelease: (evt, _gs) => {
        if (!layoutWidth) return;
        const x = evt.nativeEvent.locationX;
        const clamped = clamp(x, 0, layoutWidth);
        const ratio = clamped / layoutWidth;
        const rawValue = min + ratio * (max - min);
        const snapped = snap(rawValue);
        const targetX = ((snapped - min) / (max - min)) * layoutWidth;
        Animated.timing(internalX, { toValue: targetX, duration: 100, useNativeDriver: false }).start();
        internalX.setOffset(0);
        internalX.setValue(targetX);
        internalValue.current = snapped;
        onValueChange?.(snapped);
      },
    }),
  ).current;

  const thumbTranslate = internalX.interpolate({
    inputRange: [0, Math.max(1, layoutWidth)],
    outputRange: [0, Math.max(1, layoutWidth)],
    extrapolate: 'clamp',
  });

  // initialize position on first layout
  useEffect(() => {
    if (layoutWidth && typeof controlledValue !== 'number') {
      const ratio = (internalValue.current - min) / (max - min);
      internalX.setValue(ratio * layoutWidth);
    }
  }, [layoutWidth]);

  return (
    <View style={styles.container}>
      <View style={styles.trackWrapper} onLayout={onTrackLayout} {...pan.panHandlers}>
        <View style={styles.track} />
        <Animated.View
          style={[styles.thumb, { transform: [{ translateX: thumbTranslate }] }]}
          pointerEvents="none"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  trackWrapper: {
    width: '100%',
    paddingVertical: PosX(12),
  },
  track: {
    height: PosX(6),
    backgroundColor: 'white',
    borderRadius: PosX(3),
  },
  thumb: {
    position: 'absolute',
    top: -PosX(12),
    width: PosX(24),
    height: PosX(24),
    borderRadius: PosX(12),
    backgroundColor: '#2F80ED',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
});

