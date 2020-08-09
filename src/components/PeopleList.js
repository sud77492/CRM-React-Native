import React, {Component} from 'react';
import {View, StyleSheet, FlatList, Text} from 'react-native';
import {connect} from 'react-redux';
import PeopleItem from './PeopleItem';
import PeopleDetail from './PeopleDetail';
import {loadInitialContacts} from '../actions';
import Icon from 'react-native-vector-icons/EvilIcons';

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

class PeopleList extends Component {
  static navigationOptions = {
    tabBarIcon: ({tintcolor}) => (
      <Icon name={'user'} size={50} color={tintcolor} />
    ),
  };

  componentWillMount() {
    this.props.loadInitialContacts();
  }

  renderInitialView() {
    if (this.props.detailView === true) {
      return <PeopleDetail />;
    } else {
      return (
        <FlatList
          data={this.props.people}
          renderItem={({item}) => <PeopleItem people={item} />}
          keyExtractor={(item, index) => index.toString()}
        />
      );
    }
  }
  render() {
    return <View style={styles.container}>{this.renderInitialView()}</View>;
  }
}

const mapStateToProps = (state) => {
  return {
    people: state.people,
    detailView: state.detailView,
  };
};

export default connect(mapStateToProps, {loadInitialContacts})(PeopleList);

/*import React, {Component} from 'react';
import {FlatList, Text, StyleSheet, View} from 'react-native';

const rows = [
  {id: 0, text: 'View'},
  {id: 1, text: 'Text'},
  {id: 2, text: 'Image'},
  {id: 3, text: 'ScrollView'},
  {id: 4, text: 'ListView'},
];

const extractKey = ({id}) => id;

export default class PeopleList extends Component {
  renderItem = ({item}) => {
    return <Text style={styles.row}>{item.text}</Text>;
  };

  render() {
    return (
      <FlatList
        style={styles.container}
        data={rows}
        renderItem={this.renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    padding: 15,
    marginBottom: 5,
    backgroundColor: 'skyblue',
  },
});*/
