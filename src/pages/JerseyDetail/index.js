import React, {Component} from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import {
  colors,
  fonts,
  numberWithCommas,
  responsiveHeight,
  heightMobileUI,
  responsiveWidth,
  getData,
} from '../../utils';
import {
  CardLiga,
  Inputan,
  Jarak,
  JerseySlider,
  Pilihan,
  Tombol,
} from '../../components';
import {RFValue} from 'react-native-responsive-fontsize';
import {connect} from 'react-redux';
import {getDetailLiga} from '../../actions/LigaAction';
import {masukKeranjang} from '../../actions/KeranjangAction'

class JerseyDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      jersey: this.props.route.params.jersey,
      images: this.props.route.params.jersey.gambar,
      jumlah: '',
      ukuran: '',
      keterangan: '',
      uid: '',
    };
  }

  componentDidMount() {
    const {jersey} = this.state;
    this.props.dispatch(getDetailLiga(jersey.liga));
  }

  componentDidUpdate(prevProps) {
    const { saveKeranjangResult } = this.props

    if(saveKeranjangResult && prevProps.saveKeranjangResult !== saveKeranjangResult) {
      this.props.navigation.navigate("Keranjang")
    }

  }

  masukKeranjang = () => {
    const {jumlah, keterangan, ukuran} = this.state;
    getData('user').then((res) => {
      if(res) {

        //ambil user uid simpan di state
        this.setState({
          uid: res.uid
        })

        //validasi form
        if(jumlah && ukuran && keterangan) {

          //dispatch ke action masukKeranjang
          this.props.dispatch(masukKeranjang(this.state));

        }else {
          Alert.alert('Error', 'Jumlah, Ukuran & Keterangan harus diisi');
        }


      }else {
        Alert.alert('Info', 'Silahkan Login Terlebih Dahulu');
        this.props.navigation.replace('Login')
      }
    })
  }

  render() {
    const {navigation, getDetailLigaResult, saveKeranjangLoading} = this.props;
    const {jersey, images, jumlah, keterangan, ukuran} = this.state;
    return (
      <View style={styles.page}>
        <View style={styles.button}>
          <Tombol
            icon="arrow-left"
            padding={7}
            onPress={() => navigation.goBack()}
          />
        </View>
        <JerseySlider images={images} />
        <View style={styles.container}>
          <View style={styles.liga}>
            <CardLiga
              liga={getDetailLigaResult}
              navigation={navigation}
              id={jersey.liga}
            />
          </View>
          <View style={styles.desc}>
            <Text style={styles.nama}>{jersey.nama}</Text>
            <Text style={styles.harga}>
              Harga : Rp. {numberWithCommas(jersey.harga)}
            </Text>

            <View style={styles.garis} />

            <View style={styles.wrapperJenisBerat}>
              <Text style={styles.jenisBerat}>Jenis : {jersey.jenis}</Text>
              <Text style={styles.jenisBerat}>Berat : {jersey.berat}</Text>
            </View>

            <View style={styles.wrapperInput}>
              <Inputan
                label="Jumlah"
                width={responsiveWidth(166)}
                height={responsiveHeight(43)}
                fontSize={13}
                value={jumlah}
                onChangeText={(jumlah) => this.setState({jumlah})}
                keyboardType="number-pad"
              />
              <Pilihan
                label="Pilih Ukuran"
                width={responsiveWidth(166)}
                height={responsiveHeight(43)}
                fontSize={13}
                datas={jersey.ukuran}
                onValueChange={(ukuran) => this.setState({ukuran})}
                selectedValue={ukuran}
              />
            </View>
            <Inputan
              label="Keterangan"
              textarea
              fontSize={13}
              placeholder="Isi jika ingin menambahkan Name Tag (nama & nomor punggung"
              value={keterangan}
              onChangeText={(keterangan) => this.setState({keterangan})}
            />
            <Jarak height={15} />
            <Tombol
              title="Masuk Keranjang"
              type="textIcon"
              icon="keranjang-putih"
              padding={responsiveHeight(17)}
              fontSize={18}
              onPress={() => this.masukKeranjang()}
              loading={saveKeranjangLoading}
            />
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  getDetailLigaResult: state.LigaReducer.getDetailLigaResult,

  saveKeranjangLoading: state.KeranjangReducer.saveKeranjangLoading,
  saveKeranjangResult: state.KeranjangReducer.saveKeranjangResult,
  saveKeranjangError: state.KeranjangReducer.saveKeranjangError,
});

export default connect(mapStateToProps, null)(JerseyDetail);

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  container: {
    position: 'absolute',
    bottom: 0,
    height: responsiveHeight(465),
    width: '100%',
    backgroundColor: colors.white,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  button: {
    position: 'absolute',
    marginTop: 30,
    marginLeft: 30,
    zIndex: 1,
  },
  desc: {
    marginHorizontal: 30,
  },
  nama: {
    fontSize: RFValue(24, heightMobileUI),
    fontFamily: fonts.primary.bold,
    textTransform: 'capitalize',
  },
  harga: {
    fontSize: RFValue(24, heightMobileUI),
    fontFamily: fonts.primary.light,
  },
  liga: {
    alignItems: 'flex-end',
    marginRight: 30,
    marginTop: -30,
  },
  garis: {
    borderWidth: 0.5,
    marginVertical: 5,
  },
  wrapperJenisBerat: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  jenisBerat: {
    fontSize: 13,
    fontFamily: fonts.primary.regular,
    marginRight: 30,
  },
  wrapperInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
