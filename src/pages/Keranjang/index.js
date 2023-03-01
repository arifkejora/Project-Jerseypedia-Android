import React, {Component} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {dummyPesanans} from '../../data';
import {ListKeranjang, Tombol} from '../../components';
import {
  colors,
  fonts,
  getData,
  numberWithCommas,
  responsiveHeight,
} from '../../utils';
import {connect} from 'react-redux';
import {getListKeranjang} from '../../actions/KeranjangAction';

class Keranjang extends Component {
  componentDidMount() {
    getData('user').then((res) => {
      if (res) {
        //udah login
        this.props.dispatch(getListKeranjang(res.uid));
      } else {
        // belum login
        this.props.navigation.replace('Login');
      }
    });
  }

  componentDidUpdate(prevProps) {
    const {deleteKeranjangResult} = this.props;

    if (
      deleteKeranjangResult &&
      prevProps.deleteKeranjangResult !== deleteKeranjangResult
    ) {
      getData('user').then((res) => {
        if (res) {
          //udah login
          this.props.dispatch(getListKeranjang(res.uid));
        } else {
          // belum login
          this.props.navigation.replace('Login');
        }
      });
    }
  }

  render() {
    const {getListKeranjangResult} = this.props;
    return (
      <View style={styles.page}>
        <ListKeranjang {...this.props} />
        <View style={styles.footer}>
          {/* Total Harga  */}
          <View style={styles.totalHarga}>
            <Text style={styles.textBold}>Total Harga :</Text>
            <Text style={styles.textBold}>
              Rp.{' '}
              {getListKeranjangResult
                ? numberWithCommas(getListKeranjangResult.totalHarga)
                : 0}
            </Text>
          </View>

          {/* Tombol  */}
          {getListKeranjangResult ? (
            <Tombol
              title="Check Out"
              type="textIcon"
              fontSize={18}
              padding={responsiveHeight(15)}
              icon="keranjang-putih"
              onPress={() =>
                this.props.navigation.navigate('Checkout', {
                  totalHarga: getListKeranjangResult.totalHarga,
                  totalBerat: getListKeranjangResult.totalBerat,
                })
              }
            />
          ) : (
            <Tombol
              title="Check Out"
              type="textIcon"
              fontSize={18}
              padding={responsiveHeight(15)}
              icon="keranjang-putih"
              disabled={true}
            />
          )}
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  getListKeranjangLoading: state.KeranjangReducer.getListKeranjangLoading,
  getListKeranjangResult: state.KeranjangReducer.getListKeranjangResult,
  getListKeranjangError: state.KeranjangReducer.getListKeranjangError,

  deleteKeranjangLoading: state.KeranjangReducer.deleteKeranjangLoading,
  deleteKeranjangResult: state.KeranjangReducer.deleteKeranjangResult,
  deleteKeranjangError: state.KeranjangReducer.deleteKeranjangError,
});

export default connect(mapStateToProps, null)(Keranjang);

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white,
  },
  footer: {
    paddingHorizontal: 30,
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 6.84,
    elevation: 11,
    paddingBottom: 30,
  },
  totalHarga: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  textBold: {
    fontSize: 20,
    fontFamily: fonts.primary.bold,
  },
});
