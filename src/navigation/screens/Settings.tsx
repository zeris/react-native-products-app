import { Text } from '@react-navigation/elements';
import { StyleSheet, View, Pressable, TouchableOpacity } from 'react-native';
import { useUser } from '../../context/userContext'
import React from 'react';
import { useTheme } from '@react-navigation/native';

export function Settings() {
  const { user, changePreferences } = useUser();
  const currentTheme = user?.preferences?.theme || 'system';
  const { colors } = useTheme();

  const themeOptions = [
    { id: 'light', label: 'Light' },
    { id: 'dark', label: 'Dark' },
    { id: 'system', label: 'System Default' }
  ] as const;

  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<typeof themeOptions[number]['id']>(currentTheme as any);

  React.useEffect(() => {
    setSelected(currentTheme as any);
  }, [currentTheme]);

  const onSave = () => {
    if (selected && selected !== currentTheme) {
      changePreferences({ theme: selected });
    }
    setOpen(false);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.card, { backgroundColor: colors.card }]}> 
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Appearance</Text>

        <TouchableOpacity onPress={() => setOpen((v) => !v)} style={[styles.dropdownButton, { backgroundColor: colors.border }] }>
          <Text style={[styles.dropdownText, { color: colors.text }]}>{themeOptions.find(o => o.id === selected)?.label ?? 'Select theme'}</Text>
        </TouchableOpacity>

        {open && (
          <View style={[styles.dropdown, { backgroundColor: colors.card }] }>
            {themeOptions.map(opt => (
              <Pressable key={opt.id} onPress={() => setSelected(opt.id)} style={[styles.dropdownItem, selected === opt.id && { backgroundColor: currentTheme ? '#e7e7eaff' : '#272729' }]}>
                <Text style={[styles.optionText, selected === opt.id && { color: colors.primary }]}>{opt.label}</Text>
              </Pressable>
            ))}
          </View>
        )}
        <View style={open ? styles.controlsWithOptions : styles.controlsWithNoOptions}>
          <Pressable onPress={onSave} style={[styles.saveButton, selected === currentTheme && styles.saveButtonDisabled, { backgroundColor: selected === currentTheme ? '#999' : colors.primary }]} disabled={selected === currentTheme}>
            <Text style={[styles.saveText, { color: colors.background }]}>Save</Text>
          </Pressable>
          { open && (
            <Pressable onPress={() => { setSelected(currentTheme as any); setOpen(false); }} style={[styles.cancelButton, { backgroundColor: colors.notification }]}>
              <Text style={[styles.cancelText, { color: colors.background }]}>Cancel</Text>
            </Pressable>
          )}
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
  card: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
    height: '60%',
  },
  dropdownButton: {
    marginTop: 12,
    padding: 14,
    borderRadius: 8,
    backgroundColor: '#f7f7f8',
  },
  dropdownText: {
    fontSize: 16,
  },
  dropdown: {
    marginTop: 10,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#fafafa',
  },
  dropdownItem: {
    padding: 12,
  },
  dropdownItemSelected: {
    backgroundColor: '#e30707e4',
  },
  optionText: {
    fontSize: 16,
  },
  selectedText: {
    color: '#007AFF',
  },
  controlsWithNoOptions: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 8,
    padding: 10,
    top: "50%",
  },
  controlsWithOptions: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    gap: 8,
    padding: 10,
    top: "12.7%",
  },
  cancelButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#db4242ff',
  },
  cancelText: {
    color: '#fff',
    width: '100%',
    textAlign: 'center',
    fontSize: 18,
  },
  saveButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    width: '100%',
  },
  saveButtonDisabled: {
    backgroundColor: '#bcdcff',
  },
  saveText: {
    color: 'white',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 18,
  },
  saveTextDisabled: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
  }
});
