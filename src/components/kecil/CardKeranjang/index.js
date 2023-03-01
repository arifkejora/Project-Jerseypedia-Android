import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { connect } from 'react-redux';
import {IconHapus} from '../../../assets';
import {
  colors,
  fonts,
  numberWithCommas,
  responsiveHeight,
  responsiveWidth,
} from '../../../utils';
import Jarak from '../Jarak';
import { deleteKeranjang } from '../../../actions/KeranjangAction'

const CardKeranjang = ({keranjang, keranjangUtama, id, dispatch}) => {

  const hapusKeranjang = () => {
    dispatch(deleteKeranjang(id, keranjangUtama, keranjang))
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri : keranjang.product.gambar[0]}} style={styles.gambar} />

      <View style={styles.desc}>
        <Text style={styles.nama}>{keranjang.product.nama}</Text>
        <Text style={styles.text}>
          Rp. {numberWithCommas(keranjang.product.harga)}
        </Text>

        <Jarak height={responsiveHeight(14)}/>

        <Text style={styles.textBold}>Pesan : {keranjang.jumlahPesan}</Text>
        <Text style={styles.textBold}>Ukuran: {keranjang.ukuran}</Text>
        <Text style={styles.textBold}>
          Total Harga: Rp. {numberWithCommas(keranjang.totalHarga)}
        </Text>
        <Text style={styles.textBold}>Keterangan:</Text>
        <Text style={styles.textBold}>{keranjang.keterangan} </Text>
      </View>

      <TouchableOpacity style={styles.hapus} onPress={() => hapusKeranjang()}>
        <IconHapus />
      </TouchableOpacity>
    </View>
  );
};

export default connect()(CardKeranjang);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 15,
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
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  gambar: {
    width: responsiveWidth(77),
    height: responsiveHeight(88),
    resizeMode: 'contain',
  },
  hapus: {
    flex: 1,
    alignItems: 'flex-end',
  },
  nama: {
    fontFamily: fonts.primary.bold,
    fontSize: 13,
    textTransform: 'capitalize',
  },
  text: {
    fontFamily: fonts.primary.regular,
    fontSize: 11,
  },
  textBold: {
    fontFamily: fonts.primary.bold,
    fontSize: 11,
  },
});
