import {
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {Component} from 'react';
import {colors, fonts} from '../../utils';
import {connect} from 'react-redux';
import {IconAddWhite} from '../../assets';
import SearchInput, {createFilter} from 'react-native-search-filter';
import SweetAlert from 'react-native-sweet-alert';
import {ItemList} from '../../components';
import {GetCuaca} from '../../actions';
import {bindActionCreators} from 'redux';

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedId: '',
      searchTerm: '',
      listTodoArr: [],
      dummy: [
        {complated: false, description: '', id: 9, nama: ''},
        {
          Kategori: 'hard',
          complated: false,
          description: '123',
          id: 0,
          nama: 'buy milk',
        },
        {
          Kategori: 'easy',
          complated: false,
          description: '123',
          id: 1,
          nama: 'buy',
        },
        {
          Kategori: 'hard',
          complated: true,
          description: 's',
          id: 2,
          nama: 's',
        },
      ],
    };
  }

  DeleteTodo = id => {
    SweetAlert.showAlertWithOptions(
      {
        tittle: 'Deleted ToDo',
        subTitle: 'Todo Berhasil Terhapus',
        confirmButtonTitle: 'Yes',
        style: 'success',
      },
      () => {
        const newTodo = this.state.listTodoArr.filter(item => item.id !== id);
        this.setState({listTodoArr: newTodo});
      },
    );
  };
  CompletedTodo = id => {
    const objectBaru = this.state.listTodoArr.findIndex(obj => obj.id == id);
    const updateObj = {...this.state.listTodoArr[objectBaru], complated: true};
    const updatedProjects = [
      ...this.state.listTodoArr.slice(0, objectBaru),
      updateObj,
      ...this.state.listTodoArr.slice(objectBaru + 1),
    ];
    this.setState({listTodoArr: updatedProjects});
  };
  GenerateEdit = item => {
    const objectEditBaru = this.state.listTodoArr.findIndex(
      obj => obj.id == item.id,
    );
    const updateEditObj = {
      ...this.state.listTodoArr[objectEditBaru],
      nama: item.nama,
      description: item.description,
    };
    const updatedProjects = [
      ...this.state.listTodoArr.slice(0, objectEditBaru),
      updateEditObj,
      ...this.state.listTodoArr.slice(objectEditBaru + 1),
    ];
    this.setState({listTodoArr: updatedProjects});
  };

  editTodo = id => {
    this.setState({selectedId: id});
    this.props.navigation.navigate('EditTodo', {IdList: id});
  };
  renderItem = ({item}) => {
    const backgroundColor = item.id === this.state.selectedId ? '#BBB' : '#FFF';
    const color = item.id === this.state.selectedId ? 'white' : 'black';

    return (
      <ItemList
        item={item}
        onPress={() => this.editTodo(item.id)}
        backgroundColor={{backgroundColor}}
        textColor={{color}}
        ActionDelet={this.DeleteTodo}
        ActionDone={this.CompletedTodo}
      />
    );
  };
  componentDidMount() {
    this.props.GetCuaca();
  }
  componentDidUpdate(prevProps) {
    const {todos, edit} = this.props;
    if (todos && prevProps.todos !== todos) {
      this.setState({listTodoArr: todos});
    }
    if (edit && prevProps.edit !== edit) {
      this.GenerateEdit(edit);
    }
  }
  searchUpdated = term => {
    this.setState({searchTerm: term});
  };
  render() {
    const filterData = this.state.listTodoArr.filter(
      createFilter(this.state.searchTerm, ['nama', 'Kategori', 'id']),
    );
    return (
      <ImageBackground
        source={require('../../assets/images/bgList.jpg')}
        style={{flex: 1}}>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: colors.secondary,
            justifyContent: 'space-around',
            width: '100%',
            height: '8%',
          }}>
          <View
            style={{
              justifyContent: 'flex-end',
              flexDirection: 'row',
              flex: 1,
              alignItems: 'center',
            }}>
            <Text
              style={{
                marginRight: -10,
                zIndex: 2,
                fontSize: 20,
                fontWeight: 'bold',
              }}>
              Today's tasks
            </Text>
          </View>
          <View
            style={{
              backgroundColor: colors.secondary,
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              flex: 1,
              marginTop: 17,
            }}></View>
        </View>
        <SearchInput
          onChangeText={term => {
            this.searchUpdated(term);
          }}
          placheHolder="Searching"
          placeholderTextColor={colors.primary}
          style={{
            backgroundColor: colors.white,
            paddingHorizontal: 5,
            borderRadius: 10,
            width: '95%',
            alignSelf: 'center',
          }}
        />
        {this.props.wheaterData ? (
          this.props.wheaterData.weather.map(item => {
            return (
              <Text
                style={
                  styles.Txt
                }>{`Cuaca ${this.props.wheaterData.name} Saat ini : ${item.description}  `}</Text>
            );
          })
        ) : (
          <Text>Fetching Problem</Text>
        )}
        <FlatList
          data={filterData.length > 0 ? filterData : this.state.listTodoArr}
          renderItem={this.renderItem}
          keyExtractor={item => item.id}
          extraData={this.state.selectedId}
        />
        <View
          style={{
            width: '100%',
            justifyContent: 'center',
            alignItems: 'flex-end',
            padding: 20,
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: colors.primary,
              borderRadius: 30,
              width: 50,
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => this.props.navigation.navigate('FormAdd')}>
            <IconAddWhite />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}
function mapStateToProps(state) {
  return {
    todos: state.TodoReducer.todos,
    edit: state.TodoReducer.editData,
    wheaterData: state.TodoReducer.getWheaterData,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      GetCuaca,
    },
    dispatch,
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(Todo);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 20,
    shadowColor: '#000',
    borderLeftColor: '#ABC9FF',
    borderLeftWidth: 8,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,

    elevation: 13,
  },
  title: {
    fontSize: 32,
  },
  Txt: {
    fontSize: 16,
    fontFamily: fonts.primary.bold,
    paddingHorizontal: 15,
  },
});
