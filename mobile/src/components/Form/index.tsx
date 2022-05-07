import React, { useCallback, useState } from 'react'
import {
  View,
  TextInput,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native'
import { ArrowLeft } from 'phosphor-react-native'
import { captureScreen } from 'react-native-view-shot'
import * as FileSystem from 'expo-file-system'

import { ScreenshotButton } from '../ScreenshotButton'
import { Button } from '../Button'
import { FeedbackType } from '../Widget'

import { feedbackTypes } from '../../utils/feedbackTypes'

import { theme } from '../../theme'
import { styles } from './styles'
import { api } from '../../libs/api'

interface FormProps {
  feedbackType: FeedbackType
  onFeedbackCanceled: () => void
  onFeedbackSent: () => void
}

export function Form({ feedbackType, onFeedbackCanceled, onFeedbackSent }: FormProps) {
  const [screenshot, setScreenshot] = useState<string | null>(null)
  const [comment, setComment] = useState('')
  const [isSendingFeedback, setIsSendingFeedback] = useState(false)

  const feedbackTypeInfo = feedbackTypes[feedbackType]

  const handleScreenshot = useCallback(() => {
    captureScreen({
      format: 'jpg',
      quality: 0.8,
    })
      .then(uri => setScreenshot(uri))
      .catch(error => error)
  }, [])

  const handleScreenshotRemove = useCallback(() => {
    setScreenshot(null)
  }, [])

  const handleSendFeedback = useCallback(async () => {
    if (isSendingFeedback) {
      return;
    }

    setIsSendingFeedback(true)
    const screenshotBase64 = screenshot && await FileSystem.readAsStringAsync(screenshot, {
      encoding: 'base64'
    })

    try {
      await api.post('feedbacks', {
        type: feedbackType,
        comment,
        screenshot: `data:image/png;base64, ${screenshotBase64}`,
      })

      setIsSendingFeedback(false)
      onFeedbackSent()
    } catch (error) {
      console.log(error)
      setIsSendingFeedback(false)
    }
  }, [isSendingFeedback, comment, screenshot, feedbackType, FileSystem])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={onFeedbackCanceled}
        >
          <ArrowLeft
            size={24}
            weight="bold"
            color={theme.colors.text_secondary}
          />
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <Image
            source={feedbackTypeInfo.image}
            style={styles.image}
          />

          <Text style={styles.titleText}>
            {feedbackTypeInfo.title}
          </Text>
        </View>
      </View>

      <TextInput
        multiline
        autoCorrect={false}
        placeholder="Algo não está funcionando bem? Queremos corrigir. Conte com detalhes o que está acontecendo..."
        placeholderTextColor={theme.colors.text_secondary}
        onChangeText={setComment}
        value={comment}
        style={styles.input}
      />

      <View style={styles.footer}>
        <ScreenshotButton
          onTakeShot={handleScreenshot}
          onRemoveShot={handleScreenshotRemove}
          screenshot={screenshot}
        />

        <Button
          isLoading={isSendingFeedback}
          onPress={handleSendFeedback}
        />
      </View>
    </View>
  )
}
