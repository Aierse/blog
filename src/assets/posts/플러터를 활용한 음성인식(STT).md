### 참고자료

- [플러터 개발환경 구축](https://deku.posstree.com/ko/flutter/start/)
- [공식문서](https://pub.dev/packages/speech_to_text)

---

## 단축 코드

```dart
import 'package:speech_to_text/speech_to_text.dart' as stt;

stt.SpeechToText speech = stt.SpeechToText();
bool available = await speech.initialize( onStatus: statusListener, onError: errorListener );
if ( available ) {
    speech.listen( onResult: resultListener );
}
else {
    print("The user has denied the use of speech recognition.");
}

speech.stop()
```

## 전체 코드

```dart
import 'package:flutter/material.dart';
// 음성인식
import 'package:speech_to_text/speech_recognition_result.dart';
// 음성인식 결과
import 'package:speech_to_text/speech_to_text.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
        useMaterial3: true,
      ),
      home: const MyHomePage(title: 'Flutter Demo Home Page'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key, required this.title});

  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  SpeechToText _speechToText = SpeechToText();
  // 음성인식 중인지
  bool _speechEnabled = false;
  // 인식된 단어
  String _lastWords = '';

  @override
  void initState() {
    super.initState();
    _initSpeech();
  }

  void _initSpeech() async {
    // 음성인식 초기화
    _speechEnabled = await _speechToText.initialize();
    setState(() {});
  }

  void _startListening() async {
    // 음성인식 시작
    await _speechToText.listen(onResult: _onSpeechResult);
    setState(() {});
  }

  void _stopListening() async {
    // 음성인식 중단
    await _speechToText.stop();
    setState(() {});
  }

  void _onSpeechResult(SpeechRecognitionResult result) {
    setState(() {
      // 인식된 결과를 할당
      _lastWords = result.recognizedWords;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
        title: Text(widget.title),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Container(
              padding: const EdgeInsets.all(16),
              child: const Text(
                'Recognized words:',
                style: TextStyle(fontSize: 20.0),
              ),
            ),
            Expanded(
              child: Container(
                padding: const EdgeInsets.all(16),
                child: Text(
                  _speechToText.isListening
                      // 인식된 단어를 화면에 띄웁니다.
                      ? _lastWords
                      // 음성인식이 가능하지만 음성인식중이지 않다면
                      // 사용자에게 시작하는 방법을 알려야합니다.
                      // 음성인식이 불가능한 경우에는 지원되지 않는 다는 사실을 알립니다.
                      : _speechEnabled
                          ? 'Tap the microphone to start listening...'
                          : 'Speech not available',
                ),
              ),
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed:
            // 음성인식중이라면 중단을, 아니라면 시작합니다.
            _speechToText.isNotListening ? _startListening : _stopListening,
        tooltip: 'Listen',
        child: const Icon(Icons.add),
      ),
    );
  }
}
```

## 권한

> 이 플러그인을 사용하는 애플리케이션에는 사용자 권한이 필요합니다.

**IOS**

`<project root>/ios/Runner/Info.plist` 에 다음 키를 추가하세요.

- NSSpeechRecognitionUsageDescription : 앱에서 음성 인식을 사용하는 이유를 설명하세요.
- NSMicrophoneUsageDescription : 앱에서 마이크를 사용하는 이유를 설명하세요.

**Android**

`<project root>/android/app/src/main/AndroidManifest.xml` 에 다음 키를 추가하세요.

- android.permission.RECORD_AUDIO : 마이크 접근 권한이 필요합니다.
- android.permission.INTERNET : 음성인식으로 원격 서비스를 이용할 수 있으므로 이 권한이 필요합니다.
- android.permission.BLUETOOTH : 음성인식은 블루투스 헤드셋을 사용할 수 있기 때문에 이 권한이 필요합니다.
- android.permission.BLUETOOTH_ADMIN : 음성인식은 블루투스 헤드셋을 사용할 수 있기 때문에 이 권한이 필요합니다.
- android.permission.BLUETOOTH_CONNECT : 음성인식은 블루투스 헤드셋을 사용할 수 있기 때문에 이 권한이 필요합니다.

```xml
  <uses-permission android:name="android.permission.RECORD_AUDIO"/>
  <uses-permission android:name="android.permission.INTERNET"/>
  <uses-permission android:name="android.permission.BLUETOOTH"/>
  <uses-permission android:name="android.permission.BLUETOOTH_ADMIN"/>
  <uses-permission android:name="android.permission.BLUETOOTH_CONNECT"/>
```
