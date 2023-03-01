import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, Alert, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {colors, fonts, numberWithCommas, responsiveWidth} from '../../../utils';
import Jarak from '../Jarak';
import {updateStatus} from '../../../actions/HistoryAction';

class CardHistory extends Component {
  componentDidMount() {
    const {pesanan} = this.props;
    this.props.dispatch(updateStatus(pesanan.order_id));
  }

  masukMidtrans = () => {
    const {pesanan} = this.props;
    if (pesanan.status === 'lunas') {
      Alert.alert('Info', 'Pesanan Sudah Lunas');
    } else {
      this.props.navigation.navigate('Midtrans', {url: pesanan.url});
    }
  };

  render() {
    const {pesanan, updateStatusLoading} = this.props;
    const history = pesanan.pesanans;
    return (
      <TouchableOpacity style={styles.container} onPress={() => this.masukMidtrans()}>
        <Text style={styles.tanggal}>{pesanan.tanggal}</Text>
        {Object.keys(history).map((key, index) => {
          return (
            <View key={index} style={styles.history}>
              <Text style={styles.textBold}>{index + 1}.</Text>
              <Image
                source={{uri: history[key].product.gambar[0]}}
                style={styles.jersey}
              />
              <View style={styles.desc}>
                <Text style={styles.nama}>{history[key].product.nama}</Text>
                <Text style={styles.harga}>
                  Rp. {numberWithCommas(history[key].product.harga)}
                </Text>

                <Jarak height={10} />

                <Text style={styles.textBold}>
                  Pesan : {history[key].jumlahPesan}
                </Text>
                <Text style={styles.textBold}>
                  Total Harga : Rp. {numberWithCommas(history[key].totalHarga)}
                </Text>
              </View>
            </View>
          );
        })}

        <Jarak height={10} />

        <View style={styles.footer}>
          <View style={styles.label}>
            <Text style={styles.textBlue}>Status :</Text>
            <Text style={styles.textBlue}>
              Ongkir ({pesanan.estimasi} Hari) :
            </Text>
            <Text style={styles.textBlue}>Total Harga :</Text>
          </View>

          <View style={styles.label}>
            <Text style={styles.textBlue}>
              {updateStatusLoading ? 'Loading' : pesanan.status}
            </Text>
            <Text style={styles.textBlue}>
              Rp. {numberWithCommas(pesanan.ongkir)}
            </Text>
            <Text style={styles.textBlue}>
              Rp. {numberWithCommas(pesanan.totalHarga + pesanan.ongkir)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const mapStateToProps = (state) => ({
  updateStatusLoading: state.HistoryReducer.updateStatusLoading,
});

export default connect(mapStateToProps, null)(CardHistory);

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
    marginBottom: 20,
  },
  history: {
    flexDirection: 'row',
    marginTop: 10,
  },
  jersey: {
    width: responsiveWidth(66),
    height: responsiveWidth(66),
  },
  tanggal: {
    fontSize: 14,
    fontFamily: fonts.primary.bold,
  },
  textBold: {
    fontSize: 11,
    fontFamily: fonts.primary.bold,
  },
  desc: {
    marginLeft: responsiveWidth(7),
  },
  nama: {
    fontSize: 13,
    fontFamily: fonts.primary.bold,
    textTransform: 'capitalize',
  },
  harga: {
    fontSize: 12,
    fontFamily: fonts.primary.regular,
  },
  footer: {
    flexDirection: 'row',
  },
  label: {
    flex: 1,
  },
  textBlue: {
    fontSize: 14,
    fontFamily: fonts.primary.bold,
    color: colors.primary,
    textTransform: 'uppercase',
    textAlign: 'right',
  },
});
