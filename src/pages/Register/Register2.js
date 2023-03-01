import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Alert,
} from 'react-native';
import {colors, fonts, responsiveWidth} from '../../utils';
import {IlustrasiRegister2} from '../../assets';
import {Inputan, Jarak, Pilihan, Tombol} from '../../components';
import {connect} from 'react-redux';
import {getProvinsiList, getKotaList} from '../../actions/RajaOngkirAction';
import { registerUser } from '../../actions/AuthAction'

class Register2 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      alamat: '',
      kota: false,
      provinsi: false,
    };
  }

  componentDidMount() {
    this.props.dispatch(getProvinsiList());
  }

  componentDidUpdate(prevProps) {
    const { registerResult } = this.props

    if(registerResult && prevProps.registerResult !== registerResult) {
      this.props.navigation.replace("MainApp")
    }

  }

  ubahProvinsi = (provinsi) => {
    this.setState({
      provinsi: provinsi,
    });

    this.props.dispatch(getKotaList(provinsi));
  };

  onContinue = () => {
    const {kota, provinsi, alamat} = this.state;

    if(kota && provinsi && alamat) {

      const data = {
        nama: this.props.route.params.nama,
        email: this.props.route.params.email,
        nohp: this.props.route.params.nohp,
        alamat: alamat,
        provinsi: provinsi,
        kota: kota,
        status: 'user'
      }

      //ke Auth Action
      this.props.dispatch(registerUser(data, this.props.route.params.password));

    }else {
      Alert.alert("Error", 'Alamat, Kota, dan Provinsi harus diisi')
    }

  }

  render() {
    const {kota, provinsi, alamat} = this.state;
    const {getProvinsiResult, getKotaResult, registerLoading} = this.props;

    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.page}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.btnBack}>
              <Tombol
                icon="arrow-left"
                onPress={() => this.props.navigation.goBack()}
              />
            </View>

            <View style={styles.ilustrasi}>
              <IlustrasiRegister2 />
              <Jarak height={5} />
              <Text style={styles.title}>Isi Alamat</Text>
              <Text style={styles.title}>Lengkap Anda</Text>

              <View style={styles.wrapperCircle}>
                <View style={styles.circleDisabled}></View>
                <Jarak width={10} />
                <View style={styles.circlePrimary}></View>
              </View>
            </View>

            <View style={styles.card}>
              <Inputan
                label="Alamat"
                textarea
                onChangeText={(alamat) => this.setState({alamat})}
                value={alamat}
              />

              <Pilihan
                label="Provinsi"
                datas={getProvinsiResult ? getProvinsiResult : []}
                selectedValue={provinsi}
                onValueChange={(provinsi) => this.ubahProvinsi(provinsi)}
              />
              <Pilihan
                label="Kota/Kab"
                datas={getKotaResult ? getKotaResult : []}
                selectedValue={kota}
                onValueChange={(kota) => this.setState({kota: kota})}
              />

              <Jarak height={25} />
              <Tombol
                title="Continue"
                type="textIcon"
                icon="submit"
                padding={10}
                fontSize={18}
                onPress={() => this.onContinue()}
                loading={registerLoading}
              />
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = (state) => ({
  getProvinsiResult: state.RajaOngkirReducer.getProvinsiResult,
  getKotaResult: state.RajaOngkirReducer.getKotaResult,

  registerLoading: state.AuthReducer.registerLoading,
  registerResult: state.AuthReducer.registerResult,
  registerError: state.AuthReducer.registerError,
});

export default connect(mapStateToProps, null)(Register2);

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: 20,
  },
  ilustrasi: {
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontFamily: fonts.primary.light,
    color: colors.primary,
  },
  wrapperCircle: {
    flexDirection: 'row',
    marginTop: 10,
  },
  circlePrimary: {
    backgroundColor: colors.primary,
    width: responsiveWidth(11),
    height: responsiveWidth(11),
    borderRadius: 10,
  },
  circleDisabled: {
    backgroundColor: colors.border,
    width: responsiveWidth(11),
    height: responsiveWidth(11),
    borderRadius: 10,
  },
  card: {
    backgroundColor: colors.white,
    marginHorizontal: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    paddingHorizontal: 30,
    paddingBottom: 20,
    paddingTop: 10,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  btnBack: {
    marginLeft: 30,
    position: 'absolute',
  },
});
