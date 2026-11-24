import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { CustomAlert } from '../components/CustomAlert';
import { colors } from '../theme/colors';
import { Perfil, TipoUsuario } from '../types/database';
import { Image } from 'expo-image';