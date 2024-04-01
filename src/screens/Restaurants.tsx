import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  Modal,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {mealData, mealDataType} from '../constants';
import {HomeStackParamsList} from './HomeScreen';
type restaurantsScreenProps = NativeStackScreenProps<
  HomeStackParamsList,
  'Main'
>;

const Restaurants = ({navigation}: restaurantsScreenProps) => {
  let width = Dimensions.get('screen').width;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dietFilterArr, fillDietFilterArr] = useState<string[]>([]);
  const [cuisinesFilterArr, fillCuisinesFilterArr] = useState<string[]>([]);
  const [proteinsFilterArr, fillProtiensFilterArr] = useState<string[]>([]);
  const [filteredResultsArr, setFilteredResultsArr] =
    useState<mealDataType[]>(mealData);

  let dietArr = ['Vegetarian', 'Non-Vegetarian', 'Vegan'];
  let cuisinesArr = ['Indian', 'Medeterranenian'];
  let proteinsArr = ['Chicken', 'Beef'];

  const filterResults = () => {
    setFilteredResultsArr([]);
    let filteredMealData = [];
    filteredMealData.push(
      mealData.filter(item => {
        const dietCondition =
          dietFilterArr.length === 0 ||
          dietFilterArr.includes(item.strCategory);
        const cuisinesCondition =
          cuisinesFilterArr.length === 0 ||
          cuisinesFilterArr.includes(item.strArea);
        const proteinsCondition =
          proteinsFilterArr.length === 0 ||
          proteinsFilterArr.includes(item.strType);

        if (dietCondition && cuisinesCondition && proteinsCondition) {
          return item;
        }
      }),
    );

    filteredMealData.map(item => {
      item.map(item2 => {
        setFilteredResultsArr(prev => [...prev, item2]);
      });
    });
  };

  if (!filteredResultsArr || filteredResultsArr.length < 0) {
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
  }

  return (
    <View style={{flex: 1, paddingTop: 40, backgroundColor: '#FAF9F6'}}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
      <View>
        <View style={{paddingHorizontal: 20}}>
          <View style={{padding: 4}}>
            <Text style={styles.greetingText}>Good Morning</Text>
            <Text style={styles.greetingText}>Mr. Raman !</Text>
          </View>
          <View style={[styles.textInputContainer, shadowStyle]}>
            <TouchableOpacity
              style={{
                position: 'absolute',
                left: 10,
                zIndex: 10,
              }}>
              <Icon2 name="search" size={25} color="#112939" />
            </TouchableOpacity>
            <TextInput style={styles.textInput} />
            <TouchableOpacity
              onPress={() => {
                setIsModalVisible(true);
              }}
              style={{position: 'absolute', right: 10}}>
              <Icon name="tune" size={25} color={'#112939'} />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            width: '100%',
            paddingLeft: 20,
            top: 80,
          }}>
          <View
            style={{
              backgroundColor: 'white',
              borderRadius: 15,
              paddingHorizontal: 10,
              paddingLeft: 20,
              paddingVertical: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View>
                <Text style={styles.cravingText}>Satisfy your cravings</Text>
                <Text style={[styles.cravingText, {fontSize: 12}]}>
                  Restaurants that suits to your palate
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  navigation.push('ViewAll', {filterData: filteredResultsArr});
                }}>
                <Text style={{color: '#112939', fontSize: 15}}>View All</Text>
              </TouchableOpacity>
            </View>
            {filteredResultsArr.length > 0 ? (
              <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal
                contentContainerStyle={{columnGap: 10, paddingTop: 15}}
                data={filteredResultsArr}
                keyExtractor={item =>
                  String(Math.random() * 10) + item.idCategory
                }
                renderItem={({item, index}) => (
                  <TouchableOpacity key={index}>
                    <View
                      style={{
                        height: 210,
                        width: 150,
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
                          top: 5,
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
                          <Icon2
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
            ) : (
              <View
                style={{
                  height: 210,
                  borderRadius: 8,
                  marginVertical: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: 20, color: 'gray'}}>
                  (╯︵╰,){' '}
                  <Text style={{marginHorizontal: 10}}>0 results found</Text>
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>
      <Modal visible={isModalVisible} animationType="fade" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View
              style={{
                borderBottomWidth: 2,
                paddingHorizontal: 20,
                paddingTop: 30,
                paddingBottom: 8,
                borderBottomColor: '#F8F8F8',
              }}>
              <Text style={{color: '#112939', fontSize: 25}}>Filters</Text>
            </View>
            <View
              style={{
                paddingVertical: 40,
                paddingHorizontal: 20,
                height: '75%',
                justifyContent: 'space-between',
              }}>
              <View style={{rowGap: 20, height: '40%'}}>
                <View style={{rowGap: 8}}>
                  <Text style={{color: '#112939', fontSize: 18}}>Diet</Text>
                  <View
                    style={{flexDirection: 'row', rowGap: 10, columnGap: 5}}>
                    {dietArr.map((item, idx) => (
                      <TouchableOpacity
                        key={idx}
                        onPress={() => {
                          if (!dietFilterArr.includes(item))
                            fillDietFilterArr(prev => [...prev, item]);
                          else
                            fillDietFilterArr(
                              dietFilterArr.filter(i => i !== item),
                            );
                        }}>
                        <Text
                          style={{
                            color: dietFilterArr.includes(item)
                              ? '#fff'
                              : '#112939',
                            paddingVertical: 5,
                            paddingHorizontal: 9,
                            borderColor: '#112939',
                            backgroundColor: dietFilterArr.includes(item)
                              ? '#112939'
                              : 'transparent',
                            borderWidth: 1,
                            borderRadius: 99,
                            fontSize: 12,
                          }}>
                          {item}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
                <View style={{rowGap: 8}}>
                  <Text style={{color: '#112939', fontSize: 18}}>Cuisines</Text>
                  <View
                    style={{flexDirection: 'row', rowGap: 10, columnGap: 8}}>
                    {cuisinesArr.map((item, idx) => (
                      <TouchableOpacity
                        key={idx}
                        onPress={() => {
                          if (!cuisinesFilterArr.includes(item))
                            fillCuisinesFilterArr(prev => [...prev, item]);
                          else
                            fillCuisinesFilterArr(
                              cuisinesFilterArr.filter(i => i !== item),
                            );
                        }}>
                        <Text
                          style={{
                            color: cuisinesFilterArr.includes(item)
                              ? '#fff'
                              : '#112939',
                            paddingVertical: 5,
                            paddingHorizontal: 9,
                            borderColor: '#112939',
                            backgroundColor: cuisinesFilterArr.includes(item)
                              ? '#112939'
                              : 'transparent',
                            borderWidth: 1,
                            borderRadius: 99,
                            fontSize: 12,
                          }}>
                          {item}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </View>
              <View style={{height: '40%'}}>
                <View style={{rowGap: 8}}>
                  <Text style={{color: '#112939', fontSize: 18}}>Proteins</Text>
                  <View
                    style={{flexDirection: 'row', rowGap: 10, columnGap: 8}}>
                    {proteinsArr.map((item, idx) => (
                      <TouchableOpacity
                        key={idx}
                        onPress={() => {
                          if (!proteinsFilterArr.includes(item))
                            fillProtiensFilterArr(prev => [...prev, item]);
                          else
                            fillProtiensFilterArr(
                              proteinsFilterArr.filter(i => i !== item),
                            );
                        }}>
                        <Text
                          style={{
                            color: proteinsFilterArr.includes(item)
                              ? '#fff'
                              : '#112939',
                            paddingVertical: 5,
                            paddingHorizontal: 9,
                            borderColor: '#112939',
                            backgroundColor: proteinsFilterArr.includes(item)
                              ? '#112939'
                              : 'transparent',
                            borderWidth: 1,
                            borderRadius: 99,
                            fontSize: 12,
                          }}>
                          {item}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </View>
            </View>
            <View
              style={{
                paddingHorizontal: 20,
                paddingVertical: 20,
                borderTopColor: '#112939',
                borderTopWidth: 1,
                flexDirection: 'row',
                columnGap: 10,
                justifyContent: 'space-around',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() => {
                  setIsModalVisible(false);
                  fillDietFilterArr([]);
                  fillCuisinesFilterArr([]);
                  fillProtiensFilterArr([]);
                }}>
                <Text
                  style={{color: '#112939', fontSize: 20, fontWeight: '500'}}>
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  filterResults();
                  setIsModalVisible(false);
                }}>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 17,
                    fontWeight: '500',
                    backgroundColor: '#112939',
                    paddingHorizontal: 50,
                    paddingVertical: 10,
                    borderRadius: 10,
                  }}>
                  Apply filters
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {/* <View
        style={{
          position: 'absolute',
          paddingHorizontal: 20,
          paddingVertical: 20,
          width,
          height: '90%',
          zIndex: 50,
        }}>
        <View
          style={{
            backgroundColor: 'red',
            height: '100%',
            width: '100%',
            position: 'absolute',
            zIndex: 50,
          }}></View>
      </View> */}
    </View>
  );
};

export default Restaurants;

const shadowStyle = Platform.select({
  ios: {
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 8,
  },
  android: {
    elevation: 10,
  },
});

const styles = StyleSheet.create({
  greetingText: {
    fontSize: 20,
    color: '#112939',
    fontWeight: '600',
    fontFamily: 'Inter',
  },

  textInputContainer: {
    marginVertical: 15,
    flexDirection: 'row',
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 4,
    borderRadius: 5,
    alignItems: 'center',
    position: 'relative',
  },
  textInput: {
    height: 45,
    flex: 1,
    borderColor: '#112939',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingLeft: 40,
    backgroundColor: 'white',
    color: '#112939',
    paddingRight: 40,
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopEndRadius: 30,
    borderTopLeftRadius: 30,
    top: 50,
    height: '90%',
    width: '93%',
  },
});
