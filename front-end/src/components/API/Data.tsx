import React, { useState, useEffect } from "react";
import axios from "axios";
interface DataPostProps {
  userid: any;
  username: string;
  password: string;
}

export const DataGet = async () => {
  try {
    const response = await axios.get(
      "https://66850e3656e7503d1ae22ace.mockapi.io/api/demo/users"
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const DataDelete = async (id: any) => {
  try {
    const response = await axios.delete(
      `https://66850e3656e7503d1ae22ace.mockapi.io/api/demo/users/${id}`
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const DataPost = async (username: any, password: any) => {
  const body = {
    username: username,
    password: password,
    expiresInMins: 30
  }
  try {
    const response = await axios.post(
      "https://cors-anywhere.herokuapp.com/https://dummyjson.com/auth/login", body
      , {
        headers: { 'Content-Type': 'application/json' }
      }
    )

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const DataPut = async (username: any, password: any) => {
  try {
    const response = await axios.put(
      "https://66850e3656e7503d1ae22ace.mockapi.io/api/demo/users/5", {
      username: username,
      password: password
    }
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
