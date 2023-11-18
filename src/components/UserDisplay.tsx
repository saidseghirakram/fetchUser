import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { RootState } from '../store';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../slices/userSlice';
import { fetchRandomUser } from '../services/api';
import { User } from '../types';

const UserDisplay: React.FC = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const previousUsers = useSelector((state: RootState) => state.user.previousUsers);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const fetchNewUser = async () => {
    try {
      const randomUser = await fetchRandomUser();
      dispatch(setUser(randomUser));
      setCurrentIndex(previousUsers.length);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const displayPreviousUser = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex); // Update the index first
      dispatch(setUser(previousUsers[newIndex])); // Use the updated index
    } else {
      console.log('No previous user available');
    }
  };

  return (
    <View>
      {currentUser ? (
        <View>
          <View
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 20,
              marginBottom: 40,
            }}
          >
            <Image
              source={{ uri: currentUser.avatar }}
              style={{
                width: 200,
                height: 200,
                borderWidth: 5,
              }}
            />
          </View>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: 'black',
              margin: 10,
            }}
          >
            Name : {currentUser.first_name}
          </Text>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: 'black',
              margin: 10,
            }}
          >
            Email : {currentUser.email}
          </Text>

          <View style={{ width: '100%' }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: 'black',
                margin: 10,
              }}
            >
              Credit Card :
            </Text>
            <Image
              source={require('../../assets/card.png')}
              resizeMode="cover"
              style={{
                width: '90%',
                height: 200,
                margin: 10,
                borderRadius: 10,
              }}
            />
            <Text
              style={{
                fontSize: 20,
                letterSpacing: 2,
                color: 'white',
                fontFamily: 'monospace',
                margin: 10,
                position: 'absolute',
                top: 130,
                left: 10,
              }}
            >
              {currentUser.credit_card.cc_number}
            </Text>
          </View>
        </View>
      ) : (
        <Text style={{ fontSize: 30, margin: 30, fontWeight: 'bold' }}>
          No user fetched
        </Text>
      )}

      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-evenly',
          marginTop: 30,
        }}
      >
        

        <TouchableOpacity
          onPress={displayPreviousUser}
          disabled={currentIndex === 0}
          style={{
            height: 50,
            width: '40%',
            backgroundColor: currentIndex === 0 ? 'gray' : 'blue',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
          }}
        >
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={fetchNewUser}
          style={{
            height: 50,
            width: '40%',
            backgroundColor: 'blue',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
          }}
        >
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Fetch</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserDisplay;
