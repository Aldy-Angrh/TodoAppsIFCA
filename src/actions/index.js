import axios from 'axios';

export const ADD_TODO = 'ADD_TODO';
export const EDIT_TODO = 'EDIT_TODO';
export const GET_WHEATER_DATA = 'GET_WHEATER_DATA';

export const postData = result => ({
  type: ADD_TODO,
  payload: result,
});
export const editData = result => ({
  type: EDIT_TODO,
  payload: result,
});

export const GetCuaca = () => {
  const dataParam = 'Indonesia';
  return dispatch => {
    axios({
      method: 'GET',
      url: `https://community-open-weather-map.p.rapidapi.com/weather?q=${dataParam}`,
      headers: {
        'X-RapidAPI-Key': 'e650330262msh724adc4dd797f7ep1d398bjsna8da85faae52',
        'X-RapidAPI-Host': 'community-open-weather-map.p.rapidapi.com',
      },
    })
      .then(res => {
        dispatch({
          type: GET_WHEATER_DATA,
          payload: {
            getWheaterData: res.data,
            getWheaterError: false,
          },
        });
      })
      .catch(err => {
        dispatch({
          type: GET_WHEATER_DATA,
          payload: {
            getWheaterData: false,
            getWheaterError: err,
          },
        });
        console.log('ERROR DI ACTION ', err);
      });
  };
};
