import React from 'react';
import { generateAPIUrl } from '../../utils';
import { Message, useChat } from '@ai-sdk/react';
import { fetch as expoFetch } from 'expo/fetch';
import {
  View,
  TextInput,
  ScrollView,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Clipboard,
} from 'react-native';
import {
  ArrowLeft,
  MoreVertical,
  ThumbsUp,
  ThumbsDown,
  Copy,
  Mic,
} from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ToolInvocation } from 'ai';
import HorizontalProducts from '@/components/HorizontalProducts';
import { useRouter } from 'expo-router';

const handleCopyToClipboard = (data) => {
  Clipboard.setString(data);
};

export default function ChatScreen() {
  const insets = useSafeAreaInsets();
  const bottomPadding = insets.bottom + 60;

  const {
    messages,
    input,
    error,
    handleInputChange,
    handleSubmit,
    addToolResult,
  } = useChat({
    fetch: expoFetch as unknown as typeof globalThis.fetch,
    api: generateAPIUrl('/api/chat'),
    onError: (error) => console.error(error, 'ERROR'),

    async onToolCall({ toolCall }) {
      const { toolName, args } = toolCall;

      console.log('shopping called');

      if (toolName === 'shopForProduct') {
        const productName = (args as { productName: string }).productName;

        const response = await fetch('http://localhost:8081/api/shop', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ productName }),
        });

        const data = await response.json();
        console.log(data);
        return data;
      }

      return;
    },
  });

  const router = useRouter();

  if (error) return <Text style={styles.errorText}>{error.message}</Text>;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {messages?.map((m: Message) => (
          <View key={m.id} style={styles.messageContainer}>
            {m.content !== '' && (
              <View
                style={[
                  styles.messageRow,
                  m.role === 'user'
                    ? styles.messageRowUser
                    : styles.messageRowBot,
                ]}
              >
                <View
                  style={[
                    styles.messageBubble,
                    m.role === 'user'
                      ? styles.messageBubbleUser
                      : styles.messageBubbleBot,
                  ]}
                >
                  <Text style={styles.messageText}>{m.content}</Text>
                </View>
              </View>
            )}

            {/* Tool Invocations */}
            {m.toolInvocations?.map((toolInvocation: ToolInvocation) => {
              const toolCallId = toolInvocation.toolCallId;
              const addResult = (result: string) =>
                addToolResult({ toolCallId, result });

              if (toolInvocation.toolName === 'shopForProduct') {
                if ('result' in toolInvocation) {
                  return (
                    <View key={toolCallId} style={styles.toolInvocationContainer}>
                      <HorizontalProducts
                        products={toolInvocation.result.shopping_results}
                        onProductPress={(productId) => {
                          router.push({
                            pathname: '/(tabs)/product-details',
                            params: { productId },
                          });
                        }}
                      />
                    </View>
                  );
                } else {
                  return (
                    <View key={toolCallId} style={styles.fetchingTextContainer}>
                      <Text style={styles.fetchingText}>
                        Fetching product data...
                      </Text>
                    </View>
                  );
                }
              }

              // Fallback for other tools
              return 'result' in toolInvocation ? (
                <View key={toolCallId} style={styles.toolResultContainer}>
                  <Text style={styles.toolResultText}>
                    Tool call {toolInvocation.toolName}: {JSON.stringify(toolInvocation.result)}
                  </Text>
                </View>
              ) : (
                <View key={toolCallId} style={styles.toolCallingContainer}>
                  <Text style={styles.toolCallingText}>
                    Calling {toolInvocation.toolName}...
                  </Text>
                </View>
              );
            })}
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.textInput}
            placeholder="Purchase anything..."
            placeholderTextColor="#9CA3AF"
            value={input}
            onChange={(e) =>
              handleInputChange({
                ...e,
                target: { ...e.target, value: e.nativeEvent.text },
              } as unknown as React.ChangeEvent<HTMLInputElement>)
            }
            onSubmitEditing={(e) => {
              handleSubmit(e);
              e.preventDefault();
            }}
          />
          <TouchableOpacity>
            <Mic size={24} color="#9CA3AF" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f3f3',
  },
  scrollViewContent: {
    padding: 16,
  },
  messageContainer: {
    marginBottom: 16,
  },
  messageRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  messageRowUser: {
    justifyContent: 'flex-end',
  },
  messageRowBot: {
    justifyContent: 'flex-start',
  },
  messageBubble: {
    maxWidth: '80%',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  messageBubbleUser: {
    backgroundColor: '#60A5FA', // Tailwind's bg-blue-400
  },
  messageBubbleBot: {
    backgroundColor: '#1F2937', // Tailwind's bg-gray-800
  },
  messageText: {
    color: '#FFFFFF',
    fontSize: 16, // Tailwind's text-base
  },
  toolInvocationContainer: {
    marginTop: -24, // Tailwind's -mt-6
    flex: 1,
  },
  fetchingTextContainer: {
    marginTop: 8,
  },
  fetchingText: {
    color: '#FFFFFF',
  },
  toolResultContainer: {
    marginTop: 8,
  },
  toolResultText: {
    color: '#FFFFFF',
  },
  toolCallingContainer: {
    marginTop: 8,
  },
  toolCallingText: {
    color: '#FFFFFF',
  },
  inputContainer: {
    paddingHorizontal: 16, // Tailwind's px-4
    paddingBottom: 24, // Tailwind's pb-6
    marginBottom: 48, // Tailwind's mb-12
  },
  inputWrapper: {
    flexDirection: 'row', // Tailwind's flex-row
    alignItems: 'center', // Tailwind's items-center
    backgroundColor: '#FFFFFF', // Tailwind's bg-white
    borderRadius: 9999, // Tailwind's rounded-full
    paddingHorizontal: 16, // Tailwind's px-4
    paddingVertical: 8, // Tailwind's py-2
    borderWidth: 2, // Tailwind's border-2
    borderColor: '#E5E7EB', // Tailwind's border-gray-200
  },
  textInput: {
    flex: 1, // Tailwind's flex-1
    color: '#000000', // Tailwind's text-black
    fontSize: 18, // Tailwind's text-lg
    paddingHorizontal: 8, // Tailwind's px-2
    paddingBottom: 8, // Tailwind's pb-2
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

