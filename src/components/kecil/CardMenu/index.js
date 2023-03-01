import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {IconArrowRight} from '../../../assets';
import {clearStorage, colors, fonts, responsiveHeight} from '../../../utils';
import FIREBASE from '../../../config/FIREBASE'

const CardMenu = ({menu, navigation}) => {

  const onSubmit = () => {
    if(menu.halaman === "Login") {
      FIREBASE.auth().signOut().then(function() {
        // Sign-out successful.

        clearStorage();
        navigation.replace('Login');

      }).catch(function(error) {
        // An error happened.
        alert(error)
      });
    }else {
      navigation.navigate(menu.halaman)
    }
  }

  return (
    <TouchableOpacity style={styles.container} onPress={() => onSubmit()}>
      <View style={styles.menu}>
        {menu.gambar}
        <Text style={styles.text}>{menu.nama}</Text>
      </View>
      <IconArrowRight />
    </TouchableOpacity>
  );
};

export default CardMenu;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    marginHorizontal: 30,
    padding: responsiveHeight(15),
    borderRadius: 10,
    alignItems: 'center'
  },
  text: {
    fontSize: 18,
    fontFamily: fonts.primary.bold,
    marginLeft: 20
  },
  menu: {
      flexDirection: 'row',
      alignItems: 'center'
  }
});
