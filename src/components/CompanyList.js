import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {connect} from 'react-redux';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/EvilIcons';
import * as actions from '../actions';
import CompanyItem from './CompanyItem';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 390,
    flexWrap: 'wrap',
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
});

class CompanyList extends Component {
  static navigationOptions = {
    tabBarIcon: ({tintcolor}) => (
      <Icon name={'archive'} size={50} color={tintcolor} />
    ),
  };
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.companies}
          renderItem={({item}) => <CompanyItem companies={item} />}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const people = state.people;

  const companies = _.chain(people)
    .groupBy('company')
    .map((value, key) => {
      return {
        company: key,
        names: value,
      };
    })
    .value();

  return {
    companies,
  };
};

export default connect(mapStateToProps)(CompanyList);
