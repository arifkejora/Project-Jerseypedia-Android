import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors, fonts, responsiveHeight} from '../../../utils';
import { Picker } from '@react-native-picker/picker';

const Pilihan = ({label, datas, width, height, fontSize, selectedValue, onValueChange}) => {
 
  return (
    <View style={styles.container}>
      <Text style={styles.label(fontSize)}>{label} :</Text>
      <View style={styles.wrapperPicker}>
        <Picker
          selectedValue={selectedValue}
          style={styles.picker(width, height, fontSize)}
          onValueChange={onValueChange}>
          <Picker.Item label="--Pilih--" value="" />
          {datas.map((item, index) => {
            
              if(label == "Provinsi") {

                return <Picker.Item label={item.province} value={item.province_id} key={item.province_id} />
              }else if(label == "Kota/Kab"){
                
                return <Picker.Item label={item.type+" "+item.city_name} value={item.city_id} key={item.city_id} />
              }else if(label == "Pilih Ekspedisi") {
                return <Picker.Item label={item.label} value={item} key={item.id} />
              }else {
                
                return <Picker.Item label={item} value={item} key={index} />
              }
              
          })}
        </Picker>
      </View>
    </View>
  );
};

export default Pilihan;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  label: (fontSize) => ({
    fontSize: fontSize ? fontSize : 18,
    fontFamily: fonts.primary.regular,
  }),
  picker: (width, height, fontSize) => ({
    fontSize: fontSize ? fontSize : 18,
    fontFamily: fonts.primary.regular,
    width: width,
    height: height ? height : responsiveHeight(46),
    marginTop: -10,
    marginBottom: 10
  }),
  wrapperPicker: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.border,
  }
});
