import React, {Component} from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import {colors, fonts, getData, responsiveHeight} from '../../../utils';
import {IconCari} from '../../../assets';
import {Jarak, Tombol} from '../../kecil';
import { connect } from 'react-redux';
import { saveKeywordJersey } from '../../../actions/JerseyAction';
import { getListKeranjang } from '../../../actions/KeranjangAction';

class HeaderComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
    };
  }

  componentDidMount() {
    getData('user').then((res) => {
      if (res) {
        this.props.dispatch(getListKeranjang(res.uid));
      } 
    });
  }

  selesaiCari = () => {
    const { page, navigation, dispatch } = this.props;
    const { search } = this.state;

    //jalankan action save keyword
    dispatch(saveKeywordJersey(search));

    //jika itu halaman home kita navigate ke listJersey
    if(page !== "ListJersey") {
      navigation.navigate("ListJersey");
    }


    //kembalikan state search itu ke string kosong
    this.setState({
      search: ''
    })



  }

  render() {
    const {search} = this.state;
    const {navigation, getListKeranjangResult} = this.props;

    let totalKeranjang;

    if(getListKeranjangResult) {
      totalKeranjang = Object.keys(getListKeranjangResult.pesanans).length;
    }

    return (
      <View style={styles.container}>
        <View style={styles.wrapperHeader}>
          {/* Input Pencarian  */}
          <View style={styles.searchSection}>
            <IconCari />
            <TextInput
              placeholder="Cari Jersey. . ."
              style={styles.input}
              value={search}
              onChangeText={(search) => this.setState({search})}
              onSubmitEditing={() => this.selesaiCari()}
            />
          </View>
          <Jarak width={10} />
          <Tombol
            icon="keranjang"
            padding={10}
            onPress={() => navigation.navigate('Keranjang')}
            totalKeranjang={totalKeranjang}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  getListKeranjangResult: state.KeranjangReducer.getListKeranjangResult,
})

export default connect(mapStateToProps, null)(HeaderComponent)

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    height: responsiveHeight(125),
  },
  wrapperHeader: {
    marginTop: 15,
    marginHorizontal: 30,
    flexDirection: 'row',
  },
  searchSection: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 5,
    paddingLeft: 10,
    alignItems: 'center',
  },
  input: {
    fontSize: 16,
    fontFamily: fonts.primary.regular,
  },
});
