import 'package:flutter_test/flutter_test.dart';

import 'package:vrrittam_flutter/main.dart';

void main() {
  testWidgets('VRRITTAM app loads', (tester) async {
    await tester.pumpWidget(const VrrittamApp());

    expect(find.text('VRRITTAM'), findsWidgets);
    expect(find.text('AI-powered education'), findsOneWidget);
  });
}
