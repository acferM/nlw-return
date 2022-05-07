import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Animated, Dimensions, Easing, TouchableOpacity, useWindowDimensions, View } from 'react-native'
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'
import BottomSheet from '@gorhom/bottom-sheet'
import { ChatTeardropDots } from 'phosphor-react-native'

import { theme } from '../../theme'
import { styles } from './styles'
import { Options } from '../Options'
import { feedbackTypes } from '../../utils/feedbackTypes'
import { Form } from '../Form'
import { Success } from '../Success'

export type FeedbackType = keyof typeof feedbackTypes

function WidgetBase() {
  const [feedbackType, setFeedbackType] = useState<FeedbackType>('BUG')
  const [widgetTransformState, setWidgetTransformState] = useState(0)

  const { width } = useWindowDimensions()

  const slideAnim = useRef(new Animated.Value(0)).current

  const bottomSheetRef = useRef<BottomSheet>(null)

  const handleOpen = useCallback(() => {
    bottomSheetRef.current?.expand()
  }, [bottomSheetRef])

  const handleRestartFeedback = useCallback(() => {
    setWidgetTransformState(0)
  }, [])

  const handleFeedbackSent = useCallback(() => {
    setWidgetTransformState(2)
  }, [])

  useEffect(() => {
    Animated.timing(
      slideAnim,
      {
        toValue: -width * widgetTransformState,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }
    ).start()
  }, [widgetTransformState])

  return (
    <>
      <TouchableOpacity
        style={styles.button}
        onPress={handleOpen}
      >
        <ChatTeardropDots
          size={24}
          weight="bold"
          color={theme.colors.text_on_brand_color}
        />
      </TouchableOpacity>

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={[1, 280]}
        backgroundStyle={styles.modal}
        handleIndicatorStyle={styles.indicator}
      >
        <Animated.View style={{
          width: '100%',
          flexDirection: 'row',
          transform: [{
            translateX: slideAnim,
          }],
        }}>
          <Options
            onFeedbackTypeChanged={(feedbackType) => {
              setFeedbackType(feedbackType)
              setWidgetTransformState(1)
            }}
          />
          <Form
            feedbackType={feedbackType}
            onFeedbackCanceled={handleRestartFeedback}
            onFeedbackSent={handleFeedbackSent}
          />
          <Success
            onSendAnotherFeedback={handleRestartFeedback}
          />
        </Animated.View>
      </BottomSheet>
    </>
  )
}

const Widget = gestureHandlerRootHOC(WidgetBase)

export { Widget }