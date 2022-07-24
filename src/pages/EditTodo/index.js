import {
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {Component} from 'react';
import {ButtonSpinner} from '../../components';
import {colors} from '../../utils';
import {Picker} from '@react-native-picker/picker';
import {StyleSheet} from 'react-native';
import SweetAlert from 'react-native-sweet-alert';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {editData} from '../../actions';

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nama: '',
      desc: '',
      ket: '',
      btnDone: false,
      level: [
        {id: 0, tittle: 'Silahkan Pilih Kategori', value: ''},
        {id: 1, tittle: 'easy', value: 'easy'},
        {id: 2, tittle: 'Medium', value: 'Medium'},
        {id: 3, tittle: 'hard', value: 'hard'},
      ],
    };
  }

  generateList = () => {
    const todoList = {
      nama: this.state.nama,
      id: this.props.route.params.IdList,
      description: this.state.desc,
      Kategori: this.state.ket,
    };
    this.setState({btnDone: true});
    this.props.editData(todoList);
    setTimeout(() => {
      console.log('ISI STATE', this.state.btnDone);
      SweetAlert.showAlertWithOptions(
        {
          tittle: 'Update ToDo',
          subTitle: 'Todo Berhasil Update',
          confirmButtonTitle: 'Next',
          style: 'success',
        },
        () => this.props.navigation.navigate('Todo'),
      );
    }, 5000);
  };
  setLevel = val => {
    this.setState({ket: val});
  };
  render() {
    console.log('ISI PROPS DI EDIT ', this.props);
    return (
      <ImageBackground
        source={require('../../assets/images/BgForm.jpg')}
        style={{flex: 1}}>
        <View style={{flexDirection: 'column', justifyContent: 'center'}}>
          <View style={styles.card}>
            <Text style={{alignSelf: 'flex-start', marginLeft: 17}}>
              Name :
            </Text>
            <TextInput
              style={{
                width: '90%',
                borderColor: '#BBB',
                borderWidth: 1,
                borderRadius: 20,
                marginBottom: 7,
              }}
              value={this.state.nama}
              onChangeText={nama => this.setState({nama})}
            />

            <Text style={{alignSelf: 'flex-start', marginLeft: 17}}>
              Description :
            </Text>

            <TextInput
              style={{
                width: '90%',
                borderRadius: 20,
                borderColor: '#BBB',
                borderWidth: 1,
                flex: 1,
              }}
              value={this.state.desc}
              onChangeText={desc => this.setState({desc})}
            />
            <View
              style={{
                borderColor: '#BBB',
                borderWidth: 1,
                borderRadius: 20,
                width: '90%',
                marginTop: 10,
                justifyContent: 'center',
                alignSelf: 'center',
              }}>
              <Picker
                selectedValue={this.state.ket}
                onValueChange={(itemValue, itemIndex) =>
                  this.setLevel(itemValue)
                }>
                {this.state.level.map(val => {
                  return <Picker.Item label={val.tittle} value={val.value} />;
                })}
              </Picker>
            </View>
          </View>
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          {this.state.btnDone ? (
            <ButtonSpinner />
          ) : (
            <TouchableOpacity
              onPress={() => this.generateList()}
              style={{
                backgroundColor: '#76BA99',
                width: 100,
                height: 30,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
              }}>
              <Text style={{fontWeight: 'bold', color: colors.white}}>
                Done
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ImageBackground>
    );
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      editData,
    },
    dispatch,
  );
}
export default connect(null, mapDispatchToProps)(index);
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    borderLeftColor: '#76BA99',
    borderLeftWidth: 10,
    borderRadius: 20,
    height: '80%',
    paddingVertical: 10,
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,

    elevation: 13,
  },
});
