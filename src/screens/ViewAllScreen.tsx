import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {mealData} from '../constants';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {HomeStackParamsList} from './HomeScreen';

type viewAllNaviagtionProps = NativeStackScreenProps<
  HomeStackParamsList,
  'ViewAll'
>;

const ViewAllScreen: React.FC<viewAllNaviagtionProps> = ({
  navigation,
  route,
}) => {
  let {filterData} = route.params;
  if (!filterData || filterData.length < 0) {
    return (
      <View
        style={{
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator size={120} color="#112939" />
      </View>
    );
  } else if (filterData.length === 0) {
    return (
      <View
        style={{
          height: '100%',
          borderRadius: 8,
          marginVertical: 5,
          justifyContent: 'center',
          alignItems: 'center',
          rowGap: 20,
        }}>
        <Pressable
          style={{position: 'absolute', top: 20, left: 20}}
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon name="arrow-back" size={25} color="#112939" />
        </Pressable>
        <Text style={{fontSize: 60, color: 'gray', fontWeight: '600'}}>
          (╯︵╰,)
        </Text>
        <Text style={{marginHorizontal: 10, fontSize: 40, color: 'gray'}}>
          0 results found
        </Text>
      </View>
    );
  }
  return (
    <View style={{backgroundColor: 'white', height: '100%'}}>
      <View style={{paddingHorizontal: 15, paddingVertical: 20}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            columnGap: 15,
          }}>
          <Pressable
            onPress={() => {
              navigation.goBack();
            }}>
            <Icon name="arrow-back" size={25} color="#112939" />
          </Pressable>
          <Text style={{color: '#112939', fontSize: 17, fontWeight: '500'}}>
            Satisfy your cravings
          </Text>
        </View>
        <View style={{paddingTop: 20}}>
          <FlatList
            showsVerticalScrollIndicator={false}
            numColumns={2}
            horizontal={false}
            columnWrapperStyle={{
              columnGap: 15,
              justifyContent: 'space-between',
              width: '90%',
            }}
            contentContainerStyle={{
              paddingVertical: 10,
              paddingBottom: 80,
              columnGap: 20,
              rowGap: 20,
              justifyContent: 'space-between',
              alignItems: 'flex-start',
            }}
            data={filterData}
            keyExtractor={item => item.idCategory}
            renderItem={({item, index}) => (
              <TouchableOpacity>
                <View
                  style={{
                    height: 230,
                    width: 170,
                    position: 'relative',
                    backgroundColor: '#000000',
                    borderRadius: 8,
                  }}
                  key={index}>
                  <View
                    style={{
                      flex: 1,
                      position: 'absolute',
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      top: 8,
                      width: '100%',
                      zIndex: 10,
                      paddingHorizontal: 5,
                    }}>
                    <TouchableOpacity>
                      <Icon
                        name="bookmark-outline"
                        size={20}
                        color="#000"
                        style={styles.itemIconBg}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Icon
                        name="heart"
                        size={20}
                        color="#000000"
                        style={styles.itemIconBg}
                      />
                    </TouchableOpacity>
                  </View>
                  <Image
                    style={{
                      height: '100%',
                      width: '100%',
                      borderRadius: 8,
                      resizeMode: 'cover',
                      opacity: 0.7,
                    }}
                    source={{uri: item.strCategoryThumb}}
                  />
                  <View
                    style={{
                      position: 'absolute',
                      zIndex: 10,
                      bottom: 10,
                      paddingHorizontal: 5,
                      elevation: 10,
                    }}>
                    <Text
                      style={{
                        fontSize: 18,
                        color: '#fff',
                        elevation: 10,
                        lineHeight: 23,
                      }}>
                      {item.strName}
                    </Text>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={styles.categoryAndAllText}>
                        {item.strCategory}
                      </Text>
                      <Text
                        style={[
                          styles.categoryAndAllText,
                          {
                            borderRightWidth: 1,
                            borderLeftWidth: 1,
                            borderColor: '#fff',
                          },
                        ]}>
                        {item.strArea}
                      </Text>
                      <Text style={styles.categoryAndAllText}>
                        {item.strType}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </View>
  );
};

export default ViewAllScreen;

const styles = StyleSheet.create({
  greetingText: {
    fontSize: 20,
    color: '#112939',
    fontWeight: '600',
    fontFamily: 'Inter',
  },

  cravingText: {fontSize: 18, color: '#112939'},
  itemIconBg: {
    backgroundColor: '#fff',
    paddingVertical: 7,
    paddingHorizontal: 7,
    borderRadius: 99,
    elevation: 5,
  },
  categoryAndAllText: {
    fontSize: 10,
    color: '#fff',
    paddingHorizontal: 3,
    lineHeight: 12,
  },
});
