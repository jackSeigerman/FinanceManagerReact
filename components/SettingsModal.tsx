import React from 'react';
import { Modal, View, Text, TouchableOpacity, Switch, StyleSheet, Linking, Platform, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../styles/theme';

interface SettingsModalProps {
  visible: boolean;
  onClose: () => void;
  onClearData?: () => Promise<void>;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ visible, onClose, onClearData }) => {
  const { theme, isDarkMode, toggleTheme } = useTheme();

  const handleClearData = () => {
    if (Platform.OS === 'web') {
      const confirmed = window.confirm(
        'Are you sure you want to clear all data? This action cannot be undone.'
      );
      if (confirmed && onClearData) {
        onClearData();
      }
    } else {
      Alert.alert(
        'Clear All Data',
        'Are you sure you want to clear all data? This action cannot be undone.',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Clear',
            style: 'destructive',
            onPress: () => onClearData?.(),
          },
        ]
      );
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={[styles.overlay, { backgroundColor: theme.overlay }]}>
        <View style={[styles.container, { backgroundColor: theme.cardBackground }]}>
          <View style={[styles.header, { borderBottomColor: theme.border }]}>
            <Text style={[styles.title, { color: theme.text }]}>Settings</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color={theme.textSecondary} />
            </TouchableOpacity>
          </View>
          


          <View style={styles.content}>
            <View style={[styles.settingItem, { borderBottomColor: theme.border }]}>
              <View>
                <Text style={[styles.label, { color: theme.text }]}>Dark Mode</Text>
                <Text style={[styles.description, { color: theme.textSecondary }]}>
                  Switch between light and dark themes
                </Text>
              </View>
              <Switch
                value={isDarkMode}
                onValueChange={toggleTheme}
                trackColor={{ false: theme.border, true: theme.primary }}
                thumbColor={isDarkMode ? '#ffffff' : '#f4f3f4'}
                ios_backgroundColor={theme.border}
              />
            </View>



            {onClearData && (
              <View style={[styles.settingItem, { borderBottomWidth: 0 }]}>
                <View>
                  <Text style={[styles.label, { color: theme.text }]}>Clear All Data</Text>
                  <Text style={[styles.description, { color: theme.textSecondary }]}>
                    Clear all Cookies
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={handleClearData}
                  style={[styles.actionButton, { backgroundColor: theme.expenseColor }]}
                >
                  <Text style={styles.actionButtonText}>Clear</Text>
                </TouchableOpacity>
              </View>
            )}



            <View style={[styles.settingItem, { borderBottomColor: theme.border }]}>
              <View>
                <Text style={[styles.label, { color: theme.text }]}>Github</Text>
                <Text style={[styles.description, { color: theme.textSecondary }]}>
                  See more on my Github
                </Text>
              </View>
              
              <TouchableOpacity
                onPress={async () => {
                  const webUrl = "https://www.github.com/jackSeigerman";
                  const appUrl = "github://user?username=jackSeigerman";

                  if (Platform.OS === 'web') {
                    window.open(webUrl, '_blank');
                  } else {
                    try {
                      const supported = await Linking.canOpenURL(appUrl);
                      if (supported) {
                        await Linking.openURL(appUrl);
                      } else {
                        await Linking.openURL(webUrl);
                      }
                    } catch (error) {
                      console.error('Error opening link:', error);
                    }
                  }
                }}
                style={[styles.actionButton, { backgroundColor: theme.primary }]}
              >
                <Text style={styles.actionButtonText}>Github</Text>
              </TouchableOpacity>
            </View>


            
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container: {
    width: '90%',
    maxWidth: 400,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    padding: 20,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
  },
  description: {
    fontSize: 14,
    marginTop: 4,
    opacity: 0.7,
  },
  actionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default SettingsModal;