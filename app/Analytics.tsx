import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { VictoryBar, VictoryChart, VictoryTheme, VictoryAxis } from 'victory';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { Firebase } from '../FirebaseConfig';

interface AnalyticsData {
  quizId: string;
  correctAnswers: number;
  totalQuestions: number;
  accuracy: number;
}

const Analytics = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData[]>([]);
  const Firestore = getFirestore(Firebase);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const analyticsSnapshot = await getDocs(collection(Firestore, 'userAnalytics'));
        const analyticsData = analyticsSnapshot.docs.map((doc) => doc.data() as AnalyticsData);
        setAnalytics(analyticsData);
      } catch (error) {
        console.error('Error fetching analytics data: ', error);
      }
    };

    fetchAnalytics();
  }, [Firestore]);

  const checkAchievements = (analytics: AnalyticsData[]) => {
    const totalQuizzes = analytics.length;
    const highAccuracy = analytics.filter((a) => a.accuracy > 90).length;

    return [
      totalQuizzes >= 5 && 'Quiz Beginner',
      totalQuizzes >= 10 && 'Quiz Enthusiast',
      highAccuracy > 0 && 'Quiz Master',
    ].filter(Boolean);
  };

  const achievements = checkAchievements(analytics);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Quiz Analytics</Text>
      <VictoryChart theme={VictoryTheme.material} domainPadding={20}>
        <VictoryAxis
          style={{
            tickLabels: { fontSize: 12, angle: 45 },
          }}
        />
        <VictoryBar
          data={analytics}
          x="quizId"
          y="accuracy"
          labels={({ datum }: { datum: AnalyticsData }) => `${datum.accuracy}%`}
          style={{
            data: { fill: '#007bff' },
            labels: { fontSize: 12, fill: '#333' },
          }}
        />
      </VictoryChart>

      <View style={styles.achievementsContainer}>
        <Text style={styles.header}>Achievements</Text>
        {achievements.length > 0 ? (
          achievements.map((achievement, index) => (
            <Text key={index} style={styles.achievement}>
              🎉 {achievement}
            </Text>
          ))
        ) : (
          <Text style={styles.noAchievements}>No achievements unlocked yet.</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  achievementsContainer: { marginTop: 30 },
  achievement: { fontSize: 16, marginVertical: 5, color: 'green', textAlign: 'center' },
  noAchievements: { fontSize: 16, color: '#999', textAlign: 'center', marginTop: 10 },
});

export default Analytics;
