import 'package:flutter/material.dart';

void main() {
  runApp(const VrrittamApp());
}

class VrrittamApp extends StatelessWidget {
  const VrrittamApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'VRRITTAM',
      theme: ThemeData(
        useMaterial3: true,
        colorScheme: ColorScheme.fromSeed(seedColor: const Color(0xFF003366)),
        scaffoldBackgroundColor: const Color(0xFFF5F9FD),
      ),
      home: const HomePage(),
    );
  }
}

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    final navItems = ['Home', 'About', 'Features', 'Courses', 'Contact'];

    return Scaffold(
      body: SingleChildScrollView(
        child: Column(
          children: [
            Container(
              decoration: const BoxDecoration(
                gradient: LinearGradient(
                  colors: [Color(0xFF003366), Color(0xFF1454A3)],
                  begin: Alignment.centerLeft,
                  end: Alignment.centerRight,
                ),
              ),
              child: SafeArea(
                child: Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 32, vertical: 18),
                  child: Column(
                    children: [
                      Row(
                        children: [
                          const Text(
                            'VRRITTAM',
                            style: TextStyle(
                              color: Colors.white,
                              fontSize: 28,
                              fontWeight: FontWeight.w800,
                              letterSpacing: 1.2,
                            ),
                          ),
                          const Spacer(),
                          ...navItems.map(
                            (item) => Padding(
                              padding: const EdgeInsets.only(left: 20),
                              child: Text(
                                item,
                                style: const TextStyle(
                                  color: Colors.white70,
                                  fontSize: 15,
                                  fontWeight: FontWeight.w600,
                                ),
                              ),
                            ),
                          ),
                          const SizedBox(width: 18),
                          FilledButton(
                            onPressed: () {},
                            style: FilledButton.styleFrom(
                              backgroundColor: const Color(0xFFFFC857),
                              foregroundColor: const Color(0xFF003366),
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(18),
                              ),
                            ),
                            child: const Text('Login'),
                          ),
                        ],
                      ),
                      const SizedBox(height: 36),
                      Padding(
                        padding: const EdgeInsets.symmetric(vertical: 30),
                        child: Row(
                          crossAxisAlignment: CrossAxisAlignment.center,
                          children: [
                            Expanded(
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Container(
                                    padding: const EdgeInsets.symmetric(
                                      horizontal: 18,
                                      vertical: 10,
                                    ),
                                    decoration: BoxDecoration(
                                      color: Colors.white.withOpacity(0.12),
                                      borderRadius: BorderRadius.circular(999),
                                    ),
                                    child: const Row(
                                      mainAxisSize: MainAxisSize.min,
                                      children: [
                                        Icon(Icons.flag, color: Color(0xFFFFC857)),
                                        SizedBox(width: 8),
                                        Text(
                                          'Made in India',
                                          style: TextStyle(
                                            color: Color(0xFFFFC857),
                                            fontWeight: FontWeight.bold,
                                          ),
                                        ),
                                      ],
                                    ),
                                  ),
                                  const SizedBox(height: 20),
                                  const Text(
                                    'AI-powered education
for every learner.',
                                    style: TextStyle(
                                      color: Colors.white,
                                      fontSize: 54,
                                      fontWeight: FontWeight.w800,
                                      height: 1.08,
                                    ),
                                  ),
                                  const SizedBox(height: 20),
                                  const Text(
                                    'Smart academic support for students, teachers, parents, and school leaders with real-time analytics and digital mentoring.',
                                    style: TextStyle(
                                      color: Colors.white70,
                                      fontSize: 20,
                                      height: 1.7,
                                    ),
                                  ),
                                  const SizedBox(height: 28),
                                  Wrap(
                                    spacing: 14,
                                    runSpacing: 12,
                                    children: [
                                      FilledButton.icon(
                                        onPressed: () {},
                                        icon: const Icon(Icons.arrow_forward_rounded),
                                        label: const Text('Get Started'),
                                        style: FilledButton.styleFrom(
                                          backgroundColor: const Color(0xFFFFC857),
                                          foregroundColor: const Color(0xFF003366),
                                          padding: const EdgeInsets.symmetric(
                                            horizontal: 22,
                                            vertical: 16,
                                          ),
                                        ),
                                      ),
                                      OutlinedButton.icon(
                                        onPressed: () {},
                                        icon: const Icon(Icons.explore_outlined),
                                        label: const Text('Explore Platform'),
                                        style: OutlinedButton.styleFrom(
                                          foregroundColor: Colors.white,
                                          side: const BorderSide(color: Colors.white54),
                                          padding: const EdgeInsets.symmetric(
                                            horizontal: 22,
                                            vertical: 16,
                                          ),
                                        ),
                                      ),
                                    ],
                                  ),
                                ],
                              ),
                            ),
                            const SizedBox(width: 30),
                            Expanded(
                              child: ClipRRect(
                                borderRadius: BorderRadius.circular(28),
                                child: Container(
                                  height: 430,
                                  decoration: const BoxDecoration(
                                    image: DecorationImage(
                                      image: NetworkImage(
                                        'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80',
                                      ),
                                      fit: BoxFit.cover,
                                    ),
                                  ),
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ),
            Container(
              color: Colors.white,
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: 28, vertical: 40),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: const [
                    _MetricChip(label: '60K+', value: 'Students'),
                    _MetricChip(label: '4.9/5', value: 'Ratings'),
                    _MetricChip(label: '350+', value: 'Schools'),
                    _MetricChip(label: '24/7', value: 'Support'),
                  ],
                ),
              ),
            ),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 32, vertical: 54),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    'Smart digital learning platform',
                    style: TextStyle(
                      fontSize: 28,
                      fontWeight: FontWeight.w800,
                      color: Color(0xFF003366),
                    ),
                  ),
                  const SizedBox(height: 20),
                  GridView.count(
                    physics: const NeverScrollableScrollPhysics(),
                    shrinkWrap: true,
                    crossAxisCount: 3,
                    crossAxisSpacing: 22,
                    mainAxisSpacing: 22,
                    childAspectRatio: 1.15,
                    children: const [
                      _FeatureCard(
                        icon: Icons.school_rounded,
                        title: 'Student Growth',
                        subtitle: 'Personalized homework, attendance, and marks tracking.',
                      ),
                      _FeatureCard(
                        icon: Icons.groups_rounded,
                        title: 'Teacher Support',
                        subtitle: 'Plan lessons, monitor performance, and simplify communication.',
                      ),
                      _FeatureCard(
                        icon: Icons.family_restroom_rounded,
                        title: 'Parent Visibility',
                        subtitle: 'Stay informed with attendance, fees, and curriculum updates.',
                      ),
                      _FeatureCard(
                        icon: Icons.auto_awesome_rounded,
                        title: 'AI Copilot',
                        subtitle: 'Get smart suggestions, summaries, and educational guidance instantly.',
                      ),
                      _FeatureCard(
                        icon: Icons.analytics_rounded,
                        title: 'Performance Insights',
                        subtitle: 'Understand student trends with actionable academic metrics.',
                      ),
                      _FeatureCard(
                        icon: Icons.security_rounded,
                        title: 'Secure Access',
                        subtitle: 'Role-based dashboards and safe records for all stakeholders.',
                      ),
                    ],
                  ),
                ],
              ),
            ),
            Container(
              width: double.infinity,
              color: const Color(0xFF0A1D3A),
              padding: const EdgeInsets.symmetric(horizontal: 32, vertical: 50),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    'Ready to transform your school experience?',
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 30,
                      fontWeight: FontWeight.w800,
                    ),
                  ),
                  const SizedBox(height: 12),
                  const Text(
                    'Bring together academics, communication, and insights in one modern platform.',
                    style: TextStyle(
                      color: Colors.white70,
                      fontSize: 18,
                      height: 1.7,
                    ),
                  ),
                  const SizedBox(height: 24),
                  FilledButton.icon(
                    onPressed: () {},
                    icon: const Icon(Icons.rocket_launch_rounded),
                    label: const Text('Launch App'),
                    style: FilledButton.styleFrom(
                      backgroundColor: const Color(0xFFFFC857),
                      foregroundColor: const Color(0xFF003366),
                      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _MetricChip extends StatelessWidget {
  const _MetricChip({required this.label, required this.value});

  final String label;
  final String value;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text(
          label,
          style: const TextStyle(
            color: Color(0xFF003366),
            fontSize: 28,
            fontWeight: FontWeight.w800,
          ),
        ),
        const SizedBox(height: 6),
        Text(
          value,
          style: const TextStyle(
            color: Colors.black54,
            fontSize: 15,
            fontWeight: FontWeight.w600,
          ),
        ),
      ],
    );
  }
}

class _FeatureCard extends StatelessWidget {
  const _FeatureCard({
    required this.icon,
    required this.title,
    required this.subtitle,
  });

  final IconData icon;
  final String title;
  final String subtitle;

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 0,
      color: Colors.white,
      shape: RoundedRectangleBorder(
        side: const BorderSide(color: Color(0xFFE6EDF7)),
        borderRadius: BorderRadius.circular(20),
      ),
      child: Padding(
        padding: const EdgeInsets.all(22),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Container(
              width: 54,
              height: 54,
              decoration: BoxDecoration(
                color: const Color(0xFFEAF2FF),
                borderRadius: BorderRadius.circular(16),
              ),
              child: Icon(icon, color: const Color(0xFF003366), size: 28),
            ),
            const SizedBox(height: 18),
            Text(
              title,
              style: const TextStyle(
                color: Color(0xFF003366),
                fontSize: 22,
                fontWeight: FontWeight.w700,
              ),
            ),
            const SizedBox(height: 12),
            Text(
              subtitle,
              style: const TextStyle(
                color: Colors.black54,
                fontSize: 15,
                height: 1.6,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
