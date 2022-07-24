import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import React from 'react';
import {IconDone, IconTrash} from '../../../assets';
import {ColorCategory, colors, fonts} from '../../../utils';

const index = ({
  item,
  onPress,
  backgroundColor,
  textColor,
  ActionDelet,
  ActionDone,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
      <View
        style={{
          width: '30%',
          height: 20,
          backgroundColor: ColorCategory(item.Kategori),
          borderRadius: 20,
          marginTop: -20,
          justifyContent: 'center',
          alignItems: 'center',
          marginLeft: -20,
        }}>
        <Text style={{color: colors.white, fontWeight: 'bold'}}>
          {item.Kategori}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 5,
        }}>
        <View>
          {item.complated ? (
            <View
              style={{
                position: 'absolute',
                height: 80,
                width: 120,
                marginLeft: 100,
                marginTop: -10,
              }}>
              <Image
                style={{height: '100%', width: '100%'}}
                source={require('../../../assets/images/done2.png')}
              />
            </View>
          ) : null}

          <View style={{borderBottomColor: '#000', borderBottomWidth: 2}}>
            <Text style={[styles.title, textColor]}>{item.nama}</Text>
          </View>
          <View>
            <Text>{item.description}</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={() => ActionDelet(item.id)}>
            <IconTrash />
          </TouchableOpacity>
          <TouchableOpacity
            disabled={item.complated}
            onPress={() => ActionDone(item.id)}
            style={{
              backgroundColor: item.complated ? '#BBB' : colors.primary,
              height: 30,
              borderRadius: 20,
              marginLeft: 10,
            }}>
            <IconDone />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default index;

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
    fontSize: 23,
    fontFamily: fonts.primary.bold,
    paddingHorizontal: 15,
  },
});
