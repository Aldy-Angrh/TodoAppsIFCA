import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {EditTodo, FormTodo,  Splash, Todo} from '../pages';


const Stack = createNativeStackNavigator();



const Router = () => {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Todo"
        component={Todo}
        options={{headerShown: false }}
      />
       <Stack.Screen
        name="FormAdd"
        component={FormTodo}
        options={{headerShown: true}}
      />
        <Stack.Screen
        name="EditTodo"
        component={EditTodo}
        options={{headerShown: true}}
      />
      
    </Stack.Navigator>
  );
};

export default Router;
