import React from 'react';
import {ScrollView, StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';
import {colors} from '../../../utils';
import {CardHistory} from '../../kecil';

const ListHistory = ({
  getListHistoryLoading,
  getListHistoryResult,
  navigation,
}) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        {getListHistoryResult ? (
          Object.keys(getListHistoryResult).map((key) => {
            return (
              <CardHistory
                pesanan={getListHistoryResult[key]}
                key={key}
                navigation={navigation}
                id={key}
              />
            );
          })
        ) : getListHistoryLoading ? (
          <View style={styles.loading}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        ) : (
          <Text>Data Kosong</Text>
        )}
      </View>
    </ScrollView>
  );
};

const mapStateToProps = (state) => ({
  getListHistoryLoading: state.HistoryReducer.getListHistoryLoading,
  getListHistoryResult: state.HistoryReducer.getListHistoryResult,
});

export default connect(mapStateToProps, null)(ListHistory);

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 30,
    marginTop: 30,
  },
  loading: {
    flex: 1,
    marginTop: 10,
    marginBottom: 50,
  },
});
