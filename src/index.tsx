import React, { useEffect, useRef } from 'react'
import {
  Animated,
  ImageSourcePropType,
  ImageStyle,
  NativeModules,
  View,
} from 'react-native'
import {
  FlatList,
  PanGestureHandler,
  PanGestureHandlerStateChangeEvent,
  PinchGestureHandler,
  State,
} from 'react-native-gesture-handler'
import { styles } from './styles'

export const ImageLightbox: React.FC<{
  imageStyle?: ImageStyle
  imageSources: { id: number | string; imageSrc: ImageSourcePropType }[]
  isVisible: boolean
  onClose: () => void
  backdropColor: string
  closeSwipeThreshold?: number
}> = ({
  imageStyle,
  imageSources,
  isVisible,
  onClose,
  backdropColor,
  closeSwipeThreshold,
}) => {
  const scrollRef = useRef()

  const imageScaleVals = useRef<{ [key: string]: Animated.Value }>(
    imageSources.reduce(
      (prev, curr) => ({ ...prev, [curr.id]: new Animated.Value(1) }),
      {}
    )
  )

  const scaleVal = new Animated.Value(1)
  const transformVal = new Animated.ValueXY({ x: 0, y: 0 })
  const modalVisible = new Animated.Value(0)

  const onPanGestureEvent = Animated.event(
    [
      {
        nativeEvent: {
          translationX: transformVal.x,
          translationY: transformVal.y,
        },
      },
    ],
    {
      useNativeDriver: false,
    }
  )

  const handlePanReset = (e: PanGestureHandlerStateChangeEvent) => {
    if (e.nativeEvent.oldState === State.ACTIVE) {
      if (Math.abs(e.nativeEvent.translationY) > (closeSwipeThreshold || 300)) {
        onClose()
        transformVal.setValue({ x: 0, y: 0 })
      }

      Animated.spring(transformVal, {
        toValue: { x: 0, y: 0 },
        useNativeDriver: false,
      }).start()
    }
  }

  useEffect(() => {
    if (isVisible) {
      Animated.spring(modalVisible, {
        toValue: 1,
        useNativeDriver: true,
      }).start()
    } else {
      Animated.spring(modalVisible, {
        toValue: 0,
        useNativeDriver: true,
      }).start()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible])

  return (
    <Animated.View
      style={{
        ...styles.container,
        opacity: modalVisible,
        transform: [
          {
            scale: modalVisible,
          },
        ],
      }}
    >
      <Animated.View
        style={{
          ...styles.backdrop,
          backgroundColor: backdropColor,
          opacity: transformVal.y.interpolate({
            inputRange: [-320, 0, 320],
            outputRange: [0, 0.9, 0],
          }),
        }}
      />
      <FlatList
        ref={(flatRef: any) => (scrollRef.current = flatRef)}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        contentContainerStyle={styles.flatlistContainer}
        data={imageSources}
        renderItem={({ item }) => (
          <View key={item.id.toString()}>
            <PanGestureHandler
              activeOffsetX={1000}
              activeOffsetY={[-30, 30]}
              onGestureEvent={onPanGestureEvent}
              onHandlerStateChange={handlePanReset}
            >
              <Animated.View>
                <PinchGestureHandler
                  onGestureEvent={(e) => {
                    Animated.event(
                      [
                        {
                          nativeEvent: {
                            scale: imageScaleVals.current[item.id.toString()],
                          },
                        },
                      ],
                      {
                        useNativeDriver: false,
                      }
                    )(e)
                  }}
                  onHandlerStateChange={(e) => {
                    if (e.nativeEvent.oldState === State.ACTIVE) {
                      Animated.spring(
                        imageScaleVals.current[item.id.toString()],
                        {
                          toValue: 1,
                          useNativeDriver: false,
                        }
                      ).start()
                    }
                  }}
                >
                  <Animated.Image
                    source={imageSources[0].imageSrc}
                    style={{
                      ...styles.image,
                      ...imageStyle,
                      transform: [
                        { perspective: 200 },
                        {
                          scale:
                            imageScaleVals.current[item.id.toString()] !==
                            undefined
                              ? imageScaleVals.current[item.id]
                              : 1,
                        },
                        {
                          translateY: transformVal.y,
                        },
                      ],
                      zIndex: scaleVal.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 9999],
                      }),
                    }}
                  />
                </PinchGestureHandler>
              </Animated.View>
            </PanGestureHandler>
          </View>
        )}
      />
    </Animated.View>
  )
}

export default NativeModules.RNZoomableImageViewer
