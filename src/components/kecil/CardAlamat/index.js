import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors, fonts} from '../../../utils';

const CardAlamat = ({alamat, provinsi, kota, navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Alamat Saya :</Text>
      <Text style={styles.alamat}>{alamat} </Text>
      <Text style={styles.alamat}>{kota}</Text>
      <Text style={styles.alamat}>Provinsi {provinsi}</Text>
      <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
        <Text style={styles.ubahAlamat}>Ubah Alamat</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CardAlamat;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  title: {
    fontFamily: fonts.primary.bold,
    fontSize: 14,
    marginBottom: 5,
  },
  alamat: {
    fontFamily: fonts.primary.regular,
    fontSize: 14,
  },
  ubahAlamat: {
    fontFamily: fonts.primary.bold,
    fontSize: 14,
    color: colors.primary,
    textAlign: 'right'
  },
});
