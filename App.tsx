import {LivestreamView} from '@api.video/react-native-livestream';
import React, {useRef, useState} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {
  LiveStreamView,
  LiveStreamMethods,
} from '@api.video/react-native-livestream';

const App = () => {
  const ref = useRef<LiveStreamMethods>(null);
  const [streaming, setStreaming] = useState<boolean>(false);
  const styles = appStyles(streaming);

  const handleStream = (): void => {
    if (streaming) {
      ref.current?.stopStreaming();
      setStreaming(false);
    } else {
      ref.current?.startStreaming('YOUR_STREAM_KEY');
      setStreaming(true);
    }
  };

  return (
    <View style={styles.appContainer}>
      <LiveStreamView
        style={styles.livestreamView}
        ref={ref}
        camera="back"
        video={{
          fps: 30,
          resolution: '720p',
          bitrate: 2 * 1024 * 1024, // # 2 Mbps
        }}
        audio={{
          bitrate: 128000,
          sampleRate: 44100,
          isStereo: true,
        }}
        isMuted={false}
        onConnectionSuccess={() => {
          //do what you want
          console.log('CONNECTED');
        }}
        onConnectionFailed={e => {
          //do what you want
          console.log('ERROR', e);
        }}
        onDisconnect={() => {
          //do what you want
          console.log('DISCONNECTED');
        }}
      />

      <View style={buttonContainer({bottom: 40}).container}>
        <TouchableOpacity
          style={styles.streamingButton}
          onPress={handleStream}
        />
      </View>
    </View>
  );
};

export default App;

const appStyles = (streaming: boolean) =>
  StyleSheet.create({
    appContainer: {
      flex: 1,
      alignItems: 'center',
    },
    livestreamView: {
      flex: 1,
      alignSelf: 'stretch',
    },
    streamingButton: {
      borderRadius: 50,
      backgroundColor: streaming ? 'red' : 'white',
      width: 50,
      height: 50,
    },
  });

interface IButtonContainerParams {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
}
const buttonContainer = (params: IButtonContainerParams) =>
  StyleSheet.create({
    container: {
      position: 'absolute',
      top: params.top,
      bottom: params.bottom,
      left: params.left,
      right: params.right,
    },
  });
