import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Navbar from '../components/Common/Navbar';

export default function ProfileScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        <Text style={styles.name}>Musfira Ansari</Text>
        <Text style={styles.subtitle}>01 upcoming reservation</Text>

        {/* Phone */}
        <View style={styles.section}>
          <Text style={styles.label}>PHONE NUMBER</Text>
          <View style={styles.inputContainer}>
            <TextInput value="+92 1234567890" editable={false} style={styles.input} />
            <Ionicons name="eye-outline" size={20} color="#aaa" style={styles.icon} />
          </View>
        </View>

        {/* Email */}
        <View style={styles.section}>
          <Text style={styles.label}>EMAIL ADDRESS</Text>
          <View style={styles.inputContainer}>
            <TextInput value="musfiraansari05@gmail.com" editable={false} style={styles.input} />
          </View>
        </View>

        {/* Delete Account */}
        <View style={styles.section}>
          <TouchableOpacity>
            <Text style={styles.deleteText}>DELETE ACCOUNT</Text>
          </TouchableOpacity>
        </View>

        {/* Description */}
        <Text style={styles.description}>
          Once you make an online reservation through our APP, you will receive an instant confirmation via email.
          Your mobile number will be shared with the restaurant for reservation follow-up and confirmation.
        </Text>

        {/* Sign Out Button (moved up) */}
        <TouchableOpacity style={styles.signOutButton}>
          <Text style={styles.signOutText}>SIGN OUT</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Navbar - fixed */}
      <View style={styles.fixedNavbar}>
        <Navbar navigation={navigation} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#000',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 20,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#E10600',
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 12,
    color: '#999',
    marginBottom: 5,
  },
  inputContainer: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    paddingVertical: 8,
  },
  icon: {
    marginLeft: 10,
  },
  deleteText: {
    color: '#E10600',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
  description: {
    fontSize: 12,
    color: '#555',
    lineHeight: 18,
    textAlign: 'center',
    marginBottom: 15,
    marginTop: 5,
  },
  signOutButton: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#E10600',
    borderRadius: 5,
    paddingVertical: 12,
    alignItems: 'center',
  },
  signOutText: {
    color: '#E10600',
    fontWeight: 'bold',
  },
  fixedNavbar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});