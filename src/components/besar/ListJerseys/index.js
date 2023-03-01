import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {connect} from 'react-redux';
import {colors} from '../../../utils';
import {CardJersey} from '../../kecil';

const ListJerseys = ({
  getListJerseyLoading,
  getListJerseyResult,
  getListJerseyError,
  navigation,
}) => {
  return (
    <View style={styles.container}>
      {getListJerseyResult ? (
        Object.keys(getListJerseyResult).map((key) => {
          return (
            <CardJersey
              key={key}
              jersey={getListJerseyResult[key]}
              navigation={navigation}
            />
          );
        })
      ) : getListJerseyLoading ? (
        <View style={styles.loading}>
          <ActivityIndicator color={colors.primary} />
        </View>
      ) : getListJerseyError ? (
        <Text>{getListJerseyError}</Text>
      ) : (
        <Text>Data Kosong</Text>
      )}
    </View>
  );
};

const mapStateToProps = (state) => ({
  getListJerseyLoading: state.JerseyReducer.getListJerseyLoading,
  getListJerseyResult: state.JerseyReducer.getListJerseyResult,
  getListJerseyError: state.JerseyReducer.getListJerseyError,
});

export default connect(mapStateToProps, null)(ListJerseys);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  loading: {
    flex: 1,
    marginTop: 10,
    marginBottom: 30,
  },
});
