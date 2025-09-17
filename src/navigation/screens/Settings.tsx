import { Text } from '@react-navigation/elements';
import { StyleSheet, View, Pressable } from 'react-native';
import { useUser } from '../../context/userContext'

export function Settings() {
  const { user, changePreferences } = useUser();
  const currentTheme = user?.preferences?.theme || 'system';

  const themeOptions = [
    { id: 'light', label: 'Light' },
    { id: 'dark', label: 'Dark' },
    { id: 'system', label: 'System Default' }
  ] as const; 

  const handleThemeChange = (theme: 'light' | 'dark' | 'system') => {
    changePreferences({ theme });
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Appearance</Text>
        <View style={styles.optionsContainer}>
          {themeOptions.map((option) => (
            <Pressable
              key={option.id}
              style={[
                styles.themeOption,
                currentTheme === option.id && styles.selectedOption
              ]}
              onPress={() => handleThemeChange(option.id)}
            >
              <Text style={[
                styles.optionText,
                currentTheme === option.id && styles.selectedText
              ]}>
                {option.label}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  optionsContainer: {
    gap: 8,
  },
  themeOption: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  selectedOption: {
    backgroundColor: '#007AFF',
  },
  optionText: {
    fontSize: 16,
  },
  selectedText: {
    color: 'white',
  }
});
